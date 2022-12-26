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

		<div className="hello-mess"> 
		    Hello, { (user.firstname === undefined && user.lastname === undefined) ? "Anonymous" : user.firstname + " " + user.lastname }
		</div>
		
		<div className="right-side-container">
		    {
			user.role === 'admin' ?
			    <a href="/book/add"><div className="add-btn btn btn-primary">Add</div></a>
			    : ''
		    }
		    <Dropdown size="sm" className="toggle">
			<Dropdown.Toggle >
			    <img src="../../default-avatar.png"  alt="avatar" height="24px" width="24px"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
			    {
				user.role === 'none' || (user.firstname === undefined && user.lastname === undefined) ?
				    (<>
					 <Dropdown.Item href="/signin" onClick={ handleOnClick }>Sign In</Dropdown.Item>
					 <Dropdown.Item href="/signup" onClick={ handleOnClick }>Sign Up</Dropdown.Item>
				     </>)
				    :
				    (<>
					 <Dropdown.Item href={"/user/profile/" + user.id}>Your profile</Dropdown.Item>
					 <Dropdown.Item href={'/user/' + user.id + '/viewcart'}>View cart</Dropdown.Item>
					 <Dropdown.Divider />
					 <Dropdown.Item href="/signin" onClick={ handleOnClick }>Logout</Dropdown.Item>
				     </>)

			    }
			</Dropdown.Menu>
		    </Dropdown>
		</div>

	    </div>
	</div>
    );
}
