// Requirements
var express = require('express');
var bcrypt = require('bcrypt');
const pool = require('../database/connect');
var Usuario = require('../models/usuario');

// Inicializacion e Instancias
var app = express();

// Funcion para crear un nuevo Usuario
app.post('/', (req, res, next) => {
    
    // Obtengo los valores de la peticion recibida
    var body = req.body;

    // Realizo la instancia al Modelo del Usuario.
    var usuario = new Usuario();

    // Asigno los valores a mi usuario
    usuario.IdUsuario = body.usuario;
    usuario.Correo = body.correo;
    usuario.Password = bcrypt.hashSync(body.password, 10),
    usuario.Estatus = false;
    usuario.Imagen = null;
    usuario.Telefono = body.telefono;
    usuario.Telefono2 = null; 

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
        var query = 'INSERT INTO "Usuario"("IdUsuario", "Correo", "Password", "Estatus", "Imagen", "Telefono", "Telefono2") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        var values = [usuario.IdUsuario, usuario.Correo, usuario.Password, usuario.Estatus, usuario.Imagen, usuario.Telefono, usuario.Telefono2];
        
        // Realizo la ejecucion del Query
        client.query(query, values, (err, result) => {
            // Si en la ejecucion de Query ocurrio un error lo muestro
            if (err) {
                return res.status(500).json({
                    exitoso: false,
                    mensaje: 'Error al dar el alta de la data en la Base de Datos',
                    error: err.stack
                });
            } 
            
            // El Alta del usuario fue exitosa muestro los datos guardados al usuario
            // Ofusco la contraseña del usuario para no mostrar en los resultados a entregar
            result.rows[0]['Password'] = ':)'

            // Envio la informacion Obtenida y el Token generado
            res.status(200).json({
                exitoso: true,
                mensaje: 'Usuario ingresado Correctamente en la Base de Datos',
                info: result.rows[0]
            });
        });
    });
});

module.exports = app