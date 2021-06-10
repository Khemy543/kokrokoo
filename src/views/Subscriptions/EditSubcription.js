import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Spinner, CardHeader, CardFooter,Table, Modal, ModalHeader,ModalFooter,ModalBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
//import history from "../history";

let user =localStorage.getItem('access_token');
var domain = "https://backend.demo.kokrokooad.com";
class EditSubscription extends React.Component{

    state={
        isActive:true,
        selectedSub:[],
        total:0,
        title:this.props.location.state.title,
        deleteId:null,
        modal:false,
        detailsArray:[],
        index:null,
        discount_amount:0,
        volumeModal:false,
        volume:[]
    }

componentDidMount(){
    this.setState({isActive:true})
    let total = 0;
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

handleDelete=(id)=>{
  console.log(id)
  let tempData = this.state.selectedSub;
  let total = 0;
  let GrandTotal = 0;
  let discount = 0;
  axios.delete(`${domain}/api/subscription-detail/${id}/delete`,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    let newDetails = this.state.detailsArray.filter(item=>item.id !==id);
    if(newDetails.length<=0){
      tempData = tempData.filter(item=> item.id != tempData[this.state.index].id);
      console.log(tempData)
      for(var k=0; k<tempData.length; k++){
        GrandTotal = GrandTotal + Number(tempData[k].total_amount)
      }
    }else{
    tempData[this.state.index].details = newDetails;
    for(var i=0; i<newDetails.length; i++){
      total = total + Number(newDetails[i].amount);
    }
    tempData[this.state.index].total_amount = total;
    console.log(total, tempData)

    for(var k=0; k<tempData.length; k++){
      GrandTotal = GrandTotal + Number(tempData[k].total_amount);
    }
  }
  for(var t=0; t<this.state.volume.length; t++){
    let range = this.state.volume[t].amount_range.split("-");
    if(Number(range[0])<=total && total<=Number(range[1])){
        console.log("yes")
        discount = (this.state.volume[t].percentile/100) * GrandTotal
        console.log(discount)
    }
  }
    this.setState({selectedSub:tempData, total:GrandTotal, modal:false, discount_amount:discount})
  })
}
render(){
    return (
      <>
      <Header/>
        <Container className=" mt--7" fluid>
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
            <Card>
                <CardHeader>
                <CardHeader  style={{ maxWidth:"100%"}}>
                <Row>
                  <Col>
                  <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
                  </Col>
                  <Col>
                  <h3>Total Amount : <span style={{color:'red'}}>GH¢ {(this.state.total).toFixed(2)}</span></h3>
                  <h3>Discounted Total Amount (Expected): <span style={{color:'red'}}>GH¢ {(this.state.total - this.state.discount_amount).toFixed(2)}</span></h3>
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
                </CardHeader>
                    <CardBody style={{overflowX:"scroll"}}>
                    {this.state.selectedSub.map((item,key)=>(
                    <Row>
                        <Col md="12">
                        <h3>Total Amount  : {item.total_amount}</h3>
                        <p style={{marginBottom:"0px", fontWeight:600, fontSize:"13px"}}>{item.selected_date} - {item.day.day}</p>
                        <Table  bordered striped>
                        <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                        <tr>
                          <td>#</td>
                          <td>duration</td>
                          <td>Rate</td>
                          <td>Selected Spots</td>
                          <td>Time Segment</td>
                          <td>Amount</td>
                          <td>Delete</td>
                        </tr>
                        </thead>
                        <tbody>
                        {item.details.map((value,index)=>(
                            <tr>
                            <td>{index + 1}</td>
                            <td>{value.duration.duration} {value.duration.unit.unit}</td>
                            <td>{value.duration.rate}</td>
                            <td>{value.selected_spots}</td>
                            <td>{value.ratecard.start_time} - {value.ratecard.end_time}</td>
                            <td>{value.amount}</td>
                            <td style={{textAlign:"center"}}><i className="fa fa-trash" style={{color:"red", cursor:"pointer",fontSize:"15px"}}
                              onClick={()=>this.setState({modal:true, deleteId:value.id, detailsArray:item.details, index:key})}
                            /></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                          <br/>
                        </Col>
                    </Row>
                    
                    ))}
                    </CardBody>
                    <CardFooter>
                    <div style={{float:"right"}}>
                    <Button color="info"
                    onClick={()=>this.props.history.push("/client/cart")}
                    >
                        Go To Cart
                    </Button>
                    </div>
                    </CardFooter>
                    <Modal isOpen={this.state.modal}>
                      <ModalHeader>
                        Delete Campaign Detail?
                      </ModalHeader>
                      <ModalFooter>
                        <Button color="danger" onClick={()=>this.handleDelete(this.state.deleteId)}>Yes</Button>
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
                </Card>
            </Col>
            </Row>
          </>}
        
        </Container>
      </>
    );
  }
}

export default EditSubscription;
