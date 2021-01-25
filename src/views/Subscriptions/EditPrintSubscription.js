import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Spinner, CardHeader, CardFooter,Table,ModalFooter,Modal,ModalHeader
} from "reactstrap";
import NavigationPrompt from "react-router-navigation-prompt";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
//import history from "../history";

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
    }

componentDidMount(){
    this.setState({isActive:true})
    let total=0;
    axios.get(`${domain}/api/subscription/${this.props.location.state.id}/details`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      for(var i=0; i<res.data.length; i++){
        total = total + Number(res.data[i].total_amount);
      }
      this.setState({selectedSub:res.data,isActive:false, total:total})
    })
    .catch(error=>{
      console.log(error)
      this.setState({isActive:false})
    })
}

handleDelete=(id, index)=>{
  let tempData=this.state.selectedSub;
  let newData = [];
  let total = 0;
  let GrandTotal = 0;
  axios.delete(`${domain}/api/subscription-detail/${id}/delete`,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    tempData[index].details = tempData[index].details.filter(item=>item.id !==id);
    tempData[index].total_amount = tempData[index].total_amount - tempData[index].details.amount;
    console.log(tempData)
    for(var i=0; i<tempData.length; i++){
        total = total + Number(tempData[i].total_amount)
    }
    this.setState({selectedSub:tempData,modal:false, total:total})
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
                  <h3>Total Campaign Amount : <span style={{color:'red'}}>GH¢ {this.state.total}</span></h3>
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
        </Container>
      </>
    );
  }
}

export default EditPrintSubscription;
