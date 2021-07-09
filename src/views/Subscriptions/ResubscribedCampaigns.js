import React from "react";
import {
    Card,
    Container,
    Row,
    Col,Table,Button,CardBody,CardFooter,Spinner
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import axios from "axios";
  import Pagination from "react-js-pagination";


  let user =localStorage.getItem('access_token');
  var domain = "https://backend.kokrokooad.com";
  class ResubscribedCampaigns extends React.Component{

    state={
      campaigns:[],
      data:[],
      meta:[],
      isActive:true
    }

    componentDidMount(){
      this.getCampaigns()
    }


    getCampaigns(pageNumber=1){
      axios.get(`${domain}/api/fetch/resubscribed/campaigns?page=${pageNumber}`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        this.setState({campaigns:res.data, data:res.data.data, meta:res.data.meta, isActive:false})
      })
      .catch(error=>{
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
        {this.state.data.length<=0?
          <Row>
              <Col style={{textAlign:"center"}}>
                  <h4>You Have No Rejected Campaigns</h4>
              </Col>
          </Row>
          :
          <Container className=" mt--8" fluid>
          <Row>
          <Col md="12" sm="12" xl="12" xs="12" lg="12">
          <p style={{fontSize:"13px", fontWeight:500}}>View Rejected Campaigns.</p>
          <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <CardBody style={{overflowX:"scroll"}}>
          <Table striped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Reason for Rejection</th>
              <th>Ratecard Title</th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Amount</th>
              <th>Date Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value, index)=>(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{value.generated_id}</td>
              <td>{value.title}</td>
              {value[0].rejected_message.id == 5?
              <td>{value[0].other_message}</td>
              :
              <td>{value[0].rejected_message.message}</td>
              }
              <td>{value.rate_card_title.title}</td>
              <td>{value.company.media_house}</td>
              <td>{value.company.media_type}</td>
              <td>{value.total_amount.campaign_grand_total_with_tax}</td>
              <td>{value.date} {value.time}</td>
              <td>
                <Row>
                  <Col className="ml-auto mr-auto">
                    <Button title="Resubscribe"  color="info" style={{padding:"5px 10px 5px 10px"}} onClick={()=>this.props.history.push('/client/resubscribe/media-type',{
                        campaign_id:value.id,
                        campaign_title:value.title,
                        campaign_amount:value.total_amount
                        })}><i className="fa fa-repeat"/>
                      </Button>
                      <Button title="View" color="info" style={{padding:"5px 10px 5px 10px"}} onClick={()=>this.props.history.push('/client/completed-details',{
                        id:value.id,
                        title:value.title
                      })}>
                      <i className="fa fa-eye"/>
                      </Button> 
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          <CardBody>
              <Pagination
                totalItemsCount={this.state.meta&&this.state.meta.total}
                activePage={this.state.meta&&this.state.meta.current_page}
                itemsCountPerPage={this.state.meta&&this.state.meta.per_page}
                onChange={(pageNumber)=>this.getCampaigns(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
              </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>
          }
          
        </>
        }
        </Container>
        </>
        
      )
  }
}

  export default ResubscribedCampaigns;