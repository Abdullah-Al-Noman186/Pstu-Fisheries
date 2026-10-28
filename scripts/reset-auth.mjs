import admin from "firebase-admin";
import mongoose from "mongoose";

const expectedProject = "pstu-fisheries";
const expectedDatabase = "pstu_fisheries";
const execute = process.argv.includes("--execute");

async function main() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/^\"|\"$/g, "").replace(/\\n/g, "\n");
  const uri = process.env.MONGODB_URI;

  if (!projectId || !clientEmail || !privateKey || !uri) {
    throw new Error("Firebase Admin credentials and MONGODB_URI must be configured in the environment.");
  }
  if (projectId !== expectedProject) throw new Error(`Refusing unexpected Firebase project: ${projectId}`);

  const mongoUrl = new URL(uri);
  const database = decodeURIComponent(mongoUrl.pathname.slice(1).split("/")[0] || "");
  if (database !== expectedDatabase) throw new Error(`Refusing unexpected MongoDB database: ${database || "(default)"}`);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database.");

  const authUsers = [];
  let pageToken;
  do {
    const page = await admin.auth().listUsers(1000, pageToken);
    authUsers.push(...page.users.map(({ uid }) => uid));
    pageToken = page.pageToken;
  } while (pageToken);

  const [userCount, profileCount, studentLinks, alumniLinks] = await Promise.all([
    db.collection("users").countDocuments({}),
    db.collection("profiles").countDocuments({}),
    db.collection("students").countDocuments({ uid: { $exists: true, $ne: "" } }),
    db.collection("alumnis").countDocuments({ uid: { $exists: true, $ne: "" } }),
  ]);

  console.log(JSON.stringify({
    firebaseProject: projectId,
    mongoDatabase: database,
    firebaseAccounts: authUsers.length,
    mongoAccountDocuments: userCount,
    mongoProfileDocuments: profileCount,
    linkedStudentRecords: studentLinks,
    linkedAlumniRecords: alumniLinks,
    mode: execute ? "EXECUTE" : "DRY RUN",
  }, null, 2));

  if (!execute) {
    console.log("No data changed. Rerun with --execute to delete Firebase sign-ins and clear account links.");
    return;
  }

  for (let offset = 0; offset < authUsers.length; offset += 1000) {
    const result = await admin.auth().deleteUsers(authUsers.slice(offset, offset + 1000));
    if (result.failureCount) {
      throw new Error(`Firebase deleted ${result.successCount} accounts in this batch; ${result.failureCount} failed. Mongo links were left untouched. Rerun after resolving the Firebase deletion failures.`);
    }
  }

  const [usersDeleted, profilesDeleted, studentsUnlinked, alumniUnlinked] = await Promise.all([
    db.collection("users").deleteMany({}),
    db.collection("profiles").deleteMany({}),
    db.collection("students").updateMany({ uid: { $exists: true } }, { $unset: { uid: "" }, $set: { isRegistered: false } }),
    db.collection("alumnis").updateMany({ uid: { $exists: true } }, { $unset: { uid: "" }, $set: { isRegistered: false } }),
  ]);

  console.log(JSON.stringify({
    firebaseAccountsDeleted: authUsers.length,
    mongoAccountDocumentsDeleted: usersDeleted.deletedCount,
    mongoProfileDocumentsDeleted: profilesDeleted.deletedCount,
    studentRecordsUnlinked: studentsUnlinked.modifiedCount,
    alumniRecordsUnlinked: alumniUnlinked.modifiedCount,
    sourceStudentAndAlumniRecordsPreserved: true,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error.message || "Authentication reset failed.");
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => undefined);
    await admin.app().delete().catch(() => undefined);
  });
