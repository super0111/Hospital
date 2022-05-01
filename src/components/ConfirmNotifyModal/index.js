import React, { useState, useEffect, useRef }  from 'react';
import { io } from "socket.io-client";
import classes from "./ConfirmNotfications.module.css"
import jwt_decode from "jwt-decode";
import { BiX } from "react-icons/bi";
import config from '../../config';

const ConfirmNotfications = (props) => {
    const data = props.confirmData;
    console.log("data +++++", data)
    const setIsShow = props.setIsShow;
    const socketRef = useRef();
    const [current_PatientName, setCurrent_PatientName] = useState("")
    const [current_PatientId, setCurrent_PatientId] = useState("")

    useEffect(() => {      
      const userString = localStorage.getItem('token');
      if(userString) {
        const current_user = jwt_decode(userString);
        if(current_user.patient_user) {
          console.log("current_user", current_user)
          const current_userName = current_user.patient_user.fullname;
          const current_userId = current_user.patient_user.id
          setCurrent_PatientName(current_userName);
          setCurrent_PatientId(current_userId)
        } 
      }
    }, []);

    useEffect(() => {
        socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, [socketRef]);
    
    const notifyConfirm = () => {
        const patientConfirm = true;
        const testId = data.test_id;
        const confirmNotify = `${current_PatientName} has been confirmed new test`
        socketRef.current.emit("patientConfirm", { patientConfirm, current_PatientId, current_PatientName, testId});
        socketRef.current.emit("notifications", confirmNotify, current_PatientName)
        setIsShow(false)
      }
    
      const notifyCancel = () => {
        setIsShow(false)
        // const testId = notify._id;
        const cancelNotify = `${current_PatientName} has been canceled new test`
        socketRef.current.emit("patientCancel", { current_PatientName});
        socketRef.current.emit("notifications", cancelNotify, current_PatientName)
      }

    return(
        <div className={classes.notificationModal}>
            <div className={classes.notifyModal_header}>
              <div className={classes.notifyModal_headerText}>
                Notification Modal
              </div>
              <div className={classes.closeBtn} onClick={ () =>setIsShow(false)}><BiX color='white' size={25} /></div>
            </div>
            <div className={classes.notify_body}>
              <div className={classes.modal_note}>Hello, {data.PatientName} . New Test is Added</div>
              <div className={classes.modal_text}>Test Name : {data.testName}</div>
            </div>
            <div className={classes.modal_footer}>
              <button className={classes.modal_confirm} onClick={notifyConfirm}>Confirm</button>
              <button className={classes.modal_cancel} onClick={notifyCancel}>Cancel</button>
            </div>
        </div>
    )
}
export default ConfirmNotfications