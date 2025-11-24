import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCpTALtccrz0lqoyFXUId3Q81lQ4KwhL2w",
  authDomain: "flextimeapp-5f07a.firebaseapp.com",
  projectId: "flextimeapp-5f07a",
  storageBucket: "flextimeapp-5f07a.firebasestorage.app",
  messagingSenderId: "984082237590",
  appId: "1:984082237590:web:401e70f5e98604b2f1dab7"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

