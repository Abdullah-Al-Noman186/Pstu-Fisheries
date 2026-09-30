import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing. Run with --env-file=.env.local");

  await mongoose.connect(uri);
  const db = mongoose.connection.db!;

  const names = (await db.listCollections().toArray()).map((c) => c.name);
  console.log("Collections found:", names.join(", "));

  const targets = ["alumnis", "students"].filter((n) => names.includes(n));
  const backup: Record<string, any[]> = {};
  for (const n of targets) {
    backup[n] = await db.collection(n).find({}).toArray();
    console.log(`${n}: ${backup[n].length} documents`);
  }

  if (!process.argv.includes("--yes")) {
    console.log("\nNothing deleted. Run again with --yes to delete.");
    process.exit(0);
  }

  const file = path.join(process.cwd(), "scripts", "data", `backup-before-clear-${Date.now()}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(backup, null, 2));
  console.log(`\nBackup saved: ${file}`);

  for (const n of targets) {
    const r = await db.collection(n).deleteMany({});
    console.log(`Deleted ${r.deletedCount} from ${n}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});