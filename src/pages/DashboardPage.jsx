import { Link } from "react-router-dom"
import { asignarPaciente, listarTratamientosPorPaciente} from "../services/api"
import { useState, useEffect} from "react"

function DashboardPage({ usuario, onLogout }) {

// 1. Declaramos el estado para el formulario
  const [pacienteIdForm, setPacienteIdForm] = useState("")

  const [tratamientosPaciente, setTratamientosPaciente] = useState([])
  const [pacienteAsignadoId, setPacienteAsignadoId] = useState(null)

  // 2. Función para procesar el envío de la asignación
  const handleAsignar = async (e) => {
    e.preventDefault()
    try {
      const idNumerico = Number(pacienteIdForm)
      // Pasamos el ID del cuidador logueado y el ID del paciente convertido a número
      await asignarPaciente(usuario.id, Number(pacienteIdForm))
      setPacienteAsignadoId(idNumerico) 

      alert("¡Paciente asignado con éxito!")
      setPacienteIdForm("") // Limpiamos el input
    } catch {
      alert("No se pudo asignar el paciente. Revisa el ID.")
    }
  }

   useEffect(() => {
    const cargarDatosPaciente = async () => {
      //Solo busca si el rol es cuidador Y si ya tenemos un ID de paciente seleccionado
      if (usuario.rol === 'cuidador' && pacienteAsignadoId !== null) {
        try {
          const datos = await listarTratamientosPorPaciente(pacienteAsignadoId)
          setTratamientosPaciente(datos)
        } catch {
          console.log("Aún no hay tratamientos para este paciente o no se pudieron cargar.")
          setTratamientosPaciente([]) // Dejamos la lista limpia si falla
        }
      }
    }
    cargarDatosPaciente()
  }, [pacienteAsignadoId, usuario])

  return (
     <div>
      <h1>Dashboard</h1>
      <h2>Bienvenido, {usuario.nombre}</h2>
      <p>Mi ID de Usuario: <strong>{usuario.id}</strong></p>
      <p>Rol: <strong>{usuario.rol}</strong></p>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <Link to="/medicamentos">Ir al catálogo de Medicamentos</Link>
        <Link to="/tratamientos">Gestionar tus tratamientos</Link>
        <Link to="/tomas">Ver mis Tomas y Alarmas</Link>
      </div>

      <hr />

      {/* 3. CANDADO DE ROL: El formulario SOLO se muestra si eres cuidador */}
      {usuario.rol === 'cuidador' && (
        <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #ccc', maxWidth: '300px' }}>
          <h3>Asignar un Paciente a tu Cuidado</h3>
          <form onSubmit={handleAsignar}>
            <div>
              <label>ID del Paciente: </label>
              <input 
                type="number" 
                value={pacienteIdForm} 
                onChange={(e) => setPacienteIdForm(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Vincular Paciente</button>
          </form>
        </div>
      )}
      {/*  SECCIÓN DE SUPERVISIÓN: Se muestra abajo si el cuidador ya tiene un paciente activo */}
      {usuario.rol === 'cuidador' && pacienteAsignadoId !== null && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3>Tratamientos del Paciente Supervisado (ID: {pacienteAsignadoId})</h3>
          
          {tratamientosPaciente.length === 0 ? (
            <p>Este paciente no tiene tratamientos médicos registrados actualmente.</p>
          ) : (
            <ul style={{ paddingLeft: '20px' }}>
              {tratamientosPaciente.map((trat) => (
                <li key={trat.id} style={{ marginBottom: '10px' }}>
                  <strong>Medicamento ID:</strong> {trat.medicamento_id} — 
                  <strong> Dosis:</strong> {trat.dosis} cada 
                  <strong> {trat.frecuencia_horas} horas</strong> <br />
                  <small style={{ color: '#555' }}>
                    Vigencia: Desde {trat.fecha_inicio} hasta {trat.fecha_fin}
                  </small>
                </li>
              ))}
            </ul>
          )}
          <hr />
        </div>
      )}
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  )
}

export default DashboardPage