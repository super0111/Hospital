import classes from "./PatientHome.module.css"
import React, { useEffect, useRef }  from 'react';
import { io } from "socket.io-client";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientHome = () => {
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io("http://10.10.10.249:5000", { transports : ['websocket'] });
    }, []);
    useEffect(() => {
        socketRef.current.on('allow', (notifis) => {
      });
    });
    return (
        <div className={classes.PatientHome}>
            This is Patient Home Page
            <ToastContainer
                autoClose={3000}
                closeButton={false}
                closeOnClick
            />
        </div>
    )
}
export default PatientHome