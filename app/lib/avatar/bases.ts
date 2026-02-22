import type { AvatarBaseDef } from "../../types/outfit-builder";

/**
 * Predefined avatar bases — one per (gender × bodyType × heightBucket) combo.
 *
 * Each base references SVG layer files under /public/avatar/bases/.
 * The SVGs use a special fill class (e.g. `fill="var(--skin)"`) so that
 * skin tone and hair color can be injected at render time via CSS variables.
 *
 * Proportions are in a 400×800 viewBox coordinate system.
 */
export const AVATAR_BASES: AvatarBaseDef[] = [
  // ─── Female ────────────────────────────────────────────────────
  // Slim
  { id: "f-slim-petite",   gender: "female", bodyType: "slim",     heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 200, legLength: 280, shoulderWidth: 140, hipWidth: 130 }, layers: { body: "/avatar/bases/f-slim-petite-body.svg",   hair: "/avatar/bases/f-slim-petite-hair.svg",   face: "/avatar/bases/f-slim-petite-face.svg" } },
  { id: "f-slim-average",  gender: "female", bodyType: "slim",     heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 220, legLength: 320, shoulderWidth: 145, hipWidth: 135 }, layers: { body: "/avatar/bases/f-slim-average-body.svg",  hair: "/avatar/bases/f-slim-average-hair.svg",  face: "/avatar/bases/f-slim-average-face.svg" } },
  { id: "f-slim-tall",     gender: "female", bodyType: "slim",     heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 240, legLength: 360, shoulderWidth: 150, hipWidth: 140 }, layers: { body: "/avatar/bases/f-slim-tall-body.svg",     hair: "/avatar/bases/f-slim-tall-hair.svg",     face: "/avatar/bases/f-slim-tall-face.svg" } },
  // Regular
  { id: "f-regular-petite", gender: "female", bodyType: "regular",  heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 200, legLength: 280, shoulderWidth: 155, hipWidth: 150 }, layers: { body: "/avatar/bases/f-regular-petite-body.svg", hair: "/avatar/bases/f-regular-petite-hair.svg", face: "/avatar/bases/f-regular-petite-face.svg" } },
  { id: "f-regular-average",gender: "female", bodyType: "regular",  heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 220, legLength: 320, shoulderWidth: 160, hipWidth: 155 }, layers: { body: "/avatar/bases/f-regular-average-body.svg",hair: "/avatar/bases/f-regular-average-hair.svg",face: "/avatar/bases/f-regular-average-face.svg" } },
  { id: "f-regular-tall",   gender: "female", bodyType: "regular",  heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 240, legLength: 360, shoulderWidth: 165, hipWidth: 160 }, layers: { body: "/avatar/bases/f-regular-tall-body.svg",   hair: "/avatar/bases/f-regular-tall-hair.svg",   face: "/avatar/bases/f-regular-tall-face.svg" } },
  // Curvy
  { id: "f-curvy-petite",  gender: "female", bodyType: "curvy",    heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 205, legLength: 275, shoulderWidth: 155, hipWidth: 175 }, layers: { body: "/avatar/bases/f-curvy-petite-body.svg",  hair: "/avatar/bases/f-curvy-petite-hair.svg",  face: "/avatar/bases/f-curvy-petite-face.svg" } },
  { id: "f-curvy-average", gender: "female", bodyType: "curvy",    heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 225, legLength: 315, shoulderWidth: 160, hipWidth: 180 }, layers: { body: "/avatar/bases/f-curvy-average-body.svg", hair: "/avatar/bases/f-curvy-average-hair.svg", face: "/avatar/bases/f-curvy-average-face.svg" } },
  { id: "f-curvy-tall",    gender: "female", bodyType: "curvy",    heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 245, legLength: 355, shoulderWidth: 165, hipWidth: 185 }, layers: { body: "/avatar/bases/f-curvy-tall-body.svg",    hair: "/avatar/bases/f-curvy-tall-hair.svg",    face: "/avatar/bases/f-curvy-tall-face.svg" } },
  // Athletic
  { id: "f-athletic-petite", gender: "female", bodyType: "athletic", heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 205, legLength: 280, shoulderWidth: 165, hipWidth: 145 }, layers: { body: "/avatar/bases/f-athletic-petite-body.svg", hair: "/avatar/bases/f-athletic-petite-hair.svg", face: "/avatar/bases/f-athletic-petite-face.svg" } },
  { id: "f-athletic-average",gender: "female", bodyType: "athletic", heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 225, legLength: 320, shoulderWidth: 170, hipWidth: 150 }, layers: { body: "/avatar/bases/f-athletic-average-body.svg",hair: "/avatar/bases/f-athletic-average-hair.svg",face: "/avatar/bases/f-athletic-average-face.svg" } },
  { id: "f-athletic-tall",  gender: "female", bodyType: "athletic", heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 245, legLength: 360, shoulderWidth: 175, hipWidth: 155 }, layers: { body: "/avatar/bases/f-athletic-tall-body.svg",  hair: "/avatar/bases/f-athletic-tall-hair.svg",  face: "/avatar/bases/f-athletic-tall-face.svg" } },
  // Relaxed
  { id: "f-relaxed-petite", gender: "female", bodyType: "relaxed",  heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 210, legLength: 270, shoulderWidth: 165, hipWidth: 170 }, layers: { body: "/avatar/bases/f-relaxed-petite-body.svg", hair: "/avatar/bases/f-relaxed-petite-hair.svg", face: "/avatar/bases/f-relaxed-petite-face.svg" } },
  { id: "f-relaxed-average",gender: "female", bodyType: "relaxed",  heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 230, legLength: 310, shoulderWidth: 170, hipWidth: 175 }, layers: { body: "/avatar/bases/f-relaxed-average-body.svg",hair: "/avatar/bases/f-relaxed-average-hair.svg",face: "/avatar/bases/f-relaxed-average-face.svg" } },
  { id: "f-relaxed-tall",   gender: "female", bodyType: "relaxed",  heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 250, legLength: 350, shoulderWidth: 175, hipWidth: 180 }, layers: { body: "/avatar/bases/f-relaxed-tall-body.svg",   hair: "/avatar/bases/f-relaxed-tall-hair.svg",   face: "/avatar/bases/f-relaxed-tall-face.svg" } },

  // ─── Male ──────────────────────────────────────────────────────
  // Slim
  { id: "m-slim-petite",   gender: "male", bodyType: "slim",     heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 210, legLength: 290, shoulderWidth: 160, hipWidth: 135 }, layers: { body: "/avatar/bases/m-slim-petite-body.svg",   hair: "/avatar/bases/m-slim-petite-hair.svg",   face: "/avatar/bases/m-slim-petite-face.svg" } },
  { id: "m-slim-average",  gender: "male", bodyType: "slim",     heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 230, legLength: 330, shoulderWidth: 165, hipWidth: 140 }, layers: { body: "/avatar/bases/m-slim-average-body.svg",  hair: "/avatar/bases/m-slim-average-hair.svg",  face: "/avatar/bases/m-slim-average-face.svg" } },
  { id: "m-slim-tall",     gender: "male", bodyType: "slim",     heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 250, legLength: 370, shoulderWidth: 170, hipWidth: 145 }, layers: { body: "/avatar/bases/m-slim-tall-body.svg",     hair: "/avatar/bases/m-slim-tall-hair.svg",     face: "/avatar/bases/m-slim-tall-face.svg" } },
  // Regular
  { id: "m-regular-petite", gender: "male", bodyType: "regular",  heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 210, legLength: 290, shoulderWidth: 175, hipWidth: 155 }, layers: { body: "/avatar/bases/m-regular-petite-body.svg", hair: "/avatar/bases/m-regular-petite-hair.svg", face: "/avatar/bases/m-regular-petite-face.svg" } },
  { id: "m-regular-average",gender: "male", bodyType: "regular",  heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 230, legLength: 330, shoulderWidth: 180, hipWidth: 160 }, layers: { body: "/avatar/bases/m-regular-average-body.svg",hair: "/avatar/bases/m-regular-average-hair.svg",face: "/avatar/bases/m-regular-average-face.svg" } },
  { id: "m-regular-tall",   gender: "male", bodyType: "regular",  heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 250, legLength: 370, shoulderWidth: 185, hipWidth: 165 }, layers: { body: "/avatar/bases/m-regular-tall-body.svg",   hair: "/avatar/bases/m-regular-tall-hair.svg",   face: "/avatar/bases/m-regular-tall-face.svg" } },
  // Athletic
  { id: "m-athletic-petite", gender: "male", bodyType: "athletic", heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 215, legLength: 290, shoulderWidth: 190, hipWidth: 155 }, layers: { body: "/avatar/bases/m-athletic-petite-body.svg", hair: "/avatar/bases/m-athletic-petite-hair.svg", face: "/avatar/bases/m-athletic-petite-face.svg" } },
  { id: "m-athletic-average",gender: "male", bodyType: "athletic", heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 235, legLength: 330, shoulderWidth: 195, hipWidth: 160 }, layers: { body: "/avatar/bases/m-athletic-average-body.svg",hair: "/avatar/bases/m-athletic-average-hair.svg",face: "/avatar/bases/m-athletic-average-face.svg" } },
  { id: "m-athletic-tall",  gender: "male", bodyType: "athletic", heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 255, legLength: 370, shoulderWidth: 200, hipWidth: 165 }, layers: { body: "/avatar/bases/m-athletic-tall-body.svg",  hair: "/avatar/bases/m-athletic-tall-hair.svg",  face: "/avatar/bases/m-athletic-tall-face.svg" } },
  // Relaxed
  { id: "m-relaxed-petite", gender: "male", bodyType: "relaxed",  heightBucket: "petite",  proportions: { headScale: 1.05, torsoLength: 215, legLength: 280, shoulderWidth: 185, hipWidth: 175 }, layers: { body: "/avatar/bases/m-relaxed-petite-body.svg", hair: "/avatar/bases/m-relaxed-petite-hair.svg", face: "/avatar/bases/m-relaxed-petite-face.svg" } },
  { id: "m-relaxed-average",gender: "male", bodyType: "relaxed",  heightBucket: "average", proportions: { headScale: 1.0,  torsoLength: 235, legLength: 320, shoulderWidth: 190, hipWidth: 180 }, layers: { body: "/avatar/bases/m-relaxed-average-body.svg",hair: "/avatar/bases/m-relaxed-average-hair.svg",face: "/avatar/bases/m-relaxed-average-face.svg" } },
  { id: "m-relaxed-tall",   gender: "male", bodyType: "relaxed",  heightBucket: "tall",    proportions: { headScale: 0.95, torsoLength: 255, legLength: 360, shoulderWidth: 195, hipWidth: 185 }, layers: { body: "/avatar/bases/m-relaxed-tall-body.svg",   hair: "/avatar/bases/m-relaxed-tall-hair.svg",   face: "/avatar/bases/m-relaxed-tall-face.svg" } },
];
