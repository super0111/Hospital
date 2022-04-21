import React, { useState, useEffect } from 'react'
import classes from "./PatientHome.module.css"
import config from "../../../config"
import jwt_decode from "jwt-decode";
import Updates from "./Updates"
import NextSession from "./NextSession"
import TestLists from "./TestLists"

const PatientHomePage = () => {
    const [current_PatientName, setCurrent_PatientName] = useState("")
    const [ testLists, setTestsLists ] = useState([])
    const [ testList, setTestList ] = useState([])

    useEffect(() => {
      const userString = localStorage.getItem('token');
      if(userString) {
        const current_user = jwt_decode(userString);
        if(current_user.patient_user) {
          const current_userName = current_user.patient_user.fullname;
          setCurrent_PatientName(current_userName);
        }
      }
  }, []);

  useEffect(async () => {
      const fetchTestPosts = async () => {
          const res = await fetch(`${config.server_url}api/posts/getTests`);
          const tests = await res.json();
          setTestsLists(tests);
      };
      await fetchTestPosts();
  }, []);

  useEffect( () => {
      const myTests = testLists.filter((item) => item.patient_name === current_PatientName )
      setTestList(myTests)
  }, [current_PatientName, testLists] )

  return (
    <div className={classes.home}>
      <div className={classes.flexRow}>
        <Updates />
        <NextSession testList={testList} />
      </div>
      <TestLists testList={testList} setTestList={setTestList} />
    </div>
  );
};

export default PatientHomePage;
