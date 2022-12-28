import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Order from './order.jsx';

let OrderContext = createContext();
export default function InCartBook(props) {
    const [ orders, setOrders ] = useState([]);
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    const loggedInUser = localStorage.getItem('user');
    useEffect(() => {
	const fetchData = async () => {
	    let currentUser = JSON.parse(loggedInUser);
	    const data = await fetch(`${process.env.REACT_APP_PROXY_SERVER}/api/orders/getOrders/${currentUser.id}`);
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
	    {
		(orders !== undefined && orders.length > 0) ?
		    <>
			<OrderContext.Provider value={orders}>
			    {
				orders.map((element) => {
				    return (
					<Order key={'order-component-' + element.id} order={element}/>
				    );
				})
			    }
			</OrderContext.Provider>
		    </>
		:
		<>
		    <div className="mt-5">
			<div className="w-md-80 w-lg-60 text-center mx-md-auto">
			    <div className="mb-3">
				<span className="u-icon u-icon--secondary u-icon--lg rounded-circle mb-4">
				    <div className="p-5">
					<h2><i className="rounded-circle bg-primary p-5 fi fi-rr-shopping-cart"></i></h2>
				    </div>
				</span>
				<h1 className="h2">Your cart is currently empty</h1>
				<p>Before proceed to checkout you must add some products to your shopping cart.</p>
			    </div>
			    <a className="btn btn-primary btn-wide" href="/">Start Shopping</a>
			</div>
		    </div>
		</>
	    }
	</>
    )
}

export { OrderContext };
