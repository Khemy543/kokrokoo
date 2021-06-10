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

  let user =localStorage.getItem('access_token');
  var domain = "https://backend.demo.kokrokooad.com";
  class SearchResults extends React.Component{

    state={
        isActive:false,
    }

    componentDidMount(){
       console.log(this.props.location.state)
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
        {this.props.location.state.searchResults.length<=0?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No Search Result(s) Found</h4> 
            </Col>
        </Row>
        :
        <>
        <p>Search Results for "<b>{this.props.location.state.searchKey}</b>"</p> 
        <br/>
        {this.props.location.state.campaigns.length<=0?
        <></>:
        <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
        <p style={{
            marginTop:"20px",
            marginLeft:"20px",
            fontWeight:"bold",
            marginBottom:"-15px"
          }}>Campaign Results</p>
          <CardBody style={{overflowX:"scroll"}}>
          <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Rate Card Title</th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Status</th>
              <th>Date Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.location.state.campaigns.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.searchable.generated_id}</td>
              <td>{value.searchable.title}</td>
              <td>{value.searchable.ratecard_title.rate_card_title}</td>
              <td>{value.searchable.ratecard_title.company.media_house}</td>
              <td>{value.searchable.ratecard_title.company.media_type.mediaType}</td>
              <td>{value.searchable.status}</td>
              <td>{value.searchable.created_at}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" className="ml-auto mr-auto">
                  <Button color="info" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>this.props.history.push('/client/campaign-details',{id:value.searchable.id, title:value.searchable.title})}
                  ><i className="fa fa-eye"/></Button>
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          </Card>
        }

        {this.props.location.state.ratecards<=0?
        <></>:
          <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <p style={{
            marginTop:"20px",
            marginLeft:"20px",
            fontWeight:"bold",
            marginBottom:"-15px"
          }}>Rate Card Results</p>
          <CardBody style={{overflowX:"scroll"}}>
          <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>RateCard Title</th>
              <th>Service Desciption</th>
              <th>Media House</th>
              <th>File Types</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.location.state.ratecards.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.searchable.rate_card_title}</td>
              <td>{value.searchable.service_description}</td>
              <td>{value.searchable.company.media_house}</td>
              {console.log(value.searchable.file_types.slice(1,-1))}
              <td>{value.searchable.file_types.slice(1,-1)}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" className="ml-auto mr-auto">
                  <Button color="info" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>this.props.history.push('/client/rate-card-details',{id:value.searchable.id, title:value.searchable.rate_card_title})}
                  ><i className="fa fa-eye"/></Button>
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          </Card>
        }

        {this.props.location.state.companies<=0?
        <></>:
          <Card style={{margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <p style={{
            marginTop:"20px",
            marginLeft:"20px",
            fontWeight:"bold",
            marginBottom:"-15px"
          }}>Media House Results</p>
          <CardBody style={{overflowX:"scroll"}}>
          <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Media House</th>
              <th>Purpose</th>
              <th>Language Of Communication</th>
              <th>Coverage Region</th>
            </tr>
          </thead>
          <tbody>
            {this.props.location.state.companies.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.searchable.company_name}</td>
              <td>{value.searchable.media_house}</td>
              <td>{value.searchable.purpose}</td>
              <td>{value.searchable.languages.slice(1,-1)}</td>
              <td>{value.searchable.region}</td>
            </tr>
            ))}  
          </tbody>
          </Table>
          </CardBody>
          </Card>
        }
        </>
        }
        </>
        }
        </Container>
        </>
        
      )
  }
}

  export default SearchResults;