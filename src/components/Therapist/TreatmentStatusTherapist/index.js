import React, { useState, useEffect } from "react"
import classes from "./TreatmentStatusTherapist.module.css"
import config from "../../../config";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const tests = [
    { patient_id: 1, test_id: 1, date: "2020/12/13", foodguidelines: "aaaaa", status: "New", status_comment: "The therapist entered a new test and the patient was required to confirm" },
    { patient_id: 2, test_id: 2, date: "2020/12/2", foodguidelines: "asdf", status: "Planned", status_comment: "A future test approved by the patient" },
    { patient_id: 3, test_id: 3, date: "2020/12/26", foodguidelines: "asdf", status: "Done ", status_comment: "The test was performed correctly, awaiting the therapist's response" },
    { patient_id: 4, test_id: 4, date: "2020/12/19", foodguidelines: "asdf", status: "Problem", status_comment: "The test was performed not correctly" },
    { patient_id: 5, test_id: 5, date: "2020/12/14", foodguidelines: "asdf", status: "Completed ", status_comment: "The therapist confirmed the results and gave further instruction" },
    { patient_id: 6, test_id: 6, date: "2020/12/17", foodguidelines: "asdf", status: "Planned", status_comment: "A future test approved by the patient" },
    { patient_id: 7, test_id: 7, date: "2020/12/12", foodguidelines: "asdf", status: "Problem", status_comment: "The test was performed not correctly" },
]

const TreatmentStatusTherapist = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    useEffect( () => {
        console.log("sdfsdsfd")
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        fetchPosts();
    }, []);
    return (
        <div className={classes.treatmentStatusTherapist}>
            <div className={classes.patientList}>
                <div className={classes.title}>Patients Lists</div>
                { patientsLists.map((patientsList) => {
                    return (
                        <div key={patientsList._id} className={classes.patient_item}>
                            <img className={classes.avatar} src={patientsList.picture} />
                            <div className={classes.patient_name}>{patientsList.fullname}</div>
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
                    <div className={classes.statusItem_title}>Test Status</div>
                    <div className={classes.statusItem_title}>Actions</div>
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
                                {test.foodguidelines}
                            </div>
                            <div className={classes.text}>
                                {test.status}
                                <span class={classes.tooltiptext}>{test.status_comment}</span>
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