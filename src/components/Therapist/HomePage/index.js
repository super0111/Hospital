import React, { useState, useEffect } from 'react'
import config from "../../../config"
import classes from "./HomePage.module.css"
import Updates from "./Updates"
import NextSession from "./NextSession"
import TestLists from "./TestLists"

const HomePage = () => {

    const [ patientsLists, setPatientLists ] = useState([])
    const [ searchResults, setSearchResults ] = useState([])
    const [ dataTestsLists, setTestsLists ] = useState([])
    const [ testLists, setTestList ] = useState([])
    const [ isActive, setIsActive ] = useState(false)

    useEffect(async () => {
      const fetchPosts = async () => {
          const res = await fetch(`${config.server_url}api/posts/getPatients`);
          const patients = await res.json();
          setPatientLists(patients);
          setSearchResults(patients);
      };
      const fetchTestPosts = async () => {
          const res = await fetch(`${config.server_url}api/posts/getTests`);
          const tests = await res.json();
          setTestsLists(tests);
      };
      await fetchTestPosts();
      await fetchPosts();   
  }, []);

  useEffect(() => {
      if(patientsLists && patientsLists.length > 0) {
          handlePatientClick(patientsLists[0]['fullname']);
      }
  }, [patientsLists]);

  const handlePatientClick = (patient, i) => {
      const patientTests = dataTestsLists.filter((item) => { return item.patient_name === patient});
      setTestList(patientTests)
      setIsActive(i)
  }

  return (
    <div className={classes.home}>
      <div className={classes.flexRow}>
        <Updates />
        <NextSession testLists={testLists} />
      </div>
      <TestLists
        patientsLists={patientsLists} 
        searchResults={searchResults} 
        testLists={testLists} 
        setTestList={setTestList} 
        handlePatientClick={handlePatientClick} 
        isActive={isActive} 
      />
    </div>
  );
};

export default HomePage;
