const mysql = require('./dbConnection.js');

const create_table = async function() {
    let tbl_books = `CREATE TABLE Books (
        id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
        title         VARCHAR(255) NOT NULL,
        author        VARCHAR(255) NOT NULL,
        description   VARCHAR(1000),
        release_date  VARCHAR(20),
        pages         INT UNSIGNED,
        category      VARCHAR(255) NOT NULL,
        cover_image   VARCHAR(255),
        status        VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    )`;

    let tbl_users = `CREATE TABLE Users (
        id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username  VARCHAR(45)  NOT NULL,
        firstname VARCHAR(45)  NOT NULL,
        lastname  VARCHAR(45)  NOT NULL,
        password  VARCHAR(255) NOT NULL,
        email     VARCHAR(255) NOT NULL,
        role      VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    )`;

    let tbl_comments = `CREATE TABLE Comments (
        id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
        book_id    INT UNSIGNED NOT NULL,
        user_id    INT UNSIGNED NOT NULL,
        rating     INT UNSIGNED,
        text       VARCHAR(1000),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (book_id) REFERENCES Books(id),
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )`;

    let tbl_orders = `CREATE TABLE Orders (
        id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
        book_id    INT UNSIGNED NOT NULL,
        user_id    INT UNSIGNED NOT NULL,
        quantity   INT NOT NULL,
        status     VARCHAR(45) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (book_id) REFERENCES Books(id),
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )`;

    await mysql.promise().query(`DROP TABLE IF EXISTS Books, Users, Comments, Orders`);
    await mysql.promise().query(tbl_books);
    await mysql.promise().query(tbl_users);
    await mysql.promise().query(tbl_comments);
    await mysql.promise().query(tbl_orders);
}

const insert_books = async function() {
    let books = [{
	title: 'Ngh??? thu???t giao ti???p ????? th??nh c??ng',
	author: 'Leil Lowndes',
	description: 'L?? cu???n s??ch h?????ng t???i m???i ?????i t?????ng ?????c gi???, d?? l?? sinh vi??n, nh??n vi??n b??n h??ng, doanh nh??n, nh?? qu???n l??, ch??nh tr??? gia hay ng?????i n???i tr??? ho???c b???t c??? ai mu???n ki???m so??t c??c m???i quan h???, thu nh???p hay cu???c ?????i h??? theo c??ch hi???u qu??? h??n...',
	release_date: '2019-02-14',
	pages: 360,
	category: 'selfhelp',
	cover_image: 'sach-nghe-thuat-giao-tiep-de-thanh-cong-1.jpeg',
	status: 'active'
    }, {
	title: 'The Simple Path To Wealth',
	author: 'J. L. Collins',
	description: 'Collins highlights the importance of what he calls "F-you money," which he describes as enough money to be completely free of the demands of others.',
	release_date: '2017-06-24',
	pages: 212,
	category: 'finance',
	cover_image: 'image.jpeg',
	status: 'active'
    }, {
	title: 'Khi B???n ??ang M?? Th?? Ng?????i Kh??c ??ang N??? L???c',
	author: 'V?? Nh??n',
	description: 'Ng?????i ta n??i r???ng, kh??? n??ng c???a con ng?????i c?? gi???i h???n, nh??ng gi???i h???n c???a b???n ???????c ?????n ????u th?? b???n l???i kh??ng h??? bi???t. Kh??ng ??t ng?????i t???ng b??n kho??n r???ng, t???i sao ng?????i kh??c ?????t ???????c th??nh c??ng nhanh nh?? v???y m?? b???n v???n m??i v???n d???m ch??n t???i ch???. ',
	release_date: '2018-11-22',
	pages: 415,
	category: 'selfhelp',
	cover_image: 'cdeabe1e07dc2fd2a2d99c4bd558f41f.jpg',
	status: 'active'
    }, {
	title: 'Deep work',
	author: 'Cal Newport',
	description: "One of the most valuable skills in our economy is becoming increasingly rare. If you master this skill, you'll achieve extraordinary results.",
	release_date: '2016-01-05',
	pages: 304,
	category: 'selfhelp',
	cover_image: '41WSUER72L._SX333_BO1204203200_.jpg',
	status: 'active'
    }, {
	title: 'T?? Duy T???i ??u',
	author: 'Stephen R. Covey',
	description: 'N???u l??m vi???c ch??m ch??? h??n, t??i t??nh h??n v?? nhanh nh???n h??n m?? v???n kh??ng c?? k???t qu???, th?? ch??ng ta ph???i l??m c??ch n??o?',
	release_date: '2015-07-14',
	pages: 334,
	category: 'selfhelp',
	cover_image: 'BtwS0G0oN8.webp',
	status: 'active'
    }, {
	title: 'Cha gi??u cha ngh??o',
	author: 'Robert T.Kiyosaki',
	description: 'T??? nh???ng b??i h???c t?????ng ch???ng nh?? m??u thu???n c???a hai ng?????i cha m?? con ???? r??t ra ???????c nh???ng kinh nghi???m l???n lao v??? ch??? ????? ti???n b???c v?? s??? l???a ch???n c??ch s???ng trong ?????i. ',
	release_date: '2000-04-01',
	pages: 375,
	category: 'finance',
	cover_image: 'Cha-giau-cha-ngheo.jpg',
	status: 'active'
    }, {
	title: 'Ho??n Th??nh M???i Vi???c Kh??ng H??? Kh??',
	author: 'David Allen',
	description: 'Th??ng ??i???p c???a Allen r???t ng???n g???n: h??y t??? ch???c l???i b???n th??n ????? gi???i ph??ng tr?? ??c, t???p trung v??o nh???ng ??i???u th???t s??? x???ng ????ng.',
	release_date: '2016-05-01',
	pages: 395,
	category: 'selfhelp',
	cover_image: 'hoan_thanh_moi_viec_outline_5.7.2016-01.u2469.d20160831.t144732.26335.jpg',
	status: 'active'
    },{
	title: 'Temp',
	author: 'Temp',
	description: 'Temp',
	release_date: '2001-29-05',
	pages: 295,
	category: 'other',
	cover_image: '',
	status: 'active'
    }];

    for (let i = 0; i < books.length; i++) {
	await mysql.promise().
	    query(`INSERT INTO Books(title, author, description, release_date, pages, category, cover_image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(books[i]))
    }
}

const insert_users = async function() {
    let users = [{
	username: '1justiH',
	firstname: 'Minh',
	lastname: 'Nguyen',
	password: 'MTIzNDU2',
	email: 'hitsuji2001@gmail.com',
	role: 'admin',
    }, {
	username: 'admin',
	firstname: 'Admin',
	lastname: ' ',
	password: 'MTIzNDU2',
	email: 'admin@hitsuji.com',
	role: 'admin',
    },{
	username: 'user',
	firstname: 'User',
	lastname: ' ',
	password: 'MTIzNDU2',
	email: 'user@gmail.com',
	role: 'user',
    }, {
	username: 'anonymous',
	firstname: 'Anonymous',
	lastname: ' ',
	password: ' ',
	email: 'anonymous@gmail.com',
	role: 'none',
    },{
	username: 'hitsuji0501',
	firstname: 'Minh',
	lastname: 'Nguyen',
	password: 'MTIzNDU2',
	email: 'hitsuji@hitsuji.com',
	role: 'user',
    }];

    for (let i = 0; i < users.length; i++) {
	await mysql.promise()
	    .query(`INSERT INTO Users(username, firstname, lastname, password, email, role) VALUES (?, ?, ?, ?, ?, ?)`, Object.values(users[i]));
    }
}

const reset_database = async function() {
    try {
	await create_table();
	await insert_books();
	await insert_users();
    } catch (errors) {
	throw errors;
    }
}

module.exports = { create_table, reset_database }
