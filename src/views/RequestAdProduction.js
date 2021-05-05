import React,{useState} from "react";
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
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
  Col,Container,Alert,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

var domain = "https://backend.demo.kokrokooad.com";
function RequestAdProduction({history}){
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('Middle');
  const [isActive, setIsActive] =useState(false);

  var domain = "https://backend.demo.kokrokooad.com";

  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsActive(true)
    axios.post(`${domain}/api/send/ad/production/request`,{
        name:name,
        email:email,
        company_name:company,
        phone:phone,
        production_type:type,
        budget:budget,
        description:description
    })
    .then(response=>{
        setAlert(true);
    })
    .catch(error=>{
        console.log(error)
    })
    .finally((_)=>{setIsActive(false)})
  }


    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <div>
      
      <div className="filter" />
      <AuthNavbar />
      <Container>
        <Row>
        <Col md="12">
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md="12">
                <div className="account">
                    <h3>Request Ad Production</h3>
                    
                    <hr className="my-3" />
                    <Row style={{marginTop:"20px"}}>
                        <Col md="8" className="ml-auto mr-auto">
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
                                <Input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required/>
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
                            <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md="6" sm="12" xs="12">
                            <label>Name of Company/Institution</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-building" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Name of Company/Institution" value={company} onChange={e=>setCompany(e.target.value)} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Phone No.</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input required type="text" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md="6">
                            <label>Type of Production</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-feed" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" value={type} onChange={e=>setType(e.target.value)} required placeholder="Jingle, TV Commercial, Documentary Shoot..."/>
                            </InputGroup>
                            </FormGroup>
                            </Col>

                            <Col>
                            <label>Budget</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-user" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" value={budget} onChange={e=>setBudget(e.target.value)} required>
                            <option value="Low">Low</option>
                            <option value="Middle">Middle</option>
                            <option value="High">High</option>
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Description</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                            {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-map-marker" />
                            </InputGroupText>
                            </InputGroupAddon> */}
                            <Input style={{height:"70px"}} type="textarea" placeholder="Concept or Description Summary" value={description} onChange={e=>setDescription(e.target.value)} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
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
                            <Input type="checkbox" value={this.state.terms} onChange={e=>this.setState({terms:e.target.checked})} required/> <p style={{fontSize:"13px", fontWeight:700}}>Agree To <a href="/auth/terms&conditions-client">Terms And Conditions</a></p>
                        </Col>
                        </Row> */}
                    <Row>
                        <Col>
                        <Button
                        type="submit"
                        className="btn btn-round"
                        style={{
                            borderRadius:"20px",
                            color: "#1b1e21",
                            background: "#F1CF00",
                            border:"1px solid #F1CF00",
                            marginBottom:"10px"
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
        </Col>
        </Row>
        
        <Modal isOpen={alert}>
            <ModalHeader style={{color:"black"}}>
                        
            </ModalHeader>
            <ModalFooter>
            <Button color="danger" onClick={()=>history.push('/ad-production-response')}>
              close
            </Button>
            </ModalFooter>
          </Modal>
    </Container>
    </div>
    </LoadingOverlay>
    </>
    )
}
export default RequestAdProduction;