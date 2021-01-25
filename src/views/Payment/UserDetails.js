import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Button,
  Form,
  Col, Nav, NavLink,NavItem,TabContent,  TabPane,
  InputGroup, InputGroupAddon, Modal, ModalHeader, ModalFooter
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import Header from "components/Headers/Header";
import axios from 'axios';
import classnames from 'classnames';
import {RateConsumer} from "../../context.js";

var domain = "https://backend.demo.kokrokooad.com";
let user =localStorage.getItem('access_token');
function UserDetails(props) {
const [isActive, setIsActive] = React.useState(false);
const [firstname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");
const [email, setEmail] = React.useState(props.location.state.email);
const [amount, setAmount] = React.useState(props.location.state.amount);
const [phonenumber,setPhonenumber] =React.useState("");
const [activeTab, setActiveTab] = React.useState("1");
const [file, setFile] = React.useState(null);
const [percentage, setPercentage] = React.useState(0);
const [modal, setModal] = React.useState(false);
const [alertMessage, setAlertMessage] = React.useState("")

React.useEffect(()=>{
  console.log(props.location.state)
},[])

const handleSubmit=(e)=>{
    setIsActive(true)
    e.preventDefault();

    axios.post(`${domain}/api/initialize/payment`,
    {
        cart_id:props.location.state.cart_id,
        phonenumber:phonenumber,
        firstname: firstname,
        lastname: lastname,
        country:"Ghana",
        email:email
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data.status);
        if(res.data.status === "success"){
          window.location=`${res.data.url}`
        }
    })
    .catch(error=>{
        console.log(error.response.data);
    })
    
}

const handlePOSubmit=(e)=>{
  e.preventDefault();
  if(file !== null){
    console.log(file)
    var bodyFormData = new FormData();
    bodyFormData.append('po',file)
    axios({
      method:'post',
      url:`${domain}/api/${props.location.state.cart_id}/payment-via-po`,
      data:bodyFormData,
      headers: {'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}`},
      onUploadProgress: (progressEvent) => {
          const {loaded , total} = progressEvent;
          let cal_percentage = Math.floor(loaded * 100 / total);
          console.log(cal_percentage)
          if(percentage<100){
              setPercentage(cal_percentage)
          }
          else{
              setPercentage(100)
          }
  }})
    .then(res=>{
      console.log(res.data);
      setModal(true)
      setAlertMessage("PO Submitted For Review");
      setTimeout(
        function(){
          props.history.push('/client/index')
        }.bind(this),2000)
    })
    .catch(error=>{
      console.log(error.response.data)
      setModal(true);
      setAlertMessage(error.response.data.errors.po)
    })
  }

}

const toggle = tab => {
  if(activeTab !== tab) setActiveTab(tab);
}

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
      <Header />
      <Container className=" mt--9" fluid>
      <Row>
        <Col>
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
          <RateConsumer>
            {value=>(
            <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer", textTransform: "uppercase", fontSize:"14px" , fontWeight:600 }}
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => toggle("1")}
                  >
                    <h4>Card Payment / Mobile Money</h4>
                  </NavLink>
                  </NavItem>
                  {value.company?
                  <NavItem>
                  <NavLink
                    style={{ cursor: "pointer", textTransform: "uppercase",fontSize:"14px", fontWeight:600 }}
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => toggle("2")}
                  >
                    <h4>Purchase Order</h4>
                  </NavLink>
                </NavItem>
                :
                <></>
                }
            </Nav>
            )}
          </RateConsumer>
          </div>
        </div>
        <br/>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <Container >
          <Row>
            <Col md="5" className="ml-auto mr-auto">
            <Row>
                <Col md ="6" className="ml-auto mr-auto">
                <div style={{textAlign:"center"}}>
                <span>
                <img src={require("../../assets/img/brand/kokro-yellow.png")} alt="#" style={{height:"50px", width:"auto"}}/>
                </span>
                </div>
                </Col>
            </Row>
            <Row>
              
            <Col md="6" className="ml-auto mr-auto">
                    <p style={{fontSize:"12px", fontWeight:600}}>Campaign Payment Details</p>

                </Col>
            </Row>

                
                
              <Card style={{border:"1px solid #0000001f", borderRadius:"0px"}}>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>First Name</label>
                        <Input type="text" value={firstname} required onChange={e=>setFirstname(e.target.value)} placeholder="First Name"/>
                        </Col>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>last Name</label>
                        <Input type="text" required value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Last Name"/>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>Email Address</label>
                        <Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address"/>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>Phone Number</label>
                            <Input  type="number" value={phonenumber} name="phone Number" onChange={e=>setPhonenumber(e.target.value)} required placeholder="Phone Number"/>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                        <Col> 
                            <Button color="primary" type="submit">Proceed</Button>
                        </Col>
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a href="!#">support@kokrokooad.com</a> for any questions</p>
                  </Form>
                </CardBody>
              </Card>
              <Row style={{marginTop:"20px"}}>
                  <Col md="7" className="ml-auto mr-auto">
                      <img src={require("assets/img/brand/mastercard.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/visa.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/mobilemoney.png")} alt="#" style={{width:"80px", height:"auto"}}/>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </TabPane>
        <TabPane tabId="2">
        <Container >
          <Row>
            <Col md="5" className="ml-auto mr-auto">
            <Row>
                <Col md ="6" className="ml-auto mr-auto">
                <div style={{textAlign:"center"}}>
                <span>
                <img src={require("../../assets/img/brand/kokro-yellow.png")} alt="#" style={{height:"50px", width:"auto"}}/>
                </span>
                </div>
                </Col>
            </Row>
            <Row>
              
            <Col md="6" className="ml-auto mr-auto">
                    <p style={{fontSize:"12px", fontWeight:600}}>Registration Payment Details</p>

                </Col>
            </Row>
                
                
              <Card style={{border:"1px solid #0000001f", borderRadius:"0px"}}>
                <CardBody>
                  <Form onSubmit={handlePOSubmit}>
                    <Row>
                        <Col md="12" style={{overflow:"hidden"}}>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>Upload P.O</label>
                        <Input type="file" required onChange={e=>{
                                const po = e.target.files[0];
                                console.log(po)
                                setFile(po)}} />
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop:"30px"}}>
                        <Col> 
                            <Button color="primary" type="submit">Proceed</Button>
                        </Col>
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a href="!#">support@kokrokooad.com</a> for any questions</p>
                  </Form>
                </CardBody>
              </Card>
              <Row style={{marginTop:"20px"}}>
                  <Col md="6" className="ml-auto mr-auto">
                      <img src={require("assets/img/brand/mastercard.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/visa.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/mobilemoney.png")} alt="#" style={{width:"80px", height:"auto"}}/>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </TabPane>
        </TabContent>
        </Col>
      </Row>
      </Container>
      <Modal isOpen={modal}>
        <ModalHeader>
          {alertMessage}
        </ModalHeader>
        <ModalFooter>
          <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      </LoadingOverlay>
    </>
  );
}


export default UserDetails;
