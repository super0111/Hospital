import classes from "./NextSession.module.css"
import { FcAlarmClock } from 'react-icons/fc'

const NextSession = (props) => {
    const { testLists } = props;
    const testList = testLists[1];
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
                {testList?.testName}
            </div>
            <div className={classes.text}>
                <FcAlarmClock size={30} />
                <span className={classes.text_value}>Eat {testList?.eatTimeValue} {testList?.eatTimeUnits} after morning</span> 
            </div>
            <div className={classes.btn_field}>
                <button className={classes.btn}>Start Session</button>
            </div>
        </div>
    )
}
export default NextSession