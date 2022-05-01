import React, { useState } from 'react'
import classes from "./TestLists.module.css"
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import Moment from 'moment';

const TestLists = (props) => {
    const { testList, setTestList, confirmed } = props;

    const [ dateSort, setDateSort ] = useState(false)
    const [ statusSort, setStatusSort ] = useState(false)
    const [ decSort, setDecSort ] = useState(false)

    const handleDateSort = () => {
        setDateSort(!dateSort)
        if(dateSort === true) {
            const values = testList.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateA - dateB
            });
            setTestList(values)
        } else {
            const values = testList.sort(function (a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date)
                return dateB - dateA
            });
            setTestList(values)
        }
    }

    const handleStatusSort = () => {
        setStatusSort(!statusSort)
        if(statusSort === true) {
            testList.sort(function(a, b){
                if(a.confirmed < b.confirmed) { return -1; }
                if(a.confirmed > b.confirmed) { return 1; }
                return 0;
            })
        } else {
            testList.sort(function(a, b){
                if(a.confirmed > b.confirmed) { return -1; }
                if(a.confirmed < b.confirmed) { return 1; }
                return 0;
            })
        }
    }

    const handleDecSort = () => {
        setDecSort(!decSort)
        if(decSort === true) {
            testList.sort(function(a, b){
                if(a.testName < b.testName) { return -1; }
                if(a.testName > b.testName) { return 1; }
                return 0;
            })
        } else {
            testList.sort(function(a, b){
                if(a.testName > b.testName) { return -1; }
                if(a.testName < b.testName) { return 1; }
                return 0;
            })
        }
    }

    return(
        <div className={classes.testLists}>
            <div className={classes.right_title}>Patient Test Lists</div>
            <div className={classes.header}>
                <div className={classes.statusItem_title}>Test ID</div>
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
                    Status{statusSort === true ? <BiArrowFromBottom size={18} /> : <BiArrowToBottom size={18} />} 
                </div>
            </div>
            { testList.length !=0 ? testList.map((test, i) => {
                return(
                    <div key={i} className={classes.status_item}>
                        <div className={classes.text_id}>
                            {i+1}
                        </div>
                        <div className={classes.text}>
                            {test.testName}
                        </div>
                        <div className={classes.text}>
                            {Moment(test.date).format('YYYY-MM-DD HH:mm')}
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
    )
}
export default TestLists