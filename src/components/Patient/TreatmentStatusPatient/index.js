import classes from "./TreatmentStatusPatient.module.css"
import React, { useState, useEffect, useRef } from "react"
import config from "../../../config";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";
import { FcDownload, FcUpload } from "react-icons/fc";
import Moment from 'moment';

const TreatmentStatusPatient = () => {

    const [ dataTestsLists, setTestsLists ] = useState([])
    const [ testLists, setTestList ] = useState([])
    const [current_PatientName, setCurrent_PatientName] = useState("")
    const [ confirmed, setConfirmed ] = useState(false)
    const [ confirmedId, setConfirmedId ] = useState("")
    const [ dateSort, setDateSort ] = useState(false)
    const [ statusSort, setStatusSort ] = useState(false)

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
        const myTests = dataTestsLists?.filter((item) => item.patient_name === current_PatientName )
        setTestList(myTests)
    }, [current_PatientName, dataTestsLists] )

    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, [socketRef]);

    useEffect(() => {
        socketRef.current.on('addTest', (tests) => {
            const myTests = tests.filter((item) => item.patient_name === current_PatientName)
            setTestList(myTests)
      });
    }, [dataTestsLists, testLists]);

    useEffect(() => {
        socketRef.current.on('deleteTest', (tests) => {
        setTestsLists(tests);
      });
    }, [socketRef]);

    useEffect(() => {
        socketRef.current.on('editTest', (tests) => {
            setTestsLists(tests);
      });
    }, [socketRef]);   

    useEffect(() => {
        socketRef.current.on('therapistConfirm', (therapistConfirm) => {
            const testId = therapistConfirm.test_id
            setConfirmedId(testId)
            setConfirmed(true)
        });
      }, [socketRef])

    const handleDateSort = () => {
        setDateSort(!dateSort)
        if(dateSort === true) {
            const values = testLists.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateA - dateB
            });
            setTestList(values)
        } else {
            const values = testLists.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateB - dateA
            });
            setTestList(values)
        }    
    }

    const handleStatusSort = () => {
        setStatusSort(!statusSort)
        if(statusSort === true) {
            testLists.sort(function(a, b){
                if(a.confirmed < b.confirmed) { return -1; }
                if(a.confirmed > b.confirmed) { return 1; }
                return 0;
            })
        } else {
            testLists.sort(function(a, b){
                if(a.confirmed > b.confirmed) { return -1; }
                if(a.confirmed < b.confirmed) { return 1; }
                return 0;
            })
        }
    }

    return (
        <div className={classes.treatmentStatusPatient}>
            <div className={classes.patientStatus}>
                <div className={classes.title}> My treatment status</div>
                <div className={classes.statusItem_title_field}>
                    <div className={classes.statusItem_title}>Test ID</div>
                    <div className={classes.statusItem_title}>Test Name</div>
                    <div className={classes.statusItem_title} onClick={handleDateSort}>
                        Test Date{dateSort === true? <FcUpload size={18} /> : <FcDownload size={18} />}
                    </div>
                    <div className={classes.statusItem_title}>Food Allergic</div>
                    <div className={classes.statusItem_title}>Food Name</div>
                    <div className={classes.statusItem_title}>Amount Number</div>
                    <div className={classes.statusItem_title}>Eat Time</div>
                    <div className={classes.statusItem_title}>Food Instructions</div>
                    <div 
                        className={classes.statusItem_title} 
                        onClick={handleStatusSort}
                    >
                        Status{statusSort === true ? <FcUpload size={18} /> : <FcDownload size={18} />} 
                    </div>
                </div>
                { testLists.length !=0 ? testLists.map((test, i) => {
                    return(
                        <div key={i} className={classes.status_item}>
                            <div className={classes.text_id}>
                                {i+1}
                            </div>
                            <div className={classes.text}>
                                {test.testName}
                            </div>
                            <div className={classes.text}>
                                {Moment(test.date).format('YYYY-MM-DD HH:mm')}
                            </div>
                            <div className={classes.food_allergies}>
                                { test.patientAllergies ? test.patientAllergies : "No" }
                            </div>
                            <div className={classes.formDataField}>
                                {JSON.parse(test?.formString).map((formData, i) => (
                                    <div key={i} className={classes.formData}>
                                        <div className={classes.formData_text}>
                                            {formData.food}
                                        </div>
                                        <div className={classes.formData_text}>
                                            {formData.unitsAmountValue}
                                            {formData.whightAmountValue} {" "} { formData.unitsAmountValue != "" ? "count" : "" }
                                            {formData.unitsAmountValue === "" ? formData.whightAmountUnits : ""}
                                        </div>
                                        <div className={classes.formData_text}>
                                            {formData.eatTimeValue} {" "}
                                            {formData.eatTimeUnits}
                                        </div>
                                        <div className={classes.formData_text}>
                                            {formData.addInstructions}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={classes.text}>
                                { 
                                (confirmed === true && i === i) ?
                                <div className={classes.planedText}>Planed</div> :
                                    test.confirmed === true 
                                    ? 
                                    <div className={classes.planedText}>Planed</div> 
                                    : 
                                    
                                    <div className={classes.newText}>New</div>
                                }
                            </div>
                        </div>
                    )
                }) : 
                <div className={classes.noTests}>No Your Tests...</div> 
                }
            </div>
        </div>
    )
}
export default TreatmentStatusPatient