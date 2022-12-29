import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header.jsx';
import InCartBooks from './inCartBooks.jsx';

export default function ViewUser(props) {
    const loggedInUser = localStorage.getItem('user');
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
	const fetchData = async () => {
	    let currentUser = JSON.parse(loggedInUser);
	    const data = await fetch(`http://${process.env.REACT_APP_PROXY_HOST}:${process.env.REACT_APP_PROXY_PORT}/api/users/getUser/${currentUser.id}`);
	    const json = await data.json();
	    setUser(json);
	}

	if (loggedInUser) {
	} else {
	    navigate('/signin');
	}

	fetchData().catch((err) => {
	    console.error('ERROR in fetching data: ', err.message);
	});
    }, []);

    return (
	<>
	    <Header/>
	    <div className="content">
		<div className="form-control m-2 p-3 w-75">
		    <div className="input-group-prepend d-sm-flex w-50 mb-3">
			<span className="input-group-text">Username</span>
			<div className="form-control">{user.username}</div>
		    </div>
		    <div className="input-group-prepend d-sm-flex w-50 mb-3">
			<span className="input-group-text">First Name</span>
			<div className="form-control">{user.firstname}</div>
		    </div>
		    <div className="input-group-prepend d-sm-flex w-50 mb-3">
			<span className="input-group-text">Last Name</span>
			<div className="form-control">{user.lastname}</div>
		    </div>
		    <div className="input-group-prepend d-sm-flex w-50 mb-3">
			<span className="input-group-text">Email</span>
			<div className="form-control">{user.email}</div>
		    </div>
		    <div className="input-group-prepend d-sm-flex w-50 mb-3">
			<span className="input-group-text">Created at</span>
			<div className="form-control">{new Date(user.created_at).toLocaleDateString()}</div>
		    </div>
		</div>
	    </div>
	</>
    );
}
