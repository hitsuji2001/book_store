const createError	= require('http-errors');
const express		= require('express');
const cors		= require('cors');
const path		= require('path');
const cookieParser	= require('cookie-parser');
const logger		= require('morgan');

const resetDatabase	= require('./database/createTables.js');

const booksRouter		= require('./routes/books.js');
const usersRouter		= require('./routes/users.js');
const ordersRouter		= require('./routes/orders.js');
const commentsRouter		= require('./routes/comments.js');
const createConnectionRouter	= require('./routes/create-connection.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/connection', createConnectionRouter);

// resetDatabase.reset_database();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
