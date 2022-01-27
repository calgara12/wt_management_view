const { Pool } = require('pg');

let cfg = require('./config.json');

let pool = new Pool(cfg.database);

pool.connect();
module.exports = pool;