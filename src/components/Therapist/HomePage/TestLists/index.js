import React, { useState } from 'react'
import classes from "./TestLists.module.css"
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcDownload, FcUpload } from "react-icons/fc";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import Moment from 'moment';

const TestLists = (props) => {
    const { patientsLists, searchResults, testLists, setTestList, handlePatientClick, isActive, statusUpdate } = props;
    const [ sortIcon, setSortIcon ] = useState(false)
    const [ dateSort, setDateSort ] = useState(false)
    const [ statusSort, setStatusSort ] = useState(false)
    const [ decSort, setDecSort ] = useState(false)

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

    const handleDecSort = () => {
        setDecSort(!decSort)
        if(decSort === true) {
            testLists.sort(function(a, b){
                if(a.testName < b.testName) { return -1; }
                if(a.testName > b.testName) { return 1; }
                return 0;
            })
        } else {
            testLists.sort(function(a, b){
                if(a.testName > b.testName) { return -1; }
                if(a.testName < b.testName) { return 1; }
                return 0;
            })
        }
    }

    return(
        <div className={classes.testLists}>
            <div className={classes.left}>
                <div className={classes.left_title}>Patients Lists</div>
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
            <div className={classes.right}>
                <div className={classes.right_title}>Patient Test Lists</div>
                <div className={classes.header}>
                    <div className={classes.statusItem_title_id}>Test ID</div>
                    <div className={classes.statusItem_title}>Test Name</div>
                    <div className={classes.statusItem_title} onClick={handleDateSort}>
                        Test Date{dateSort === true? <BiArrowFromBottom size={18} /> : <BiArrowToBottom size={18} />}
                    </div>
                    <div className={classes.statusItem_title}>Food Allergic</div>
                    <div className={classes.statusItem_title}>Food Name</div>
                    <div className={classes.statusItem_title}>Amount Number</div>
                    <div className={classes.statusItem_title}>Eat Time</div>
                    <div className={classes.statusItem_title}>Food Instructions</div>
                    <div className={classes.statusItem_title} onClick={handleStatusSort}>
                        Status{statusSort === true ? <BiArrowFromBottom size={18} color="white" /> : <BiArrowToBottom size={18} />} 
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
                                {Moment(test.date).format('MM-DD HH:mm')}
                            </div>
                            <div className={classes.text_allergies}>
                                { test.patientAllergies ? test.patientAllergies : "No" }
                            </div>
                            <div className={classes.formDataField}>
                                {JSON.parse(test.formString).map((formData, i) => (
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
                            <div className={classes.status_field}>
                                {   (statusUpdate === true && i === testLists.length-1 ) ?
                                    <div className={classes.planedText}>Planed</div> 
                                    :
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
export default TestLists