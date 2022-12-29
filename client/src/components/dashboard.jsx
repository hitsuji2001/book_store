import React, { useState, useEffect, createContext } from 'react';
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
	    const data = await fetch(`http://${process.env.REACT_APP_PROXY_HOST}:${process.env.REACT_APP_PROXY_PORT}/api/books/getAllBooksSumary`);
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
	    <div className="dashboard content">
		{
		    books.slice(0).reverse().map((element) => {
			return (
			    <div key={'temp-div-' + element.id}>
				<UserContext.Provider key={'usercontext-' + element.id} value={user}>
	     			    <BookSumary key={'booksumary-' + element.id} book={element} user={user}/>
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
