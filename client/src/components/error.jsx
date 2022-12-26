import React from 'react';
import Header from './header.jsx';
import '../css/error.css';

export default function Error(props) {
    return (
	<>
	    <div className="error-message-container">
 		<Header/>
		<section className="error-container">
		    <span>4</span>
		    <span><span className="screen-reader-text">0</span></span>
		    <span>4</span>
		</section>
		<section className="error-container">
		    <span className="small-text">Lạc rồi bạn ơi</span>
		</section>
	    </div>
 	</>
    );
}
