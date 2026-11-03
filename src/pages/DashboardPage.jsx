function DashboardPage({ usuario, onLogout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Bienvenido, {usuario.nombre}</h2>
      <p>Rol: <strong>{usuario.rol}</strong></p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  )
}

export default DashboardPage