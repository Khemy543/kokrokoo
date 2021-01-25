import React from "react";
import AuthNavbar from "components/Navbars/AuthNavbar";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody
} from "reactstrap";


export default function Blog(){


    return(
    
            <div>
            <AuthNavbar />
            <div className="main" style={{marginTop:"100px"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <Card className="shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}} className="await">
                            <h4 style={{textAlign:"center"}}>COMING SOON!!</h4>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
                </div>
            </div>
        
    );
}