import React, { Component } from 'react';
import '../css/header.css';

class Header extends Component {
    render() {
	return (
	    <div>
		<div className="header bg-info">
		    <a href="/" className="btn btn-warning rounded">
			<div className="logo-containter">
			    <img src="/reading.png" alt="logo" height="54px"/>
			    <div className="logo-title">
				<p>Hitsuji's</p>
				<p>bookstore</p>
			    </div>
			</div>
		    </a>
		    <a href="/book/add"><div className="add-btn btn btn-primary">Add</div></a>
		</div>
	    </div>
	);
    }
}

export default Header;
