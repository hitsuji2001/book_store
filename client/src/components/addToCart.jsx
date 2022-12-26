import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import '../css/addToCart.css';

export default function AddToCart(props) {
    const [ serverResponse, setServerResponse ] = useState();
    
    const {
	register: cartRegister,
	handleSubmit: handleOnSubmit,
	formState: { errors: cartErrors },
    } = useForm({mode: "onBlur"});

    const handleCoverImage = (name) => {
	if (name !== '' && name !== undefined) return `/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }

    const onSubmit = async (data) => {
	await fetch(`/api/orders/addtocart/${props.user.id}/${props.book.id}`, 
		    { 
			method: 'POST', 
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		    })
	    .then((res) => {return res.json()})
	    .then((res) => {
		setServerResponse(res.message);
	    });
    }

    return (
	<>
	    <Modal
		{...props}
		size="lg"
		aria-labelledby="contained-modal-title-vcenter"
		centered
	    >
		<Modal.Header closeButton>
		    <Modal.Title id="contained-modal-title-vcenter">
			Adding <i>{props.book.title}</i> to cart
		    </Modal.Title>
		</Modal.Header>
		<Modal.Body className="body-container">
		    <div className="book-container mb-3">
			<h4><i className="text-truncate fi fi-rr-book-bookmark"></i> {props.book.title}</h4>
			<div className="mb-3"><i className="fi fi-rr-book-open-reader"></i> {props.book.author}</div>
			<img className="preview-img img-thumbnail" src={ handleCoverImage(props.book.cover_image) } alt="Cover's image" />
		    </div>

		    <div>
		    <Form className="add-to-cart-form"
			  id={'form-' + props.book.id}
			  onSubmit={handleOnSubmit(onSubmit)}>
			<Form.Field>
			    <span>Số lượng:</span>
			    <input type="number" className="form-control mb-3"
				   placeholder="Amount"
				   {...cartRegister("amount", { 
				       required: "Amount is required!", 
				       min: {
					   value: 0,
					   message: "Amount must be greater than 0!"
				       },
				       max: {
					   value: 32767,
					   message: "Amount must be smaller than 32767!"
				       },
				   })}/>
			</Form.Field>
			{cartErrors.amount && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> { cartErrors.amount.message }</p>}
		    </Form>
			{
			    serverResponse ? 
				<p className="alert alert-success"><i className="fi fi-rr-cloud-check"></i> {serverResponse}</p>
			    : <></>
			}
</div>
		</Modal.Body>
		<Modal.Footer>
		    <input type="submit" form={'form-' + props.book.id} className="btn btn-primary" value="Add"/>
		    <Button className="btn-danger" onClick={props.onHide}>Cancel</Button>
		</Modal.Footer>
	    </Modal>  
	</>
    )
}
