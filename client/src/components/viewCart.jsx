import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header.jsx';
import InCartBooks from './inCartBooks.jsx';

let UserContext = createContext();
export default function ViewCart(props) {
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
	const loggedInUser = localStorage.getItem('user');
	if (loggedInUser) {
	    let currentUser = JSON.parse(loggedInUser);
	    setUser(currentUser);
	} else {
	    navigate('/signin');
	}
    }, []);

    return (
	<>
	    <Header/>
	    <div className="list-container content">
		<UserContext.Provider value={user}>
		    <InCartBooks user={user}/>
		</UserContext.Provider>
	    </div>
	</>
    )
}

export { UserContext };
