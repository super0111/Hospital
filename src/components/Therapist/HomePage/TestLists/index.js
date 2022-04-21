import React, { useState } from 'react'
import classes from "./TestLists.module.css"
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcDownload, FcUpload } from "react-icons/fc";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";

const TestLists = (props) => {
    const { patientsLists, searchResults, testLists, setTestList, handlePatientClick, isActive } = props;

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
                    <div className={classes.header_title}>Id</div>
                    <div 
                        className={classes.header_title}
                        onClick={handleDateSort}
                    >
                        Date {dateSort === true ? <BiArrowFromTop color='white' size={22} /> : <BiArrowToTop color='white' size={22} />}
                    </div>
                    <div 
                        className={classes.header_title}
                        onClick={handleDecSort}
                    >
                        Description {decSort === true ? <BiArrowFromTop color='white' size={22} /> : <BiArrowToTop color='white' size={22} />}
                    </div>
                    <div 
                        className={classes.header_title} 
                        onClick={handleStatusSort}
                    >
                        Status{statusSort === true ? <BiArrowFromTop color='white' size={22} /> : <BiArrowToTop color='white' size={22} />}
                    </div>
                </div>
                { testLists.length !=0 ? testLists.map((test, i) => {
                    return(
                        <div key={i} className={classes.item}>
                            <div className={classes.item_value}>{i+1}</div>
                            <div className={classes.item_value}>{test.date}</div>
                            <div className={classes.item_value}>{test.testName}</div>
                            <div className={classes.item_value}>
                                { 
                                    // test.canceled === true ?
                                    // <div ref={ref} className={classes.canceledText}>Canceled</div> 
                                    // : 
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