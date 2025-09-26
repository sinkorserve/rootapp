import * as admin from "firebase-admin";

let app: admin.app.App;

// Log relevant environment variables for debugging
console.log("--- Firebase Admin SDK Init Debug ---");
console.log("process.env.FIREBASE_ADMIN_SDK:", process.env.FIREBASE_ADMIN_SDK ? "SET" : "NOT SET");
console.log("process.env.FIRESTORE_EMULATOR_HOST:", process.env.FIRESTORE_EMULATOR_HOST);
console.log("process.env.GCLOUD_PROJECT:", process.env.GCLOUD_PROJECT);
console.log("process.env.GOOGLE_CLOUD_PROJECT:", process.env.GOOGLE_CLOUD_PROJECT);
console.log("--- End Debug ---");


if (!admin.apps.length) {
  try {
    if (!process.env.FIREBASE_ADMIN_SDK) {
      throw new Error("FIREBASE_ADMIN_SDK environment variable is not set.");
    }
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id, // Explicitly set project ID again from the service account
    });

    console.log("Connected to Firebase project:", serviceAccount.project_id);
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    throw error;
  }
} else {
  app = admin.app();
}

export const db = admin.firestore(app); // Pass the initialized app instance

// Corrected logging for project ID using the 'app' variable
if (app && app.options && app.options.projectId) {
  console.log("Firebase Admin App projectId:", app.options.projectId);
} else {
  console.log("Could not determine Firebase Admin App projectId.");
}
