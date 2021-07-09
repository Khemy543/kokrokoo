import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Form,
  Input,
  Modal,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Card,CardBody,
  Col,InputGroup, InputGroupAddon,CardHeader,CardFooter, FormGroup,InputGroupText,
} from "reactstrap";
import RegisterNavbar from "components/Navbars/RegisterNavbar";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

var domain = "https://backend.kokrokooad.com";
class PerosnalAccount extends React.Component {

    state={
        user:false,
        personal:true,
        address: "",
        email: "",
        industry_type: "",
        name: "",
        password: "",
        phone1: "",
        phone2:"",
        terms: false,
        title: "Mr",
        confirm_password:"",
        alertmessage:"",
        modal:false,
        isActive:false
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password === this.state.confirm_password){
            this.setState({isActive:true})
        axios.post(`${domain}/api/auth/register`,{
            account:"personal",
            address: this.state.address,
            email: this.state.email,
            industry_type: this.state.industry_type,
            name: this.state.name,
            password: this.state.password,
            phone1: this.state.phone1.substr(this.state.phone1.length-10),
            phone2: this.state.phone2.substr(this.state.phone2.length-10),
            terms: this.state.terms,
            title: this.state.title
        })
        .then(res=>{
                this.setState({
                    alertmessage:"Registration Successful!",
                    modal:true,
                    isActive:false
                })
                setTimeout(
                    function(){
                        this.setState({modal:false});
                        this.props.history.push("/auth/await-verification",{
                            email:this.state.email
                        })
                    }
                    .bind(this),
                    2000
                )
        })
        .catch(error=>{
            if(error.response){
                this.setState({alertmessage:error.response.data.errors.phone1 || error.response.data.errors.phone2 || error.response.data.errors.email || error.response.data.errors.password, modal:true ,isActive:false})
            }
        })
    }else{
        this.setState({alertmessage:"Passwords do not match!!", modal:true})
    }
}



  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <div
        style={{
          height:"100vh"
        }}
      >
      
      <div className="filter" />
        <RegisterNavbar />
        <div style={{marginTop:"10px"}}>
        <Container>
        <Form onSubmit={this.handleSubmit}>
            
            <Row>
                <Col md="12">
                <div className="account">
                    <h3>User Account Information</h3>
                    
                    <hr className="my-3" />
                    <Row style={{marginTop:"20px"}}>
                        <Col md="7" className="ml-auto mr-auto">
                        <Row>
                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                            <label>Full Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" placeholder="Full Name" value={this.state.name} onChange={e=>this.setState({name:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                            <label>Email*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-envelope" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="email" placeholder="Email" value={this.state.email} onChange={e=>this.setState({email:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md="6">
                            <label>Title*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-user" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" value={this.state.title} onChange={e=>this.setState({title:e.target.value})} required>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            
                            <Col>
                            <label>Industrial type*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-industry" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Industry Type" value={this.state.industry_type} onChange={e=>this.setState({industry_type:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Phone No. 1*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Phone Number" value={this.state.phone1} onChange={e=>this.setState({phone1:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Phone No. 2</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Optional" value={this.state.phone2} onChange={e=>this.setState({phone2:e.target.value})} />
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Address*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-map-marker" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input style={{height:"70px"}} type="textarea" placeholder="Address" value={this.state.address} onChange={e=>this.setState({address:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Password*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-key" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Re-type Password*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-key" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Re-type Password" value={this.state.confirm_password} onChange={e=>this.setState({confirm_password:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" style={{marginLeft:"20px"}}>
                            <Input type="checkbox" value={this.state.terms} onChange={e=>this.setState({terms:e.target.checked})} required/> <p style={{fontSize:"13px", fontWeight:700}}>Agree To <a target="_blank" href="/auth/terms&conditions-client">Terms And Conditions</a></p>
                        </Col>
                        </Row>
                    <Row>
                        <Col>
                        <Button
                        type="submit"
                        className="btn btn-round"
                        style={{
                            borderRadius:"20px",
                            color: "#1b1e21",
                            background: "#F1CF00",
                            border:"1px solid #F1CF00"
                        }}
                        >Submit</Button>
                    </Col>
                    </Row>
                     </Col>
                    </Row>
                </div>
                    
                </Col>
            </Row>
        </Form>
        <Modal isOpen={this.state.modal}>
            <ModalHeader style={{color:"black"}}>
            {this.state.alertmessage}
            </ModalHeader>
            <ModalFooter>
            <Button color="danger" onClick={()=>this.setState({modal:false})}>
              close
            </Button>
            </ModalFooter>
          </Modal>
        </Container>
        </div>
        </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default PerosnalAccount;
