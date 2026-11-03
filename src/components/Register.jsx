import { useState } from 'react'

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
      const respuesta = await fetch('http://localhost:5000/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          correo,
          contrasena,
          rol,
        }),
      })

      const data = await respuesta.json()

      if (!respuesta.ok) {
        setMensaje(data.error || 'Error al registrarse')
        return
      }

      setMensaje('Usuario registrado exitosamente. Ahora puedes iniciar sesión.')
      
      // Limpiar formulario
      setNombre('')
      setCorreo('')
      setContrasena('')
      setRol('paciente')

      // Opcional: avisar al padre
      if (onRegister) {
        onRegister()
      }

    } catch (error) {
      console.error(error)
      setMensaje('No se pudo conectar con el servidor')
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
    </div>
  )
}

export default Register
