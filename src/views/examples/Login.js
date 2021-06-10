import React from "react";
import AuthNavbar from "../../components/Navbars/AuthNavbar.js";
import {Link} from "react-router-dom"

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,Container,Alert
} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import LoginNavbar from "components/Navbars/LoginNavBar.js";

var domain = "https://backend.demo.kokrokooad.com";
function Login({history}){
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isActive , setIsActive] = React.useState(false);
  const [eye, setEye] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const toggleEye=()=>setEye(!eye);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
    setIsActive(true);
    axios.post(`${domain}/oauth/token`,{
      grant_type: "password",
      client_id: 1,
      client_secret:"UhJpDIR5od53fmjQntzxk4QvlSfni8yrK6exIk1z",
      username: username,
      password: password,
      provider: "clients",
    headers:{"Content-Type": "application/json", "Accept": "application/json"}}
  )
    .then(res=>{
      console.log(res.data)
      if(res.data.status === "success"){
        localStorage.setItem('access_token',res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        window.location.reload("/");
        setIsActive(false);

      }
    })
    .catch(error=>{
      console.log(error.response.data)
      if(!error.response){
        window.alert("check your internet connection");
        setIsActive(false);
      }
      else{
      console.log(error.response.data)
      setAlert(true);
      setIsActive(false);
      }
    })
  } 

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <div
        style={{
          backgroundImage: "url(" + require("../../assets/img/brand/login1.jpeg") + ")",
          backgroundPosition:"center",
          backgroundRepeat:"repeat",
          backgroundSize:"cover",
          height:"100vh"
        }}
      >
      
      <div className="filter" />
      <LoginNavbar />
      <Container>
        <Row>
        <Col lg="5" md="7" className="ml-auto mr-auto mt-7 mb-auto">
          <Card className="shadow border-0">
            
            <CardBody className="px-lg-5 py-lg-5">
              <h3 className="text-center">Sign In</h3>

              {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center",height:"50px"}}>
                  Incorrect Credentials
                </Alert>
                :
                <div>
                </div>
                }
              <div className="text-center text-muted mb-4">
                
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type={eye?"text":"password"} name="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                    <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className={!eye?"fa fa-eye-slash":"fa fa-eye"} onClick={toggleEye} style={{cursor:"pointer"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span
                    className="text-muted" style={{fontWeight:600}}>Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" >
                    Sign in
                  </Button>
                </div>
              </Form>
              
          <Row className="mt-3">
            <Col xs="6">
              <Link
                to="/auth/forget-password"
                className="text-dark"
              >
                <small style={{fontWeight:600}}>Forgot password?</small>
              </Link>
            </Col>
            <Col className="text-right" xs="6">
              <a 
                href="/auth/landing-page"
              >
                <small>Register Here</small>
              </a>
            </Col>
          </Row>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </Container>
        </div>
        </LoadingOverlay>
      </>
    );
  }


export default Login;

/* LIVE NNFyA9IvQd9bBwMEkkiXNNvuUS5GFYPGkqtUgeMp
dEMO  UhJpDIR5od53fmjQntzxk4QvlSfni8yrK6exIk1z*/