import React from 'react';
import { BrowserRouter as  Route,Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";


function ProtectedRoute({ isAuth: isAuth,component: Component, ...rest}){
    const [{ user }, dispatch] = useStateValue();

    return(
        <Route 
            {...rest}
            render = {(props) => {
                    if(isAuth) return <Component />
                    else return <Redirect to={{pathname: "/xfa", state: { from: props.location } }} />
                }
            }
        />
    );
}

export default ProtectedRoute;
