import { useState, useEffect } from "react";
import { crearTratamiento,listarMedicamentos } from "../services/api";

export default function TratamientosPage(){

    const [medicamentos, setMedicamentos]=useState([])
    const [cargando,setCargando]=useState(true)
    const [error, setError]=useState("")

    const [pacienteId, setPacienteId] = useState(1); // Lo dejamos fijo en 1 por ahora para pruebas
    const [medicamentoId, setMedicamentoId] = useState("");
    const [dosis, setDosis] = useState("");
    const [frecuenciaHoras, setFrecuenciaHoras] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [horaInicial, setHoraInicial] = useState("");

       useEffect(() => {
        const cargarCatalogo = async () => {
            try {
                const datos = await listarMedicamentos();
                setMedicamentos(datos);
                
                //Si hay medicamentos en la base de datos, 
                // dejamos seleccionado el primero por defecto en el formulario
                if (datos.length > 0) {
                    setMedicamentoId(datos[0].id);
                }
            } catch {
                setError("No se pudo cargar el catálogo de medicamentos.");
            } finally {
                setCargando(false);
            }
        };

        cargarCatalogo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Detiene la recarga de página
        try {
            await crearTratamiento(
                pacienteId,
                medicamentoId,
                dosis,
                frecuenciaHoras,
                fechaInicio,
                fechaFin,
                horaInicial
            );

            //Lmpiamos los campos después de guardar con éxito
            setDosis("");
            setFrecuenciaHoras("");
            setFechaInicio("");
            setFechaFin("");
            setHoraInicial("");

            alert("¡Tratamiento registrado con éxito!");
        } catch {
            alert("Hubo un error al registrar el tratamiento.");
        }
    };

    // 1. Controles de pantalla arriba del return principal
    if (cargando) {
        return <p>Cargando catálogo y preparando el formulario...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

return (
        <div>
            <h1>Gestionar tus Tratamientos</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                
                <div>
                    <label>Selecciona el Medicamento: </label>
                    <select 
                        value={medicamentoId} 
                        onChange={(e) => setMedicamentoId(e.target.value)}
                        required
                    >
                        {medicamentos.map((med) => (
                            <option key={med.id} value={med.id}>
                                {med.nombre} - {med.forma_farmaceutica}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo Dosis */}
                <div>
                    <label>Dosis (ej: 1 tableta, 5ml): </label>
                    <input 
                        type="text" 
                        value={dosis} 
                        onChange={(e) => setDosis(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Cada cuántas horas: </label>
                    <input 
                        type="number" 
                        value={frecuenciaHoras} 
                        onChange={(e) => setFrecuenciaHoras(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Fecha de Inicio: </label>
                    <input 
                        type="date" 
                        value={fechaInicio} 
                        onChange={(e) => setFechaInicio(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Fecha de Finalización: </label>
                    <input 
                        type="date" 
                        value={fechaFin} 
                        onChange={(e) => setFechaFin(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Hora de la primera toma: </label>
                    <input 
                        type="time" 
                        value={horaInicial} 
                        onChange={(e) => setHoraInicial(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>
                    Registrar Tratamiento
                </button>
            </form>
        </div>
    );
}