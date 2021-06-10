import React from "react";
import {Link} from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col, CardTitle
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import axios from "axios";

let user =localStorage.getItem('access_token');
var domain = "https://backend.demo.kokrokooad.com";


class Index extends React.Component {
  
  state={
    active:0,
    pending:0,
    expired:0,
    rejected:0,
    approved:0,
    total:0,
    completed_campaigns:[]
  }

  componentDidMount(){
    axios.get(`${domain}/api/dashboard-stats`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      this.setState({
        active:res.data.active,
        pending:res.data.pending,
        expired:res.data.expired,
        rejected:res.data.rejected,
        approved:res.data.approved,
        total:res.data.total_subscriptions,
        completed_campaigns : res.data.completed_campaigns
      })
    })
    .catch(error=>{
      console.log(error)
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--8" fluid>
        <Row>
          <Col>
          <p
            style={{fontSize:"13px", fontWeight:500}}
            >View All Subscriptions And Thier Status.</p>
          </Col>
          <Col md="3" style={{display:"flex", justifyContent:"flex-end"}}>
          <Link to="/client/create-subscription">
          <Button
            color="info"
            >Create Campaign</Button>
          </Link>
            
          </Col>
        </Row>
        
          {/* <Row style={{marginTop:"20px"}}>
            <Col className="mb-5 mb-xl-0" xl="12" md="12" lg="12" sm="12" xs="12">
              <Card className="shadow">
              <CardBody>
              <FullCalendar
              headerToolbar= {{
                center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' // buttons for switching between views
              }}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin ]}
              height="75vh"
              />
            </CardBody>
              </Card>
            </Col>
          </Row> */}

          <Row style={{marginTop:"30px"}}>
            <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            ALL CAMPAIGNS
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.total}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-group" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      click to view <span className="text-info">all </span>campaigns
                      </p> */}
                    </CardBody>
                  </Card>
            </Col>
            <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            APPROVED CAMPAIGN
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.approved}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-thumbs-up" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                       all <span className="text-warning">apporved </span>campaigns
                      </p> */}
                    </CardBody>
                  </Card>
            </Col>
            
            </Row>
            <Row style={{marginTop:"30px"}}>
            {/* <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            ACTIVE CAMPAIGN
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.active}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fa fa-play-circle" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                       all <span className="text-success">active </span>campaigns
                      </p>
                    </CardBody>
                  </Card>
            </Col> */}
            <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            COMPLETED CAMPAIGN
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.completed_campaigns.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fa fa-hourglass-end" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                       all <span className="text-warning">completed </span>campaigns
                      </p> */}
                    </CardBody>
                  </Card>
            </Col>
            <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            PENDING CAMPAIGN
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.pending}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                            <i className="fa fa-clock-o" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                       all <span className="text-primary">pending </span>campaigns
                      </p> */}
                    </CardBody>
                  </Card>
            </Col>
          </Row>
          <Row style={{marginTop:"30px"}}>
          <Col md="6">
            <Card className="card-stats mb-4 mb-xl-0 shadow"
                  style={{cursor:"pointer"}}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            REJECTED CAMPAIGN
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.rejected}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa fa-ban" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      all <span className="text-danger">rejected </span>campaigns
                      </p> */}
                    </CardBody>
                  </Card>
            </Col>
          
          </Row>


        </Container>
      </>
    );
  }
}

export default Index;
