// Requires
var express = require('express');

// Inicializacion
var app = express();

// Rutas Cascaron
app.get('/', (req, res, next) => {
    
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

});

module.exports = app