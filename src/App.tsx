import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [texto, setTexto] = useState("");

  const guardar = async () => {
    if (!texto) return;

    await addDoc(collection(db, "mensajes"), {
      texto: texto,
      fecha: new Date()
    });

    alert("Guardado en Firebase 🔥");
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

      <button onClick={guardar}>
        Guardar
      </button>
    </div>
  );
}

export default App;