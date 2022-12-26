import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSumary from './bookSumary.jsx';
import Header from './header.jsx';
import '../css/dashboard.css';

let UserContext = createContext();
function Dashboard(props) {
    const [ books, setBooks ] = useState([{}]);
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    const loggedInUser = localStorage.getItem('user');

    useEffect(() => {
	const fetchData = async () => {
	    const data = await fetch('/api/books/getAllBooksSumary');
	    const json = await data.json();
	    setBooks(Array.from(json.books));
	}

	if (loggedInUser) {
	    setUser(JSON.parse(loggedInUser));
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
	    <div className="dashboard">
		{
		    books.map((element) => {
			return (
			    <div key={element.id}>
				<UserContext.Provider value={user}>
	     			    <BookSumary book={element} user={user}/>
				</UserContext.Provider>
	     		    </div>
	     		);
	     	    })
		}
	    </div>
	</>
    );
}

export { UserContext };
export default Dashboard;
