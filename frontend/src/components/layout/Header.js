import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";

import "../../App.css";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/one_mg.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
              <Dropdown>
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
              >{user && user.name}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {user && user.role === "seller" && (
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/orders">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
