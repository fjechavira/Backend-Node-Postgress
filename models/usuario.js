// Requires
var SchemaObject = require('node-schema-object');

// Creo el Schema o Datos de la tabla de Usuario
var Usuario = new SchemaObject({
    IdUsuario: String,
    Correo: String,
    Password: String,
    FechaCreacion: Date,
    FechaModificacion: Date,
    Estatus: Boolean,
    Imagen: String,
    Telefono: String,
    Telefono2: String
});
 

module.exports = Usuario;