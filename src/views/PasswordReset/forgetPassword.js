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
    Button, Alert, Input
} from "reactstrap";

var domain = "https://backend.demo.kokrokooad.com";
export default function ForgetPassword(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [color, setColor] =React.useState("success")

    const toggle=()=>setVisible(!visible);
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${domain}/api/request/password/reset`, {email:email})
        .then(res=>{
            console.log(res.data);
            setMessage(res.data.status);
            setVisible(true)
            setColor("success")
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
                    
                    <h4 style={{fontSize:"14px", textAlign:"center", fontWeight:500, marginBottom:"10px"}}>Forgot your password?</h4>
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
                            <p style={{fontWeight:500}}>Enter your email address and we'll send you a link to reset your password.</p>
                            </Col>
                        </Row>
                            <br/>
                            <form onSubmit={handleSubmit}>
                            <label style={{fontWeight:500}}>Email Address</label>
                            <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="eg: example@gmail.com"/>
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