const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const router	= express.Router();

router.post('/commentOn/:bookid/:userid', (req, res) => {
    let bookid = req.params.bookid;
    let userid = req.params.userid;

    let data = req.body;
    if (bookid === undefined || bookid === 'undefined' || userid === undefined || userid === 'undefined') {
	res.sendStatus(404);
    } else {
	mysql.query(`INSERT INTO Comments(book_id, user_id, text) VALUES (?, ?, ?);`, [ data.bookid, data.userid, data.comment ] , (error, rows, fields) => {
	    if (error) throw error;
	    console.log("1 record inserted into Comments");
	    res.status(200).send({message: 'Success'});
	});
    }
});

module.exports = router;
