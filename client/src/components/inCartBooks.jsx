import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/inCartBooks.css';

export default function InCartBook(props) {
    const [ orders, setOrders ] = useState([]);
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    const loggedInUser = localStorage.getItem('user');
    const handleCoverImage = (name) => {
	if (name !== '' && name !== undefined) return `/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }

    useEffect(() => {
	const fetchData = async () => {
	    let currentUser = JSON.parse(loggedInUser);
	    const data = await fetch(`/api/orders/getOrders/${currentUser.id}`);
	    const json = await data.json();
	    setOrders(json);
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
	    <table className="table table-bordered">
		<thead>
		    <tr>
			<th scope="col" className="order-info-id">Order ID</th>
			<th scope="col" className="order-info-book">Book</th>
			<th scope="col" className="order-info-quantity">Quantity</th>
			<th scope="col" className="order-info-action">Action</th>
		    </tr>
		</thead>
		<tbody>
		    {
			orders.map((order) => {
			    return (
				<tr>
				    <th scope="row">{order.id}</th>
				    <td>
					<div className="book-info-container">
					    <div className="w-75">
						<img className="book-info-img img-thumbnail" alt="Cover's image" src={ handleCoverImage(order.cover_image) }/>
						<span className="book-info-title">{order.title}</span>
					    </div>
					    <span className="book-info-time text-secondary">{new Date(order.created_at).toLocaleString()}</span>
					</div>
				    </td>
				    <td>{order.quantity}</td>
				    <td className="book-info-button-container">
					<i className="btn btn-info btn-sm fi fi-rr-shopping-cart-add" data-toggle="tooltip" title="Buy"></i>
					<i className="btn btn-danger btn-sm fi fi-rr-trash" data-toggle="tooltip" title="Delete"></i>
				    </td>
				</tr>
			    )
			})
		    }
		</tbody>
	    </table>
	</>
    )
}
