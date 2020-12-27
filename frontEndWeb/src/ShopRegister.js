import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { useStateValue } from "./StateProvider";
import './Register.css';

const validEmailRegex = RegExp(
		/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

function ShopRegister() {
	let history = useHistory();
	const [{ user }, dispatch] = useStateValue();
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
        reTypePassword: '',
        name : ''
	});
	const {register , handleSubmit} = useForm();

	const onSubmit = async(data) => {
		// xử lí những lỗi sai trong Register Input
		if(!validateForm(formErrors)){
			alert("You have some errors in your form !!!");
			return;
		}
		if (data.reTypePassword != data.password)
		{
			setFormErrors({
				...formErrors,
				reTypePassword: "ReTypePassword must be same with password"
			});
			alert("You have some errors in your form !!!");
			return;
		}
		// hàm gửi sever post request lên sever
		const result = await axios({
			method: 'post',
			url: 'http://localhost:8000/shopRegister',
			data: data
		});
		if(result.data.message != 'Success'){
			alert(result.data.message);
			return;
		}

		const shopData = await axios({
			method: 'get',
			url: 'http://localhost:8000/shopProfile',
			headers : {
				token: result.data.token
			}
		});

		if(result.data.message != 'Success'){
			alert(result.data.message);
			return;
		}

		dispatch({
			type: "SET_SHOP",
			shop: {
				...shopData.data.shop
			},
		});
		setCookie('token',result.data.token);
		history.push('/');
	}

	const handleChange = (event) => {
		// event.preventDefault();
		const { name, value } = event.target;
		let errors = {
			...formErrors
		};
		switch (name) {
			case 'email': 
				errors.email = 
					validEmailRegex.test(value)
						? ''
						: 'Email is not valid!';
			break;
			case 'password': 
				errors.password = 
					value.length < 8
						? 'Password must be at least 8 characters long!'
						: '';
			break;
			case 'reTypePassword': 
				errors.reTypePassword = 
					value.length < 8
						? 'Password must be at least 8 characters long!'
                        : '';
            case 'name': 
				errors.name = 
					value.length < 5
						? 'Shop name must at least 5 characters long!'
						: '';
			break;
		}
		setFormErrors(errors);
	}

	return (
			<div className='register'>
				<Link to='/'>
					<img
							className="login__logo"
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
					/>
				</Link>

				<div className='login__container'>
					<h1>Register</h1>

					<form onSubmit={ 
						// event.preventDefault();
							handleSubmit(onSubmit)
					}>
						<h5>E-mail</h5>
						<input ref={register} type='text' name="email" placeholder="Type your email" onChange={handleChange} required/>
							{formErrors.email.length > 0 && 
								<span className='error'>{formErrors.email}</span>}
						<h5>Password</h5>
						<input ref={register} type='password' name="password" placeholder="Type your password"onChange={handleChange} required/>
							{formErrors.password.length > 0 && 
									<span className='error'>{formErrors.password}</span>}
						<h5>ReTypePassword</h5>
						<input ref={register} type='password' name="reTypePassword" placeholder="Retype your password"onChange={handleChange} required/>
							{formErrors.reTypePassword.length > 0 && 
									<span className='error'>{formErrors.reTypePassword}</span>}
                        <h5>Shop Name</h5>
						<input ref={register} type='text' name="name" placeholder="Type your shop name" onChange={handleChange} required/>
							{formErrors.name.length > 0 && 
									<span className='error'>{formErrors.name}</span>}
						<button type='submit' className='login__signInButton'>Register</button>
					</form>

					<Link to='/shopLogin'>
							<button className='login__registerButton'>You already have Shop</button>
					</Link>
					<Link to='/register'>
							<button className='login__registerButton'>You are user ?</button>
					</Link>
				</div>
			</div>
	)
}

export default ShopRegister;
