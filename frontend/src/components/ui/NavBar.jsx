import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { Link, NavLink } from "react-router-dom";
import { types } from "../../types/types";
export const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 position-sticky top-0">
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/">
          <img
            className="card-img-top"
            src="/assets/images/jobSearchBrand2.png"
            alt="LogoJobSearch"
          />
        </Link>

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
            {user.role !== "ADMIN" ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : ""}`}
                    to="/offers"
                  >
                    Offers <span className="sr-only">(current)</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/my-application"
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : ""}`}
                  >
                    {user.role === "EMPLOYER"?"Applicants":"My application"}
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/admin-user"
                  className={`nav-link ${(navData) =>
                    navData.isActive ? "active" : ""}`}
                >
                  Admin users
                </NavLink>
              </li>
            )}
          </ul>
          <div className="dropdown d-flex text-light ">
            <ul
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="dropdown-toggle dropdown-toggle bg-dark m-0 p-0"
            >
              <i className="fas fa-user me-2"></i> {user.name}
            </ul>

            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={(e) => {
                    dispatch({
                      type: types.logout,
                    });
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
