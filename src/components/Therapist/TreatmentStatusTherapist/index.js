import React, { useState, useEffect } from "react"
import classes from "./TreatmentStatusTherapist.module.css"
import config from "../../../config";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const TreatmentStatusTherapist = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    const [ dataTestsLists, setTestsLists ] = useState([])
    const [ testLists, setTestList ] = useState([])
    const [ isActive, setIsActive ] = useState(false) 

    useEffect(async () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        const fetchTestPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTestsLists(tests);
        };
        await fetchTestPosts();
        await fetchPosts();   
    }, []);

    useEffect(() => {
        if(patientsLists && patientsLists.length > 0) {
            handlePatientClick(patientsLists[0]['fullname']);
        }
    }, [patientsLists]);
    
    const handlePatientClick = (patient, i) => {
        const patientTests = dataTestsLists.filter((item) => item.patient_name === patient);
        setTestList(patientTests)
        setIsActive(i)
    }
    return (
        <div className={classes.treatmentStatusTherapist}>
            <div className={classes.patientList}>
                <div className={classes.title}>Patients Lists</div>
                { patientsLists.map((patientsList, i) => {
                    return (
                        <div key={patientsList._id} className={isActive === i ? classes.patient_item_active : classes.patient_item } onClick={() => handlePatientClick(patientsList.fullname, i)}>
                            <img className={classes.avatar} src={patientsList.picture} />
                            <div className={isActive === i ? classes.patient_name_active : classes.patient_name}>{patientsList.fullname}</div>
                        </div>
                    )   
                }) }
            </div>
            <div className={classes.patientStatus}>
                <div className={classes.title}>Patients Status</div>
                <div className={classes.statusItem_title_field}>
                    <div className={classes.statusItem_title}>Test ID</div>
                    <div className={classes.statusItem_title}>Test Date</div>
                    <div className={classes.statusItem_title}>Food Guidelines</div>
                    <div className={classes.statusItem_title}>Additional Notes </div>
                    <div className={classes.statusItem_title}>Status</div>
                    <div className={classes.statusItem_title}>Actions</div>
                </div>
                { testLists.map((test, i) => {
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
                                {test.addTextValue}
                            </div>
                            <div className={classes.text}>
                                { test.canceled === true ? 
                                    <div className={classes.canceledText}>Canceled</div> : 
                                    test.confirmed === true ? <div className={classes.planedText}>Planed</div> : 
                                    <div className={classes.newText}>New</div> 
                                }
                            </div>
                            <div className={classes.action}>
                                <BiEditAlt className={classes.icon} />
                                <MdDeleteForever className={classes.icon} />
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
export default TreatmentStatusTherapist