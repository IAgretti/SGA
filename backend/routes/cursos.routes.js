const express = require("express") 
// const alumnosController = require(
const { verificarToken } = require("../middlewares/authMiddleware") // Importar el middleware de verificación de token
const { verificarRol } = require("../middlewares/rolMiddleware")

const { 
    obtenerCursos, 
    obtenerCurso, 
    crearCurso, 
    actualizarCurso, 
    eliminarCurso } = require("../controllers/cursos.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerCursos) // Ruta para obtener todos los alumnos, protegida por el middleware de verificación de token

router.get("/:id", verificarToken, obtenerCurso) 

router.post("/", verificarToken, verificarRol("admin"), crearCurso) 

router.put("/:id", verificarToken, verificarRol("admin"), actualizarCurso) 

router.delete("/:id",verificarToken, verificarRol("admin"), eliminarCurso) 

module.exports = router 