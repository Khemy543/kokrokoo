import React from "react";
import AuthNavbar from "components/Navbars/AuthNavbar";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardFooter
} from "reactstrap";


export default function AwaitVerification(props){

    return(
    
            <div>
            <AuthNavbar />
            <div className="main" style={{marginTop:"100px"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <Card className="shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}} className="await">

                            <p style={{fontWeight:700}}>  
                               Hello,<br/>Thank you for registering! Your registration details are under review. You will receive a confirmatory via mail <span style={{color:"#0095ff"}}>{props.location.state.email}</span> within 24 hours.
                            </p>
                            <br/>
                            <a href="/auth/landing-page"><i className="fa fa-chevron-left mr-2"/>back</a>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
                </div>
            </div>
        
    );
}