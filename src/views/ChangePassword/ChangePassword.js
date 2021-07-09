import React from "react";
import {
    Container,Row,Col, Table, Input, Card, CardBody, Button, Form, InputGroup, FormGroup,InputGroupAddon,InputGroupText,ModalHeader,Modal,ModalFooter
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

let user = localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";
class ChangePassword extends React.Component{

    state={
        eye1:false,
        eye2:false,
        eye3:false,
        password:"",
        confirm_password:"",
        old_password:"",
        message:"",
        modal:false,

    }

    toggelEye1=()=>this.setState({eye1:!this.state.eye1}) 
    toggleEye2=()=>this.setState({eye2:!this.state.eye2})
    toggleEye3=()=>this.setState({eye3:!this.state.eye3})

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password === this.state.confirm_password){
        axios.post(`${domain}/api/change/password`, {
            password:this.state.old_password,
            new_password:this.state.password
        },{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            this.setState({modal:true,message:res.data.status})
        })
        .catch(error=>{
            if(error.response){
            }
        })
    }
    else{
        this.setState({message:"Passwords Do Not Match!", modal:true})
    }
}

    render(){
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >Change Your Account <span style={{color:"red"}}>Password</span> Anytime.</p>
            <Row style={{marginTop:"30px"}}>
            <Col md="6" lg="6" sm="12" xs="12" className="ml-auto mr-auto">
                <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"0px"}}>
                    <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                        <h3>Change Password</h3>
                        <Row style={{marginTop:"10px"}}>
                        <Col>
                        <label>Password</label>
                        <FormGroup>
                        <InputGroup>
                        <Input type={!this.state.eye1?"password":"text"} placeholder="Old Password" value={this.state.old_password} onChange={e=>this.setState({old_password:e.target.value})} required/>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <i className={!this.state.eye1?"fa fa-eye-slash":"fa fa-eye"} onClick={this.toggelEye1} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Row style={{marginTop:"10px"}}>
                        <Col>
                        <label>New Password</label>
                        <FormGroup>
                        <InputGroup>
                        <Input type={!this.state.eye2?"password":"text"} placeholder="New Password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})} required/>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <i className={!this.state.eye2?"fa fa-eye-slash":"fa fa-eye"} onClick={this.toggleEye2} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Row style={{marginTop:"10px"}}>
                        <Col>
                        <label>ReType Password</label>
                        <FormGroup>
                        <InputGroup>
                        <Input type={!this.state.eye3?"password":"text"} placeholder="Retype Password" value={this.state.confirm_password} onChange={e=>this.setState({confirm_password:e.target.value})} required/>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <i className={!this.state.eye3?"fa fa-eye-slash":"fa fa-eye"} onClick={this.toggleEye3} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Button type="submit" color="primary" style={{marginTop:"10px"}}>Change Password</Button>
                    </Form>
                    </CardBody>
                </Card>
            </Col>
            </Row>
            </Container>
            <Modal isOpen={this.state.modal}>
            <ModalHeader style={{textAlign:"center", display:"block"}}>
            <h4>{this.state.message}</h4>
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>this.setState({modal:false})}>
                    Close
                </Button>
            </ModalFooter>
            </Modal>
            </>
        )
    }
}
export default ChangePassword;