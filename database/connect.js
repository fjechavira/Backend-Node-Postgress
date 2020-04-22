// Requirements
const { Pool } = require('pg');
const Config = require('../config/config');

// Inicializacion de la instancia
const pool = new Pool({
  user: Config.user_main,
  host: Config.host_main,
  database: Config.database_main,
  password: Config.password_main,
  port: Config.port_main
});

// Exporto la variable con los parametros de conexion para uso de la misma
module.exports = pool;