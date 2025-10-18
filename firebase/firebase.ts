// firebase/firebase.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!global.firebaseAdminApp) {
  global.firebaseAdminApp = initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    }),
  });
}

// Use getAuth() passing the initialized app instance
export const auth: Auth = getAuth(global.firebaseAdminApp);

// Type declaration for global (extend global scope)
declare global {
  var firebaseAdminApp: any;
}
