import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import classes from "./PatientHome.module.css"
import config from "../../../config"
import jwt_decode from "jwt-decode";
import Updates from "./Updates"
import NextSession from "./NextSession"
import TestLists from "./TestLists"
import ConfirmNotify from "./ConfirmNotify"
import ConfirmNotifyModal from "./../../ConfirmNotifyModal"

const PatientHomePage = () => {
    const socketRef = useRef();
    const [current_PatientName, setCurrent_PatientName] = useState("")
    const [ testLists, setTestsLists ] = useState([])
    const [ testList, setTestList ] = useState([])
    const [ notifications, setNotifications ] = useState([])
    const [ patientNotifications, setPatientNotifications ] = useState([])
    const [ confirmed, setConfirmed ] = useState(false)
    const [ confirmNotfications, setConfirmNotifications ] = useState([])
    const [ modalIsShow, setModalIsShow ] = useState(false)
    const [ confirmData, setConfirmData ] = useState()
    const [ isShow, setIsShow ] = useState(false)

    useEffect(() => {
      const userString = localStorage.getItem('token');
      if(userString) {
        const current_user = jwt_decode(userString);
        if(current_user.patient_user) {
          const current_userName = current_user.patient_user.fullname;
          setCurrent_PatientName(current_userName);
        }
      }
    }, [testLists]);

    useEffect(async () => {
        const fetchTestPosts = async () => {
            const res = await fetch(`${config.server_url}api/notifications/getConfirmNotifications`);
            const confirmNotificationss = await res.json();
            const notifications = confirmNotificationss.filter((item) => item.patientName === current_PatientName )
            setConfirmNotifications(notifications);
        };
        await fetchTestPosts();
    }, [confirmNotfications]);

    useEffect(async () => {
        const fetchTestPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTestsLists(tests);
        };
        await fetchTestPosts();
    }, [testLists]);

    useEffect( () => {
        const myTests = testLists.filter((item) => item.patient_name === current_PatientName )
        setTestList(myTests)
    }, [current_PatientName, testLists])

    useEffect(async () => {
      const fetchNotifications = async () => {
          const res = await fetch(`${config.server_url}api/notifications`);
          const notification = await res.json();
          setNotifications(notification);
      };
      await fetchNotifications();
    }, [])

    useEffect( () => {
      const myNotifications = notifications.filter((item) => item.patient_name === current_PatientName )
      setPatientNotifications(myNotifications)
    }, [current_PatientName, notifications] )

    useEffect(() => {
      socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, [socketRef]);

    useEffect(() => {
      socketRef.current.on('notifications', (notifyLists) => {
        setNotifications(notifyLists)
      });
    }, [socketRef])

    useEffect(() => {
      socketRef.current.on('addTest', (tests) => {
          setTestsLists(tests)
      });
    }, [socketRef]);

    useEffect(() => {
      socketRef.current.on('therapistConfirm', (therapistConfirm) => {
          setConfirmed(true)
      });
    }, [socketRef])

  return (
    <div className={classes.home}>
      <div className={classes.flexRow}>
        <Updates 
          notifications={patientNotifications} 
          setNotifications={setNotifications} 
        />
        <ConfirmNotify 
          setConfirmData={setConfirmData}
          setIsShow={setIsShow} 
          confirmNotfications={confirmNotfications} 
          setConfirmNotifications={setConfirmNotifications} 
        />
        <NextSession testList={testList} />
        { isShow === true ? <ConfirmNotifyModal setIsShow={setIsShow} isShow={isShow} confirmData={confirmData} /> : "" }
      </div>
      <TestLists testList={testList} setTestList={setTestList} confirmed={confirmed} />
    </div>
  );
};

export default PatientHomePage;
