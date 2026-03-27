import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
        collection(db, "tareas"),
        where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos: any[] = [];
      snapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() });
      });
      setTareas(datos);
    });

    return () => unsubscribe();
  }, [user]);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const guardar = async () => {
    if (!texto) return;

    await addDoc(collection(db, "tareas"), {
      texto,
      userId: user.uid
    });

    setTexto("");
  };

  if (!user) {
    return (
        <div>
          <h2>Inicio de Sesión</h2>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
          <button onClick={login}>Iniciar sesión </button>
          <button onClick={register}>Registrate</button>
        </div>
    );
  }

  return (
      <div>
        <h2>Bienvenido {user.email}</h2>

        <button onClick={logout}>
          Cerrar sesión
        </button>

        <hr />

        <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Nueva tarea"
        />

        <button onClick={guardar}>
          Guardar tarea
        </button>

        <h3>Tus tareas</h3>

        <ul>
          {tareas.map((t) => (
              <li key={t.id}>{t.texto}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;