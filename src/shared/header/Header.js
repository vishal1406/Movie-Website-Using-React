import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import authenticationService from "../../utils/authenticationService";

const isUserLoggedIn = authenticationService.isUserLoggedIn();
const Header = () => {
  return (
    <div className="topnav">
      <span>
        <Link to="/" className="top-format">
          Movie
        </Link>
      </span>
      <span>
        <Link to="/tvSeries" className="top-format">
          Tv-Series
        </Link>
      </span>
      <span>
        <Link to="/actors" className="top-format">
          Actors
        </Link>
      </span>
      <span>
        <Link to="/favourite" className="top-format">
          Favourites
        </Link>
      </span>
      <div className="topnav-right">
        <span>
          {!isUserLoggedIn && (
            <Link to="/signin" className="top-format">
              Sign in
            </Link>
          )}
        </span>
        <span>
          {isUserLoggedIn && (
            <Link
              to="/"
              className="top-format"
              onClick={authenticationService.logout}
            >
              Sign out
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
