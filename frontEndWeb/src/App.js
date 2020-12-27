import React, { useEffect, Component} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { useCookies } from 'react-cookie';
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";

import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import Payment from "./Payment";
import Orders from "./Orders";
import Profile from "./Profile";
import ShopProfile from "./ShopProfile";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import Products from "./Products";
import CategoryProducts from "./CategoryProducts";
import ProductDetail from "./ProductDetail";
import Signout from "./Signout";
import Dashboard from "./Dashboard";
import Checkmail from "./Checkmail";
import SendToken from "./SendToken";
import ShopLogin from "./ShopLogin";
import ShopRegister from "./ShopRegister";
import ProductsShop from "./ProductsShop";
import OrderDetail from "./OrderDetail";
import OrdersForShop from "./OrdersForShop";
import Footer from './Footer'


const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

function App() {
  const [{user}, dispatch] = useStateValue();
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    // will only run once when the app component loads...
  }, []);

  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route path="/orders/:user_id">
            {(cookies.token!='undefined') ? <Orders /> : <Redirect to="/"/>}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signout">
            <Signout />
          </Route>
          <Route path="/shopLogin">
            <ShopLogin />
          </Route>
          <Route path="/shopRegister">
            <ShopRegister />
          </Route>
          <Route exact path="/profile">
            {(cookies.token!='undefined') ? <Profile /> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/shopProfile">
            {(cookies.token!='undefined') ? <ShopProfile /> : <Redirect to="/"/>}
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/createProduct/:shop_id">
            <CreateProduct />
          </Route>
          <Route path ="/:shop_id/shopProducts">
            {(cookies.token!='undefined') ? <Products /> : <Redirect to="/"/>}
          </Route>
          <Route path ="/shopProducts/:shop_id">
            <ProductsShop />
          </Route>
          <Route path="/editProduct/:product_id">
            <EditProduct />
          </Route>
          <Route path="/category/:category_id">
            <CategoryProducts />
          </Route>
          <Route path="/products/:product_id">
            <ProductDetail />
          </Route>
          <Route path="/dashboard/:shop_id">
            {(cookies.token!='undefined') ? <Dashboard /> : <Redirect to="/"/>}
          </Route>
          <Route path="/ordersForShop/:shop_id">
            <OrdersForShop />
          </Route>
          <Route path="/orderDetail/:user_id">
            <OrderDetail />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkmail">
            <Checkmail />
          </Route>
          <Route path="/userToken/:token">
            <SendToken />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
