import React, { useState } from 'react'
import classes from "./PatientDetails.module.css"
import { treatmentChange } from "./../../../../apis/registerPatient"

const PatientDetails = (props) => {
    const selectPatientList = props.selectPatientList;
    const selectPatientTests = props.selectPatientTests;
    const setSelectPatientList = props.setSelectPatientList;
    const [ treatmentStatus, setTreatmentStatus ] = useState("")
    
    const handleHoldTreatment = () => {
        const id = selectPatientList._id;
        const treatmentStatus = "hold"
        const formData = {
            id,
            treatmentStatus,
        }
        treatmentChange(formData)
        .then((res) => {
            setSelectPatientList(res.patient)
        })
        .catch((error) => console.log(error));
    }

    const handleHoldCancelTreatment = () => {
        const id = selectPatientList._id;
        let treatmentStatus = "New"
        if(selectPatientTests && selectPatientTests.length > 0) {
            treatmentStatus = "In progress";
        }
        const formData = {
            id,
            treatmentStatus,
        }
        treatmentChange(formData)
        .then((res) => {
            console.log("res, res", res)
            setSelectPatientList(res.patient)
        })
        .catch((error) => console.log(error));
    }
    return(
        <div className={classes.patientDetails}>
            <div className={classes.title}>Patient Details</div>
            <div className={classes.body}>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Name</div>
                    <div className={classes.value}>
                        {selectPatientList.fullname}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Email</div>
                    <div className={classes.value}>
                        {selectPatientList.email}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Birthday</div>
                    <div className={classes.value}>
                        {selectPatientList.birthday}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Gender</div>
                    <div className={classes.value}>
                        {selectPatientList.gender}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Phone Number</div>
                    <div className={classes.value}>
                        {selectPatientList.phoneNumber}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Height</div>
                    <div className={classes.value}>
                        {selectPatientList.height}
                    </div>
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.name}>Patient Weight</div>
                    <div className={classes.value}>
                        {selectPatientList.weight}
                    </div>
                </div>
                <div className={classes.patient_info_field}>
                    <div className={classes.name}>Patient Information</div>
                    <div className={classes.patient_info}>
                        {selectPatientList.information}
                    </div>
                </div>
                <div className={classes.treatmentChange_field}>
                    <div className={classes.name}>Patient Treatment Status Change</div>
                    <div className={classes.holdBtn_field}>
                        <button className={classes.treatmentChange} onClick={handleHoldTreatment}>Hold</button>
                        <button className={classes.treatmentChange} onClick={handleHoldCancelTreatment}>Hold Cancel</button>
                    </div>
                </div>
            </div>
            <div className={classes.patientTreatment}>
                <div className={classes.treatmentName}>Patient Treatment Status</div>
                { selectPatientList ? (
                    selectPatientList.treatmentStatus === "new" ? 
                    <div className={classes.treatmentStatus_new}>{selectPatientList.treatmentStatus}</div> :
                    selectPatientList.treatmentStatus === "hold" ?
                    <div className={classes.treatmentStatus_hold}>{selectPatientList.treatmentStatus}</div> :
                    <div className={classes.treatmentStatus_progress}>{selectPatientList.treatmentStatus}</div>
                    ) : <div className={classes.noStatus}>no status</div>
                }
            </div>
        </div>
    )
}
export default PatientDetails