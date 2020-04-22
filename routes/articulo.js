// Requires
var express = require('express');
var cnxn = require('../database/connect');

// Inicializacion de Variables
var app = express();


// Rutas
app.get('/', (req, res) => {

    // Realizando la conexion a la base de datos mediante callback
    cnxn.connect(err => {
        if (err) {
            // console.error('connection error', err.stack);
            res.status(500).json({
                ok: false,
                mensaje: 'Connection Error' + err.stack,
                errors: err.stack
            });
        } else {
            // console.log('connected');
            cnxn.query('select * from iv00101', (err, data) => {
                if (err) {
                    // console.log('Ocurrio error al realizar la consulta ',err);
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error al realizar la consulta' + err,
                        errors: err
                    });
                    cnxn.end();
                } else {
                    // console.log(res);
                    res.status(200).json({
                        ok: true,
                        data: data
                    });
                    cnxn.end();
                }                
            });
            
        }
    });

    

});

module.exports = app