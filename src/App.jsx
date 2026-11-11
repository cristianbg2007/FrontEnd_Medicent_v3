import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/Header"
import Login from "./components/Login" 
import DashboardPage from './pages/DashboardPage'
import Register from "./components/Register"
import MedicamentosPage from "./pages/MedicamentosPage"
import TratamientosPage from "./pages/TratamientosPage"
import TomasPage from './pages/TomasPage'


function App(){
  const [usuario,setUsuario]= useState(null)

  //para ver sialgun usuario esta guardado en el token
  useEffect(() =>{
    const usuarioGuardado = localStorage.getItem('usuario')
    if(usuarioGuardado){
      setUsuario(JSON.parse(usuarioGuardado))
    }
  },[])

  const handleLogin = (usuarioData) => {
    setUsuario(usuarioData)
  }

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }


  return(
    <BrowserRouter>
      <div>
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route
              path="/login"
              element={
                usuario ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                usuario ? (
                <Navigate to="/dashboard"/>
                ) : (
                  <Register/>
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                usuario ? (
                  <DashboardPage usuario={usuario} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/medicamentos"
              element={
                usuario ? (
                  <MedicamentosPage />
                ) : (
                  <Navigate to="/login" /> 
                )
              }
            />
            <Route
              path="tratamientos"
              element={
                usuario ? (
                  <TratamientosPage/>
                ) : (
                  <Navigate to="/login"/>
                )
              }
            />
            <Route
              path="/tomas"
              element={
                usuario ? (
                  <TomasPage usuario={usuario} /> // Pasa el usuario aquí
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                usuario ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    )
  }
export default App