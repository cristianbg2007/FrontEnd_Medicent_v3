import { useState } from "react";

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
            const respuesta= await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-Type':'application/json',
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena,
                }),
            })
            const data = await respuesta.json()

            if(!respuesta.ok){
                setMensaje(data.error || 'Error al iniciar sesión')
                return
            }
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
            console.error(error)
            setMensaje('no se ha podido conectar con el servidor')
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

        </div>
    )
}
export default Login