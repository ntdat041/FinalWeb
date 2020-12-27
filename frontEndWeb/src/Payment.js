import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import ProductInPayment from "./ProductInPayment";
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useCookies } from 'react-cookie';
import axios from './axios';

import LoadData from "./LoadData";

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({
        phonenumber: '',
        items: ''
    });
    const [succeeded, setSucceeded] = useState(false);
    const [phonenumber, setPhonenumber] = useState('');
    const [error, setError] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);
    const [city, setCity] = useState('Hà Nội');
    const {register , handleSubmit} = useForm();
    useEffect(() => {
        async function fetchData(){     
        }
        // generate the special stripe secret which allows us to charge a customer
        fetchData();
        if(user)
            setPhonenumber(user.phonenumber);
    }, [user]);

    const onSubmit = async (data) => {
        // do all the fancy stripe stuff...
        async function fetchData(){
            dispatch({
                type: 'EMPTY_BASKET'
            });
            const [result1,result2] = await Promise.all(
                [axios({
                    method: 'post',
                    url: `http://localhost:8000/order/${user.user_id}`,
                    headers : {
                        token: cookies.token
                    },
                    data: {
                        form: data,
                        cart: basket
                    }
                }),
                axios({
                    method: 'post',
                    url: `http://localhost:8000/deleteAllProductInCart/${user.user_id}`,
                    headers : {
                        token: cookies.token
                    }
                })]   
            )
            if (result1.data.message != 'Success' || result2.data.message != 'Success')
                return alert("Some thing wrong !!!");
            return alert("Success to create order !!!");
        }

        let errors = {
            ...formErrors
        };
        if(!user){
            return alert("You must login as User to buy the products !");
        }
        if(data.phonenumber === '')
        {
            return alert("Please enter your phone !");
        }
        if (basket?.length === 0){
            errors.items = "You don't have any products in cart";
            setFormErrors(errors);
            return alert("You don't have any products in cart !!!");
        }
        if(!validateForm(formErrors)){
            alert("You have some errors in your form !!!");
            return;
        }
        fetchData();
          
    }
    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        const { name, value } = event.target;
        let errors = {
            ...formErrors
        };

        switch (name) {
            case 'phonenumber': 
                errors.phonenumber = 
                    (isNaN(value) || value.length != 10 )
                    ? 'Invalid Phone Number'
                    : '';
                setPhonenumber(value);
                break;
            case 'city': 
                setCity(value);
        }
        if (basket?.length === 0)
            errors.items = "You don't have any products in cart";
        setFormErrors(errors);
    }

    return (
        <div className='payment'>
            <LoadData />
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>

            
                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <select className="city" name="city" ref={register} onChange={handleChange}> 
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        </select>
                        {
                            city === 'Hà Nội' ? 
                                <select className="district" name="district" ref={register} onChange={handleChange}>
                                    <option value="Hà Đông">Hà Đông</option>
                                    <option value="Đống Đa">Đống Đa</option>
                                    <option value="Cầu Giấy">Cầu Giấy</option>
                                    <option value="Hai Bà Trưng">Hai Bà Trưng</option>
                                    <option value="Hoàn Kiếm">Hoàn Kiếm</option>
                                    <option value="Tây Hồ">Tây Hồ</option>
                                </select> :
                                <select className="district" name="district" ref={register} onChange={handleChange}>
                                <option value="Quận 1">Quận 1</option>
                                <option value="Quận Thủ Đức">Quận Thủ Đức</option>
                                <option value="Quận 2">Quận 2</option>
                                <option value="Quận Tân Bình">Quận Tân Bình</option>
                                <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                                <option value="Quận 3">Quận 3</option>
                            </select>
                                
                        }
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Your phone</h3>
                    </div>
                    <div>
                        <input
                            ref={register}
                            id="price"
                            name="phonenumber"
                            value = {phonenumber}
                            type="text"
                            className="form-control validate"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {formErrors.phonenumber.length > 0 && 
						<span className='error'>{formErrors.phonenumber}</span>}
                </div>
                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <ProductInPayment
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                rating={item.rating}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                    {formErrors.items.length > 0 && 
						<span className='error'>{formErrors.items}</span>}
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}                         
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: <strong>{value}</strong></h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" đ"}
                            />
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <button type="submit">
                                    <span>Buy Now</span>
                                </button>
                            </form>
                        </div>

                            {/* Errors */}
                        {error && <div>{error}</div>}
                                
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Payment
