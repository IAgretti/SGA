const Curso = require("../models/Curso") 

async function obtenerCursos(req, res) { 
    const cursos = await Curso.find()
    res.json(cursos) 
}

async function obtenerCurso(req, res) {
    const curso = await Curso.findOne({ 
        codigo: req.params.id
    }) 
    if (!curso) { 
        return res.status(404).json({
            mensaje: "Curso no encontrado"
        })
    }
    res.json(curso) 
}

async function crearCurso(req, res) {
    const { codigo, nombre, descripcion, duracion } = req.body 
    const codigoNorm = typeof codigo === "string" ? codigo.trim().toUpperCase() : ""
    if (!codigoNorm || !nombre || !descripcion || !duracion) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }
    
    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto"
        })
    }
    if (typeof duracion !== "number" || duracion <= 0) {
        return res.status(400).json({
            mensaje: "La duración debe ser un número mayor a 0"
        })
    }

        const existe = await Curso.findOne({ 
        codigo
    })
    if (existe) { 
        return res.status(400).json({
            mensaje: "El código ya existe"
        })
    }
    const nuevoCurso = await Curso.create({ 
        codigo: codigoNorm,
        nombre,
        descripcion,
        duracion
    })
    res.status(201).json(nuevoCurso) 
}

async function actualizarCurso(req, res) {
    const { nombre, descripcion, duracion } = req.body
    const curso = await Curso.findOneAndUpdate( 
        { codigo: req.params.id }, 
        { nombre, descripcion, duracion }, 
        { returnDocument: "after" } 
    )
    if (!curso) {
        return res.status(404).json({
            mensaje: "Curso no econtrado"
        })
    }

    res.json(curso)
}

async function eliminarCurso(req, res) {
    const curso = await Curso.findOneAndDelete( 
        { codigo: req.params.id} 
    )
    if (!curso) {
        return res.status(404).json({
            mensaje: "Curso no econtrado"
        })
    }

    res.json({ mensaje: "Curso eliminado correctamente" })
}

module.exports = {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} 