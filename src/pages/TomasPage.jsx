import { useState, useEffect } from "react";
import { listarTomas, cambiarEstadoToma } from "../services/api";

export default function TomasPage({ usuario }) {
  const [tomas, setTomas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerTomas = async () => {
    try {
      // LLAMA A TU API PASANDO EL ID DEL USUARIO LOGUEADO
      const datos = await listarTomas(usuario.id);
      setTomas(datos);
    } catch {
      setError("No se pudieron cargar tus alarmas médicas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerTomas();
  }, []);

  // Función para cambiar el estado de la toma a "Tomada"
  const handleMarcarTomada = async (toma_id) => {
    try {
      await cambiarEstadoToma(toma_id, "Tomada");

      await obtenerTomas();

      alert("¡Medicamento marcado como tomado!");
    } catch {
      alert("No se pudo actualizar el estado de la toma.");
    }
  };

  // Controles de estado de la pantalla antes del return
  if (cargando) {
    return <p>Cargando tus alarmas médicas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Mis Tomas y Alarmas</h1>
      <h2>Hola, {usuario?.nombre}</h2>
      <p>Aquí tienes el control de tu medicación diaria:</p>

      <hr />

      <h3>Listado de Alertas</h3>
      {tomas.length === 0 ? (
        <p>No tienes tomas programadas o pendientes.</p>
      ) : (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: 0,
          }}
        >
          {tomas.map((toma) => (
            <li
              key={toma.id}
              style={{
                listStyle: "none",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: toma.estado === "Tomada" ? "#e2f0d9" : "#fff",
              }}
            >
              <div>
                <strong>Tratamiento ID:</strong> {toma.tratamiento_id} <br />
                <strong>Programada para:</strong> {toma.fecha_hora_programada} <br />
                <strong>Estado actual:</strong> <span>{toma.estado}</span>
              </div>

              {/* Si la toma está pendiente, mostramos el botón para tomarla */}
              {toma.estado === "pendiente" && (
                <button
                  onClick={() => handleMarcarTomada(toma.id)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Marcar como Tomada
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
