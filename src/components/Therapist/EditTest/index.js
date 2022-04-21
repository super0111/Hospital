import * as React from 'react';
import classes from "./EditTest.module.css"
import { useState, useEffect, useRef } from "react"
import config from "../../../config";
import { io } from "socket.io-client";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editTest } from "../../../apis/addTests"
import { FcCalendar, FcPortraitMode, FcDocument, FcFlowChart, FcAcceptDatabase, FcBusinessContact } from "react-icons/fc";
import { useLocation } from 'react-router-dom';

const EditTest = () => {
    const location = useLocation();
    const id = location.state;

    const [ test, setTest ] = useState([])
    const [ testName, setTestName ] = useState("")
    const [ value, setValue] = useState(new Date('2022-04-10T21:11:54'))
    const [ testId, setTestId ] = useState("")
    const [ patientSelectValue, setPatientSelectValue ] = useState()

    const [allergiesCheckValue, setAllergiesCheck] = useState({checked:false})
    const [allergiesValue, setAllergiesValue] = useState("false")
    const [allergies, setAllergies] = useState("")
    const [foodName, setFoodName] = useState("")
    const [amountTypeCheck, setAmountTypeCheck ] = useState({checked:false})
    const [whightAmountValue, setWhightAmountValue] = useState("")
    const [whightAmountUnits, setWhightAmountUnits] = useState("gram")
    const [unitsAmountValue, setUnitsAmountValue] = useState("")
    const [eatTimeValue, setEatTime ] = useState("")
    const [eatTimeUnits, setEatTimeUnits ] = useState("hours")
    const [addInstructions, setAddInstructions ] = useState("")

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            const test = tests.find((item) => (
                item._id === id
            ))
            setTestId(test.test_id)
            setPatientSelectValue(test.patient_name)
            setTestName(test.testName)
            setAllergies(test.allergies)
            setFoodName(test.foodName)
            setValue(test.date)
            setWhightAmountValue(test.whightAmountValue)
            setWhightAmountUnits(test.whightAmountUnits)
            setUnitsAmountValue(test.unitsAmountValue)
            setEatTime(test.eatTimeValue)
            setEatTimeUnits(test.eatTimeUnits)
            setAddInstructions(test.addInstructions)
            setTest(test);
        };
        fetchPosts();
    }, []);

    const handleTestName = (e) => {
        setTestName(e.target.value)
    };
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleAllergiesSwitchChange = (checked) => {
        setAllergiesCheck({ checked });
    }
    const handleAllergiesChange = (e) => {
        setAllergiesValue(e.target.value)
    }
    const handleFoodNameChange = (e) => {
        setFoodName(e.target.value)
    }
    const handleAmountTypeChange = (checked) => {
        setAmountTypeCheck({ checked });
    }
    const handleWhightAmountValue = (e) => {
        setWhightAmountValue(e.target.value)
    }
    const handleWhightAmountUnits = (e) => {
        setWhightAmountUnits(e.target.value)
    }
    const handleUnitsAmountValue = (e) => {
        setUnitsAmountValue(e.target.value)
    }
    const handleEatTimeChange = (e) => {
        setEatTime(e.target.value)
    }
    const handleEatTimeUnitsChange = (e) => {
        setEatTimeUnits(e.target.value)
    }
    const handleAddInstructionsChange = (e) => {
        setAddInstructions(e.target.value)
    }

    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config, { transports : ['websocket'] });
    }, []);

    const testEdit = (event) => {
        event.preventDefault();
        if(allergiesCheckValue.checked === false) {
            setAllergies("false")
        } else {
            setAllergies(allergiesValue)
        }
        const formData = {
            id: id,
            patient_name : test.patient_name,
            test_id : testId,
            testName : testName,
            date :  value,
            allergies : allergiesValue,
            foodName : foodName,
            whightAmountValue : whightAmountValue,
            whightAmountUnits : whightAmountUnits,
            unitsAmountValue : unitsAmountValue,
            eatTimeValue : eatTimeValue,
            eatTimeUnits : eatTimeUnits,
            addInstructions : addInstructions,
        }
        editTest(formData)
        .then((res) => {
            socketRef.current.emit("editTest", res.test)
            if(res.message === "success") {
                toast.info("Test Edit Successfull!")
            }
            else {
                toast.error(res.AddTest)
            }
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className={classes.editTest}>
            <div className={classes.title}>Edit TEST</div>
            <div className={classes.body}>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcPortraitMode size={30} />
                        <div className={classes.patient_name}>
                            Patient Name
                        </div>
                    </div>
                    <div className={classes.patient_name_value}>{patientSelectValue}</div>
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcFlowChart size={30} />
                        <div className={classes.id_name}>Test ID</div>
                    </div>
                    <div className={classes.id_value}>{testId}</div>
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcBusinessContact size={30} />
                        <div className={classes.id_name}>Test Name</div>
                    </div>
                    <input 
                        className={classes.testName_input} 
                        type="text" 
                        placeholder='Test Name' 
                        onChange={handleTestName} 
                        value={testName}    
                    />
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcCalendar size={30} />
                        <div className={classes.date_name}>Test Date</div>
                    </div>
                    <div className={classes.datePicker}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Date&Time"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcAcceptDatabase size={30} />
                        <div className={classes.testSelect_text}>Patient Allergic</div>
                    </div>
                    <div className={classes.checkbox} value={allergiesCheckValue}>
                        <Switch onChange={handleAllergiesSwitchChange} checked={allergiesCheckValue.checked} />
                        { allergiesCheckValue.checked === true ? 
                            <div className={classes.allergies_textField}>
                                <span className={classes.allergic_text}>
                                    Note that this patient is allergic to 
                                    <input type="text" 
                                        value={allergies === "false" ? "" : allergies}
                                        onChange={handleAllergiesChange} 
                                        className={classes.allergies_input} 
                                        placeholder="Patient Allergies" 
                                    />
                                    , do not instruct patient to eat this type of food!
                                </span>
                            </div> : ""
                        }
                    </div>
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcDocument size={30} />
                        <div className={classes.food_name}>Food instructions</div>
                    </div>
                    <div className={classes.foodInstruction_field}>
                        <div className={classes.foodIns_field}>
                            <div className={classes.foodIns_name}>Food:</div>
                            <input
                                value={foodName}
                                onChange={handleFoodNameChange}
                                className={classes.foodIns_value}
                                type="text"
                                placeholder="Food Name"
                            />
                        </div>
                        <div className={classes.amount_field}>
                            <div className={classes.amount_name}>Amount Type: </div>
                            <div className={classes.amount_type}>
                                <span className={classes.amount_type_name}>
                                    Whight
                                </span>
                                <Switch onChange={handleAmountTypeChange} checked={amountTypeCheck.checked} />
                                <span className={classes.amount_type_name}>
                                    Unites
                                </span>
                            </div>
                        </div>
                        { amountTypeCheck.checked === false ?
                            <div className={classes.amount_value_field}>
                                <input  
                                    value={whightAmountValue}
                                    onChange={handleWhightAmountValue}
                                    type="text" 
                                    placeholder="Amount Numbers" 
                                    className={classes.amount_value} 
                                />
                                <select onChange={handleWhightAmountUnits} className={classes.amount_units}>
                                    <option value="gram">gram</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                            :
                            <div className={classes.amount_value_field}>
                                <input 
                                    value={unitsAmountValue ? unitsAmountValue : "" }
                                    onChange={handleUnitsAmountValue} 
                                    type="text" 
                                    placeholder="Amount Numbers" 
                                    className={classes.amount_value} 
                                />
                            </div>
                        }
                        <div className={classes.eat_time_field}>
                            <div className={classes.eat_time_name}>When to eat?</div>
                            <div className={classes.eat_time_text}>
                                <input
                                    value={eatTimeValue}
                                    onChange={handleEatTimeChange}
                                    type="text"
                                    placeholder="time"
                                    className={classes.eat_time_value} 
                                />
                                {/* <select onChange={handleEatTimeUnitsChange} className={classes.eat_time_units}>
                                    <option value="hours">Hours</option>
                                    <option value="mins">Minuites</option>
                                    <option value="seconds">Seconds</option>
                                </select> */}
                                {eatTimeUnits} before the test.
                            </div>
                        </div>
                        <div className={classes.amount_name}>
                            Additional Instructions 
                        </div>
                        <textarea 
                            rows={4} 
                            cols={8}
                            value={addInstructions}
                            onChange={handleAddInstructionsChange} 
                            className={classes.food_input}
                            placeholder="Food Instructions"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
           <button onClick={testEdit} className={classes.btn}>Edit Test</button>
           <ToastContainer /> 
        </div>
    )
}
export default EditTest