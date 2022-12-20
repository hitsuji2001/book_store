import React, { Component } from 'react';
import BookSumary from './bookSumary.jsx';
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    books: [],
	}
    }

    componentDidMount() {
	fetch('/api/books/getAllBooksSumary')
	    .then((res) => res.json())
	    .then((data) => this.setState({ books: data.books }))
	    .catch((err) => {
		console.error('ERROR in fetching data: ', err.message);
	    });
    }

    render() {
	return (
	    <div className="dashboard">
	     	{
		    this.state.books.map((element) => {
			return (
			    <div key={element.id}>
	     			<BookSumary book={element}/>
	     		    </div>
	     		);
	     	    })
	     	}
	    </div>
	);
    }
}

export default Dashboard;
