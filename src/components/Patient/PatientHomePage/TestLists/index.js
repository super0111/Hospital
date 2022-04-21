import React, { useState } from 'react'
import classes from "./TestLists.module.css"
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";

const TestLists = (props) => {
    const { testList, setTestList } = props;

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
            { testList.length !=0 ? testList.map((test, i) => {
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
    )
}
export default TestLists