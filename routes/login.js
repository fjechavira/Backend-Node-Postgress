// Requirements
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const pool = require('../database/connect');

// Inicializacion e Instancias
var app = express();
var SEED = require('../config/config').SEED;

// Funcion para la Autenticacion del Usuario
app.post('/', (req, res, next) => {
    
    // Obtengo los valores de la peticion recibida
    var body = req.body;
    
    // Realizo la conexion a la BD
    pool.connect((err, client) => {
        
        // Valido si la conexion fue correcta de lo contrario notifico del error
        if (err) {
            return res.status(500).json({
                exitoso: false,
                mensaje: 'Error al establecer la Conexion con la Base de Datos',
                error: err.stack
            });
        }
        
        // Si la conexion fue correcta realizo el a ejecutar
        var query = 'SELECT * FROM "Usuario" WHERE "IdUsuario" = $1 OR "Correo" = $2';
        var values = [body.usuario, body.correo];
        
        // Realizo la ejecucion del Query
        client.query(query, values, (err, result) => {
            // Si en la ejecucion de Query ocurrio un error lo muestro
            if (err) {
                return res.status(500).json({
                    exitoso: false,
                    mensaje: 'Error al realizar la busqueda en la Base de Datos',
                    error: err.stack
                });
            } 
            
            // Si no se encontraron resultados de le ejecucion del query
            if (!result.rows[0]) {
                return res.status(400).json({
                    exitoso: false,
                    mensaje: 'Credenciales Invalidas',
                    error: 'El Usuario o el Correo son Incorrectos'
                });
            }

            // Valido que el Password que ingreso el usuario y el obtenido de la bd sean iguales
            if (!bcrypt.compareSync(body.password, result.rows[0]['Password'])) {
                return res.status(400).json({
                    exitoso: false,
                    mensaje: 'Credenciales Invalidas',
                    error: 'El Password es Incorrecto'
                });
            }

            // Si llego a este punto los datos de sesion Fueron correctos 
            // Ofusco la contraseña del usuario para no mostrar en los resultados a entregar
            result.rows[0]['Password'] = ':)'
            // Genero el Token de la sesion
            var token = jwt.sign({ usuario: result.rows[0] }, SEED, { expiresIn: 14400 }); //el token expira en 4 horas

            // Envio la informacion Obtenida y el Token generado
            res.status(200).json({
                exitoso: true,
                mensaje: 'Los Datos de acceso son Correctos',
                info: result.rows[0],
                token: token
            });
        });
    });
});

module.exports = app