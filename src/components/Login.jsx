import { useState } from "react";
import { login } from "../services/api";
import Register from "./Register";
import { Link } from "react-router-dom";

function Login({onLogin}){
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena]= useState('')
    const [mensaje, setMensaje]=useState('')
    const [cargando, setCargando]=useState(false)

    const handleSubmit =async (e) =>{
        e.preventDefault()
        setMensaje('')
        setCargando(true)

        try{
            const data= await login(correo,contrasena)
            
            const usuarioData = {
            id: data.id,
            nombre: data.nombre,
            rol: data.rol,
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('usuario', JSON.stringify(usuarioData))

            // Avisar a App
            onLogin(usuarioData)
            }catch(error){
                setMensaje(error.message ||'Error al iniciar sesión')
            }finally{
                setCargando(false)
            }
    }
    return(
        <div>
            <h2>iniciar sesion</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>correo</label>
                    <input 
                    type="email"
                    value={correo}
                    onChange={(e)=>setCorreo(e.target.value)}
                    placeholder="correo@gmail.com"    
                    />
                </div>

                <div>
                    <label>contraseña</label>
                    <input
                    type="password"
                    value={contrasena}
                    onChange={(e)=>setContrasena(e.target.value)}
                    placeholder="ingresa tu contraseña"
                    />
                </div>

                <button type="submit" disabled={cargando}>{cargando ? 'Entrando...' : 'Entrar'}</button>
  
            </form>
            {mensaje && <p>{mensaje}</p> }
            <div>
                <p>aun no tienes una cuenta registrada?</p>
                <Link to="/register">registrate aqui </Link>
            </div>
        </div>
    )
}
export default Login