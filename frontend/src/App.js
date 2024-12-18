import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/header2/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import ConditionalFooter from "./component/layout/Footer/ConditionalFooter";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log('app.js===', isAuthenticated);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {/* {isAuthenticated && <UserOptions user={user} />} */}

     {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes >
            <Route index path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Routes >
        <Route index path="/" element={<Home />} />
        <Route index path="/product/:id" element={<ProductDetails />} />
        <Route index path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route index path="/search" element={<Search />} />

        <Route index path="/contact" element={<Contact />} />

        <Route index path="/about" element={<About />} />

        <Route index path="/password/forgot" element={<ForgotPassword />} />

        <Route index path="/password/reset/:token" element={<ResetPassword />} />

        <Route index path="/login" element={<LoginSignUp />} />

        <Route index path="/cart" element={<Cart />} />

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

        <Route
          index
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

        <Route index path="/me/update" element={
          <ProtectedRoute>< UpdateProfile /> </ProtectedRoute>
        } />

        <Route index path="/password/update" element={
          <ProtectedRoute>< UpdatePassword /> </ProtectedRoute>
        } />

        <Route index path="/shipping" element={
          <ProtectedRoute>< Shipping /> </ProtectedRoute>
        } />

        <Route index path="/success" element={
          <ProtectedRoute>< OrderSuccess /> </ProtectedRoute>
        } />

        <Route index path="/orders" element={
          <ProtectedRoute>< MyOrders /> </ProtectedRoute>
        } />

        <Route index path="/order/confirm" element={
          <ProtectedRoute>< ConfirmOrder /> </ProtectedRoute>
        } />

        <Route index path="/order/:id" element={
          <ProtectedRoute>
            < OrderDetails /> 
            </ProtectedRoute>
        } />

        <Route
          index
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              < Dashboard />
            </ProtectedRoute>
          } />
        <Route
          index
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              < ProductList />
            </ProtectedRoute>
          } />
        <Route
          index
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              < NewProduct />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              < UpdateProduct />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              < OrderList />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              < ProcessOrder />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              < UsersList />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              < UpdateUser />
            </ProtectedRoute>
          } />

        <Route
          index
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              < ProductReviews />
            </ProtectedRoute>
          } />
      </Routes >

      {/* <Footer /> */}
      <ConditionalFooter />
    </Router>
  );
}

export default App;
