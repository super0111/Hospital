import classes from "./PatientDetails.module.css"

const PatientDetails = (props) => {
    const selectPatientList = props.selectPatientList;
    console.log("selectPatientList", selectPatientList)
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
              
            </div>
            <div className={classes.patientTreatment}>
                <div className={classes.treatmentName}>Patient Treatment Status</div>
                <div className={classes.treatmentStatus}>In Progress</div>
            </div>
        </div>
    )
}
export default PatientDetails