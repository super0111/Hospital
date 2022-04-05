import classes from "./addTest.module.css"
import { useState, useEffect } from "react"
import config from "../../../config";

import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addTests} from "../../../apis/addTests"
import { FcCalendar, FcPortraitMode, FcEditImage, FcDocument, FcFlowChart } from "react-icons/fc";

const AddTest = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        fetchPosts();
    }, []);

    const [ patientTests, setTests ] = useState([])
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/posts/getTests`);
            const tests = await res.json();
            setTests(tests);
        };
        fetchPosts();
    }, []);

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const [ testId, setTestId ] = useState("")
    const [ selectValue, setSelectValue ] = useState()
    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
        if( patientTests ) {
            const patients = patientTests.filter((item) => item.patient_name == e.target.value);
            console.log(patients.length)
            if(patients.length == 0) {
                setTestId(1);
            }
            else {
                setTestId(1 + patients.length)
            }
        }
    }

    const [ addTextValue, setAddTextValue ] = useState()
    const handleAddTextChange = (e) => {
        setAddTextValue(e.target.value)
    }

    const [ foodValue, setFoodValue ] = useState()
    const handleFoodChange = (e) => {
        setFoodValue(e.target.value)
    }


    const addTest = (event) => {
        event.preventDefault();
        const formData = {
            patient_name : selectValue,
            test_id : testId,
            date :  value,
            foodValue : foodValue,
            addTextValue : addTextValue,
        }
        addTests(formData)
        .then((res) => {
            if(res.message == "success") {
                toast.info("Test Add Successfull!")
            }
            else {
                toast.error(res.errors.msg)
            }
        })
        .catch((error) => console.log(error));
        selectValue = "";
        foodValue = '';
        addTextValue = ''
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
                    <select onChange={handleSelectChange} className={classes.select}>
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
                        <FcDocument size={30} />
                        <div className={classes.food_name}>Food instructions</div>
                    </div>
                    <textarea rows={4} cols={8} onChange={handleFoodChange} value={foodValue} className={classes.food_input}>Food Instructions</textarea>
                </div>
                <div className={classes.item_field}>
                    <div className={classes.flexRow}>
                        <FcEditImage size={30} />
                        <div className={classes.add_text}>Additional Notes</div>
                    </div>
                    <textarea rows={4} cols={8} onChange={handleAddTextChange} value={addTextValue} className={classes.addText_value}>Additional Notes</textarea>
                </div>
            </div>
           <button onClick={addTest} className={classes.btn}>Add Test</button>
           <ToastContainer /> 
        </div>
    )
}
export default AddTest