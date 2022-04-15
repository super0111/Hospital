import classes from "./TreatmentStatusPatient.module.css"
import React, { useState, useEffect, useRef } from "react"
import config from "../../../config";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";

const TreatmentStatusPatient = () => {

    const [ dataTestsLists, setTestsLists ] = useState([])
    const [ tests, setTests ] = useState([])
    const [current_PatientName, setCurrent_PatientName] = useState("")
    const [ notify, setNotify ] = useState({})
    const [ confirmed, setConfirmed ] = useState(false)
    const [ confirmedId, setConfirmedId ] = useState("")

    useEffect(() => {
        const userString = localStorage.getItem('token');
        if(userString) {
          const current_user = jwt_decode(userString);
          if(current_user.patient_user) {
            const current_userName = current_user.patient_user.fullname;
            setCurrent_PatientName(current_userName);
          }
        }
    }, []);

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTestsLists(tests);
        };
        fetchPosts();
    }, []);

    useEffect( () => {
            const myTests = dataTestsLists.filter((item) => item.patient_name === current_PatientName )
            console.log("myTests", myTests)
            setTests(myTests)
    }, [current_PatientName, dataTestsLists] )


    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config, { transports : ['websocket'] });
    }, [socketRef]);

    useEffect(() => {
        socketRef.current.on('addTest', (notifis) => {
          setNotify(notifis.test)
      });
    }, [socketRef]);

    useEffect(() => {
        if(notify.patient_name === current_PatientName) {
            setTests([...tests, notify]);
        }
    }, [notify])

    useEffect(() => {
        socketRef.current.on('therapistConfirm', (therapistConfirm) => {
            const testId = therapistConfirm.test_id
            setConfirmedId(testId)
            setConfirmed(true)
        });
      }, [socketRef])

    return (
        <div className={classes.treatmentStatusPatient}>
            <div className={classes.patientStatus}>
                <div className={classes.title}> My treatment status</div>
                <div className={classes.statusItem_title_field}>
                    <div className={classes.statusItem_title}>Test ID</div>
                    <div className={classes.statusItem_title}>Test Date</div>
                    <div className={classes.statusItem_title}>Food Guidelines</div>
                    <div className={classes.statusItem_title}>Status</div>
                    <div className={classes.statusItem_title}>Additional Notes </div>
                </div>
                { tests.map((test, i) => {
                    return(
                        <div key={i} className={classes.status_item}>
                            <div className={classes.text}>
                                {test.test_id}
                            </div>
                            <div className={classes.text}>
                                {test.date}
                            </div>
                            <div className={classes.text}>
                                {test.foodValue}
                            </div>
                            <div className={classes.text}>
                                { test.canceled === true ? 
                                    <div className={classes.canceledText}>Canceled</div> : 
                                    test.confirmed === true ? <div className={classes.planedText}>Planed</div> : 
                                    (confirmed === true && confirmedId === i+1) ? <div className={classes.planedText}>Planed</div> :
                                    <div className={classes.newText}>New</div> 
                                }
                            </div>
                            <div className={classes.text}>
                                {test.addTextValue}
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
export default TreatmentStatusPatient