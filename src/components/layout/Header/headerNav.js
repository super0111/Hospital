import React, { useState, useEffect }  from 'react';
import NavMenuDraw from './navMenuDraw';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import classes from './headerNav.module.css';
import { useHistory } from "react-router-dom";

const sections1 = [
    // { title: "Home", url: '/' },
    { title: 'Login', url: '/login'},
    { title: 'Register', url: '/register' },
    { title: 'Contact Us', url: '#' },
];


const HeaderNav= () => {
  const history = useHistory();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
      setInterval(() => {
          const userString = localStorage.getItem('token');
          setCurrentUser(userString);
          }, [])
      }, 5000);

  const logout = () => {
    history.push("/");
    return localStorage.removeItem("token");
  }

    return (
      <>
        <div className={ scroll ? classes.headerToolScroll : classes.headerTool}>
            <div className={classes.navbarLogo}>
                <img className={classes.navbarLogoImg} src="/images/logo.png" />
            </div>
            <Toolbar component="nav" variant="dense">
                { currentUser ? (
                <ul className={classes.navigation}>
                    <Link className={classes.navToolbarLink} href="/" style={{marginBottom: "0px"}}>Home</Link>
                    <Link className={classes.navToolbarLink} onClick={logout} style={{marginBottom: "0px"}}>Logout</Link>
                </ul>
                ) : ( 
                <ul>
                  {sections1.map((section1) => (
                    <Link
                        style={{textDecoration: "none"}} 
                        noWrap
                        key={section1.title}
                        href={section1.url}
                        className={classes.navToolbarLink}
                    >
                      {section1.title}
                    </Link>
                  ))}
                </ul>
              )}
            </Toolbar>
        </div>
        <div className={ scroll ? classes.headerToolResponsiveScroll : classes.headerToolResponsive }>
            <div className={classes.navbarLogo}>
                <img className={classes.navbarLogoImg} src='/images/logo.png' />
            </div>
            <NavMenuDraw/>
        </div>
      </>
    );
}
export default HeaderNav
