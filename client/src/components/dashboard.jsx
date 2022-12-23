import React, { useState, useEffect } from 'react';
import BookSumary from './bookSumary.jsx';
import '../css/dashboard.css';

export default function Dashboard(props) {
    const [ books, setBooks ] = useState([{}]);
    
    useEffect(() => {
	const fetchData = async () => {
	    const data = await fetch('/api/books/getAllBooksSumary');
	    const json = await data.json();
	    setBooks(Array.from(json.books));
	}
	
	fetchData().catch((err) => {
	    console.error('ERROR in fetching data: ', err.message);
	});
	console.log(books);

    }, []);

    return (
	<>
	    <div className="dashboard">
		{
		    books.map((element) => {
			return (
			    <div key={element.id}>
	     			<BookSumary book={element}/>
	     		    </div>
	     		);
	     	    })
		}
	    </div>
	</>
    );
}
