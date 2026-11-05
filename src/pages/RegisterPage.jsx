import Register from "../components/Register";

function RegisterPage({onRegister}){
    return(
    <div>
      <h1>Registrate</h1>
      <Register onRegister={onRegister} />
    </div>
  )
}

export default RegisterPage