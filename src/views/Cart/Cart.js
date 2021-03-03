import React from "react";
import {
    Card,
    Container,
    Row,
    Col,Table,Button,CardBody,CardFooter,Spinner,Modal,ModalFooter,ModalHeader
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import axios from "axios";
import EmptyCart from "./EmptyCart.js";


  let user =localStorage.getItem('access_token');
  var domain = "https://backend.demo.kokrokooad.com";
  class Cart extends React.Component{

    state={
      cart:[],
      payLater:[],
      allData:[],
      cartTotal:0,
      isActive:false,
      cart_id:null,
      deleteModal:false,
      deleteId:null
    }

    componentDidMount(){
      let tempCart = [];
      let tempPayLater = [];
      let cartTotal = 0;
      this.setState({isActive:true})
      axios.get(`${domain}/api/cart/campaigns`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        tempCart = res.data.filter(item=>item.pay_later === 0);
        tempPayLater = res.data.filter(item=>item.pay_later === 1);
        for(var i =0; i<tempCart.length; i++){
          cartTotal = cartTotal + tempCart[i].total_amount;
        }
        this.setState({cart:tempCart, payLater:tempPayLater, cartTotal:cartTotal, allData:res.data, isActive:false})
      })
      .catch(error=>{
        console.log(error)
      })
    }

    moveToPayLater=(id)=>{
      let tempPayLater = this.state.payLater;
      let cartTotal = 0;
      axios.post(`${domain}/api/move/${id}/to-pay-later`,null,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        if(res.data.message === "moved to pay later"){
          let movedData = this.state.cart.find(item=>item.id === id);
          tempPayLater.push(movedData);
          let newCart = this.state.cart.filter(item=>item.id !== id);
          for(var i =0; i<newCart.length; i++){
            cartTotal = cartTotal + newCart[i].total_amount;
          }
          this.setState({payLater:tempPayLater,cart:newCart, cartTotal:cartTotal})
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }

    moveToCart=(id)=>{
      let tempCart = this.state.cart;
      let cartTotal = 0;
      axios.post(`${domain}/api/move/${id}/to-cart`,null,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        if(res.data.message === "moved to cart"){
          let movedData = this.state.payLater.find(item=>item.id === id);
          tempCart.push(movedData);
          let newPayLater = this.state.payLater.filter(item=>item.id !== id);
          for(var i =0; i<tempCart.length; i++){
            cartTotal = cartTotal + tempCart[i].total_amount;
          }
          this.setState({payLater:newPayLater,cart:tempCart, cartTotal:cartTotal,cart_id:res.data.cart_id})
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }

    handleDelete=(id)=>{
      let tempCart = this.state.cart;
      let tempPayLater = this.state.payLater;
      let cartTotal = 0;
      axios.delete(`${domain}/api/scheduledAd/${id}/delete`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        tempCart = tempCart.filter(item=>item.id !== id);
        tempPayLater = tempPayLater.filter(item=>item.id !== id);
        for(var i =0; i<tempCart.length; i++){
          cartTotal = cartTotal + tempCart[i].total_amount;
        }
        this.setState({payLater:tempPayLater,cart:tempCart, cartTotal:cartTotal, deleteModal:false})
      })
      .catch(error=>{
        console.log(error)
      })
    }

    handleInvoive=()=>{
      let tempCart = this.state.cart;
      let cart_id = null;
      console.log(this.state.cart_id)
      if(this.state.cart_id === null){
        for(var i=0; i<tempCart.length;i++){
          if(tempCart[i].cart_id.id !== null){
              cart_id = tempCart[i].cart_id.id;
              break; 
          }
          else{
            continue;
          }
        }
      }
      else{
        cart_id = this.state.cart_id;
      }
      
      console.log("cart_id",cart_id)
      axios.get(`${domain}/api/payment/${cart_id}/invoice`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        this.props.history.push("/client/subscription-invoice",{invoice:res.data.invoice, cart_id:cart_id})
      })
      .catch(error=>{
        console.log(error)
      })
    }

    render(){
      return(
        <>
        <Header />
        <Container className=" mt--8" fluid>
        {this.state.isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
        :
        <>
        {this.state.cart.length<=0 && this.state.payLater.length<=0?
          <div>
            <EmptyCart/>
          </div>
          :
          <Container className=" mt--8" fluid>
          <Row>
          <Col md="12" sm="12" xl="12" xs="12" lg="12">
          <p style={{fontSize:"13px", fontWeight:500}}>View Your Cart. Which Campaign do you want to <span style={{color:"red"}}>Pay Later</span>.</p>
          <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <CardBody style={{overflowX:"scroll"}}>
          <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Ratecard Title</th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Amount</th>
              <th>Date and Time Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cart.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.generated_id}</td>
              <td>{value.title}</td>
              <td>{value.rate_card_title.title}</td>
              <td>{value.company.media_house}</td>
              <td>{value.company.media_type}</td>
              <td>{(Math.round(value.total_amount * 100) / 100).toFixed(2)}</td>
              <td>{value.date} {value.time}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6">
                  <Button color="warning" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>this.moveToPayLater(value.id)}
                  ><i className="fa fa-refresh"/></Button>
                  <Button color="danger" style={{padding:"5px 10px 5px 10px"}} onClick={()=>this.setState({deleteModal:true, deleteId:value.id})}>
                    <i className="fa fa-trash"/>
                  </Button>
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          <CardFooter>
          <Row>
          <Col md="4">
            <h4 style={{marginLeft:"20px"}}>TOTAL : {this.state.cart.length}</h4>
          </Col> 
          <Col md="4">
                <h4>TOTAL AMOUNT: GH¢ {(Math.round(this.state.cartTotal * 100) / 100).toFixed(2)}</h4>
          </Col>
          <Col md="4" style={{display:"flex",justifyContent:"flex-end"}}>
                <Button color="info"
                onClick={()=>this.handleInvoive()}
                >CHECKOUT</Button>
          </Col>
          
        </Row> 
          </CardFooter>
        
          </Card>
          </Col>
          </Row>
            
          <Row style={{marginTop:"20px"}}>
          <Col md="12">
           <h4 style={{marginLeft:"20px"}}>PAY LATER</h4> 
          <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <CardBody style={{overflowX:"scroll"}}>
          <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Ratecard Title</th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Amount</th>
              <th>Date and Time Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.payLater.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.generated_id}</td>
              <td>{value.title}</td>
              <td>{value.rate_card_title.title}</td>
              <td>{value.company.media_house}</td>
              <td>{value.company.media_type}</td>
              <td>{(Math.round(value.total_amount * 100) / 100).toFixed(2)}</td>
              <td>{value.date} {value.time}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6">
                  <Button color="info" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>this.moveToCart(value.id)}
                  ><i className="fa fa-refresh"/></Button>
                  <Button color="danger" style={{padding:"5px 10px 5px 10px"}} onClick={()=>this.setState({deleteModal:true, deleteId:value.id})}>
                    <i className="fa fa-trash"/>
                  </Button>
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          <CardFooter>
          <Row>
          <Col md="4">
            <h4 style={{marginLeft:"20px"}}>TOTAL : {this.state.payLater.length}</h4>
          </Col> 
          <Col md="4">
               
          </Col>
          
        </Row>  
          </CardFooter>
       
          </Card>
          </Col>
          </Row>
        </Container>
          }
          
        </>
        }
        </Container>
        <Modal isOpen={this.state.deleteModal}>
              <ModalHeader>
                Delete Campaign?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={()=>this.handleDelete(this.state.deleteId)}>Yes</Button>
                <Button color="info" onClick={()=>this.setState({deleteModal:false})}>No</Button>
              </ModalFooter>
            </Modal>
        </>
        
      )
  }
}

  export default Cart;