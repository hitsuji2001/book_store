const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const multer	= require('multer');
const router	= express.Router();
const {create_table, reset_database} = require('../database/createTables.js');

router.get('/create_table', (req, res) => {
    create_table();
    res.status(200).send({message: 'Success'});
});

router.get('/reset_database', (req, res) => {
    reset_database();
    res.status(200).send({message: 'Success'});
});

module.exports = router;
