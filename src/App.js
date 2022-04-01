import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PatientHome from "./components/PatientHome";
import Registration from "./components/auth/Register";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./utils/privateRoute";
import RegisterPatient from "./components/RegisterPatient"
import TreatmentStatusTherapist from "./components/Therapist/TreatmentStatusTherapist"

import ResetPassword from "./components/auth/ResetPassword";
import ProfileEdit from "./components/Patient/ProfileEdit";
import ProfileView from "./components/Patient/ProfileView";
import TreatmentStatusPatient from "./components/Patient/TreatmentStatusPatient";

function App() {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <PrivateRoutes path="/patientHome" exact component={PatientHome} />
        <Route path="/treatmentStatus_patient" exact component={TreatmentStatusPatient} />
        <PrivateRoutes path="/resetPassword" exact component={ResetPassword} />
        <PrivateRoutes path="/profileEdit" exact component={ProfileEdit} />
        <PrivateRoutes path="/profileView" exact component={ProfileView} />
        <Route path="/register" component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/registerPatient" exact component={RegisterPatient} />
        <PrivateRoutes path="/treatmentStatus_therapist" exact component={TreatmentStatusTherapist} />
      </Switch>
    </Layout>
  );
}

export default App;
