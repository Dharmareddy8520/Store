import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./nav.css";
import { useCookies } from "react-cookie";
const Nav = ({ props }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const logout = () => {
    localStorage.clear();
    setCookie("token", null);
  };
  const { cart } = useContext(CartContext);

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/purchase"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Purchase
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav> */}
      <div className="navbar fixed-top">
        <div className="navbar-title">
          <h1>DShop</h1>
        </div>
        <div className="navbar-links">
          <div className="dec">
            <Link to={"/"} className="dec">
              Shop
            </Link>
          </div>

          <div>
            <Link to={"/checkout"} className="dec">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="text-danger">{cart.length}</span>
            </Link>
          </div>
          <div>
            <Link to={"/checkout/purchase"} className="dec">
              Purchase
            </Link>
          </div>
          <div>
            <Link to={"/auth"} onClick={logout} className="dec">
              <FontAwesomeIcon icon={faUserCircle} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
