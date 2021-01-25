import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Input,
  Button,
  Form,Modal,
  Col, CardFooter,ListGroup, ListGroupItem, ModalBody 
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Header from "components/Headers/Header";

let user =localStorage.getItem('access_token');
var domain = "https://backend.demo.kokrokooad.com";
class AccountDetails extends React.Component{
    state={
        isActive:false,
        card:true,
        mobile:false,
        po:false,
        email:this.props.location.state.email,
        amount:this.props.location.state.amount,
        date:"",
        cardno:"",
        cvv:"",
        firstname:this.props.location.state.firstname,
        lastname:this.props.location.state.lastname,
        authurl:"",
        modalOpen:false,
        phonenumber:"0542161579",
        network:"MTN",
        voucher:""
    }

handleCardSubmit=(e)=>{
    e.preventDefault();
    let tempDate = this.state.date;
    let splitArray = tempDate.split("/");
    console.log(splitArray[0], splitArray[1])

    console.log(
        "firstname:",this.state.firstname
    )
    axios.post(`${domain}/api/make-card-payment`,
    {
        cart_id:this.props.location.state.cart_id,
        phonenumber:this.state.phonenumber,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        country:"Ghana"
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({authurl:res.data.authurl,modalOpen:true, isActive:false})
    })
    .catch(error=>{
        console.log(error.response.data);
    })
}


handleMobileSubmit=(e)=>{
    this.setState({isActive:true})
    e.preventDefault();

    axios.post(`${domain}/api/make-momo-payment`,
    {
        phonenumber:this.state.phonenumber,
        currency: "GHS",
        country: "GH",
        amount: this.state.amount,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        network:this.state.network,
        is_momo_pay:true
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({authurl:res.data.authurl,modalOpen:true,isActive:false})
    })
    .catch(error=>{
        console.log(error.response.data);
    })
}
    render(){
    return (
        <>
        <LoadingOverlay
            active={this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'} />}
        >
        <Header />
            <Container className=" mt--7" fluid>
            <Row>
                <Col md="3" className="ml-auto mr-auto">
                <Card className="shadow ">
                <CardHeader>
                <Row>
                    <Col md ="4">
                    <div style={{textAlign:"center"}}>
                    <span className="avatar avatar-lg rounded-circle">
                        <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                    </span>
                    </div>
                    </Col>
                    <Col md="3">
                    
                    </Col>
                    <Col md="5">
                    <p style={{fontSize:"12px", fontWeight:600, lineHeight:"50px", textAlign:"center"}}>KOKROKOOAD</p>
                    </Col>
                </Row>
                    
                </CardHeader>
                
                    <CardBody style={{backgroundColor:"beige"}}>
                    {this.state.card?
                    <Form onSubmit={this.handleCardSubmit}>
                        <Row>
                            <Col md="12">
                        <h4>GHS {this.state.amount}.00</h4>
                        <p style={{fontSize:"12px", fontWeight:600,marginTop:"-5px"}}>{this.state.email}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="shadow">
                                <CardBody style={{pading:"0px 0px"}}>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CARD NUMBER</label>
                                            <Input placeholder="0000 0000 0000 0000" value={this.state.cardno} onChange={e=>this.setState({cardno:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                             
                                             required/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col style={{borderRight:"1px solid #0000001f"}}>
                                        <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>VALID TILL</label>
                                        <Input placeholder="mm/yy" value={this.state.date} onChange={e=>this.setState({date:e.target.value})}
                                         style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                         
                                         required/>
                                        </Col>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CVV</label>
                                            <Input placeholder="123" value={this.state.cvv} type="number" min="1" max="999"
                                            onChange={e=>this.setState({cvv:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} required/>
                                        </Col>
                                    </Row>
                                    {/* <br/>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>PHONE NUMBER</label>
                                            <Input placeholder="000-000000" value={this.state.phonenumber} onChange={e=>this.setState({phonenumber:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                             required/>
                                        </Col>
                                    </Row> */}
                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                            <Button block color="warning" type="submit">Pay GHS {this.state.amount}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}

                    {this.state.mobile?
                    <Form onSubmit={this.handleMobileSubmit}>
                        <Row>
                            <Col md="12">
                        <h4>GHS {this.state.amount}.00</h4>
                        <p style={{fontSize:"12px", fontWeight:600,marginTop:"-5px"}}>{this.state.email}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="shadow">
                                <CardBody style={{pading:"0px 0px"}}>
                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CHOOSE NETWORK</label>
                                    <Input type="select" style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} value={this.state.network} onChange={e=>this.setState({network:e.target.value})}>
                                        <option>MTN</option>
                                        <option>AIRTEL-TIGO</option>
                                        <option>VODAFONE</option>
                                    </Input>
                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>MOBILE NUMBER</label>
                                    <Input placeholder="000-000000" value={this.state.phonenumber} style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} required onChange={e=>this.setState({phonenumber:e.target.value})} />

                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>VOUCHER (ONLY VODACASH)</label>
                                    <Input placeholder="000000000" value={this.state.voucher} style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} onChange={e=>this.setState({voucher:e.target.value})} />

                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                            <Button block color="warning" type="Submit">Pay GHS {this.state.amount}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}

                    {this.state.po?
                    <Form>
                        <Row>
                            <Col md="11">
                        <h4>GHS {this.state.amount}.00</h4>
                        <p style={{fontSize:"12px", fontWeight:600,marginTop:"-5px"}}>{this.state.email}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="shadow">
                                <CardBody style={{pading:"0px 0px"}}>
                                <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>UPLOAD DOCUMENT</label>
                                <Input type="file" style={{border:"none",padding:"0px 0px",marginTop:"15px"}} required/>

                                <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                            <Button block color="warning">Pay GHS {this.state.amount}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}
                    </CardBody>
                    <CardFooter style={{padding:"0px 0px 0px 0px"}}>
                    <ListGroup>
                        {!this.state.card?
                        <ListGroupItem style={{fontSize:"13px",fontWeight:600,cursor:"pointer",borderRadius:"0px", backgroundColor:"#f2f2f2"}}
                        onClick={()=>this.setState({card:true, mobile:false, po:false})}
                        ><i className="fa fa-money mr-3"/>Pay with Card</ListGroupItem>
                        :<div></div>}
                        {!this.state.mobile?
                        <ListGroupItem style={{fontSize:"13px",fontWeight:600, cursor:"pointer", backgroundColor:"#f2f2f2"}}
                        onClick={()=>this.setState({card:false, mobile:true, po:false})}
                        ><i className="fa fa-money mr-3"/>Pay with Mobile Money</ListGroupItem>
                        :<div></div>}
                        {!this.state.po?
                        <ListGroupItem style={{fontSize:"13px",fontWeight:600, cursor:"pointer",borderRadius:"0px", backgroundColor:"#f2f2f2"}}
                        onClick={()=>this.setState({card:false, mobile:false, po:true})}
                        ><i className="fa fa-money mr-3"/>Make Purchase Order</ListGroupItem>
                        :<div></div>}
                    </ListGroup>
                    </CardFooter>
                </Card>
                <Row style={{marginTop:"20px"}}>
                  <Col md="6" className="ml-auto mr-auto">
                      <img src={require("assets/img/brand/mastercard.png")} alt="#" style={{width:"30px", height:"auto"}}/>
                      <img src={require("assets/img/brand/visa.png")} alt="#" style={{width:"30px", height:"auto"}}/>
                      <img src={require("assets/img/brand/mobilemoney.png")} alt="#" style={{width:"50px", height:"auto"}}/>
                  </Col>
              </Row>
                </Col>
            </Row>
            <Modal  isOpen={this.state.modalOpen}>
                <ModalBody style={{height:"550px"}}>
                    <iframe src={this.state.authurl} title="payment" style={{width:"100%", height:"100%"}}></iframe>

                </ModalBody>
            </Modal>
            </Container>
        </LoadingOverlay>
        </>
    );
}
}


export default AccountDetails;
