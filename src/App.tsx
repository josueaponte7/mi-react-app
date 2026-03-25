import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

function App() {
  const [texto, setTexto] = useState("");
  const [mensajes, setMensajes] = useState<any[]>([]);

  // 🔥 Escuchar datos en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "mensajes"),
      orderBy("fecha", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos: any[] = [];
      snapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() });
      });
      setMensajes(datos);
    });

    return () => unsubscribe();
  }, []);

  // 💾 Guardar datos
  const guardar = async () => {
    if (!texto) return;

    await addDoc(collection(db, "mensajes"), {
      texto,
      fecha: new Date()
    });

    setTexto("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React + Firebase 🚀</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo..."
      />

      <button onClick={guardar}>Guardar</button>

      {/* 🔥 LISTA DE DATOS */}
      <ul>
        {mensajes.map((m) => (
          <li key={m.id}>{m.texto}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;