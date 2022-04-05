import classes from "./TreatmentStatusPatient.module.css"
import React, { useState, useEffect } from "react"
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

const TreatmentStatusPatient = () => {

    const [ patientsLists, setPatientLists ] = useState([])
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        fetchPosts();
    }, []);

    return (
        <div className={classes.treatmentStatusPatient}>
            <div className={classes.patientStatus}>
                <div className={classes.title}> My treatment status</div>
                <div className={classes.statusItem_title_field}>
                    <div className={classes.statusItem_title}>Test ID</div>
                    <div className={classes.statusItem_title}>Test Date</div>
                    <div className={classes.statusItem_title}>Food Guidelines</div>
                    <div className={classes.statusItem_title}>Test Status</div>
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
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
export default TreatmentStatusPatient