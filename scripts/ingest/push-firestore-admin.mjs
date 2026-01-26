import fs from "node:fs/promises";
import path from "node:path";
import admin from "firebase-admin";

async function loadServiceAccount(keyPath) {
  const raw = await fs.readFile(path.resolve(keyPath), "utf-8");
  return JSON.parse(raw);
}

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
  const inputFile = process.argv[2];
  const keyPath = process.env.ADMIN_KEY_PATH;
  if (!inputFile || !keyPath) {
    console.error("Usage: ADMIN_KEY_PATH=/path/key.json node scripts/ingest/push-firestore-admin.mjs <products.json>");
    process.exit(1);
  }

  const serviceAccount = await loadServiceAccount(keyPath);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();
  const raw = await fs.readFile(path.resolve(process.cwd(), inputFile), "utf-8");
  const products = JSON.parse(raw);

  const failed = [];
  const limit = process.env.INGEST_LIMIT ? Number(process.env.INGEST_LIMIT) : products.length;
  const batchSize = 400;

  for (let i = 0; i < Math.min(limit, products.length); i += batchSize) {
    const batch = db.batch();
    const slice = products.slice(i, i + batchSize);
    for (const product of slice) {
      const sanitized = sanitizeValue(product);
      if (!sanitized?.id) continue;
      const ref = db.collection("products").doc(String(sanitized.id));
      batch.set(ref, sanitized, { merge: true });
    }
    try {
      await batch.commit();
      console.log(`Uploaded batch ${i + 1}-${i + slice.length}`);
    } catch (err) {
      failed.push({ batchStart: i, error: String(err?.message || err) });
      console.error("Batch failed", i, err?.message || err);
    }
  }

  if (failed.length) {
    await fs.writeFile(
      path.resolve(process.cwd(), "failed-firestore.json"),
      JSON.stringify(failed, null, 2),
      "utf-8"
    );
  }

  console.log(`Upload finished. Failed batches: ${failed.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
