
import React from "react";
import axios from 'axios';
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";


// reactstrap components
import { Card, Container, Row ,Col, CardBody, Table,Button, Modal,ModalBody,ModalFooter, ModalHeader, Spinner
} from "reactstrap";
import Pagination from "react-js-pagination";

// core components
import Header from "components/Headers/Header.js";
var domain = "https://backend.demo.kokrokooad.com";
let user =localStorage.getItem('access_token');

class TrackCampaign extends React.Component {

    state={
        liveCampaigns:[],
        data:[],
        spinnerActive:true,
    }

  componentDidMount(){
    this.getLiveCampaigns();
  }

  getLiveCampaigns(pageNumber = 1){
    axios.get(`${domain}/api/track-live-subscriptions?page=${pageNumber}`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({
          data:res.data.data,
          liveCampaigns:res.data,
          spinnerActive:false
        })
    })
    .catch(error=>{
        console.log(error)
    })
  }

  render() {
    const {meta} = this.state.liveCampaigns;
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {this.state.spinnerActive?
              <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!this.state.spinnerActive && this.state.data.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>You Have No Live Campaigns</h4> 
            </Col>
          </Row>
          :
          <>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >View Live Campaigns You Have Created.</p>
          <Row style={{marginTop:"20px"}}>
            <Col lg="12" md="12" xl="12" sm="12" xs="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"auto"}}>
            <Table striped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>Campaign Id</th>
              <th>Campaign Title</th>
              <th>Production Date</th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value, index)=>(
              <tr>
              <td>{value.campaign_title_generated_id}</td>
              <td>{value.campaign_title}</td>
              <td>{value.selected_date}</td>
              <td>{value.media_house}</td>
              <td>{value.media_type}</td>
              <td>{value.status}</td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          <CardBody>
          <Pagination
                totalItemsCount={meta&&meta.total}
                activePage={meta&&meta.current_page}
                itemsCountPerPage={meta&&meta.per_page}
                onChange={(pageNumber)=>this.getLiveCampaigns(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
          </CardBody>
          </Card>
            </Col>
          </Row>
        </>}
        </>
        }
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}

export default TrackCampaign;
