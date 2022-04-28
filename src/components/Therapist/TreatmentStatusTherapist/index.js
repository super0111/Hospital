import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom";
import classes from "./TreatmentStatusTherapist.module.css"
import config from "../../../config";
import { io } from "socket.io-client";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { testDelete } from "./../../../apis/addTests"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcDownload, FcUpload } from "react-icons/fc";

const TreatmentStatusTherapist = () => {
    let history = useHistory();
    const [ patientsLists, setPatientLists ] = useState([])
    const [ dataTestsLists, setTestsLists ] = useState([])
    const [ testLists, setTestList ] = useState([])
    const [ isActive, setIsActive ] = useState(false)
    const [ sortIcon, setSortIcon ] = useState(false)
    const [ dateSort, setDateSort ] = useState(false)
    const [ statusSort, setStatusSort ] = useState(false)
    const [ searchResults, setSearchResults ] = useState([])

    useEffect(async () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
            setSearchResults(patients);
        };
        const fetchTestPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTestsLists(tests);
        };
        await fetchTestPosts();
        await fetchPosts();   
    }, []);

    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, []);

    useEffect(() => {
        if(patientsLists && patientsLists.length > 0) {
            handlePatientClick(patientsLists[0]['fullname']);
        }
    }, [patientsLists]);
    
    const handlePatientClick = (patient, i) => {
        const patientTests = dataTestsLists.filter((item) => { return item.patient_name === patient});
        setTestList(patientTests)
        setIsActive(i)
    }

    const handleTestDelete = (i, name) => {
        const deleteNotify = `A test for ${name} has been deleted`;
        const patient_name = name;
        testDelete(i)
        .then((res) => {
            if(res.success === true) {
                socketRef.current.emit("deleteTest", res.data)
                socketRef.current.emit("notifications", deleteNotify, patient_name)
                setTestList(res.data)
            }
        })
    }

    const handleTestEdit = (i) => {
        history.push(
            { pathname: "./editTest", 
            state: i, });
    }

    const handlePatientSort = () => {
        setSortIcon(!sortIcon)
        if(sortIcon === true) {
            patientsLists.sort(function(a, b){
                if(a.fullname < b.fullname) { return -1; }
                if(a.fullname > b.fullname) { return 1; }
                return 0;
            })
        } else {
            patientsLists.sort(function(a, b){
                if(a.fullname > b.fullname) { return -1; }
                if(a.fullname < b.fullname) { return 1; }
                return 0;
            })
        }
    }

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

    const hanldeSerchPatient = (e) => {
        const values = patientsLists.filter((item) => item.fullname.toLowerCase().includes(e.target.value));
        setSearchResults(values)
    }

    return (
        <div className={classes.statusField}>
            <div className={classes.filter_field}>
                <input className={classes.filter} type="text" placeholder="&#xf167; Search Patient" onChange={hanldeSerchPatient} />
            </div>
            <div className={classes.treatmentStatusTherapist}>
                <div className={classes.patientList}>
                    <div className={classes.title}>Patients Lists</div>
                    <div className={classes.patient_sort_field} onClick={handlePatientSort}>
                        <div className={classes.patient_sort}>Sort By Patient</div>
                        { sortIcon === false ? <FcAlphabeticalSortingAz size={20} /> : <FcAlphabeticalSortingZa size={20} /> }
                    </div>
                    { searchResults.map((patientsList, i) => {
                        return (
                            <div 
                                key={patientsList._id} 
                                className={isActive === i ? classes.patient_item_active : classes.patient_item } 
                                onClick={() => handlePatientClick(patientsList.fullname, i)}
                            >
                                <img className={classes.avatar} src={patientsList.picture} />
                                <div className={isActive === i ? classes.patient_name_active : classes.patient_name}>{patientsList.fullname}</div>
                            </div>
                        )   
                    }) }
                </div>
                <div className={classes.patientStatus}>
                    <div className={classes.status_title}>Patients Status</div>
                    <div className={classes.statusItem_title_field}>
                        <div className={classes.statusItem_title}>Test ID</div>
                        <div className={classes.statusItem_title} onClick={handleDateSort}>
                            Test Date{dateSort === true? <FcUpload size={18} /> : <FcDownload size={18} />}
                        </div>
                        <div className={classes.statusItem_title}>Food Allergic</div>
                        <div className={classes.statusItem_title}>Amount Number</div>
                        <div className={classes.statusItem_title}>Eat Time</div>
                        <div className={classes.statusItem_title}>Food Instructions</div>
                        <div className={classes.statusItem_title} onClick={handleStatusSort}>
                            Status{statusSort === true ? <FcUpload size={18} /> : <FcDownload size={18} />} </div>
                        <div className={classes.statusItem_title}>Actions</div>
                    </div>
                    { testLists.length !=0 ? testLists.map((test, i) => {
                        return(
                            <div key={i} className={classes.status_item}>
                                <div className={classes.text}>
                                    {i+1}
                                </div>
                                <div className={classes.text}>
                                    {test.date}
                                </div>
                                <div className={classes.text}>
                                    {test.allergies}
                                </div>
                                <div className={classes.formDataField}>
                                    {JSON.parse(test.formString).map((formData, i) => (
                                        <div key={i} className={classes.formData}>
                                            {/* <div className={classes.text}>
                                                {formData.foodName}
                                            </div> */}
                                            <div className={classes.formData_number}>
                                                {i+1}th
                                            </div>
                                            <div className={classes.formData_text}>
                                                {formData.whightAmountValue} {" "}
                                                {formData.whightAmountUnits}
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
                                        // test.canceled === true ?
                                        // <div ref={ref} className={classes.canceledText}>Canceled</div> 
                                        // : 
                                        test.confirmed === true 
                                        ? 
                                        <div className={classes.planedText}>Planed</div> 
                                        : 
                                        <div className={classes.newText}>New</div>
                                    }
                                </div>
                                <div className={classes.action}>
                                    <div onClick={() => handleTestEdit(test._id)}>
                                        <BiEditAlt className={classes.icon} />
                                    </div>
                                    <div onClick={() => handleTestDelete(test._id, test.patient_name)}>
                                        <MdDeleteForever 
                                            className={classes.icon}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }) : 
                    <div className={classes.noTests}>No Your Tests...</div> 
                    }
                </div>
                <ToastContainer />
            </div>
        </div>
        
    )
}
export default TreatmentStatusTherapist