import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import API_URL from "../config/api"

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [cargando, setCargando] = useState(true)
    const [usuario, setUsuario] = useState(null)

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    useEffect(() => {
        const verificarSesion = async () => {
            const tokenGuardado = localStorage.getItem("token")
            
            if (!tokenGuardado) {
                setToken(null)
                setCargando(false)
                return
            }
            try {
                const respuesta = await fetch(`${API_URL}/alumnos`, 
                    {headers: {Authorization: `Bearer ${tokenGuardado}`}}
                )
            if (!respuesta.ok) {
                throw new Error("Sesión inválida")
            }
                const respuestaD = await fetch(`${API_URL}/docentes`,
                    {headers: {Authorization: `Bearer ${tokenGuardado}`}}
                )
            if (!respuestaD.ok) {
                throw new Error("Sesión inválida")
            }
                const respuestaC = await fetch(`${API_URL}/cursos`,
                    {headers: {Authorization: `Bearer ${tokenGuardado}`}}
                )
            if (!respuestaC.ok) {
                throw new Error("Sesión inválida")
            }
            setToken(tokenGuardado)
            } catch (error){
                console.error("Error al iniciar sesión", error)
                cerrarSesion()
            } finally {
                setCargando(false)
            }
        }
        verificarSesion()
    }, [])

    return (
        <AuthContext.Provider
        value={{token, setToken, cerrarSesion, cargando, usuario, setUsuario}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
