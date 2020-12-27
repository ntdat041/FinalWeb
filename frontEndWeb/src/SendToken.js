import React, { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams,useHistory} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function SendToken(){
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['token']);
    let { token } = useParams();
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
		async function fetchData(){
			const result = await axios({
                method: 'post',
                url: 'http://localhost:8000/authRegister',
                data: {
                    token: token
                }
            });
            if(result.data.message != 'Success'){
                alert("Axios is can't wait");
                return history.push('/');
            };
            const userData = await axios({
                method: 'get',
                url: 'http://localhost:8000/profile',
                headers : {
                    token: result.data.token
                }
            });
            if (userData.data.message != 'Success') {
                if(result.data.message != 'Success'){
                    alert("Can't get user infor");
                    return history.push('/');
                };
            }
            setCookie('token',result.data.token);
            dispatch({
                type: "SET_USER",
                user: {
                    ...userData.data.user
                },
            });
            //save token of user in cookies of client
            
            return history.push('/');
		}
		fetchData();
	},
	[]);

    return(
        <div>
            Hello
        </div> 
    );
};

export default SendToken