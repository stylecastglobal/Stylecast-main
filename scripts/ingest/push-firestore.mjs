import fs from "node:fs/promises";
import path from "node:path";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

async function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  try {
    const content = await fs.readFile(envPath, "utf-8");
    content.split(/\r?\n/).forEach((line) => {
      if (!line || line.startsWith("#")) return;
      const [key, ...rest] = line.split("=");
      if (!key) return;
      if (process.env[key] === undefined) {
        process.env[key] = rest.join("=").trim();
      }
    });
  } catch {
    // no env file found
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function sanitizeValue(value) {
  if (value === undefined) return undefined;
  if (typeof value === "number" && Number.isNaN(value)) return null;
  if (Array.isArray(value)) {
    const cleaned = value
      .map((item) => sanitizeValue(item))
      .filter((item) => item !== undefined);
    return cleaned;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, val]) => [key, sanitizeValue(val)])
      .filter(([, val]) => val !== undefined);
    return Object.fromEntries(entries);
  }
  return value;
}

async function main() {
  await loadEnvFile();
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    throw new Error("Missing Firebase env vars. Ensure .env.local is set.");
  }

  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error("Usage: node scripts/ingest/push-firestore.mjs <products.json>");
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const raw = await fs.readFile(path.resolve(process.cwd(), inputFile), "utf-8");
  const products = JSON.parse(raw);

  const failed = [];
  const limit = process.env.INGEST_LIMIT ? Number(process.env.INGEST_LIMIT) : products.length;

  for (const product of products.slice(0, limit)) {
    const sanitized = sanitizeValue(product);
    if (!sanitized?.id) continue;
    const ref = doc(db, "products", String(sanitized.id));
    try {
      await setDoc(ref, sanitized, { merge: true });
    } catch (err) {
      failed.push({ id: sanitized.id, error: String(err?.message || err) });
      console.error("Failed to upload", sanitized.id, err?.message || err);
    }
  }

  if (failed.length) {
    await fs.writeFile(
      path.resolve(process.cwd(), "failed-firestore.json"),
      JSON.stringify(failed, null, 2),
      "utf-8"
    );
  }

  console.log(`Uploaded ${products.length - failed.length} products to Firestore`);
  if (failed.length) {
    console.log(`Failed ${failed.length} products. See failed-firestore.json`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
