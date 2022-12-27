import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import '../css/header.css';

export default function Header(props) {
    const [ user, setUser ] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
	const loggedInUser = localStorage.getItem('user');
	if (loggedInUser) {
	    let currentUser = JSON.parse(loggedInUser);
	    setUser(currentUser);
	} else {
	    if (location.pathname === '/signup') navigate('/signup');
	    else navigate('/signin');
	}
    }, []);

    const handleOnClick = () => {
	setUser({});
	localStorage.clear();
	navigate('/signin');
    }

    let dropDownItems;
    if (user.role === 'none') {
	dropDownItems = (
	    <>
		<Dropdown.Item href="/signin" onClick={ handleOnClick }>Sign In</Dropdown.Item>
		<Dropdown.Item href="/signup" onClick={ handleOnClick }>Sign Up</Dropdown.Item>
	    </>	    
	);
    } else if (user.role === 'admin') {
	dropDownItems = (
	    <>
		<Dropdown.Item href={"/user/profile/" + user.id}>Your profile</Dropdown.Item>
		<Dropdown.Item href={'/user/' + user.id + '/viewcart'}>View cart</Dropdown.Item>
		<Dropdown.Divider />
		<Dropdown.Item href="/book/add">Add book</Dropdown.Item>
		<Dropdown.Divider />
		<Dropdown.Item href="/signin" onClick={ handleOnClick }>Logout</Dropdown.Item>
	    </>
	);
    } else {
	dropDownItems = (
	    <>
		<Dropdown.Item href={"/user/profile/" + user.id}>Your profile</Dropdown.Item>
		<Dropdown.Item href={'/user/' + user.id + '/viewcart'}>View cart</Dropdown.Item>
		<Dropdown.Divider />
		<Dropdown.Item href="/signin" onClick={ handleOnClick }>Logout</Dropdown.Item>
	    </>
	);
    }

    return (
	<div>
	    <div className="header">
		<a href="/" className="logo-containter-container rounded">
		    <div className="logo-containter">
			<img src="/reading.png" alt="logo" height="54px"/>
			<div className="logo-title">
			    <p>Hitsuji's</p>
			    <p>bookstore</p>
			</div>
		    </div>
		</a>

		<div className="hello-mess"> 
		    Hello, { (user.firstname === undefined && user.lastname === undefined) ? "Anonymous" : user.firstname + " " + user.lastname }
		</div>
		
		<div className="right-side-container">
		    <Dropdown size="sm">
			<Dropdown.Toggle>
			    <img src="../../default-avatar.png"  alt="avatar" height="24px" width="24px"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
			    {dropDownItems}
			</Dropdown.Menu>
		    </Dropdown>
		</div>

	    </div>
	</div>
    );
}
