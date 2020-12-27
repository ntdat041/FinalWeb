import React, { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { withRouter,useHistory } from "react-router-dom";

import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';

import NavShop from "./NavShop";
import LoadData from "./LoadData";

import "./ShopProfile.css";

const validEmailRegex = RegExp(
		/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = errors => {
		let valid = true;
		Object.values(errors).forEach(val => val.length > 0 && (valid = false));
		return valid;
};

function ShopProfile(){
		let history = useHistory();
		const [{ shop }, dispatch] = useStateValue();
		const [formErrors, setFormErrors] = useState({
				name: '',
				description: '',
                avatar: '',
                oldPassword: '',
				pass: '',
				repass: ''
		});
		const [avatarImg , setAvatarImg] = useState(null);
		const [cookies, setCookie] = useCookies(['token']);
		const backEndServe = 'http://localhost:8000/';

		useEffect(() => {
			
		},[]);

		const {register , handleSubmit} = useForm();

		const onSubmit = (data) => {
			async function sendForm(data){
				const dataForm = new FormData(); 
                dataForm.append('avatar', avatarImg);
                dataForm.append('name',data.name);
				dataForm.append('description',data.description);
				dataForm.append('pass',data.pass);
				dataForm.append('oldPassword',data.oldPassword);

				const result = await axios({
					method: 'post',
					url: 'http://localhost:8000/shopProfile',
					headers : {
						token: cookies.token
					},
					data: dataForm
				});
				if(result.data.message != 'Success'){
					alert(result.data.message);
					return;
				};
				window.location.reload();
			}

			if(!validateForm(formErrors)){
				alert("You have some errors in your form !!!");
				return;
			}
			if(data.pass != data.repass){
				alert("You have to type New Password and Repass same !!!");
				return;
			}

			sendForm(data);
		}

		const handleChange = (event) => {
				const { name, value } = event.target;
				let errors = {
						...formErrors
				};
				switch (name) {
					case 'name': 
						errors.name = 
							value.length < 5
								? 'Name must be at least 5 characters long!'
								: '';
						break;
                    case 'textarea': 
						errors.textarea = 
							value.length < 10
								? 'Description must be at least 10 characters long!'
								: '';
						break;
					case 'oldPassword': 
						errors.oldPassword = 
							value.length < 8
								? 'Password must be at least 8 characters long!'
								: '';
						break;
					case 'pass': 
						errors.pass = 
							value.length < 8
								? 'Password must be at least 8 characters long!'
								: '';
					case 'repass': 
						errors.repass = 
								value.length < 8
								? 'Password must be at least 8 characters long!'
								: '';
						break;
					case 'avatar':
						errors.avatar = (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/jpeg')
										? ''
										: 'Invalid type of image!';
						setAvatarImg(event.target.files[0]);
						break;
					default:	
						break;
				}

				setFormErrors(errors);
		}

		return(
				<div className="shopProfile">
						<LoadData />
						<NavShop />
						<h1>My Profile</h1>
						<div className="right_area col-md-6">
								<h3>ShopName {shop ? shop.name : null}</h3>
								<div className="avatar_area">
										{shop ? <img className="avatar_image" src={backEndServe+shop.avatar}/> : <img className="avatar_image" src="themeLogin.jpg"/>}
										
								</div>    
								<hr />
								<ul className="social_list">
										<li><FacebookIcon className="Icon"/></li>
										<li><MailIcon className="Icon"/></li>
										<li><InstagramIcon className="Icon"/></li>
								</ul>
								<hr />
								<table className="table profile-detail table-condensed table-hover">
										<thead>
												<tr>
														<th colSpan="3">Contact Information</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>Name </td>
														{ (shop && shop.name) ? <td className="infor">{shop.name}</td> : <td className="infor"></td>} 
												</tr>
												<tr>
														<td>Email: </td>
														{(shop && shop.email) ? <td className="infor">{shop.email}</td> : <td className="infor"></td>}       
												</tr>
												<tr>
														<td>Description </td>
														{ (shop && shop.description) ? <td className="infor">{shop.description}</td> : <td className="infor"></td>} 
												</tr>
										</tbody>
								</table>
						</div>
						<div className="left_area col-md-6">
								<form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
										<div>
												<h4>SHOP Information</h4>
												<div className="form-group">
														<label className="col-md-5 control-label" for="profileName"> Name</label>
														<div className="col-md-7">
															<input ref={register} type="text" className="form-control" id="profileName" name="name" onChange={handleChange}/>
														</div>
														{formErrors.name.length > 0 && 
																<span className='error'>{formErrors.name}</span>}
												</div>
                                                <div className="form-group">
                                                    <label
                                                        className="col-md-5 control-label"
                                                        for="profileDescription"
                                                        >Description</label>
                                                    <div className="col-md-7">
                                                        <textarea
                                                            id="profileDescription"
                                                            ref={register}
                                                            className="form-control validate"
                                                            rows="3"
                                                            name="description"
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>
                                                    {formErrors.description.length > 0 && 
																<span className='error'>{formErrors.description}</span>}
										        </div>
												<div className="form-group">
														<label className="col-md-5 control-label" for="profileAvatar">Avatar</label>
														<div className="col-md-7">
																<input ref={register} type="file" className="form-control" id="profileAvatar" name="avatar" onChange={handleChange}/>
														</div>
														{formErrors.avatar.length > 0 && 
																<span className='error'>{formErrors.avatar}</span>}
												</div>
										</div>                    
										<div>
												<h4 className="mb-xlg">Change Password</h4>
												<div className="form-group">
														<label className="col-md-5 control-label" for="oldPassword">Old Password</label>
														<div className="col-md-7">
																<input ref={register} type="password" className="form-control" id="oldPassword" name="oldPassword" onChange={handleChange}/>
														</div>
														{formErrors.oldPassword.length > 0 && 
																<span className='error'>{formErrors.oldPassword}</span>}
												</div>
												<div className="form-group">
														<label className="col-md-5 control-label" for="profileNewPassword">New Password</label>
														<div className="col-md-7">
																<input ref={register} type="password" className="form-control" id="profileNewPassword" name="pass" onChange={handleChange}/>
														</div>
														{formErrors.pass.length > 0 && 
																<span className='error'>{formErrors.pass}</span>}
												</div>
												<div className="form-group">
														<label className="col-md-5 control-label" for="profileNewPasswordRepeat">Repeat New Password</label>
														<div className="col-md-7">
																<input ref={register} type="password" className="form-control" id="profileNewPasswordRepeat" name="repass" onChange={handleChange}/>
														</div>
														{formErrors.repass.length > 0 && 
																<span className='error'>{formErrors.repass}</span>}
												</div>
										</div>

										<div className="row">
												<div className="col-md-6">
														<button type="submit" className="btn btn-primary">Submit</button>
												</div>
												<div className="col-md-6">
														<button type="reset" className="btn btn-default col-md-6">Reset</button>
												</div>      
										</div>

								</form>
						</div>
				</div>
		);
}
export default ShopProfile;