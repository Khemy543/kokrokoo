import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Spinner, CardHeader, CardFooter,Table, Modal, ModalHeader,ModalFooter
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
        index:null
    }

componentDidMount(){
    this.setState({isActive:true})
    let total = 0;
    axios.get(`${domain}/api/subscription/${this.props.location.state.id}/details`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      for(var i=0; i<res.data.length; i++){
        total = total + Number(res.data[i].total_amount);
      }
      this.setState({selectedSub:res.data,total:total,isActive:false})
    })
    .catch(error=>{
      console.log(error)
      this.setState({isActive:false})
    })
}

handleDelete=(id)=>{
  console.log(id)
  let tempData = this.state.selectedSub;
  let newData = [];
  let total = 0;
  let GrandTotal = 0;
  axios.delete(`${domain}/api/subscription-detail/${id}/delete`,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    let newDetails = this.state.detailsArray.filter(item=>item.id !==id);
    if(newDetails.length<=0){
      tempData = tempData.filter(item=> item.id === tempData[this.state.index].id);
      console.log('index',tempData)
      for(var k=0; k<tempData.length; k++){
        GrandTotal = GrandTotal + Number(tempData[k].total_amount)
      }
    }else{
    tempData[this.state.index].details = newDetails;
    console.log("after",tempData)
    for(var i=0; i<newDetails.length; i++){
      total = total + Number(newDetails[i].amount);
    }
    tempData[this.state.index].total_amount = total;
    console.log(total, tempData)

    for(var k=0; k<tempData.length; k++){
      GrandTotal = GrandTotal + Number(tempData[k].total_amount)
    }
  }
    this.setState({selectedSub:tempData, total:GrandTotal, modal:false})
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
                <Row>
                  <Col>
                  
                  <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
                  </Col>
                  <Col>
                  <h3>Total Campaign Amount : <span style={{color:'red'}}>GH¢ {this.state.total}</span></h3>
                  </Col>
                </Row>
                </CardHeader>
                    <CardBody>
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
