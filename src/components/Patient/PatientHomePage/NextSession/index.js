import { useState, useEffect } from 'react'
import classes from "./NextSession.module.css"
import { FcAlarmClock } from 'react-icons/fc'


const NextSession = (props) => {
    const [ test, setTest ] = useState([])
    const [ formData, setFormData ] = useState([])
    const { testList } = props;
    
    useEffect(() => {
        if(testList.length > 1) {
            setTest(testList[1])
        } else {
            setTest(testList[0])
        }
    }, [testList])

    useEffect(() => {
        if( test?.formString === undefined ) {
            setFormData([])
            return
        }
        const formDatas = JSON.parse(test?.formString)
        setFormData(formDatas)
    }, [test?.formString])

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
                <span className={classes.foodName}>Test Name</span> : {test?.testName}
            </div>
            <div className={classes.text}>
                <FcAlarmClock size={30} />
                <span className={classes.text_value}>
                    { formData.map((formData, i) => (
                        <div key={i} className="">
                            <span className={classes.foodName}>{formData.food}</span>
                            {" "}
                            <span className={classes.foodName_con}>(Food Name)</span> 
                            :  Eat {formData?.eatTimeValue} {formData?.eatTimeUnits} after morning
                        </div> 
                    ))}
                </span>
            </div>
            <div className={classes.btn_field}>
                <button className={classes.btn}>Start Session</button>
            </div>
        </div>
    )
}
export default NextSession