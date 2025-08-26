import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export default function App() {
  const [paciente, setPaciente] = useState("");
  const [motivo, setMotivo] = useState("");
  const [hora, setHora] = useState("");
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerCitas = async () => {
    setCargando(true);
    const q = query(collection(db, "citas"), orderBy("hora", "asc"));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setCitas(data);
    setCargando(false);
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  const registrarCita = async (e) => {
    e.preventDefault();
    if (!paciente.trim() || !motivo.trim() || !hora.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    await addDoc(collection(db, "citas"), {
      paciente: paciente.trim(),
      motivo: motivo.trim(),
      hora, 
      creadaEn: new Date().toISOString(),
    });
    setPaciente("");
    setMotivo("");
    setHora("");
    await obtenerCitas();
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 10 }}>🩺 Formulario de Citas Médicas</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Registra paciente, motivo y hora. Al guardar se envía a Firebase (POST) y se listan (GET).
      </p>

      <form
        onSubmit={registrarCita}
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Motivo de la cita"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Registrar Cita
        </button>
      </form>

      <h2 style={{ marginBottom: 8 }}>📋 Citas Registradas</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas aún.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div><strong>Paciente:</strong> {cita.paciente}</div>
              <div><strong>Motivo:</strong> {cita.motivo}</div>
              <div><strong>Hora:</strong> {cita.hora}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
