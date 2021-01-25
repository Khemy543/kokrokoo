
import React from "react";
import axios from 'axios';
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";


// reactstrap components
import { Card, Container, Row ,Col, CardBody, Table,Button, Modal,ModalBody,ModalFooter, ModalHeader, Spinner, CardHeader, CardFooter
} from "reactstrap";
import Pagination from "react-js-pagination";

// core components
import Header from "components/Headers/Header.js";
var domain = "https://backend.demo.kokrokooad.com";
let user =localStorage.getItem('access_token');

class SubDetails extends React.Component {

    state={
        selectedSub:[],
        selectedPrintSub:[],
        total:0,
        title:"",
        isActive:true
    }

    componentDidMount(){
        this.handleView(this.props.location.state.id, this.props.location.state.title)
    }

    handleView=(id, title)=>{
        let total =0;
      axios.get(`${domain}/api/subscription/${id}/details`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data);
        let data=res.data;
        if(res.data[0].details[0].duration !== null){
         for(var i=0; i<data.length; i++){
           console.log(data[i].total_amount)
           total = Number(data[i].total_amount) + total;
         }
         console.log(total)
        this.setState({selectedSub:res.data, total:total, title:title,isActive:false})
         }
         else{
           for(var i=0; i<data.length; i++){
             console.log(data[i].total_amount)
             total = Number(data[i].total_amount) + total;
           }
           this.setState({selectedPrintSub:res.data, title:title, isActive:false, total:total})
         }
       })
      .catch(error=>{
        console.log(error)
        this.setState({isActive:false})
      })
     }

render(){
    return(
        <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {this.state.isActive?
        <Row>
        <Col md="12" style={{textAlign:"center"}}>
            <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
        </Col>
        </Row>
          :
          <Row>
          <Col md="12" lg="12" sm="12" xl="12" xs="12">
          {this.state.selectedPrintSub.length<=0?
          
          <Card>
          <CardHeader style={{display:"inline"}}>
          <div>
          <Row>
            <Col>
              <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
            </Col>
            <Col>
            <div style={{float:"right"}}>
              <h3>Total Amount :<span style={{color:"red"}}> GH¢ {this.state.total}</span></h3>
            </div>
            </Col>
          </Row>
          </div>
          </CardHeader>
            <CardBody>
            {this.state.selectedSub.map((item,key)=>(
              <Row style={{marginBottom:"20px"}}>
                <Col md="12">
                  <h3>Amount  : GH¢ {item.total_amount}</h3>
                  <p style={{marginBottom:"0px"}}>{item.selected_date} - {item.day.day}</p>
                
                <Table  bordered>
                <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                  <tr>
                  <td>#</td>
                  <td>duration</td>
                  <td>Rate</td>
                  <td>Selected Spots</td>
                  <td>Time Segment</td>
                  <td>Amount</td>
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
                    </tr>
                    ))}
                  </tbody>
              </Table>
                </Col>
              </Row>
             
              ))}
            </CardBody>
          </Card>
          :
          <Card>
          <CardHeader style={{display:"inline"}}>
          <div>
          <Row>
            <Col>
              <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
            </Col>
            <Col>
            <div style={{float:"right"}}>
              <h3>Total Amount :<span style={{color:"red"}}> GH¢ {this.state.total}</span></h3>
            </div>
            </Col>
          </Row>
          </div>
          </CardHeader>
            <CardBody>
            {this.state.selectedPrintSub.map((item,key)=>(
              <Row style={{marginBottom:"20px"}}>
                <Col md="12">
                  <h3>Amount  : GH¢ {item.total_amount}</h3>
                  <p style={{marginBottom:"0px"}}>{item.selected_date} - {item.day.day}</p>
                
                <Table  bordered>
                <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                  <tr>
                  <td>#</td>
                  <td>Size</td>
                  <td>Page Section</td>
                  <td>Amount</td>
                  </tr>
                  </thead>
                  <tbody>
                  {item.details.map((value,index)=>(
                    <tr>
                      <td>1</td>
                      <td>{value.ratecard.size}</td>
                      <td>{value.ratecard.page_section}</td>
                      <td>{value.ratecard.cost}</td>
                    </tr>
                    ))}
                  </tbody>
              </Table>
                </Col>
              </Row>
             
              ))}
            </CardBody>
          </Card>
          }
          </Col>
          </Row>
        }
          </Container>
          </>
    )
}
}
export default SubDetails