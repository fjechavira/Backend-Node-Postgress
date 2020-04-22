// Requires
var express = require('express');
var bodyParser = require('body-parser');


// Inicializacion Variables
var app = express();

// Body Parser application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importacion de las Rutas
var articuloRoutes = require('./routes/articulo');
var licenceRoutes = require('./routes/licence');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');

// Rutas
app.use('/articulo', articuloRoutes);
app.use('/licencia', licenceRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m',' Online');
});
