import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";

import Home from "./components/Home/Home";
import Create from "./components/common/Create/Create";
import Edit from "./components/common/Edit/Edit";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";

import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import Order from "./components/Order/Order";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import MyOrder from "./components/MyOrder/MyOrder";

import ProductList from "./components/ProductList/ProductList";
import OrderList from "./components/OrderList/OrderList";

import "./app.css";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Route path="/" component={Home} exact />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={Cart} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/order/:id" component={Order} />

        <Route path="/myorder" component={MyOrder} />

        <Route path="/admin/productlist" component={ProductList} />
        <Route path="/admin/orderlist" component={OrderList} />
      </Router>
    </>
  );
}

export default App;
