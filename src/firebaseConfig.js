// Importar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase (la que copiaste del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBZLdX_shQS3Qkok0Yq4cfHbR3EL7i4_vY",
  authDomain: "citas-medicas-35fb4.firebaseapp.com",
  projectId: "citas-medicas-35fb4",
  storageBucket: "citas-medicas-35fb4.appspot.com",
  messagingSenderId: "506578036822",
  appId: "1:506578036822:web:4de20128d7b8c0388373f7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportarlo
export const db = getFirestore(app);
