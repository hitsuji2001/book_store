const mysql = require('mysql2');

const connection = mysql.createConnection({
    connectionLimit	: 10,
    host		: process.env.DB_HOST,
    user		: process.env.DB_USER,
    password		: process.env.DB_PASS,
    database		: process.env.DB_SCHEMA
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to database');
});

module.exports = connection;
