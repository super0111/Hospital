import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./utils/privateRoute";


function App() {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/register" component={Registration} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Layout>
  );
}

export default App;
