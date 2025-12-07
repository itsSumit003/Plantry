import { Routes, Route } from "react-router-dom";
import MockMan from "mockman-js";
import Home from "../pages/Home.jsx";
import Cart from "../pages/Cart.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import ProductListing from "../pages/ProductListing.jsx";
import LogIn from "../pages/Authentication/Login.jsx";
import Logout from "../pages/Authentication/Logout.jsx";
import SignUp from "../pages/Authentication/Signup.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";

import UserProfile from "../components/UserProfile.jsx";
import ProfileDetails from "../components/ProfileDetails.jsx";
import AddressList from "../components/AddressList.jsx";
import OrderList from "../components/OrderList.jsx";

import RequiresAuth from "../components/RequiresAuth.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderSuccessful from "../pages/OrderSuccessful.jsx"; 

const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/mockman" element={<MockMan />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/store" element={<ProductListing />} />
      <Route path="/product/:productID" element={<SingleProduct />} />
      {/* AUTH */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignUp />} />
      {/* ORDER */}
      <Route path="/order-successful" element={<OrderSuccessful />} />{" "}
      {/* OK */}
      {/* PROTECTED */}
      <Route
        path="/cart"
        element={
          <RequiresAuth>
            <Cart />
          </RequiresAuth>
        }
      />
      <Route
        path="/checkout"
        element={
          <RequiresAuth>
            <Checkout />
          </RequiresAuth>
        }
      />
      <Route
        path="/wishlist"
        element={
          <RequiresAuth>
            <Wishlist />
          </RequiresAuth>
        }
      />
      {/* USER PROFILE (Nested Routes) */}
      <Route
        path="/userprofile"
        element={
          <RequiresAuth>
            <UserProfile />
          </RequiresAuth>
        }
      >
        <Route index element={<ProfileDetails />} />
        <Route path="addresses" element={<AddressList />} />
        <Route path="orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
};

export default NavRoutes;
