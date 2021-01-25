import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col, Modal,ModalFooter,ModalHeader,Progress,InputGroup, InputGroupAddon,CardHeader,CardFooter, FormGroup,InputGroupText,
} from "reactstrap";
import RegisterNavbar from "components/Navbars/RegisterNavbar";
import axios from 'axios';
import { Animated } from "react-animated-css";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";


var domain = "https://backend.demo.kokrokooad.com";
class OrganizationAccount extends React.Component {

    state={
        percentage:0,
        message:"",
        modal:false,
        personal:false,
        company:true,
        address: "",
        business_cert: "",
        company_email: "",
        company_name:"",
        email: "",
        industry_type: "",
        logo: "",
        name: "",
        password: "",
        confirm_password:"",
        phone1: "",
        phone2:"",
        terms: false,
        title: "Mr",
        website: "",
        country:"Ghana",
        isActive:false
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password === this.state.confirm_password){
        this.setState({isActive:true});
        var bodyFormData = new FormData();
        bodyFormData.append('business_cert',this.state.business_cert);
        bodyFormData.append('logo',this.state.logo);
        bodyFormData.append('address',this.state.address);
        bodyFormData.append('company_email',this.state.company_email);
        bodyFormData.append('company_name',this.state.company_name);
        bodyFormData.append('email',this.state.email);
        bodyFormData.append('industry_type',this.state.industry_type);
        bodyFormData.append('name',this.state.name);
        bodyFormData.append('password',this.state.password);
        bodyFormData.append('phone1',this.state.phone1);
        bodyFormData.append('phone2',this.state.phone2);
        bodyFormData.append('terms',this.state.terms);
        bodyFormData.append('title',this.state.title);
        bodyFormData.append('website',this.state.website);
        bodyFormData.append('country',this.state.country);
        bodyFormData.append('account',"company");

        for(var pair of bodyFormData.entries()) {
            console.log(pair[0]+ ': '+ pair[1]); 
        }

        axios({
            method:'post',
            url:`${domain}/api/auth/register`,
            data:bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const {loaded , total} = progressEvent;
                let percentage = Math.floor(loaded * 100 / total);
                console.log(percentage)
                if(percentage<100){
                    this.setState({percentage:percentage});
                }
                else{
                    this.setState({percentage:100})
                }
        }})
        .then(res=>{
            console.log("data",res.data);
            this.setState({isActive:false, message:"Registration Successful!", modal:true
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
            this.setState({isActive:false});
            console.log(error.response.data)
            if(error.response){
                console.log(error.response.data);
                this.setState({
                    modal:true, isActive:false, 
                    message:error.response.data.errors.business_cert 
                    || error.response.data.errors.operation_cert 
                    || error.response.data.errors.logo 
                    || error.response.data.errors.company_name 
                    || error.response.data.errors.country 
                    || error.response.data.errors.website
                    || error.response.data.errors.email 
                    || error.response.data.errors.phone1 
                    || error.response.data.errors.phone2
                    || error.response.data.errors.title
                    || error.response.data.errors.password
                    || error.response.data.errors.name
                    || error.response.data.errors.industry_type
                    || error.response.data.errors.company_email
                    || error.response.data.errors.address
                })
            }
        })

        }
    else{
        this.setState({
            modal:true,
            message:"Passwords Do not Match !!"
        })
    }
}




    handleNext=()=>{
        const {company_email, company_name, industry_type, address, website, business_cert, logo} = this.state;
        if(company_email !== "" && company_name !==""&& industry_type !== "" && address !== "" && website !== "" && business_cert !== null && logo !== null){
            this.setState({
                company:false,
                personal:true
            })
        }
        else{
            this.setState({
                modal:true,
                message:"All fields are required !!"
            })
        }
    }

    handleBack=()=>{
        this.setState({
            company:true,
            personal:false
        })
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
        <div style={{marginTop:"20px"}}>
        <Container>
        <Form onSubmit={this.handleSubmit}>
            <Row>
                <Col md="12">
                {this.state.company?
                <Animated animationOut="bounceOutRight" isVisible={this.state.company}>
                <div className="account">
                    <h3>Company Information</h3>
                    
                    <hr className="my-3" />
                    <Row style={{marginTop:"50px"}}>
                        <Col md="8" className="ml-auto mr-auto">
                        <Row>
                            <Col>
                            <label>Company Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Company Name" value={this.state.company_name} onChange={e=>this.setState({company_name:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Company Email*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-envelope" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="email" placeholder="Company Email " value={this.state.company_email} onChange={e=>this.setState({company_email:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                            <Row>
                            <Col>
                            <label>Industry Type*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-industry" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Industry Type " value={this.state.industry_type} onChange={e=>this.setState({industry_type:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                            <Row>
                            <Col>
                            <label>County*</label><FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-globe" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="select" value={this.state.country} onChange={e=>this.setState({country:e.target.value})}>
                            <option value="Ghana">Ghana</option>
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Address*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-map-marker" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="textarea" placeholder="Address" style={{height:"60px"}} value={this.state.address} onChange={e=>this.setState({address:e.target.value})} />
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            
                        </Row>
                            <Row>
                            <Col md="6">
                            <label>Website*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-internet-explorer" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Website " value={this.state.website} onChange={e=>this.setState({website:e.target.value})} />
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                            <Row>
                            <Col>
                            <label>Business Certificate*</label>
                            <Input type="file" onChange={e=>this.setState({business_cert:e.target.files[0]})}/>
                            
                            </Col>
                            <Col>
                            <label>Company Logo*</label>
                            <Input type="file" onChange={e=>this.setState({logo:e.target.files[0]})}/>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Button
                            className="btn btn-round"
                            style={{
                                borderRadius:"20px",
                                color: "#1b1e21",
                                background: "#F1CF00",
                                border:"1px solid #F1CF00"
                            }}
                            onClick={()=>this.handleNext()}
                            >Next <i className="fa fa-chevron-right"/></Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
                </Animated>
                :
                <div>
                </div>
                }
                {this.state.personal?
                <Animated animationOut="bounceOutRight" isVisible={this.state.personal}>
                <div className="account" style={{marginTop:"20px"}}>
                    <h3>User Account Information</h3>
                    
                    <hr className="my-3" />
                    {this.state.percentage === 0?
                    <></>:
                    <Progress value={this.state.percentage} />
                    }

                    <Row style={{marginTop:"50px"}}>
                        <Col md="8" className="ml-auto mr-auto">
                        <Row>
                            <Col>
                            <label>Full Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Full Name" value={this.state.name} onChange={e=>this.setState({name:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col>
                            <label>Email*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-envelope" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="email" placeholder="Email" value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <label>Title *</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input  type="select" value={this.state.title} onChange={e=>this.setState({title:e.target.value})}>
                            <option value = "Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            </Input>
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
                            <Input type="text" placeholder="Phone Number" value={this.state.phone1} onChange={e=>this.setState({phone1:e.target.value})}/>
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
                            <Input type="text" placeholder="Optional" value={this.state.phone2} onChange={e=>this.setState({phone2:e.target.value})}/>
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
                            <Input type="password"  placeholder="Password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/>
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
                            <Input type="password" placeholder="Re-type Pasword" value={this.state.confirm_password} onChange={e=>this.setState({confirm_password:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value={this.state.terms} onChange={e=>this.setState({terms:e.target.checked})}/> <p style={{fontSize:"13px", fontWeight:700}}>Agree To <a href="/auth/terms&conditions-client">Terms And Conditions</a></p>
                        
                        </Col>
                        </Row>
                        <Row>
                <Col>
                        <Button
                        className="btn btn-round"
                        style={{
                            borderRadius:"20px",
                            color: "#1b1e21",
                            background: "#F1CF00",
                            border:"1px solid #F1CF00"
                        }}
                        onClick={()=>this.handleBack()}
                        ><i className="fa fa-chevron-left"/>Back</Button>
                        </Col>
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
                </Animated>
                :
                <div></div>
                }
                </Col>
            </Row>
            </Form>
            <Modal isOpen={this.state.modal}>
                    <ModalHeader>
                    {this.state.message}
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

export default OrganizationAccount;
