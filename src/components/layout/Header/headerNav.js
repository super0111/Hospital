import React, { useState, useEffect, useRef, useContext }  from 'react';
import jwt_decode from "jwt-decode";
import NavMenuDraw from './navMenuDraw';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import classes from './headerNav.module.css';
import config from '../../../config';
import { useHistory } from "react-router-dom";
import {confirmTest, cancelTest} from "./../../../apis/addTests";
import {allNotifySave} from "../../../apis/notify";
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiX } from "react-icons/bi";
import "./styles.css"
import {Context} from "../../AppContext"

const sections1 = [
    { title: 'Login', url: '/login'},
    { title: 'Register', url: '/register' },
    { title: 'Contact Us', url: '#' },
];

const HeaderNav= () => {
  const history = useHistory();
  const [scroll, setScroll] = useState(false);
  const socketRef = useRef();
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentUserId ,setCurrentUserId] = useState("")
  const [currentPatientId ,setCurrentPatientId] = useState("")
  const [current_userName, setCurrent_userName] = useState("")
  const [current_PatientName, setCurrent_PatientName] = useState("")
  const [currentAvatar, setCurrentAvatar] = useState("")
  const [isDoctor, setDoctor] = useState("")
  const [ notify, setNotify ] = useState({})
  const [ isShow, setIsShow ] = useState(false)
  const [ byUserShow, setByUserShow ] = useState(false)
  const [isShowCanceled, setIsShowCanceled] = useState(false)
  const [canceledPatientName, setCanceledPatientName] = useState("")
  const [ byTherapistShow, setByTherapistShow ] = useState(false)
  const [ notifyTherapist, setNotifyTherapist ] = useState('')
  const [ patientConfirm, setPatientConfirm ] = useState(false)
  const { statusUpdate, setStatusUpdate } = useContext(Context);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {       
    const userString = localStorage.getItem('token');
    const isDoctor = localStorage.getItem('isDoctor')
    setCurrentUser(userString);
    setDoctor(isDoctor);
      if(userString) {
        const current_user = jwt_decode(userString);
        if(current_user.patient_user) {
          const current_id = current_user.patient_user.id;
          const current_userName = current_user.patient_user.fullname;
          const current_avatar = current_user.patient_user.avatar;
          setCurrentPatientId(current_id);
          setCurrent_PatientName(current_userName);
          setCurrentAvatar(current_avatar);
        } else
        if(current_user.user) {
          const current_id = current_user.user.id;
          const current_userName = current_user.user.fullname;
          setCurrentUserId(current_id);
          setCurrent_userName(current_userName);
        }
      }
    }, 100 )
  }, [currentUser]);

  const logout = () => {
    setCurrentUserId("")
    setCurrentPatientId("")
    history.push("/");
    return localStorage.removeItem("token");
  }

  useEffect(() => {
      socketRef.current = window.socket = io(config.server_url, { transports : ['websocket'] });
  }, [socketRef]);

  useEffect(() => {
      socketRef.current.on('addTest', (notifis, notifyInfo, test_id) => {
        const info = {
          notifyInfo,
          test_id,
        }
          setNotify(info)
          setIsShow(true)
      });
  }, [ socketRef ]);

  useEffect(() => {
      socketRef.current.on('deleteTest', (tests) => {
    });
  }, []);

  useEffect(() => {
      socketRef.current.on('deleteTest', (tests) => {
        toast.info("Test is deleted")
    });
  }, []);

  useEffect(() => {
    const note = notify?.notifyInfo;
    if(note?.patientSelectValue === current_PatientName) {
      setByUserShow(true)
    } else {
      setByUserShow(false)
    }
  }, [notify]);
  
  const notifyConfirm = () => {
    setPatientConfirm(true) 
    const testId = notify.test_id;
    const confirmNotify = `${current_PatientName} has been confirmed new test`
    const formData = {
      content: confirmNotify,
      patient_name: current_PatientName,
    }
    allNotifySave(formData)
    socketRef.current.emit("patientConfirm", {patientConfirm, currentPatientId, current_PatientName, testId});
    socketRef.current.emit("notifications", confirmNotify, current_PatientName)
    setIsShow(!isShow)
  }

  const notifyCancel = () => {
    setIsShow(false)
    const testId = notify._id;
    const cancelNotify = `${current_PatientName} has been canceled new test`
    const formData = {
      content: cancelNotify,
      patient_name: current_PatientName,
    }
    allNotifySave(formData)
    socketRef.current.emit("patientCancel", {currentPatientId, current_PatientName, testId});
    socketRef.current.emit("notifications", cancelNotify, current_PatientName)
  }

  useEffect(() => {
    socketRef.current.on('patientConfirm', (patientConfirm) => {
      const isConfirm = true;
      const id = patientConfirm._id;
      const patient_name = patientConfirm.current_PatientName;
      const testId = patientConfirm.testId;
      const test_id = patientConfirm.test_id;
      const formData = {
        id :  testId,
        confirmed: isConfirm,
      }
      confirmTest(formData)
      .then((res) => {
        socketRef.current.emit("therapistConfirm", {patient_name, test_id});
        if(res.message === "success") {
            toast.info("Therapist confirmed successfully")
        }
        else { toast.error(res.err.message) }
      })
      .catch((error) => console.log(error));
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('patientCancel', (patientCancel) => {
      setIsShowCanceled(true)
      const isCancel = true;
      const id = patientCancel.testId;
      const patient_name = patientCancel.current_PatientName;
      setCanceledPatientName(patient_name)
      const formData = {
        id :  id,
        canceled: isCancel,
      }
      // cancelTest(formData)
      // .then((res) => {
      // })
      // .catch((error) => console.log(error));
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('therapistConfirm', (therapistConfirm) => {
      setStatusUpdate(true)
      setByTherapistShow(true)
      setNotifyTherapist(therapistConfirm.patient_name)
    });
  }, [])

  useEffect(() => {
    if(isShowCanceled === true && current_userName) {
      toast.info(`Patient ${canceledPatientName} has canceled your test.`);
    }
  }, [isShowCanceled, current_userName, canceledPatientName])

    return (
      <div className={classes.position}>
        <div className={ scroll ? classes.headerToolScroll : classes.headerTool}>
            <div className={classes.navbarLogo}>
                <img alt='' className={classes.navbarLogoImg} src="/images/logo.png" />
            </div>
            <Toolbar component="nav" className={classes.toolbar} variant="dense">
                { currentUser && currentUserId ? (
                <ul className={classes.navigation}>
                    <Link className={classes.navToolbarLink} href="/" style={{marginBottom: "0px"}}>Home</Link>
                    <Link className={classes.navToolbarLink} href="/managePatients" style={{marginBottom: "0px"}}>Manage Patients</Link>
                    <Link className={classes.navToolbarLink} href="/therapistMessage" style={{marginBottom: "0px"}}>Message</Link>
                    <Link className={classes.navToolbarLink} href="/addTest" style={{marginBottom: 0}}>Add Test</Link>
                    <Link className={classes.navToolbarLink} href="/treatmentStatus_therapist" style={{marginBottom: "0px"}}>Patient Treatment Status</Link>
                    <Link className={classes.navToolbarLink} href="/registerPatient" style={{marginBottom: "0px"}}>Register Patient</Link>
                    <Link className={classes.navToolbarLink} onClick={logout} style={{marginBottom: "0px"}}>Logout</Link>
                </ul>
                ) : 
                currentUser && currentPatientId ?
                 (
                  <ul className={classes.navigation}>
                    <Link className={classes.navToolbarLink} href="/patientHomePage" style={{marginBottom: "0px"}}>PatientHome</Link>
                    <Link className={classes.navToolbarLink} href="/patientMessage" style={{marginBottom: "0px"}}>Message</Link>
                    <Link className={classes.navToolbarLink} href="treatmentStatus_patient" style={{marginBottom: "0px"}}>My Treatment Status</Link>
                    <Link className={classes.navToolbarLink} style={{marginBottom: "0px"}}><ProfileMenu current_PatientName={current_PatientName} currentAvatar={currentAvatar} logout = {logout} /></Link>
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
                <img alt='' className={classes.navbarLogoImg} src='/images/logo.png' />
            </div>
            <NavMenuDraw/>
        </div>
        <ToastContainer
            autoClose={3000}
            closeButton={false}
            closeOnClick
        />
        { (isShow === true && byUserShow === true) ?
          <div className={classes.notificationModal}>
            <div className={classes.notifyModal_header}>
              <div className={classes.notifyModal_headerText}>
                Notification Modal
              </div>
              <div className={classes.closeBtn} onClick={ () =>setIsShow(!isShow)}><BiX color='white' size={25} /></div>
            </div>
            <div className={classes.notify_body}>
              <div className={classes.modal_note}>Hello, {notify.notifyInfo.patientSelectValue}. New Test is Added</div>
              <div className={classes.modal_text}>Test Name : {notify.notifyInfo.testName}</div>
            </div>
            <div className={classes.modal_footer}>
              <button className={classes.modal_confirm} onClick={notifyConfirm}>Confirm</button>
              <button className={classes.modal_cancel} onClick={notifyCancel}>Cancel</button>
            </div>
          </div>
          : ""
        }
        { (byTherapistShow === true && current_userName) ?
            <div className={classes.notificationModal2}>
              <div className={classes.patientUserName}><span className={classes.patientName}>{notifyTherapist}</span> Patient has been confirmed</div>
              <div className={classes.modal2_footer}>
                <div className={classes.modal2_confirm_btn} onClick={() => setByTherapistShow(false)}>OK</div>
                <div className={classes.modal2_cancel_btn} onClick={() => setByTherapistShow(false)}>Cancel</div>
              </div>
            </div>
          : ""
        }
      </div>
    );
}
export default HeaderNav

const ProfileMenu = (props) => {
  const { logout, current_PatientName, currentAvatar } = props
    return (
      <Dropdown className={classes.profile} color="primary" label="Profile">
        <DropdownItem>
          <div className={classes.flexRow}>
            <img className={classes.userAvatar} src={currentAvatar} alt="" />
            <div className={classes.userName}>{current_PatientName}</div>
          </div>
        </DropdownItem>
        <DropdownItem link="/profileEdit">Profile Edit</DropdownItem>
        <DropdownItem link="/profileView">Profile View</DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </Dropdown>
    );
}
