import React, { useState, useEffect } from 'react'
import classes from "./TestLists.module.css"
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcDownload, FcUpload } from "react-icons/fc";
import Moment from 'moment';

const TestLists = (props) => {
    const selectPatientTests = props.selectPatientTests;
    const [ testLists, setTestList ] = useState([])
    const [ isActive, setIsActive ] = useState(false)
    const [ sortIcon, setSortIcon ] = useState(false)
    const [ dateSort, setDateSort ] = useState(false)
    const [ statusSort, setStatusSort ] = useState(false)
    const [ searchResults, setSearchResults ] = useState([])

    const handleDateSort = () => {
        setDateSort(!dateSort)
        if(dateSort === true) {
            const values = selectPatientTests.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateA - dateB
            });
            setTestList(values)
        } else {
            const values = selectPatientTests.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateB - dateA
            });
            setTestList(values)
        }
    }
    const handleStatusSort = () => {
        setStatusSort(!statusSort)
        if(statusSort === true) {
            selectPatientTests.sort(function(a, b){
                if(a.confirmed < b.confirmed) { return -1; }
                if(a.confirmed > b.confirmed) { return 1; }
                return 0;
            })
        } else {
            selectPatientTests.sort(function(a, b){
                if(a.confirmed > b.confirmed) { return -1; }
                if(a.confirmed < b.confirmed) { return 1; }
                return 0;
            })
        }
    }
    return (
        <div className={classes.testLists}>
            <div className={classes.title}>Patient Test Lists</div>
                <div className={classes.body}>
                    <div className={classes.statusItem_title_field}>
                        <div className={classes.statusItem_title_id}>Test ID</div>
                        <div className={classes.statusItem_title}>Test Name</div>
                        <div className={classes.statusItem_title} onClick={handleDateSort}>
                            Test Date{dateSort === true? <FcUpload size={18} /> : <FcDownload size={18} />}
                        </div>
                        <div className={classes.statusItem_title}>Food Allergic</div>
                        <div className={classes.statusItem_title}>Food Name</div>
                        <div className={classes.statusItem_title}>Amount Number</div>
                        <div className={classes.statusItem_title}>Eat Time</div>
                        <div className={classes.statusItem_title}>Food Instructions</div>
                        <div className={classes.statusItem_title} onClick={handleStatusSort}>
                            Status{statusSort === true ? <FcUpload size={18} /> : <FcDownload size={18} />} 
                        </div>
                    </div>
                    <div className={classes.item_body}>
                        { selectPatientTests.length !=0 ? selectPatientTests.map((test, i) => {
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
                                                    <div className={classes.text}>
                                                        {formData.food}
                                                    </div>
                                                    <div className={classes.formData_text}>
                                                        {formData.unitsAmountValue}
                                                        {formData.whightAmountValue} {" "}
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
        </div>
    )
}
export default TestLists