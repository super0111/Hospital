import * as React from 'react';
import classes from "./addTest.module.css"
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
import {addTests} from "../../../apis/addTests"
import { FcCalendar, FcPortraitMode, FcDocument, FcFlowChart, FcAcceptDatabase, FcBusinessContact, FcAddImage, FcDeleteDatabase } from "react-icons/fc";

const AddTest = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    const [ patientTests, setTests ] = useState([])
    const [ testName, setTestName ] = useState("")
    const [ useTests ,setUseTests ] = useState([])
    const [ value, setValue ] = React.useState(new Date('2022-04-10T21:11:54'))
    const [ testId, setTestId ] = useState("")
    const [ patientSelectValue, setPatientSelectValue ] = useState()
    const [ testSelectValue, setTestSelectValue ] = useState("new")
    const [ usedTestSelect, setUsedTestSelect ] = useState("")

    const [ allergiesCheckValue, setAllergiesCheck ] = useState({checked:false})
    const [ allergiesValue, setAllergiesValue ] = useState("false")
    const [ allergies, setAllergies ] = useState("")
    const [ foodName, setFoodName ] = useState("")
    const [ amountTypeCheck, setAmountTypeCheck ] = useState({checked:false})
    const [ whightAmountValue, setWhightAmountValue ] = useState("")
    const [ whightAmountUnits, setWhightAmountUnits ] = useState("gram")
    const [ unitsAmountValue, setUnitsAmountValue ] = useState("")
    const [ eatTimeValue, setEatTime ] = useState("")
    const [ eatTimeUnits, setEatTimeUnits ] = useState("hours")
    const [ addInstructions, setAddInstructions ] = useState("")
    const [ addMore, setAddmore ] = useState(1)
    const socketRef = useRef();

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        fetchPosts();
    }, []);

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTests(tests);
        };
        fetchPosts();
    }, []);

    const handleChange = (newValue) => {
      setValue(newValue);
      setAddmore(1)
    };

    const handlePatientSelectChange = (e) => {
        setAddmore(1)
        setPatientSelectValue(e.target.value);
        if( patientTests ) {
            const patients = patientTests.filter((item) => item.patient_name === e.target.value);
            setUseTests(patients)
            if(patients.length === 0) {
                setTestId(1);
            }
            else {
                setTestId(1 + patients.length)
            }
        }
    }

    const handleTestSelectChange = (e) => {
        setTestSelectValue(e.target.value);
        setAddmore(1)
        if(useTests) {
            const tests = useTests.find((item) =>( item.test_id == usedTestSelect ));
            setAllergies(tests?.allergies)
            setFoodName(tests?.foodName)
            setWhightAmountValue(tests?.whightAmountValue)
            setWhightAmountUnits(tests?.whightAmountUnits)
            setUnitsAmountValue(tests?.unitsAmountValue)
            setEatTime(tests?.eatTimeValue)
            setEatTimeUnits(tests?.eatTimeUnits)
            setAddInstructions(tests?.addInstructions)
        }
        if(e.target.value === "new") {
            setAllergies("")
            setFoodName("")
            setAllergiesValue("")
            setWhightAmountValue("")
            setWhightAmountUnits("")
            setUnitsAmountValue("")
            setEatTime("")
            setEatTimeUnits("")
            setAddInstructions("")
        }
    }

    const handleTestName = (e) => {
        setTestName(e.target.value)
        setAddmore(1)
    }

    useEffect(() => {
        if(useTests && useTests.length > 0) {
            setUsedTestSelect(useTests[0].test_id);
        }
    }, [useTests]);

    const handleUsedTestSelectChange = (e) => {
        setAddmore(1)
        setUsedTestSelect(e.target.value)
        if(useTests) {
            const tests = useTests.find((item) =>( item.test_id == usedTestSelect ));
            setAllergies(tests?.allergies)
            setFoodName(tests?.foodName)
            setWhightAmountValue(tests?.whightAmountValue)
            setWhightAmountUnits(tests?.whightAmountUnits)
            setUnitsAmountValue(tests?.unitsAmountValue)
            setEatTime(tests?.eatTimeValue)
            setEatTimeUnits(tests?.eatTimeUnits)
            setAddInstructions(tests?.addInstructions)
        }
    }

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

    
    useEffect(() => {
        socketRef.current = io(config, { transports : ['websocket'] });
    }, []);

    const addTest = (event) => {
        event.preventDefault();
        if(allergiesCheckValue.checked === false) {
            setAllergies("false")
        } else {
            setAllergies(allergiesValue)
        }
        const formData = {
            patient_name : patientSelectValue,
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
        setAddmore(1)
        addTests(formData)
        .then((res) => {
            socketRef.current.emit("addTest", res)
            setTestId(testId+1)
            setTestName("")
            setPatientSelectValue("")
            setAllergiesValue("")
            setFoodName("")
            setWhightAmountValue("")
            setUnitsAmountValue("")
            setEatTime("")
            setAddInstructions("")
            if(res.message === "success") {
                toast.info("Test Add Successfull!")
            }
            else {
                toast.error(res.AddTest)
            }
        })
        .catch((error) => console.log(error));
    }

    const handleAddMore = () => {
        setAddmore(addMore+1)
    }

    const hanldeCancel = () => {
        setAddmore(addMore-1)
    }

    return (
        <div className={classes.addTest}>
            <div className={classes.title}>ADD TEST</div>
            <div className={classes.body}>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcPortraitMode size={30} />
                        <div className={classes.patient_name}>
                            Patient Name
                        </div>
                    </div>
                    <select onChange={handlePatientSelectChange} className={classes.select}>
                        <option selected disabled>Paitents List</option>
                        { patientsLists.map((patientsList, i) => {
                            return (
                                <option value={patientsList.fullname} key={i}>{patientsList.fullname}</option>
                            )
                        }) }
                    </select>
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
                    <input className={classes.testName_input} type="text" placeholder='Test Name' onChange={handleTestName} />
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
                        <div className={classes.testSelect_text}>Test New/Use</div>
                    </div>
                    <div  className={classes.testSelect_field}>
                        <select onChange={handleTestSelectChange} className={classes.testSelect}>
                            <option value="new">New</option>
                            <option value="use">Use</option>
                        </select>
                        { testSelectValue === "use" ?
                            <div className={classes.useTestSelect_field}>
                                <div className={classes.useTestSelect_name}>Select Used Test :</div>
                                <select onChange={handleUsedTestSelectChange} className={classes.useTestSelect}>
                                    {useTests.map((useTest, i) => (
                                        <option value={useTest.test_id} key={i}>{useTest.test_id}</option>
                                    ))}
                                </select>
                            </div> : ""
                        }
                    </div>
                </div>
                { testSelectValue === "new" ?
                    <>
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
                            {[...Array(addMore)].map((x, i) =>
                                <div key={i} className={classes.foodInstruction}>
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
                                            <span className={classes.amount_type_name}>Whight</span>
                                            <Switch onChange={handleAmountTypeChange} checked={amountTypeCheck.checked} />
                                            <span className={classes.amount_type_name}>Unites</span>
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
                                                value={unitsAmountValue}
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
                                            <select onChange={handleEatTimeUnitsChange} className={classes.eat_time_units}>
                                                <option value="hours">Hours</option>
                                                <option value="minutes">Minuites</option>
                                                <option value="seconds">Seconds</option>
                                            </select>
                                            before the test.
                                        </div>
                                    </div>
                                    <div className={classes.amount_name}>
                                        Additional Instructions 
                                    </div>
                                    <textarea 
                                        rows={4} 
                                        cols={8} 
                                        onChange={handleAddInstructionsChange} 
                                        value={addInstructions} 
                                        className={classes.food_input} 
                                        placeholder="Food Instructions">
                                    </textarea>
                                </div>
                            )}
                                <div className={classes.addCancelField}>
                                    <div className={classes.addMore} onClick={handleAddMore}>
                                        <FcAddImage size={20} /> 
                                        <span style={{marginLeft:"5px", marginTop: "2px"}}>Add More</span>
                                    </div>
                                    <div className={classes.addMore} onClick={hanldeCancel}>
                                        <FcDeleteDatabase size={20} />
                                        <span style={{marginLeft: "5px", marginTop: "2px"}}>Cancel</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </>
                    : 
                    <>
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
                                                value={allergies}
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
                                {[...Array(addMore)].map((x, i) =>
                                    <div key={i} className={classes.foodInstruction}>
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
                                                    value={unitsAmountValue}
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
                                                hours before the test.
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
                                )}
                                 <div className={classes.addCancelField}>
                                    <div className={classes.addMore} onClick={handleAddMore}>
                                        <FcAddImage size={20} /> 
                                        <span style={{marginLeft:"5px", marginTop: "2px"}}>Add More</span>
                                    </div>
                                    <div className={classes.addMore} onClick={hanldeCancel}>
                                        <FcDeleteDatabase size={20} />
                                        <span style={{marginLeft: "5px", marginTop: "2px"}}>Cancel</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                
            </div>
           <button onClick={addTest} className={classes.btn}>Add Test</button>
           <ToastContainer /> 
        </div>
    )
}
export default AddTest