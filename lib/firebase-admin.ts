import admin from "firebase-admin";

let initialized = false;

function initAdmin() {
  if (initialized || admin.apps.length > 0) {
    initialized = true;
    return admin;
  }

  const projectId   = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let   privateKey  = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      `Missing Firebase Admin env vars — ` +
      `PROJECT_ID=${!!projectId} EMAIL=${!!clientEmail} KEY=${!!privateKey}`
    );
  }

  privateKey = privateKey
    .replace(/^"/, "").replace(/"$/, "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  initialized = true;
  console.log("✅ Firebase Admin initialized");
  return admin;
}

export function adminAuth() {
  return initAdmin().auth();
}