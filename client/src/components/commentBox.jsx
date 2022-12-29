import React from 'react';
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import '../css/commentBox.css';

export default function CommentBox(props) {
    const { 
	register: commentRegister,
	handleSubmit: handleCommentSubmit,
	formState: { errors : commentError },
    } = useForm({
	mode: "onBlur",
    });

    const onSubmit = async (data) => {
	data = {...data, bookid: props.book.id, userid: props.user.id};
	await fetch(`http://${process.env.REACT_APP_PROXY_HOST}:${process.env.REACT_APP_PROXY_PORT}/api/comments/commentOn/${props.book.id}/${props.user.id}`,
		    { 
			method: 'POST', 
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		    })
	    .then((res) => { return res.json()} )
	    .then((res) => {
		window.location.reload(true);
	    })
    }

    return (
	<>
	    <Form id="comment-form" onSubmit={ handleCommentSubmit(onSubmit) }>
		<Form.Field className="input-group form-comment-section mb-3">
		    <textarea className="form-control"
			      rows="3"
			      placeholder="Enter comment here..."
			      {...commentRegister("comment", {
				  maxLength: {
				      value: 1000,
				      message: "Comment cannot be more than 1000 characters!"
				  }})
			      }
		    ></textarea>
		</Form.Field>
		{commentError.comment && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> { commentError.comment.message }</p>}
		<div className="comment-btn">
		    <input type="submit" form="comment-form" className="btn btn-secondary" value="Comment"/>
		</div>	
	    </Form>
	</>
    );
}
