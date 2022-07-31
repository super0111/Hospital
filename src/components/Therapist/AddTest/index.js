import classes from "./addTest.module.css"
import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import {notifyConfirmSave} from "../../../apis/notify"
import { FcCalendar, FcPortraitMode, FcDocument, FcFlowChart, FcAcceptDatabase, FcBusinessContact, FcAddImage, FcDeleteDatabase } from "react-icons/fc";

const AddTest = () => {
    let history = useHistory();
    const [ patientsLists, setPatientLists ] = useState([])
    const [ patientTests, setTests ] = useState([])
    const [ testName, setTestName ] = useState("")
    const [ useTests, setUseTests ] = useState([])
    const [ value, setValue ] = React.useState(new Date('2022-04-10T21:11:54'))
    const [ testId, setTestId ] = useState("")
    const [ patientSelectValue, setPatientSelectValue ] = useState()
    const [ patientAllergies, setPatientAllergies ] = useState("")
    const [ testSelectValue, setTestSelectValue ] = useState("new")
    const [ usedTestSelect, setUsedTestSelect ] = useState("")
    const [ allergiesCheckValue, setAllergiesCheck ] = useState({checked:false})
    const [ allergiesValue, setAllergiesValue ] = useState("false")
    const [ allergies, setAllergies ] = useState("")
    const [ amountTypeCheck, setAmountTypeCheck ] = useState({checked:false})
    const [ currentUserId, setCurrnetUserId ] = useState("")
    const socketRef = useRef();

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

    useEffect(() => {
        const userString = localStorage.getItem('token');
        if(userString) {
            const current_user = jwt_decode(userString);
            if(current_user.user) {
                setCurrnetUserId(current_user.user.id)
            }
        }
    }, []);
      
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            const current_patients = patients.filter(item => item.currentUserId === currentUserId)
            setPatientLists(current_patients);
        };
        fetchPosts();
    }, [currentUserId]);

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTests(tests);
        };
        fetchPosts();
    }, [patientTests]);

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    const handlePatientSelectChange = (e) => {
        setPatientSelectValue(e.target.value);
        const patient = patientsLists.find((item) => item.fullname === e.target.value)
        setPatientAllergies(patient.allergiesValue)
        if(patient.treatmentStatus === "hold") {
            toast.info("You can't add tests because treatment of this patient is hold")
            return
        }
        if( patientTests ) {
            const tests = patientTests.filter((item) => item.patient_name === e.target.value);
            setUseTests(tests)
            if(tests.length === 0) {
                setTestId(1);
            }
            else {
                setTestId(1 + tests.length)
            }
        }
    }

    const handleTestSelectChange = (e) => {
        setTestSelectValue(e.target.value);
        if(patientTests.length === 0 && e.target.value === "use") {
            toast.error("No added tests")
            return
        }
        if(patientTests.length != 0) {
            const tests = patientTests?.find((item) =>( item?.testName == usedTestSelect ));
            const testFormDatas =JSON.parse(tests?.formString)
            setAllergies(tests?.allergies)
            testFormDatas.map((testFormData)=> (
                setForms([{
                    food: testFormData?.food, 
                    whightAmountValue: testFormData?.whightAmountValue,
                    whightAmountUnits: testFormData?.whightAmountUnits, 
                    unitsAmountValue: testFormData?.unitsAmountValue, 
                    eatTimeValue: testFormData?.eatTimeValue, 
                    eatTimeUnits: testFormData?.eatTimeUnits, 
                    addInstructions: testFormData?.addInstructions,
                }])
            ))
        }
        if(e.target.value === "new") {
            setAllergies("")
            setForms([{
                food: '', 
                whightAmountValue: '',
                unitsAmountValue: '', 
                eatTimeValue: '', 
                addInstructions: '',
            }]);
        }
    }

    const handleTestName = (e) => {
        setTestName(e.target.value)
    }

    useEffect(() => {
        if(useTests && useTests.length > 0) {
            const test_name = useTests[0].testName;
            setUsedTestSelect(test_name)
            const tests = patientTests.find((item) =>( item.testName === test_name ));
            setAllergies(tests?.allergies)
            if(testSelectValue != "new") {
                const testFormDatas =JSON.parse(tests.formString)
                testFormDatas.map((testFormData)=> (
                    setForms([{
                        food: testFormData?.food, 
                        whightAmountValue: testFormData?.whightAmountValue,
                        whightAmountUnits: testFormData?.whightAmountUnits, 
                        unitsAmountValue: testFormData?.unitsAmountValue, 
                        eatTimeValue: testFormData?.eatTimeValue, 
                        eatTimeUnits: testFormData?.eatTimeUnits, 
                        addInstructions: testFormData?.addInstructions,
                    }])
                ))
            }
           
        }
        
    }, [useTests]);

    const handleUsedTestSelectChange = (e) => {
        setUsedTestSelect(e.target.value)
        setForms([{
            food: "",
            whightAmountValue: "",
            whightAmountUnits: "", 
            unitsAmountValue: "", 
            eatTimeValue: "", 
            eatTimeUnits: "", 
            addInstructions: "",
        }])
        if(patientTests.length != 0) {
            const tests = patientTests.find((item) =>( item.testName === e.target.value ));
            setAllergies(tests?.allergies)
            const testFormDatas =JSON.parse(tests.formString)
            if(testSelectValue != "new") {
                setForms(testFormDatas.map((testFormData)=> (
                    {
                        food: testFormData?.food, 
                        whightAmountValue: testFormData?.whightAmountValue,
                        whightAmountUnits: testFormData?.whightAmountUnits, 
                        unitsAmountValue: testFormData?.unitsAmountValue, 
                        eatTimeValue: testFormData?.eatTimeValue, 
                        eatTimeUnits: testFormData?.eatTimeUnits, 
                        addInstructions: testFormData?.addInstructions,
                    }
                )));
            }
            if(testSelectValue === "new") {
                testFormDatas.map((testFormData)=> (
                    setForms([{
                        food: "", 
                        whightAmountValue: "",
                        whightAmountUnits: "", 
                        unitsAmountValue: "", 
                        eatTimeValue: "", 
                        eatTimeUnits: "", 
                        addInstructions: "",
                    }])
                ))
            } 
        }
    }

    // const handleAllergiesSwitchChange = (checked) => {
    //     setAllergiesCheck({ checked });
    // }
    const handleAllergiesChange = (e) => {
        setAllergiesValue(e.target.value)
    }
    const handleAmountTypeChange = (checked) => {
        setAmountTypeCheck({ checked });
    }
    
    useEffect(() => {
        socketRef.current = io(config.server_url, { transports : ['websocket'] });
    }, []);

    const addTest = (event) => {
        event.preventDefault();
        const addNotify = `A test for ${patientSelectValue} has been added`
        const formString = JSON.stringify(forms);
        const formData = {
            patient_name : patientSelectValue,
            test_id : testId,
            testName : testName,
            date :  value,
            patientAllergies: patientAllergies,
            formString : formString,
        }
        const notifyInfo = {
            patientSelectValue,
            testName,
        }
        addTests(formData)
        .then((res) => {
            console.log("addtest res", res)
            const test_id = res.id;
            const formData = {
                notifyInfo,
                test_id
            }
            notifyConfirmSave(formData)
            socketRef.current.emit("addTest", res.data, notifyInfo, res.id)
            socketRef.current.emit("notifications", addNotify, patientSelectValue)
            setTestId(testId+1)
            if(res.message === "success") {
                toast.info("Test Add Successfull!")
                history.push("/")
            }
            else {
                toast.error(res.AddTest)
            }
            setTestName("")
            setForms([{
                food: "",
                whightAmountValue: "",
                whightAmountUnits: "", 
                unitsAmountValue: "", 
                eatTimeValue: "", 
                eatTimeUnits: "", 
                addInstructions: "",
            }])
        })
        .catch((error) => console.log(error));
    }

    const handleAddMore = () => {
        handleAddMoreForm();
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
                                onChange={handleDateChange}
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
                                    {patientTests.map((item, i) => (
                                        <option value={item.testName} key={i}>{item.testName}</option>
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
                            <div className={classes.allergic_text}>
                                {patientAllergies === "" ? "No" : patientAllergies}
                                {/* <Switch onChange={handleAllergiesSwitchChange} checked={allergiesCheckValue.checked} /> */}
                                {/* { allergiesCheckValue.checked === true ? 
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
                                } */}
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
                                                    <span className={classes.amount_type_name}>Whight</span>
                                                    <Switch onChange={handleAmountTypeChange} checked={amountTypeCheck.checked} />
                                                    <span className={classes.amount_type_name}>Amount</span>
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
                                                    <select 
                                                        onChange={(e) => {handleInputChange(key, e)}}
                                                        name='eatTimeUnits'
                                                        className={classes.eat_time_units}
                                                    >
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
                                                onChange={(e) => {handleInputChange(key, e)}}
                                                value={item.addInstructions} 
                                                name='addInstructions'
                                                className={classes.food_input} 
                                                placeholder="Food Instructions">
                                            </textarea>
                                        </div>
                                    );
                                })}
                                <div className={classes.addCancelField}>
                                    <div className={classes.addMore} onClick={handleAddMore}>
                                        <FcAddImage size={20} /> 
                                        <span style={{marginLeft:"5px", marginTop: "2px"}}>Add More</span>
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
                            <div className={classes.allergic_text}>
                                {patientAllergies === "" ? "No" : patientAllergies}
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
                                                    <span className={classes.amount_type_name}>Whight</span>
                                                    <Switch onChange={handleAmountTypeChange} checked={amountTypeCheck.checked} />
                                                    <span className={classes.amount_type_name}>Unites</span>
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
                                                    <select 
                                                        onChange={(e) => {handleInputChange(key, e)}}
                                                        name='eatTimeUnits'
                                                        className={classes.eat_time_units}
                                                    >
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
                                                onChange={(e) => {handleInputChange(key, e)}}
                                                value={item.addInstructions} 
                                                name='addInstructions'
                                                className={classes.food_input} 
                                                placeholder="Food Instructions">
                                            </textarea>
                                        </div>
                                    );
                                })}
                                 <div className={classes.addCancelField}>
                                    <div className={classes.addMore} onClick={handleAddMore}>
                                        <FcAddImage size={20} /> 
                                        <span style={{marginLeft:"5px", marginTop: "2px"}}>Add More</span>
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