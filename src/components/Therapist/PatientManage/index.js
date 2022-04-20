import React, { useState, useEffect } from "react"
import classes from "./PatientManage.module.css"
import config from "../../../config"
import PatientDetails from "./PatientDetails"
import TestLists from "./TestLists"


const PatientManage = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    const [ selectPatientList, setSelectPatientList ] = useState("")
    const [ testsLists, setTestsLists ] = useState([])
    const [ selectPatientTests, setSelectPatientTests ] = useState("")
    const [ patientIsActive, setPatientIsActive ] = useState(false)

    useEffect(async () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
            // setSearchResults(patients);
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
        const selectedPatient = patientsLists.find((item) => { return item.fullname === patient });
        const selectedTests = testsLists.filter((item) => { return item.patient_name === patient });
        setSelectPatientList(selectedPatient)
        setSelectPatientTests(selectedTests)
        setPatientIsActive(i)
    }

    console.log("selectPatientTests", selectPatientTests)

    return(
        <div className={classes.patientManage}>
            <div className={classes.title}>
                Patients Manage
            </div>
            <div className={classes.body}>
                <div className={classes.patientList}>
                    <div className={classes.patient_title}>Patients Lists</div>
                    { patientsLists.map((patientsList, i) => {
                        return (
                            <div 
                                key={patientsList._id} 
                                className={patientIsActive === i ? classes.patient_item_active : classes.patient_item } 
                                onClick={() => handlePatientClick(patientsList.fullname, i)}
                            >
                                <img className={classes.avatar} src={patientsList.picture} />
                                <div className={patientIsActive === i ? classes.patient_name_active : classes.patient_name}>{patientsList.fullname}</div>
                            </div>
                        )   
                    }) }
                </div>
                <div className={classes.patientBody}>
                    <PatientDetails selectPatientList={selectPatientList} />
                    <TestLists selectPatientTests={selectPatientTests} />
                </div>
            </div>
        </div>
    )
}
export default PatientManage