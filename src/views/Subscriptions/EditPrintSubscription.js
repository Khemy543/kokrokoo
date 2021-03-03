import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Spinner, CardHeader, CardFooter,Table,ModalFooter,Modal, ModalBody,ModalHeader
} from "reactstrap";
import NavigationPrompt from "react-router-navigation-prompt";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

let user =localStorage.getItem('access_token');
var domain = "https://backend.demo.kokrokooad.com";
class EditPrintSubscription extends React.Component{

    state={
        isActive:false,
        selectedSub:[],
        title:this.props.location.state.title,
        prompt:true,
        deleteId:null,
        modal:false,
        total:0,
        index:null,
        discount_amount:0,
        volume:[],
        volumeModal:false
    }

componentDidMount(){
    this.setState({isActive:true})

    let total=0;
    let discount = 0;
    axios.get(`${domain}/api/subscription/${this.props.location.state.id}/details`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      for(var i=0; i<res.data.length; i++){
        total = total + Number(res.data[i].total_amount);
      }
      axios.get(`${domain}/api/company/${this.props.location.state.media_house_id}/volume-discounts`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(response=>{
            this.setState({volume:response.data});
            for(var t=0; t<response.data.length; t++){
              let range = response.data[t].amount_range.split("-");
              console.log(response.data[t].amount_range)
              if(Number(range[0])<=total && total<=Number(range[1])){
                  console.log("yes")
                  discount = (response.data[t].percentile/100) * total
                  console.log(discount)
              }
          }
          this.setState({selectedSub:res.data,isActive:false, total:total,discount_amount:discount})
        });

    })
    .catch(error=>{
      console.log(error)
      this.setState({isActive:false})
    })
}

handleDelete=(id, index)=>{
  let tempData=this.state.selectedSub;
  let total = 0;
  let discount = 0;
  axios.delete(`${domain}/api/subscription-detail/${id}/delete`,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    let deleted = tempData[index].details.find(item=>item.id == id );
    tempData[index].details = tempData[index].details.filter(item=>item.id !==id);
    if(tempData[index].details.length <=0){
     tempData = tempData.filter(item => item.id != tempData[index].id )
    }else{
    tempData[index].total_amount = Number(tempData[index].total_amount) - Number(deleted.amount);
    }
    console.log(tempData)
    for(var i=0; i<tempData.length; i++){
        total = total + Number(tempData[i].total_amount)
    }
    for(var t=0; t<this.state.volume.length; t++){
      let range = this.state.volume[t].amount_range.split("-");
      if(Number(range[0])<=total && total<=Number(range[1])){
          discount = (this.state.volume[t].percentile/100) * total;
      }
    }
    this.setState({selectedSub:tempData,modal:false, total:total, discount_amount:discount})
  })
}

render(){
    return (
      <>
      <Header/>
        <Container className=" mt--8" fluid>
        {this.state.isActive?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          <p
            style={{fontSize:"13px", fontWeight:500}}
            >Edit Campaign</p>
            <Row style={{marginTop:"20px"}}>
            <Col md="12" xl="12" lg="12" xs="12" sm="12">
            <Card isOpen={this.state.modal}  style={{ maxWidth:"90%"}}>
                <CardHeader  style={{ maxWidth:"100%"}}>
                <Row>
                  <Col>
                  <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
                  </Col>
                  <Col>
                  <h3>Total Amount : <span style={{color:'red'}}>GH¢ {this.state.total}</span></h3>
                  <h3>Discount Total Amount(Expected) : <span style={{color:'red'}}>GH¢ {this.state.discount_amount}</span></h3>
                  </Col>
                  <Col>
                  <Button
                    style={{ float:"right"}}
                    color="info"
                    onClick={()=>this.setState({volumeModal:true})}
                    >
                        Volume Discount
                    </Button>
                  </Col>
                </Row>
                </CardHeader>
                    <CardBody>
                    {this.state.selectedSub.map((item,key)=>(
                    <Row style={{marginBottom:"20px"}}>
                        <Col md="12">
                        <h3>Total Amount  : {item.total_amount}</h3>
                        <p style={{marginBottom:"0px", fontWeight:600, fontSize:"13px"}}>{item.selected_date} - {item.day.day}</p>
                        <Table  bordered striped>
                        <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                        <tr>
                        <td>#</td>
                        <td>Size</td>
                        <td>Page Section</td>
                        <td>Amount</td>
                        <td>Delete</td>
                        </tr>
                        </thead>
                        <tbody>
                        {item.details.map((value, index)=>(
                            <tr>
                            <td>{key + 1}</td>
                            <td>{value.ratecard.size}</td>
                            <td>{value.ratecard.page_section}</td>
                            <td>{value.ratecard.cost}</td>
                            <td style={{textAlign:"center"}}><i className="fa fa-trash" style={{color:"red", cursor:"pointer",fontSize:"15px"}}
                              onClick={()=>this.setState({deleteId:value.id, index:key, modal:true})}
                            /></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                        </Col>
                    </Row>
                    
                    ))}
                    </CardBody>
                    <CardFooter>
                    <Button color="info"
                    onClick={()=>this.props.history.push("/client/cart")}
                    >
                        Go to Cart
                    </Button>
                    </CardFooter>
                </Card>
            </Col>
            </Row>
          </>}
            <Modal isOpen={this.state.modal}>
              <ModalHeader>
                Delete Campaign Detail?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={()=>this.handleDelete(this.state.deleteId, this.state.index)}>Yes</Button>
                <Button color="info" onClick={()=>this.setState({modal:false})}>No</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.volumeModal}  style={{ maxWidth:"90%"}} toggle={()=>this.VolumeCollapseToggle()}>
              <ModalHeader>
            <h3>{this.props.location.state.media_house_name}</h3>
              </ModalHeader>
              <ModalBody>
              <Container fluid>
            {this.state.volume.length<=0?
            <Row>
                <Col  style={{textAlign:"center"}}>
                    <h4>No Volume Discount</h4>
                </Col>
            </Row>
            :
            <Row>
            <Col lg="12" xs="12" md="12" sm="12" xl="12">
            <br/>
            <Table striped bordered>
            <thead>
                <tr>
                <th>#</th>
                <th style={{fontWeight:1000}}>Amount Range (Min-Max)</th>
                <th style={{fontWeight:1000}}>Discount Offer(%)</th>
                </tr>
            </thead>
            <tbody>
            {this.state.volume.map((value,key)=>(
                <tr>
                <th scope="row">{key+1}</th>
                <td>GH¢ {value.amount_range}</td>
                <td>{value.percentile}%</td>
                </tr>
                ))}
            </tbody>
            </Table>
            </Col>
            </Row>
            }
            </Container>
              </ModalBody>
              <ModalFooter>
                <Button
                color="danger"
                onClick={()=>this.setState({volumeModal:false})}
                >
                    Close
                </Button>
              </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default EditPrintSubscription;
