const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const router	= express.Router();

router.post('/addtocart/:userid/:bookid', (req, res) => {
    let bookid = req.params.bookid;
    let userid = req.params.userid;
    let data = req.body;
    let status = 'incart';

    mysql.query(`INSERT INTO Orders(book_id, user_id, quantity, status) VALUES (?, ?, ?, ?);`, [ bookid, userid, data.amount, status ] , (err, rows, fields) => {
	if (err) throw err;
	console.log("1 record inserted into Orders");
	mysql.query(`INSERT INTO Comments(book_id, user_id, text, rating) VALUES (?, ?, ?, ?);`, [ bookid, userid, data.comment, data.rating ] , (error, rows, fields) => {
	    if (error) throw error;
	    	console.log("1 record inserted into Comments");
	    res.status(200).send({ message: `Success add ${data.amount} book(s) into cart!` });
	});
    });
});

router.get('/getOrders/:userid', (req, res) => {
    let userid = req.params.userid;
    const query = `SELECT o.id, o.quantity, o.status, o.created_at, 
                          b.title, b.author, b.category, b.cover_image
                   FROM Orders o, Books b
                   WHERE o.book_id = b.id AND o.user_id = ?`;

    mysql.query(query, [userid], (err, rows, fields) => {
	if (err) throw err;
	res.json(rows);
    });
});

router.get('/delete/:orderid', (req, res) => {
    let id = req.params.orderid;

    mysql.query(`DELETE FROM Orders WHERE id = ${id}`, (err, res) => {
	if (err) throw err;
	console.log("1 record deleted");
    });
    res.sendStatus(200);
});

module.exports = router;
