const sql = require('mssql');
const config = {
    user: 'Universal',
    password: 'L1br@ryFun',
    server: 'librarydatabase1.database.windows.net',
    database: 'libray',
    port: 1433,
    options: {
        encrypt: true
    }
};

var conn = new sql.ConnectionPool(config);

sql.connect(config)
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Failed to connect to database', err));

//exports.conn = conn;
exports.config = config;