import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import '../css/signInForm.css';

export default function SignIn(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ serverResponse, setServerResponse ] = useState();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
	data = {...data, password: btoa(data.password)};
	await fetch(`/api/users/signin`, 
		    { 
			method: 'POST', 
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		    })
	    .then((res) => {
		if (res.ok) {
		    navigate('/');
		} else {
		    return res.json();
		}
	    })
	    .then((res) => {
		setServerResponse(res.message);
		console.log(res);
	    })
    }

    return (
	<>
	    {
		serverResponse &&
		<div className="server-response alert alert-danger"><i className="fi fi-rr-exclamation"></i>   {serverResponse}</div>
	    }

	    <div className="login border border-info rounded">
		<div className="link-holder mb-3">
		    <Link to={'/signin'}><div className="link-btn btn btn-info">Sign In</div></Link>
		    <Link to={'/signup'}><div className="link-btn btn btn-secondary">Sign Up</div></Link>
		</div>
		<Form className="form-container" onSubmit={ handleSubmit(onSubmit) }>
		    <Form.Field className="input-group mb-3">
			<label className="input-group-text">Username</label>
			<input type="text"
			       className="form-control"
			       {...register("username", {
				   required: "You must specify an username",
				   maxLength: {
				       value: 20,
				       message: "Username can't be more than 20 characters!"
				   }
			       })}
			/>
		    </Form.Field>
		    {
			errors.username &&
			    <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.username.message}</p>
		    }

		    <Form.Field className="input-group mb-3">
			<label className="input-group-text">Password</label>
			<input type="password"
			       className="form-control"
			       data-type="password"
			       {...register("password", {
				   required: "You must specify a password",
				   minLength: {
				       value: 6,
				       message: "Password must be at least 6 characters!"
				   }
			       })}
			/>
		    </Form.Field>
		    {
			errors.password &&
			    <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> Password is required and must be atleast 6 characters!</p>
		    }
		    
		    <button type="submit" className="btn btn-primary">Sign Up</button>

		</Form>
	    </div>
	</>
    );
}