import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PatientHome from "./components/PatientHome";
import Registration from "./components/auth/Register";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./utils/privateRoute";
import RegisterPatient from "./components/RegisterPatient"
import AddTest from "./components/Therapist/AddTest"
import EditTest from "./components/Therapist/EditTest"
import TreatmentStatusTherapist from "./components/Therapist/TreatmentStatusTherapist"
import PatientMessage from "./components/Patient/PatientMessage"

import ResetPassword from "./components/auth/ResetPassword";
import ProfileEdit from "./components/Patient/ProfileEdit";
import ProfileView from "./components/Patient/ProfileView";
import TreatmentStatusPatient from "./components/Patient/TreatmentStatusPatient";
import TherapistMessage from "./components/Therapist/TherapistMessage";
import PatientManage from "./components/Therapist/PatientManage";
import { AppProvider } from "./components/AppContext";

function App() {
  return (
    <AppProvider>
      <Layout>
        <Switch>
          <PrivateRoutes path="/" exact component={Home} />
          <PrivateRoutes path="/patientHome" exact component={PatientHome} />
          <PrivateRoutes path="/treatmentStatus_patient" exact component={TreatmentStatusPatient} />
          <PrivateRoutes path="/patientMessage" exact component={PatientMessage} />
          <PrivateRoutes path="/resetPassword" exact component={ResetPassword} />
          <PrivateRoutes path="/profileEdit" exact component={ProfileEdit} />
          <PrivateRoutes path="/profileView" exact component={ProfileView} />
          <Route path="/register" component={Registration} />
          <Route path="/login" exact component={Login} />
          <PrivateRoutes path="/registerPatient" exact component={RegisterPatient} />
          <PrivateRoutes path="/addTest" exact component={AddTest} />
          <PrivateRoutes path="/editTest" exact component={EditTest} />
          <PrivateRoutes path="/treatmentStatus_therapist" exact component={TreatmentStatusTherapist} />
          <PrivateRoutes path="/therapistMessage" exact component={TherapistMessage} />
          <PrivateRoutes path="/managePatients" exact component={PatientManage} />
        </Switch>
      </Layout>
    </AppProvider>
  );
}

export default App;
