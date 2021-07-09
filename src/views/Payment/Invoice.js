import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Col,Table,CardFooter,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import InvoiceCard from "components/Invoice/InvoiceCard";
import ReactToPrint from "react-to-print";

let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";

class Invoice extends React.Component{

  state={
    isActive:true,
    cart:[],
    user:[],
    total:0,
    account_balance:{},
    service_total:0
  }



  componentDidMount() {
    let total = 0;
    let service_total = 0;
    axios.get(`${domain}/api/get/cart/${this.props.location.state.cart_id}/campaign/breakdown-calculation`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      for(var i=0; i<res.data.length; i++){
        total = total + Number(res.data[i].total_amount.campaign_total_amount_with_discount);
        service_total = service_total + Number(res.data[i].total_amount.campaign_total_amount_without_discount);
      }
      this.setState({cart:res.data,isActive:false, total:total, service_total:service_total});
    })
    .catch(error=>{
    })

    axios.get(`${domain}/api/client`,{
      headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        this.setState({user:res.data.user, isActive:false})
        });
    axios.get(`${domain}/api/fetch/user/account/balance/${this.props.location.state.cart_id}`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(response=>{
      this.setState({account_balance:response.data})
    })
    .catch(error=>{

    })
  }


  render(){
  return (
    <>
        <Header />
        {/* Page content */}
        <Container className=" mt--8" fluid>
        {this.state.isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
        :
        <>
        <ReactToPrint
          trigger={() => <Button style={{backgroundColor:"transparent", boxShadow:"none"}}><i className="fa fa-print"/> | Print Invoice</Button>}
          content={() => this.componentRef}
        />
        <Row>
            <InvoiceCard data={this.state} next={this.props.location.state} ref={el => (this.componentRef = el)}/>
            
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col md="8">
          </Col>
          <Col md="4">
                  <Button
                  color="info"
                  onClick={()=>this.props.history.push("/client/payment/details",{
                    email:this.state.user.email, 
                    cart_id:this.props.location.state.invoice.cart_id,
                    invoice_id:this.props.location.state.invoice.generated_invoice_id
                  })}
                  >
                    Proceed To Payment
                  </Button>
          </Col>
        </Row>
        </>
        }
        </Container>
    </>
  );
}
}


export default Invoice;
