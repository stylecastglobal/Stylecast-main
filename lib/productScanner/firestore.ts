import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { normalizeQuery } from "./search";
import type { ProductDoc, ScanCandidate, ProductCategory } from "./types";

const PRODUCTS_COLLECTION = "products";

function mapProduct(docId: string, data: any): ProductDoc {
  return {
    id: docId,
    brand: data.brand || "",
    name: data.name || "",
    category: data.category || "OTHER",
    price: data.price,
    stores: data.stores || [],
    images: data.images || [],
    shades: data.shades || [],
    ingredients: data.ingredients,
    safety_flags: data.safety_flags || [],
    claims: data.claims || [],
    reviews_summary: data.reviews_summary,
    wear_time_rating: data.wear_time_rating,
    dupes: data.dupes || [],
    popularity_score: data.popularity_score,
    keywords: data.keywords || [],
    updated_at: data.updated_at,
  };
}

export async function getProductById(productId: string): Promise<ProductDoc | null> {
  const ref = doc(db, PRODUCTS_COLLECTION, productId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapProduct(snap.id, snap.data());
}

export async function searchProducts(queryText: string, maxResults = 30) {
  const tokens = normalizeQuery(queryText);
  if (!tokens.length) return [];
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("keywords", "array-contains", tokens[0]),
    limit(maxResults)
  );
  const snaps = await getDocs(q);
  return snaps.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
}

export async function getProductsByCategory(category: ProductCategory, maxResults = 30) {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("category", "==", category),
    orderBy("popularity_score", "desc"),
    limit(maxResults)
  );
  const snaps = await getDocs(q);
  return snaps.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
}

export async function getScanCandidates(queryText: string, maxResults = 25): Promise<ScanCandidate[]> {
  const products = await searchProducts(queryText, maxResults);
  return products.map((product) => ({
    id: product.id,
    brand: product.brand,
    name: product.name,
    category: product.category,
    image: product.images?.[0] ?? null,
    image_set: product.images ?? [],
  }));
}
