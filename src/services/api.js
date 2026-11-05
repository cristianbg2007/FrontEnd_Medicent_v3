const API_URL = 'http://localhost:5000'

export async function apiFetch(endpoint, options= {}){
    const token = localStorage.getItem('token')

    const config= {
       headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
    ...options,
    }


    if (options.body && typeof options.body ==='object'){
        config.body = JSON.stringify(options.body)
    }

    const respuesta = await fetch(`${API_URL}${endpoint}`, config)
    const data = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(data.error || 'Error en la petición')
    }
    return data
}


//llamamos al apifetch y el backend nos regresa lo que responda
export async function login(correo, contrasena) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: { correo, contrasena },
  })
}

//llamamos al apifetch y el backend nos regresa lo que responda
export async function registro(nombre, correo, contrasena, rol) {
  return apiFetch('/api/auth/registro', {
    method: 'POST',
    body: { nombre, correo, contrasena, rol },
  })
}