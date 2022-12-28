import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/order.css';

export default function Order({order}) {
    const [modalShow, setModalShow] = React.useState(false);

    const handleCoverImage = (name) => {
	if (name !== '' && name !== undefined) return `${process.env.REACT_APP_PROXY_SERVER}/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }

    return (
	<>
	    <div className="order-container border rounded-3 p-2 m-3">
		<div className="order-left-side">
		    <a href={'/book/view/' + order.book_id} className="imgimg">
			<img className="book-info-img img-thumbnail" src={ handleCoverImage(order.cover_image) } alt="Book's Cover"/> 
		    </a>
		    <div>
			<div>{order.title}</div>
			<div className="book-info-second-line">
			    <div className="w-50">
				<div className="icon"><i className="fi fi-rr-book-open-reader"></i></div>
				<span className="order-author">{order.author}</span>
			    </div>
			    <div>
				<div className="icon"><i className="fi fi-rr-resources"></i></div>
				<span className="order-category">{order.category}</span>
			    </div>
			</div>
		    </div>
		</div>

		<div className="order-quantity">
		    <i className="input-group-text fi fi-rr-boxes"></i>
		    <div className="form-control">{order.quantity}</div>
		</div>
		<div onClick={() => setModalShow(true)}>
		    <i className="btn btn-danger btn-sm fi fi-rr-trash" data-toggle="tooltip" title="Delete"></i>
		</div>
		<CenteredModal
		    onHide={() =>{setModalShow(false)}}
		    order={order}
		    show={modalShow}
		/>
	    </div>
	</>
    );
}

const handleDeleteOrder = async (id) => {
    await fetch(`${process.env.REACT_APP_PROXY_SERVER}/api/orders/delete/${id}`)
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
		    Are you sure you want to delete this order of <i>{props.order.title}</i>
		</p>
	    </Modal.Body>
	    <Modal.Footer>
		<Button className="btn btn-danger" onClick={() => {handleDeleteOrder(props.order.id)}}>Delete</Button>
		<Button onClick={props.onHide}>Close</Button>
	    </Modal.Footer>
	</Modal>
    );
}
