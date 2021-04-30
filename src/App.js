import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
//import AuthLayout from "layouts/Auth.js";
import Login from "./views/examples/Login.js";
import ProtectedLoginRoute from "./ProtectedLoginRoute.js";
import "./index.css";
import "font-awesome/css/font-awesome.css";
import "font-awesome/less/font-awesome.less";
import ProtectedRoute from "ProtectedRoute";
import UserDetails from "views/Payment/UserDetails";
import AccountDetails from "views/Payment/AccountDetails";
import PerosnalAccount from "views/Registration/PersonalAccount";
import OrganizationAccount from "views/Registration/OrganizationAccount";
import MediaHouse from "views/Registration/MediaHouse";
import MediaAccount from "views/Registration/MediaAccount.js";
import LandingPage from "views/LandingReact.js";
import MediaConditions from "views/Registration/MediaCondtitons";
import AwaitVerification from "views/Registration/AwaitVerification.js";
import Blog from "views/Blog/blog.js";
import ClientConditions from "views/Registration/ClientCondtions.js"
import PrivacyPolicy from "views/Registration/PrivacyPolicy";
import ForgetPassword from "views/PasswordReset/forgetPassword.js"
import BankDetails from "views/Registration/BankDetails";
import ResetPassword from "views/PasswordReset/PasswordReset.js";
import RequestAdProduction from "views/RequestAdProduction";


class App extends React.Component{
  render(){
    return(
  <BrowserRouter history={history}>
    <Switch>
      <Route path="/client" render={props => <AdminLayout {...props} />} />
      <Route exact path="/auth/personal-account" component ={PerosnalAccount} />
      <Route exact path="/auth/terms&conditions-media" component ={MediaConditions} />
      <Route exact path="/auth/terms&conditions-client" component ={ClientConditions} />
      <Route exact path="/auth/privacy&policy" component ={PrivacyPolicy} />
      <Route exact path="/auth/organization-account" component ={OrganizationAccount} />
      <Route exact path="/auth/media-house" component ={MediaHouse} />
      <Route exact path="/auth/await-verification" component ={AwaitVerification} />
      <Route exact path="/auth/blog" component ={Blog} />
      <Route exact path="/auth/forget-password" component ={ForgetPassword} />
      <Route exact path="/auth/reset-password" component ={ResetPassword} />
      <Route exact path="/auth/media-account" component ={MediaAccount} />
      <Route exact path="/auth/bank-details" component ={BankDetails} />
      <ProtectedLoginRoute exact path="/auth/login-page" component = {Login}/>
      <ProtectedLoginRoute exact path="/auth/request-ad-production" component = {RequestAdProduction}/>
      <ProtectedLoginRoute exact path="/auth/landing-page" component = {LandingPage}/>
      <Redirect from="/" to="/auth/landing-page" />
      <Redirect from="/homepage" to="/client/index" />
    </Switch>
  </BrowserRouter>
);
}}
export default App;