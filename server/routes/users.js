const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const router	= express.Router();

router.post('/signin', (req, res) => {
    const user = req.body;

    mysql.query(`SELECT * FROM Users WHERE username = ? AND password = ?`, [ user.username, user.password ] , (error, rows, fields) => {
	if (error) throw error;
	if (rows.length > 0) {
	    console.log(rows[0]);
	    res.status(200).send({ 
		message: "Success",
		user: {
		    id: rows[0].id,
		    lastname: rows[0].lastname,
		    firstname: rows[0].firstname,
		    username: rows[0].username,
		    role: rows[0].role
		}
	    });
	} else {
	    res.status(500).send({ message: "Username or password was incorrect!" });
	}
    });
});

router.post('/signup', (req, res) => {
    const user = req.body;
    mysql.query(`SELECT * FROM Users WHERE username = ?`, [ user.username ] , (error, rows, fields) => {
	if (error) throw error;
	if (rows.length == 0) {
	    let params = Object.values(user);
	    mysql.query(`INSERT INTO Users(username, password, email, firstname, lastname, role) VALUES (?, ?, ?, ? , ?, ?);`, params , (err, rows, fields) => {
		if (err) throw err;
		console.log("1 record inserted");
		res.status(200).send({ message: "Success" });
	    });
	} else {
	    res.status(500).send({ message: "This username was taken!" });
	}
    })
})

module.exports = router;
