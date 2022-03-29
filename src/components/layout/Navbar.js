import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.css";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
      setInterval(() => {
          const userString = localStorage.getItem('token');
          setCurrentUser(userString);
          }, [])
      }, 5000);

  const logout = () => {
    window.location.replace('/login');
    return localStorage.removeItem("token");
  }

  return (
        <div className="flex-container">
          <h1 className="logo">
            <a href="/"><img src="https://www.instacart.com/assets/beetstrap/brand/instacart-logo-color-4db9d81ca0b7638befdc4bd331f64a2633df790c0b55ef627c99b1ba77af72b7.svg"/></a>
          </h1>
          <ul className="navigation">
            { currentUser ? (
              <ul className="navigation">
                <li className={classes.links} >
                  <Link to="/" style={{marginBottom: "0px"}}>Home</Link>
                </li>   
                <li className={classes.links}>
                  <Link to="/addlisting" style={{marginBottom: "0px"}}>Add Listing</Link>
                </li>      
                <li className={classes.links}>
                  <Link to="/listing" style={{marginBottom: "0px"}}>Listing</Link>
                </li>      
                <li className={classes.links}>
                  <Link to="/" onClick={logout} style={{marginBottom: "0px"}}>Logout</Link>
                </li>
              </ul>
              ) : ( 
              <ul className="navigation">
                <li className={classes.links}>
                  <Link to="/login" style={{marginBottom: "0px"}}>Login</Link>
                </li>
                <li className={classes.links}>
                  <Link to="/register" style={{marginBottom: "0px"}}>Register</Link>
                </li>  
                <li className={classes.links}>
                  <Link to='/passwordPut' style={{marginBottom: "0px"}}>PasswordPut</Link>
                </li>
              </ul>
            )}
        </ul>   
  </div>
  );
};

export default Navbar;
