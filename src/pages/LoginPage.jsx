import Login from '../components/Login'

function LoginPage({ onLogin }) {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <Login onLogin={onLogin} />
    </div>
  )
}

export default LoginPage