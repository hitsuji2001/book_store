import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from './dashboard.jsx';
import AddToCart from './addToCart.jsx';
import '../css/bookSumary.css';

export default function BookSumary(props) {
    const [ modalShow, setModalShow ] = React.useState(false);
    const user = useContext(UserContext);

    function handleCoverImage(name) {
	if (name !== '' && name !== undefined) return `${process.env.REACT_APP_PROXY_SERVER}/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }

    let functionalButtons = null;
    if (user.role === 'admin') {
	functionalButtons = (
	    <>
		<a href={"/book/view/" + props.book.id}>
		    <div className="icon"><i className="btn btn-info btn-sm fi fi-rr-search-alt" data-toggle="tooltip" title="View"></i></div>
		</a>

		<a href={"/book/edit/" + props.book.id}>
		    <div className="icon"><i className="btn btn-info btn-sm fi fi-rr-pencil-ruler" data-toggle="tooltip" title="Edit"></i></div>
		</a>
		<div className="icon" onClick={() => setModalShow(true)}>
		    <i className="btn btn-info btn-sm fi fi-rr-trash" data-toggle="tooltip" title="Delete"></i>
		</div>
		<CenteredModal
		    onHide={() =>{setModalShow(false)}}  
		    book={props.book}
		    show={modalShow}
		/>
	    </>
	);
    } else if (user.role === 'user') {
	functionalButtons = (
	    <>
		<a href={"/book/view/" + props.book.id}>
		    <div className="icon"><i className="btn btn-info btn-sm fi fi-rr-search-alt" data-toggle="tooltip" title="View"></i></div>
		</a>

		<div onClick={() => setModalShow(true)}>
		    <div className="icon"><i className="btn btn-info btn-sm fi fi-rr-shopping-cart-add" data-toggle="tooltip" title="Add to Cart"></i></div>
		</div>
		<AddToCart
		    show={modalShow}
		    book={props.book}
		    user={user}
		    onHide={() => setModalShow(false)}
		/>
	    </>
	);
    } else if (user.role === 'none') {
	functionalButtons = (
	    <>
		<a href={"/book/view/" + props.book.id}>
		    <div className="icon"><i className="btn btn-info btn-sm fi fi-rr-search-alt" data-toggle="tooltip" title="View"></i></div>
		</a>
	    </>
	);
    }

    return(
	<div className="card">
	    <a href={"/book/view/" + props.book.id}>
		<div className="card-img">
		    <img src={ handleCoverImage(props.book.cover_image) } alt="Book's Cover"></img>
		</div>
	    </a>

	    <div className="text-holder">
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
		    { functionalButtons }
		</div>
	    </div>
	</div>
    );
}

async function handleOnDelete(e, id) {
    await fetch(`${process.env.REACT_APP_PROXY_SERVER}/api/books/delete/${id}`)
	.then((res) => { 
	    res.json();
	    window.location.reload(true);
	});
}

function CenteredModal(props) {
    return (
	<Modal
	    {...props}
	    aria-labelledby="contained-modal-title-vcenter"
	    centered
	>
	    <Modal.Header closeButton>
		<Modal.Title id="contained-modal-title-vcenter">
		    Confirmation
		</Modal.Title>
	    </Modal.Header>
	    <Modal.Body>
		<p>
		    Are you sure you want to delete this book?
		</p>
	    </Modal.Body>
	    <Modal.Footer>
		<Button className="btn btn-danger" onClick={(e) => {handleOnDelete(e, props.book.id)}}>Delete</Button>
		<Button onClick={props.onHide}>Close</Button>
	    </Modal.Footer>
	</Modal>
    );
}
