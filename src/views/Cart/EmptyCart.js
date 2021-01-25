import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Button,
  } from "reactstrap";

  class EmptyCart extends React.Component{

   

    render(){
      return(
        <>
          <Container className=" mt--8" fluid>
          <Row>
          <Col md="12" style={{textAlign:"center"}}>
          <h4>Your Cart Is Empty</h4>
            <Link to="/client/create-subscription"><Button color="info">Create New Campaign</Button></Link>
          </Col>
          </Row>
        </Container>
        </>
      )
  }
}

  export default EmptyCart;