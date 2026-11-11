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

//funcion que pide la lista de medicamentos en el backend
export async function listarMedicamentos(){
  return apiFetch('/api/medicamentos')
}
//funcion para cre<r un medicamento
export  async function crearMedicamento(nombre, descripcion, forma_farmaceutica){
  return apiFetch('/api/medicamentos',{
    method:'POST',
    body: {nombre, descripcion, forma_farmaceutica}
  })
}

export  async function crearTratamiento(paciente_id, medicamento_id, dosis, frecuencia_horas, fecha_inicio, fecha_fin, hora_inicial){
  return apiFetch('/api/tratamientos',{
    method:'POST',
    body: {paciente_id, medicamento_id, dosis, frecuencia_horas, fecha_inicio, fecha_fin, hora_inicial}
  })
}

export async function listarTomas(paciente_id) {
  return apiFetch(`/api/tomas/paciente/${paciente_id}`)
}

export async function cambiarEstadoToma(toma_id, nuevo_estado){
  return apiFetch(`/api/tomas/${toma_id}`,{
    method:'PATCH',
    body:{nuevo_estado}
  })
}

export async function asignarPaciente(cuidador_id, paciente_id) {
  return apiFetch('/api/auth/asignar-paciente', {
    method: 'POST',
    body: { 
      cuidador_id, // Python lee data.get("cuidador_id")
      paciente_id  // Python lee data.get("paciente_id")
    }
  })
}

export async function listarTratamientosPorPaciente(paciente_id) {
  return apiFetch(`/api/tratamientos/paciente/${paciente_id}`
  )
}