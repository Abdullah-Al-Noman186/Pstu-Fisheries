import "@/lib/firebase-admin"; // makes sure the admin app is initialised
import { getAuth } from "firebase-admin/auth";

export async function verifyUser(req: Request) {
  const h = req.headers.get("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return null;
  try {
    return await getAuth().verifyIdToken(token);
  } catch {
    return null;
  }
}