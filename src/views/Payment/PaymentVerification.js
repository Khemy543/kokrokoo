import React from "react";
import AuthNavbar from "components/Navbars/AuthNavbar";
import Header from "components/Headers/Header.js";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody
} from "reactstrap";


export default function PaymentVerification(){


    return(
    
            <div>
            <Header />
            <div className="main">
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                    <Card className="shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}} className="await">
                            <h4 style={{textAlign:"center"}}>Payment Is Being Processed.<br/> Kindly Check Email For Response.</h4>
                        </CardBody>
                    </Card>
                </Col>
               </Row>
                </Container>
                </div>
            </div>
        
    );
}