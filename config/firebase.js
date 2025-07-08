import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyCbS7i4tD2__KJStmitrvDC9XTNwdoz88Y',
  authDomain: 'mma-ongthodien.firebaseapp.com',
  databaseURL: 'https://mma-ongthodien-default-rtdb.firebaseio.com',
  projectId: 'mma-ongthodien',
  storageBucket: 'mma-ongthodien.appspot.com', // ✅ sửa .app → .app**spot**.com
  messagingSenderId: '65893066168',
  appId: '1:65893066168:web:522caef35118c36d011b4d',
}

// Initialize Firebase app (check if already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// ✅ Initialize auth with AsyncStorage (for session persistence)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

// Realtime Database & Storage
const database = getDatabase(app)
const storage = getStorage(app)

export { auth, database, app, storage }
