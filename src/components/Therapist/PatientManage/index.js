import React, { useState, useEffect } from "react"
import classes from "./PatientManage.module.css"
import config from "../../../config"
import PatientDetails from "./PatientDetails"
import TestLists from "./TestLists"
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcDownload, FcUpload } from "react-icons/fc";

const PatientManage = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    const [ selectPatientList, setSelectPatientList ] = useState("")
    const [ testsLists, setTestsLists ] = useState([])
    const [ selectPatientTests, setSelectPatientTests ] = useState("")
    const [ patientIsActive, setPatientIsActive ] = useState(false)
    const [ sortIcon, setSortIcon ] = useState(false)
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

    const hanldeSerchPatient = (e) => {
        const values = patientsLists.filter((item) => item.fullname.toLowerCase().includes(e.target.value));
        setSearchResults(values)
    }


    return(
        <div className={classes.patientManage}>
            <div className={classes.flexRow}>
                <div className={classes.title}>
                    Patients Manage
                </div>
                <div className={classes.filter_field}>
                    <input className={classes.filter} type="text" placeholder="&#xf167; Search Patient" onChange={hanldeSerchPatient} />
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.patientList}>
                    <div className={classes.patient_title}>Patients Lists</div>
                    <div className={classes.patient_sort_field} onClick={handlePatientSort}>
                        <div className={classes.patient_sort}>Sort By Patient</div>
                        { sortIcon === false ? <FcAlphabeticalSortingAz size={20} /> : <FcAlphabeticalSortingZa size={20} /> }
                    </div>
                    { searchResults.map((patientsList, i) => {
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
                    })}
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