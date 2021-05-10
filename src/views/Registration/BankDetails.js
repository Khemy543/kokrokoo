import RegisterNavbar from "components/Navbars/RegisterNavbar";
import React from "react";
import {
    Form, Col, Row, Input, Button
} from "reactstrap";
import axios from "axios";
import Container from "reactstrap/lib/Container";


var domain = "https://backend.kokrokooad.com";

class BankDetails extends React.Component{

    state={
        bank_branch:"",
        bank_name:"",
        account_number:"",
        account_name:"",
        email:this.props.location.state.email
    }

    handleBankSubmit=(e)=>{
        e.preventDefault();
        this.setState({isActive:true})
        axios.post(`${domain}/api/auth/add-bank/${this.props.location.state.id}/details`,
        {
            bank_name:this.state.bank_name,
            bank_branch:this.state.bank_branch,
            account_name:this.state.account_name,
            account_number:this.state.account_number
        })
        .then(res=>{
            console.log(res.data);
            this.setState({modal:true, message:"Bank Details Saved!"})
            setTimeout(
                function(){
                    this.setState({modal:false});
                    this.props.history.push("/auth/await-verification",{email:this.state.email})
                }
                .bind(this),
                2000
            )
        })
        .catch(error=>{
            if(error.response){
                
            console.log(error.response.data)
            }
        })
    }

    render(){
        return(
            <>
            <RegisterNavbar />
            <Container>
                <Row>
                    <Col md="12">
                    <Form onSubmit={this.handleBankSubmit}>
                <Row>
                    <Col md="12">
                    <div className="account">
                        <h3>Payment Information</h3>
                        
                        <hr className="my-3" />
                        <Row style={{marginTop:"20px"}}>
                            <Col md="9" className="ml-auto mr-auto">
                            <Row>
                                <Col>
                                <label>Bank Name*</label>
                                <Input type="text" placeholder="Bank Name" value={this.state.bank_name} onChange={e=>this.setState({bank_name:e.target.value})} required/>
                                </Col>
                                <Col>
                                <label>Bank Branch*</label>
                                <Input type="text" placeholder="Bank Branch"  value={this.state.bank_branch} onChange={e=>this.setState({bank_branch:e.target.value})} required/>
                                </Col>
                            </Row>
                                <br/>
                                <Row>
                                <Col>
                                <label>Account Name*</label>
                                <Input type="text" placeholder="Account Name"  value={this.state.account_name} onChange={e=>this.setState({account_name:e.target.value})} required/>
                                </Col>
                                <Col>
                                <label>Account Number*</label>
                                <Input type="number" placeholder="Account Number"  value={this.state.account_number} onChange={e=>this.setState({account_number:e.target.value})} required/>
                                </Col>
                            </Row>
                            <br/>
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
                            <Col>
                            <a href="!#" onClick={()=>this.props.history.push("/auth/await-verification",{email:this.state.email})}
                            style={{fontSize:"13px",color:"red", fontWeight:600}}>skip</a> 
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
            </Container>
            </>
        )
    }
}
export default BankDetails;