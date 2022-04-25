import { useState, useEffect } from 'react'
import classes from "./NextSession.module.css"
import { FcAlarmClock } from 'react-icons/fc'


const NextSession = (props) => {
    const [ test, setTest ] = useState([])
    const { testList } = props;
    
    useEffect(() => {
        if(testList.length > 1) {
            setTest(testList[1])
        } else {
            setTest(testList[0])
        }
    }, [testList])

    return(
        <div className={classes.nextSession}>
            <div className={classes.header}>
                <div className={classes.header_title}>Next Session Details</div>
                <div className={classes.date}>
                <input
                    className={classes.timePicker}
                    type="datetime-local" 
                    id="meeting-time"
                    name="meeting-time" 
                    value="2022-04-12T19:30"
                />
                </div>
            </div>
            <div className={classes.title}>
                {test?.testName}
            </div>
            <div className={classes.text}>
                <FcAlarmClock size={30} />
                <span className={classes.text_value}>Eat {test?.eatTimeValue} minutes after morning</span> 
            </div>
            <div className={classes.btn_field}>
                <button className={classes.btn}>Start Session</button>
            </div>
        </div>
    )
}
export default NextSession