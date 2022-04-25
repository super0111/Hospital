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
import { FcCalendar, FcPortraitMode, FcDocument, FcFlowChart, FcAcceptDatabase, FcBusinessContact, FcAddImage } from "react-icons/fc";

import { useLocation, useHistory } from 'react-router-dom';

const EditTest = () => {
    const location = useLocation();
    const id = location.state;
    let history = useHistory();
    const socketRef = useRef();

    const [ test, setTest ] = useState([])
    const [ testName, setTestName ] = useState("")
    const [ value, setValue] = useState(new Date('2022-04-10T21:11:54'))
    const [ testId, setTestId ] = useState("")
    const [ patientSelectValue, setPatientSelectValue ] = useState()

    const [allergiesCheckValue, setAllergiesCheck] = useState({checked:false})
    const [allergiesValue, setAllergiesValue] = useState("false")
    const [allergies, setAllergies] = useState("")
    const [amountTypeCheck, setAmountTypeCheck ] = useState({checked:false})
    const [formData, setFormData] = useState([])
    const [forms, setForms] = useState([{
        food: '', 
        whightAmountValue: '', 
        whightAmountUnits: 'gram', 
        unitsAmountValue: '', 
        eatTimeValue: '', 
        eatTimeUnits: 'hours', 
        addInstructions: '',
    }]);

    const handleSetForms = (index, key, value)  => {
        setForms(forms.map((item, id) => {
            if(index == id)
                return { ...item, [key]: value };
            else 
                return item;
        }));
    }
    const handleAddMoreForm = () => {
        setForms([...forms, {
            food: '', 
            whightAmountValue: '',
            whightAmountUnits: 'gram', 
            unitsAmountValue: '', 
            eatTimeValue: '', 
            eatTimeUnits: 'hours', 
            addInstructions: '',
        }]);
    }
    const handleInputChange = (index, e) => {
        handleSetForms(index, e.target.name, e.target.value);
    }

    const handleAddMore = () => {
        handleAddMoreForm();
    }

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            const test = tests.find((item) => (
                item._id === id
            ))
            const formTest = JSON.parse(test.formString)
            setTestId(test.test_id)
            setPatientSelectValue(test.patient_name)
            setTestName(test.testName)
            setAllergies(test.allergies)
            setValue(test.date)
            setForms(formTest)
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
    const handleAmountTypeChange = (checked) => {
        setAmountTypeCheck({ checked });
    }   

    useEffect(() => {
        socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, []);

    const testEdit = (event) => {
        event.preventDefault();
        if(allergiesCheckValue.checked === false) {
            setAllergies("false")
        } else {
            setAllergies(allergiesValue)
        }
        const formString = JSON.stringify(forms);
        const formData = {
            id: id,
            patient_name : test.patient_name,
            test_id : testId,
            testName : testName,
            date :  value,
            allergies : allergiesValue,
            formString : formString,
        }
        editTest(formData)
        .then((res) => {
            console.log("test eidtdd", res)
            const editNotify = `A test for ${test.patient_name} has been edited`
            const name = test.patient_name
            socketRef.current.emit("editTest", res.data)
            socketRef.current.emit("notifications", editNotify, name)
            if(res.success === true) {
                toast.info("Test Edit Successfull!")
                history.push("/treatmentStatus_therapist");
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
                        {forms.map((item, key) => {
                            return (
                                <div key={key} className={classes.foodInstruction}>
                                    <div className={classes.foodIns_field}>
                                        <div className={classes.foodIns_name}>Food:</div>
                                        <input
                                            value={item.food}
                                            onChange={(e) => {handleInputChange(key, e)}}
                                            name='food'
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
                                                value={item.whightAmountValue}
                                                onChange={(e) => {handleInputChange(key, e)}} 
                                                name='whightAmountValue'
                                                type="text" 
                                                placeholder="Amount Numbers" 
                                                className={classes.amount_value} 
                                            />
                                            <select 
                                                onChange={(e) => {handleInputChange(key, e)}} 
                                                name='whightAmountUnits'
                                                className={classes.amount_units}
                                            >
                                                <option value="gram">gram</option>
                                                <option value="kg">kg</option>
                                            </select>
                                        </div>
                                        :
                                        <div className={classes.amount_value_field}>
                                            <input 
                                                value={item.unitsAmountValue}
                                                onChange={(e) => {handleInputChange(key, e)}} 
                                                name='unitsAmountValue'
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
                                                value={item.eatTimeValue}
                                                onChange={(e) => {handleInputChange(key, e)}}
                                                name='eatTimeValue'
                                                type="text"
                                                placeholder="time"
                                                className={classes.eat_time_value} 
                                            />
                                            {/* <select onChange={handleEatTimeUnitsChange} className={classes.eat_time_units}>
                                                <option value="hours">Hours</option>
                                                <option value="mins">Minuites</option>
                                                <option value="seconds">Seconds</option>
                                            </select> */}
                                            {item.eatTimeUnits} before the test.
                                        </div>
                                    </div>
                                    <div className={classes.amount_name}>
                                        Additional Instructions 
                                    </div>
                                    <textarea 
                                        rows={4} 
                                        cols={8}
                                        onChange={(e) => {handleInputChange(key, e)}}
                                        value={item.addInstructions} 
                                        name='addInstructions'
                                        className={classes.food_input}
                                        placeholder="Food Instructions"
                                    >
                                    </textarea>
                                </div>
                            );
                        })}
                        <div className={classes.addMore} onClick={handleAddMore}>
                            <FcAddImage size={20} /> 
                            <span style={{marginLeft:"5px", marginTop: "2px"}}>Add More</span>
                        </div>
                    </div>
                </div>
            </div>
           <button onClick={testEdit} className={classes.btn}>Edit Test</button>
           <ToastContainer /> 
        </div>
    )
}
export default EditTest