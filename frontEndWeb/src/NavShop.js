import React, { useState,useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from "./axios";

import './NavShop.css';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import SettingsApplicationsSharpIcon from '@material-ui/icons/SettingsApplicationsSharp';
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import HistorySharpIcon from '@material-ui/icons/HistorySharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import CameraAltSharpIcon from '@material-ui/icons/CameraAltSharp';

function NavShop() {
    const [{ shop }, dispatch] = useStateValue();
    const [cookies, setCookie] = useCookies(['token']);
    useEffect(() => {
    },[]);

	if(shop == null) return (
		<div>
		</div>
	); 
	else
		return (
			<nav className="navbar navbar-expand-xl">
					<div className="h-100">
						<Link to = {`/${shop.shop_id}/shopProducts`} className="navbar-brand">
							<h1 className="tm-site-title mb-0">WELL COME {shop && shop.name}</h1>
						</Link>
						<div className="navListRef" id="navbarSupportedContent">
							<ul className="navbar-nav mx-auto h-100">
								<li className="nav-item">
									<Link to ={`/${shop.shop_id}/shopProducts`} className="nav-link">
										<HomeSharpIcon className="navIcon" /> HOME
									</Link>
								</li>
								<li className="nav-item">
									<Link to ={`/dashboard/${shop.shop_id}`} className="nav-link">
										<DashboardSharpIcon className="navIcon" /> DASHBOARD				 
									</Link>
								</li>
								<li className="nav-item">
									<Link to ={`/ordersForShop/${shop.shop_id}`} className="nav-link">
										<HistorySharpIcon className="navIcon" /> HISTORY				 
									</Link>
								</li>
								<li className="nav-item">
									<Link to ="/shopProfile" className="nav-link">
										<AccountCircleSharpIcon className="navIcon" /> PROFILE				 
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
		);
}

export default NavShop