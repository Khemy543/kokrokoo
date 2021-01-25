import React from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string'
import axios from "axios";
import AuthNavbar from "components/Navbars/AuthNavbar"

//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    Button, Alert, Input, FormGroup,InputGroup,InputGroupAddon,InputGroupText
} from "reactstrap";

var domain = "https://backend.demo.kokrokooad.com";
export default function PasswordReset(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirm_password, setConfirmPassword] = React.useState("");
    const [color, setColor] = React.useState("");
    const [eye1, setEye1] = React.useState(false);
    const [eye2, setEye2] = React.useState(false);

    const toggelEye1 =()=>setEye1(!eye1);
    const toggelEye2=()=>setEye2(!eye2)
    const toggle=()=>setVisible(!visible);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password === confirm_password){
        const param = queryString.parse(props.location.search);
        console.log(param.token);
        let token = param.token;
        axios.post(`${domain}/api/reset/password`, {
            password:password,
            token:token
        })
        .then(res=>{
            console.log(res.data);
            setVisible(true);
            setMessage("Password Reset Successful")
            setColor("success")
            setTimeout(
                function(){
                    props.history.push("/auth/login-page")
                },
                1500
            )
        })
        .catch(error=>{
            if(error.response){
            console.log(error.response.data)
            setMessage(error.response.data.status);
            setVisible(true)
            setColor("danger")
            }
        })
    }
    else{
        setMessage("Passwords Do Not Match!!")
        setVisible(true)
    }
}
   

   
    return(
         <div
            style={{
            height:"100vh"
            }}
        >
      
            <div className="filter" />
            <AuthNavbar />
            <Container style={{marginTop:"100px"}}>
            <Row>
             <Col md="6" lg="6" sm="12" xs="12" className="ml-auto mr-auto">
                    <div>
                    <Alert isOpen={visible} toggle={toggle}  color={`${color}`} fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div>
                    <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                        <Row>
                            <Col md="1"><i className="fa fa-lock fa-2x" style={{color:"#ff6a00de"}}/></Col>
                            <Col md="11">
                            <p style={{fontWeight:500}}>Enter Your New Password.</p>
                            </Col>
                        </Row>
                            <br/>
                            <form onSubmit={handleSubmit}>
                            <label style={{fontWeight:500}}>New Password</label>
                            <FormGroup>
                            <InputGroup>
                            <Input type={!eye1?"password":"text"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="New Password"/>
                            <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <i className={!eye1?"fa fa-eye-slash":"fa fa-eye"} onClick={toggelEye1} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                            </FormGroup>

                            <label style={{fontWeight:500}}>Confirm Password</label>
                            <FormGroup>
                            <InputGroup>
                            <Input type={!eye2?"password":"text"} value={confirm_password} onChange={e=>setConfirmPassword(e.target.value)} placeholder="ConfirmPassword"/>
                            <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <i className={!eye2?"fa fa-eye-slash":"fa fa-eye"} onClick={toggelEye2} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <Button type="submit" style={{marginTop:"50px"}} block color='success'>Reset Password</Button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
            </div>
        
    );
}