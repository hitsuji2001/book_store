import React, { useState, useEffect } from 'react';
import Rate from './Rate.jsx';
import '../css/commentList.css';

export default function CommentList(props) {
    const [ comments, setComments ] = useState([{}]);

    useEffect(() => {
	const id = window.location.href.split('/')[5];
	const fetchData = async () => {
	    const data = await fetch(`/api/books/getComments/${id}`);
	    const json = await data.json();
	    setComments(json);
	}

	fetchData().catch((err) => {
	    console.error('ERROR in fetching data: ', err.message);
	});
    }, []);

    return(
	<>
	    {
		comments.map((comment) => {
		    return (
			<div key={'comment-container-'+ comment.id} className="comment-container border rounded mb-3">
			    <div className="comment-left-side">
				<div className="user-avatar-and-name">
				    <img key={'avatar-' + comment.id} className="comment-user-avatar img-thumbnail rounded-circle" alt="user's avatar" src="../../default-avatar.png"/>
				    <div key={'comment-username-' + comment.id} className="comment-username">{comment.username}</div>
				</div>
				<div key={'comment-text-' + comment.id} className="comment-text">{comment.text}</div>
			    </div>

			    <div className="comment-right-side">
				{ comment.rating !== 0 ? 
				    <Rate disabled={true} rating={comment.rating}/>
				  : <></>
				}
				<div className="comment-right-side-text">
				    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
				    <div>{new Date(comment.created_at).toLocaleTimeString()}</div>
				</div>
			    </div>
			</div>
		    )
		})
	    }
	</>
    );
}
