import React, { useState, useEffect }  from 'react';
import NavMenuDraw from './navMenuDraw';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import classes from './headerNav.module.css';
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const sections1 = [
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
  const [isDoctor, setDoctor] = useState("");
  useEffect(() => {
      setInterval(() => {
          const userString = localStorage.getItem('token');
          const isDoctor = localStorage.getItem('isDoctor')
          setCurrentUser(userString);
          setDoctor(isDoctor);
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
            <Toolbar component="nav" className={classes.toolbar} variant="dense">
                { currentUser && isDoctor == 2 ? (
                <ul className={classes.navigation}>
                    <Link className={classes.navToolbarLink} href="/" style={{marginBottom: "0px"}}>Home</Link>
                    <Link className={classes.navToolbarLink} href="/treatmentStatus_therapist" style={{marginBottom: "0px"}}>Patient Treatment Status</Link>
                    <Link className={classes.navToolbarLink} href="/registerPatient" style={{marginBottom: "0px"}}>Register Patient</Link>
                    <Link className={classes.navToolbarLink} onClick={logout} style={{marginBottom: "0px"}}>Logout</Link>
                </ul>
                ) : 
                 currentUser && isDoctor == 1 ?
                 (
                  <ul className={classes.navigation}>
                    <Link className={classes.navToolbarLink} href="/patientHome" style={{marginBottom: "0px"}}>PatientHome</Link>
                    <Link className={classes.navToolbarLink} href="treatmentStatus_patient" style={{marginBottom: "0px"}}>My Treatment Status</Link>
                    <Link className={classes.navToolbarLink} style={{marginBottom: "0px"}}><ProfileMenu logout = {logout} /></Link>
                  </ul>
                 ) :
                ( 
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

const ProfileMenu = (props) => {

  let [currentUser, setCurrentUser] = useState(undefined);
  let [currentAvatar, setCurrentAvatar] = useState("");
  useEffect(() => {
          const userString = localStorage.getItem('token');
          const current_user = jwt_decode(userString);
          const current_fullname = current_user.patient_user?.fullname;
          const current_avatar = current_user.patient_user.avatar;
          setCurrentUser(current_fullname);
          setCurrentAvatar(current_avatar);
  }, [currentUser])

  const { logout } = props
    return (
      <Dropdown className={classes.profile} color="primary" label="Profile">
        <DropdownItem>
          <div className={classes.flexRow}>
            <img className={classes.userAvatar} src={currentAvatar} />
            <div className={classes.userName}>{currentUser}</div>
          </div>
        </DropdownItem>
        <DropdownItem link="/profileEdit">Profile Edit</DropdownItem>
        <DropdownItem link="/profileView">Profile View</DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </Dropdown>
    );
}
