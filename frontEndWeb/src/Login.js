import React, { useState,useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import axios from "axios";

import './Login.css';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);



const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

function Login() {
    let history = useHistory();
    const [{ user }, dispatch] = useStateValue();
    const [cookies, setCookie] = useCookies(['token']);
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });
    const {register , handleSubmit} = useForm();
    const backEndServe = 'http://localhost:8000/';

    const onSubmit = (data) => {
        async function fetchData(data) {
            // hàm gửi sever post request lên sever
            const result = await axios({
                method: 'post',
                url: 'http://localhost:8000/login',
                data: data
            });
            if(result.data.message != 'Success'){
                alert(result.data.message);
                return;
            };
            // get user infor
            const userData = await axios({
                method: 'get',
                url: 'http://localhost:8000/profile',
                headers : {
                    token: result.data.token
                }
            });
            
            if(userData.data.message != 'Success'){
                alert(result.data.message);
                return;
            }
            const productsData = await axios({
                method: 'get',
                url: `http://localhost:8000/cart/${userData.data.user.user_id}`,
                headers : {
                    token: cookies.token
                }
            });
            productsData.data.userCart.map(product => 
                dispatch({
                    type: "ADD_QUANTITY_BASKET",
                    item: {
                        id: product.product_id,
                        name: product.product_name,
                        image: backEndServe+product.product_image,
                        price: product.product_price,
                        quantity: product.quantity,
                        rating: 5,
                        }
                })
            )

            dispatch({
                type: "SET_USER",
                query: {
                    ...userData.data.user
                },
            });
            //save token of user in cookies of client
            setCookie('token',result.data.token);
            history.push('/');
        }

        // xử lí những lỗi sai trong Register Input
        if(!validateForm(formErrors)){
            alert("You have some errors in your form !!!");
            return;
        }
        fetchData(data);
    }

    const handleChange = (event) => {
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
        }
        setFormErrors(errors);
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={ 
					handleSubmit(onSubmit)
				}>
                    <h5>E-mail</h5>
                    <input ref={register} type='text' name='email' placeholder="Type your email" onChange={handleChange} required/>
                    {formErrors.email.length > 0 && 
									<span className='error'>{formErrors.email}</span>}
                    <h5>Password</h5>
                    <input ref={register} type='password' name="password" placeholder="Type your password" onChange={handleChange} required/>
					{formErrors.password.length > 0 && 
					<span className='error'>{formErrors.password}</span>}

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <Link to='/register'>
                    <button className='login__registerButton'>Create your Amazon Account</button>
                </Link>
                <Link to='/shopLogin'>
                    <button className='login__registerButton'>You are shop ?</button>
                </Link>
            </div>
        </div>
    )
}

export default Login
