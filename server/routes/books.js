const express	= require('express');
const path	= require('path');
const mysql	= require('../database/dbConnection.js');
const multer	= require('multer');
const router	= express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
	cb(null, 'cover_images/');
    },
    filename: function (req, file, cb) {
	const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

const upload = multer({ storage: storage })

function download_image(req, res) {
    let cover_image = '';
    if (!req.body.file || Object.keys(req.body.file).length === 0) {
	console.log('No images were uploaded');
    } else {
	console.log(req.body.file);
    }
    return cover_image;
}

router.get('/getAllBooksSumary', (req, res) => {
    mysql.query('SELECT id, title, author, category, cover_image FROM Books', (error, rows, fields) => {
	if (error) throw error;
	let data = { 'books': rows };
	res.json(data);
    });
});

router.get('/getAllBooks', (req, res) => {
    mysql.query('SELECT * FROM Books', (error, rows, fields) => {
	if (error) throw error;
	let data = { 'books': rows };
	res.json(data);
    });
});

router.get('/getBook/:bookID', (req, res) => {
    let id = req.params.bookID;
    mysql.query(`SELECT * FROM Books WHERE id=${id}`, (error, rows, fields) => {
	if (error) throw error;
	res.json(rows[0]);
    });
});

router.get('/getImage/:name', (req, res, next) => {
    let options = {
	root: path.join(__dirname, '../cover_images'),
	dotfiles: 'deny',
	headers: {
	    'x-timestamp': Date.now(),
	    'x-sent': true
	}
    }

    const fileName = req.params.name;
    res.sendFile(fileName, options, (err) => {
	if (err) {
	    res.status(500).json({
		error: 'File not found'
	    });
	}
	else console.log('Sent:', fileName);
    });
});

router.get('/getBookSumary/:bookID', (req, res) => {
    let id = req.params.bookID;
    mysql.query(`SELECT title, author, category, cover_image FROM Books WHERE id=${id}`, (error, rows, fields) => {
	if (error) throw error;
	res.json(rows[0]);
    });
});

router.get('/delete/:bookID', (req, res) => {
    let id = req.params.bookID;
    mysql.query(`DELETE FROM Books WHERE id = ${id}`, (err, res) => {
	if (err) throw err;
	console.log("1 record deleted");	
    });
    res.sendStatus(200);
});

router.post('/addBook', upload.single('image'), (req, res) => {
    let book = JSON.parse(req.body.book);
    let params = Object.values(book);
    let filename = '';

    if (req.file !== undefined) filename = req.file.filename;
    params.push(filename);

    mysql.query("INSERT INTO Books(title, author, description, release_date, pages, category, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?);", params, (err, res) => {
	if (err) throw err;
	console.log("1 record inserted");
    });

    res.sendStatus(200);
});

router.post('/editBook/:bookid', upload.single('image'), (req, res) => {
    let book = JSON.parse(req.body.book);
    let filename = '';
    let index = req.params.bookid;

    if (req.file !== undefined) filename = req.file.filename;
    book = {...book, cover_image: filename}

    let params = Object.values(book);

    mysql.query(`UPDATE Books
                 SET
                    title = ?,
                    author = ?,
                    description = ?,
                    release_date = ?,
                    pages = ?,
                    category = ?,
                    cover_image = ?
                 WHERE
                     id = ${index}`
		, params, (err, res) => {
		    if (err) throw err;
		    console.log(res.affectedRows + " record(s) updated");
		});
    
    res.sendStatus(200);
});

module.exports = router;
