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

async function main() {
  await loadEnvFile();
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    throw new Error("Missing Firebase env vars. Ensure .env.local is set.");
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  await setDoc(doc(db, "products", "test-product"), {
    brand: "Test",
    name: "Test Product",
    category: "OTHER",
    images: [],
    stores: [],
    keywords: ["test"],
    updated_at: new Date().toISOString(),
  });
  console.log("Firestore test write succeeded");
}

main().catch((err) => {
  console.error("Firestore test write failed", err);
  process.exit(1);
});
