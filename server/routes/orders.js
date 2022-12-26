const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const router	= express.Router();

router.post('/addtocart/:userid/:bookid', (req, res) => {
    let bookid = req.params.bookid;
    let userid = req.params.userid;
    let amount = req.body.amount;
    let status = 'incart';

    mysql.query(`INSERT INTO Orders(book_id, user_id, quantity, status) VALUES (?, ?, ?, ?);`, [ bookid, userid, amount, status ] , (err, rows, fields) => {
	if (err) throw err;
	console.log("1 record inserted");
	res.status(200).send({ message: `Success add ${amount} book(s) into cart!` });
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

module.exports = router;
