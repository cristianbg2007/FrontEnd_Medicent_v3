import { useState } from 'react'
import { registro } from '../services/api'
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [rol, setRol] = useState('paciente')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setCargando(true)

    try {
      const data = await registro(nombre, correo, contrasena, rol)

      setMensaje('Usuario registrado exitosamente. Ahora puedes iniciar sesión.')
      setNombre('')
      setCorreo('')
      setContrasena('')
      setRol('paciente')

      // Opcional: avisar al padre
      if (onRegister) {
        onRegister()
      }

      } catch (error) {
        setMensaje(error.message||'Error al intentar registrarse')
      } finally {
        setCargando(false)
      }
  }

  return (
    <div>
      <h2>Crear cuenta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@gmail.com"
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>

        <div>
          <label>Rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="paciente">Paciente</option>
            <option value="cuidador">Cuidador</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}

        <div>
          <p>ya tienes una cuenta?</p>
          <Link to="/login">Inicia sesión aqui</Link>
        </div>
    </div>
  )
}

export default Register
