import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const configNames = Object.keys(firebaseConfig);

export function missingFirebaseConfig() {
  return configNames.some((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);
}

function getFirebaseApp(): FirebaseApp {
  const missing = configNames.filter(
    (key) => !firebaseConfig[key as keyof typeof firebaseConfig],
  );
  if (missing.length > 0) {
    throw new Error(`缺少 Firebase 環境變數：${missing.join(", ")}`);
  }

  return getApps()[0] ?? initializeApp(firebaseConfig as Record<string, string>);
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

const errorMessages: Record<string, string> = {
  "auth/email-already-in-use": "這個 email 已經註冊過了。",
  "auth/invalid-email": "email 格式不正確。",
  "auth/weak-password": "密碼至少要 6 個字元。",
  "auth/invalid-credential": "email 或密碼錯誤。",
  "auth/wrong-password": "email 或密碼錯誤。",
  "auth/user-not-found": "email 或密碼錯誤。",
  "auth/too-many-requests": "嘗試次數太多，請稍後再試。",
  "permission-denied": "沒有權限寫入資料庫。請確認 Firestore 規則已允許會員讀寫自己的紀錄。",
};

export function firebaseErrorMessage(error: unknown, fallback: string) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code: string }).code)
      : "";
  return errorMessages[code] ?? fallback;
}
