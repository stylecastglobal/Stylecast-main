# Avatar Outfit Builder — Architecture Proposal

> Based on the existing StyleCast codebase: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Zustand, Firebase, Framer Motion.

---

## 1. Frontend Architecture

### Layer Diagram

```
┌─────────────────────────────────────────────────────┐
│  Cart Page  ──"Create Outfit"──▶  Outfit Builder    │  Pages (app/)
├─────────────────────────────────────────────────────┤
│  AvatarSetup │ AvatarCanvas │ OutfitPanel │ Reco    │  Components
├─────────────────────────────────────────────────────┤
│  useOutfitBuilderStore (Zustand)                    │  Client State
├─────────────────────────────────────────────────────┤
│  outfit-engine (rule-based logic, pure functions)   │  Logic Layer
├─────────────────────────────────────────────────────┤
│  /api/outfit-reasoning  (Claude)                    │  API Routes
│  /api/outfit-recommend  (rule engine, server-side)  │
├─────────────────────────────────────────────────────┤
│  Firebase (avatar profiles, saved outfits, cache)   │  Persistence
└─────────────────────────────────────────────────────┘
```

### Component Tree

```
OutfitBuilderPage
├── AvatarSetupFlow          (first-time only, modal/step)
│   ├── SelfieUpload         (camera/file input)
│   ├── HeightInput          (slider or numeric)
│   └── BodyTypeSelector     (visual cards: slim/regular/curvy/athletic/relaxed)
│
├── AvatarCanvas             (stylized avatar render — CSS/SVG, no AI)
│   └── OutfitLayer[]        (top, bottom, outerwear, shoes, accessories)
│
├── OutfitPanel              (right sidebar)
│   ├── CartItemSlots        (items from cart, draggable to avatar)
│   ├── RecommendationRail   (cross-brand suggestions)
│   │   └── RecoCard         (item + AI reasoning tooltip)
│   ├── OccasionToggle       (daily/office/date/travel/event)
│   ├── BudgetSlider         (price range filter)
│   └── SocialProofBadge     ("Saved by 1,200 users")
│
└── OutfitActions
    ├── SaveOutfitButton
    ├── ShareOutfitButton
    └── AddAllToCartButton
```

### State Management

Following the existing pattern (Zustand for feature stores, ShopContext for cart), we add:

- **`useOutfitBuilderStore`** — Zustand store for all builder state
- **`useShop`** — existing context, used to read cart items and add recommended items

The store is **not** added to `Providers` — it's a standalone Zustand store (same pattern as `useMakeupStore`).

---

## 2. Data Models

### 2.1 Avatar Profile

```typescript
type BodyType = "slim" | "regular" | "curvy" | "athletic" | "relaxed";

type AvatarProfile = {
  id: string;                    // Firebase doc ID or local UUID
  userId: string;                // Firebase auth UID (or anonymous session)
  selfieUrl: string;             // stored in Firebase Storage
  extractedFeatures: {
    skinTone: string;            // hex extracted from selfie
    faceShape: "oval" | "round" | "square" | "heart" | "oblong";
  };
  height: number;                // cm
  bodyType: BodyType;
  avatarBaseId: string;          // maps to a predefined SVG/illustration base
  createdAt: number;             // timestamp
};
```

### 2.2 Outfit Item (extends existing product shape)

```typescript
type OutfitCategory = "tops" | "bottoms" | "outerwear" | "shoes" | "accessories";

type OutfitItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  category: OutfitCategory;
  attributes: {
    color: string;               // primary color hex
    silhouette: string;          // e.g. "oversized", "slim-fit", "a-line"
    style: string[];             // e.g. ["casual", "streetwear"]
  };
};
```

### 2.3 Outfit Combination

```typescript
type OutfitCombo = {
  id: string;
  avatarProfileId: string;
  items: Record<OutfitCategory, OutfitItem | null>;
  occasion: Occasion | null;
  budgetMax: number | null;
  reasoning: string | null;      // cached Claude response
  reasoningCacheKey: string;     // deterministic hash of item IDs + occasion
  socialProof: {
    saveCount: number;
    popularWithBodyTypes: BodyType[];
  } | null;
  createdAt: number;
  savedAt: number | null;
};

type Occasion = "daily" | "office" | "date" | "travel" | "event";
```

### 2.4 Reasoning Cache

```typescript
type ReasoningCacheEntry = {
  cacheKey: string;              // hash(sorted item IDs + occasion + bodyType)
  reasoning: string;             // Claude-generated text
  createdAt: number;
  ttl: number;                   // seconds, e.g. 86400 (24h)
};
```

Cache key formula:
```
sha256( sort([item.id, ...]) + "|" + occasion + "|" + bodyType )
```

Storage: **Firebase Firestore** collection `reasoningCache` — simple key-value lookup before calling Claude.

---

## 3. API Boundaries

### 3.1 Boundary Map

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   UI Layer   │────▶│   Logic Layer    │────▶│   AI Layer      │
│  (React)     │     │  (pure functions │     │  (API route →   │
│              │     │   + API routes)  │     │   Claude)       │
└──────────────┘     └──────────────────┘     └─────────────────┘
```

### 3.2 API Route: `POST /api/outfit-recommend`

**Purpose:** Server-side rule-based recommendation engine.

```typescript
// Request
{
  cartItems: OutfitItem[];
  avatarProfile: Pick<AvatarProfile, "height" | "bodyType" | "extractedFeatures">;
  occasion?: Occasion;
  budgetMax?: number;
}

// Response
{
  recommendations: OutfitItem[];   // ranked list
  filledSlots: Record<OutfitCategory, OutfitItem | null>;
}
```

**Logic lives in:** `app/lib/outfit-engine/` — pure functions, testable, no AI.

### 3.3 API Route: `POST /api/outfit-reasoning`

**Purpose:** Generate short style explanation via Claude API.

```typescript
// Request
{
  items: OutfitItem[];
  occasion?: Occasion;
  bodyType: BodyType;
}

// Response
{
  reasoning: string;              // 1-2 sentences
  cacheKey: string;
  cached: boolean;
}
```

**Flow:**
1. Compute `cacheKey` from inputs
2. Check Firestore `reasoningCache` collection
3. If hit → return cached reasoning
4. If miss → call Claude API → store in cache → return

### 3.4 API Route: `POST /api/avatar-setup`

**Purpose:** Process selfie, extract features, select avatar base.

```typescript
// Request
{
  selfieBase64: string;
  height: number;
  bodyType: BodyType;
}

// Response
{
  avatarProfile: AvatarProfile;
}
```

**Logic:** Extract skin tone (reuse existing `colorAnalysis.ts` from `lib/`), map to predefined avatar base by body type + height range. No ML.

### 3.5 Summary Table

| Route | Method | Input | Output | AI? |
|---|---|---|---|---|
| `/api/avatar-setup` | POST | selfie, height, bodyType | AvatarProfile | No |
| `/api/outfit-recommend` | POST | cart items, avatar, filters | ranked items | No |
| `/api/outfit-reasoning` | POST | outfit items, occasion, bodyType | reasoning text | Yes (Claude) |

---

## 4. Folder Structure

Integrated into the existing project layout:

```
app/
├── outfit-builder/
│   ├── page.tsx                          # Main builder page
│   └── components/
│       ├── AvatarSetupFlow.tsx           # Step-by-step avatar creation
│       ├── SelfieUpload.tsx
│       ├── HeightInput.tsx
│       ├── BodyTypeSelector.tsx
│       ├── AvatarCanvas.tsx              # SVG/CSS avatar renderer
│       ├── OutfitLayer.tsx               # Single clothing layer on avatar
│       ├── OutfitPanel.tsx               # Right sidebar with slots + reco
│       ├── CartItemSlots.tsx             # Cart items mapped to categories
│       ├── RecommendationRail.tsx        # Cross-brand suggestions
│       ├── RecoCard.tsx                  # Single recommendation card
│       ├── OccasionToggle.tsx            # Occasion filter pills
│       ├── BudgetSlider.tsx              # Price range slider
│       ├── SocialProofBadge.tsx          # "Saved by X users"
│       ├── SaveOutfitButton.tsx
│       ├── ShareOutfitButton.tsx
│       └── AddAllToCartButton.tsx
│
├── api/
│   ├── avatar-setup/
│   │   └── route.ts                     # Selfie processing + avatar base selection
│   ├── outfit-recommend/
│   │   └── route.ts                     # Rule-based recommendation engine
│   └── outfit-reasoning/
│       └── route.ts                     # Claude API + cache layer
│
├── lib/
│   ├── outfit-engine/
│   │   ├── recommend.ts                 # Core recommendation logic (pure functions)
│   │   ├── scoring.ts                   # Style compatibility scoring
│   │   ├── filters.ts                   # Occasion + budget filters
│   │   └── constants.ts                 # Style rules, color harmony maps
│   ├── avatar/
│   │   ├── baseSelector.ts             # Map bodyType+height → avatar base
│   │   ├── featureExtractor.ts         # Skin tone extraction (reuses colorAnalysis)
│   │   └── bases.ts                    # Predefined avatar base definitions
│   └── outfit-builder-store.ts          # Zustand store
│
├── types/
│   └── outfit-builder.ts                # All types from Section 2 above
```

### What goes where

| Concern | Location | Why |
|---|---|---|
| Page routing | `app/outfit-builder/page.tsx` | Next.js App Router convention |
| UI components | `app/outfit-builder/components/` | Co-located with feature page |
| Client state | `app/lib/outfit-builder-store.ts` | Matches `store.ts` pattern |
| Rule engine | `app/lib/outfit-engine/` | Pure functions, importable by API routes |
| Avatar logic | `app/lib/avatar/` | Reusable, separate from UI |
| API routes | `app/api/outfit-*` | Next.js route handlers |
| Types | `app/types/outfit-builder.ts` | Matches existing `app/types/` |

---

## 5. Key Design Decisions

1. **No ML for avatar** — Predefined SVG/illustration bases selected by body type + height. Selfie is only used for skin tone + face shape extraction (reusing existing `colorAnalysis.ts`).

2. **Claude only for reasoning** — A single, narrow API call that generates 1-2 sentence explanations. Everything else is rule-based.

3. **Cache-first reasoning** — Deterministic cache key means identical outfit combos never call Claude twice. Firestore TTL keeps it fresh.

4. **Zustand over Context** — Feature-specific store avoids re-rendering the entire app. Matches the `useMakeupStore` pattern already in the codebase.

5. **Pure function engine** — `outfit-engine/` has zero side effects. Easy to test, easy to swap scoring rules.

6. **Cart integration** — Entry point is the cart page ("Create Outfit" button). Uses existing `useShop()` context to read cart items and push recommended items back.

---

## 6. Entry Point: Cart → Builder

The "Create Outfit" button on the cart page navigates to `/outfit-builder?from=cart`. The builder page reads cart items via `useShop()` and pre-populates the outfit slots.

If the user has no avatar profile yet, `AvatarSetupFlow` is shown as a modal before entering the builder.

---

## 7. External Dependencies

| Dependency | Purpose | New? |
|---|---|---|
| `@anthropic-ai/sdk` | Claude API for reasoning | **Yes** |
| `zustand` | Builder store | Existing |
| `firebase` | Cache + avatar storage | Existing |
| `framer-motion` | Animations | Existing |
| `lucide-react` | Icons | Existing |

Only **one new dependency**: the Anthropic SDK for server-side Claude calls.
