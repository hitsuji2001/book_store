import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import Header from './header.jsx';
import '../css/signInForm.css';

export default function SignUp(props) {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const [ serverResponse, setServerResponse ] = useState();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
	data = {...data, password: btoa(data.password), role: 'user'};
	delete data['confirm_password'];

	await fetch(`http://${process.env.REACT_APP_PROXY_HOST}:${process.env.REACT_APP_PROXY_PORT}/api/users/signup`, 
		    { 
			method: 'POST', 
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		    })
	    .then((res) => {
		if (res.ok) {
		    navigate('/signin');
		} else {
		    return res.json();
		}
	    })
	    .then((res) => {
		setServerResponse(res.message);
		console.log(res);
	    })
    }

    const handleAnonymousLogin = async (data) => {
	let user = {
	    username: 'anonymous',
	    role: 'none',
	    token: btoa('anonymous')
	};
	localStorage.setItem('user', JSON.stringify(user));
	navigate('/');
    }

    return (
	<>
	    <Header/>
	    <div className="content">
		{
		    serverResponse &&
			<div className="server-response alert alert-danger"><i className="fi fi-rr-exclamation"></i>   {serverResponse}</div>
		}

		<div className="login border border-info rounded">
		    <div className="link-holder mb-3">
			<Link to={'/signin'}><div className="link-btn btn btn-secondary">Sign In</div></Link>
			<Link to={'/signup'}><div className="link-btn btn btn-info">Sign Up</div></Link>
		    </div>
		    <Form className="form-container" id="sign-up-form" onSubmit={ handleSubmit(onSubmit) }>
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
				   name="password"
				   {...register('password', {
				       required: "You must specify a password",
				       minLength:{
					   value: 6,
					   message: "Password must have at least 6 characters!"}
				   })}
			    />
			</Form.Field>
			{
			    errors.password &&
				<p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.password.message}</p>
			}
			
			<Form.Field className="input-group mb-3">
			    <label className="input-group-text">Confirm Pass</label>
			    <input type="password"
				   className="form-control"
				   name="confirm_password"
				   data-type="password"
				   {...register('confirm_password', {
				       validate: {
					   confirmPassword: value => (value === getValues().password) || 'Your password does not match!',
				       }
				   })}
			    />
			</Form.Field>
			{
			    errors.confirm_password &&
				<p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.confirm_password.message}</p>
			}

			<Form.Field className="input-group mb-3">
			    <label className="input-group-text">Email</label>
			    <input type="email"
				   className="form-control"
				   {...register("email", {
				       required: "Please enter your email!",
				       pattern: {
					   value: '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
					   message: "Your email doesn't look right"
				       }
				   })}
			    />
			</Form.Field>
			{
			    errors.email &&
				<p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.email.message}</p>
			}

			<Form.Field className="input-group mb-3">
			    <label className="input-group-text">First Name</label>
			    <input type="text"
				   className="form-control"
				   {...register("firstname", {
				       required: "You must specify this field",
				       maxLength: {
					   value: 30,
					   message: "Firstname can't be more than 30 characters!"
				       }
				   })}
			    />
			</Form.Field>
			{
			    errors.firstname &&
				<p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.firstname.message}</p>
			}

			<Form.Field className="input-group mb-3">
			    <label className="input-group-text">Last Name</label>
			    <input type="text"
				   className="form-control"
				   {...register("lastname", {
				       required: "You must specify this field",
				       maxLength: {
					   value: 30,
					   message: "Lastname can't be more than 30 characters!"
				       }
				   })}
			    />
			</Form.Field>
			{
			    errors.lastname &&
				<p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> {errors.lastname.message}</p>
			}

			<button type="submit" form="sign-up-form" className="btn btn-primary">Sign Up</button>
			<p className="mt-3">Or login <a href="#" onClick={ handleAnonymousLogin }>Anonymously</a></p>
		    </Form>
		</div>
	    </div>
	</>
    )

}
