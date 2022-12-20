import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/bookSumary.css';

function BookSumary(props) {
    const navigate = useNavigate();

    async function handleOnDelete(e, id) {
	await fetch(`/api/books/delete/${id}`)
	    .then((res) => { res.json() });
    }

    function handleCoverImage(name) {
	if (name !== '' && name !== undefined) return `/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }

    return(
	<div className="card border-info">
	    <a href={"/book/view/" + props.book.id}>
		<div className="card-img">
		    <img src={ handleCoverImage(props.book.cover_image) } alt="Book's Cover"></img>
		</div>
	    </a>

	    <div className="text-holder text-muted">
		<div className="text-sumary text-capitalize">
		    <div className="title text-truncate">
			<div className="icon"><i className="fi fi-rr-book-bookmark"></i></div>
			<span>{props.book.title}</span>
		    </div>
		    <div className="author text-truncate">
			<div className="icon"><i className="fi fi-rr-book-open-reader"></i></div>
			<span>{props.book.author}</span>
		    </div>
		    <div className="category text-truncate">
			<div className="icon"><i className="fi fi-rr-resources"></i></div>
			<span>{props.book.category}</span>
		    </div>
		</div>
		<div className="btn-list">
		    <a href={"/book/view/" + props.book.id}>
			<div className="icon"><i className="btn btn-info btn-sm fi fi-rr-search-alt" data-toggle="tooltip" title="View"></i></div>
		    </a>
		    <a href={"/book/edit/" + props.book.id}>
			<div className="icon"><i className="btn btn-info btn-sm fi fi-rr-pencil-ruler" data-toggle="tooltip" title="Edit"></i></div>
		    </a>
		    <a href="/">
			<div className="icon"><i className="btn btn-info btn-sm fi fi-rr-trash" onClick={ (e) => handleOnDelete(e, props.book.id) } data-toggle="tooltip" title="Delete"></i></div>
		    </a>
		</div>
	    </div>
	</div>
    );
}

export default BookSumary;
