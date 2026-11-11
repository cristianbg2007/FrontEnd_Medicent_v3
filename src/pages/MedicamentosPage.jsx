import { useEffect, useState } from "react";
import { crearMedicamento, listarMedicamentos } from "../services/api";

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [formaFarmaceutica, setFormaFarmaceutica] = useState("");


    const obtenerDatos = async () => {
      try {
        const datos = await listarMedicamentos();
        setMedicamentos(datos);
      } catch {
        setError("hubo un error al cargar los Medicamentos.");
      } finally {
        setCargando(false);
      }
    };

    useEffect(() => {
    obtenerDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await crearMedicamento(nombre, descripcion, formaFarmaceutica);

        setNombre("")
        setDescripcion("")
        setFormaFarmaceutica("")

        await obtenerDatos()

        alert("¡Medicamento creado exitosamente!")
    }catch{
        alert("No se pudo crear el medicamento")
    }
  }
  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Catálogo de Medicamentos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>Agregar Nuevo Medicamento</h3>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción: </label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Forma Farmacéutica: </label>
          <input
            type="text"
            value={formaFarmaceutica}
            onChange={(e) => setFormaFarmaceutica(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar Medicamento</button>
      </form>

      <hr />
      <h3>Listado de Medicamentos</h3>

      {medicamentos.length === 0 ? (
        <p>No hay medicamentos</p>
      ) : (
        <ul>
          {medicamentos.map((med) => (
            <li key={med.id}>
              {med.nombre} - {med.forma_farmaceutica}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
