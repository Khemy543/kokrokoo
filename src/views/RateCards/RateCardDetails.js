import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Nav,NavItem,NavLink,TabContent,TabPane,Table,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";
class RateCardDetails extends React.Component{

    state={
        isActive:false,
        activeTab:"1",
        card_details:[],
        days:[],
        data:[]
    }
    
     toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
      };  


      componentDidMount(){
          this.setState({isActive:true})
          axios.get(`${domain}/api/view-ratecard/${this.props.location.state.id}/details`,
          {headers:{ 'Authorization':`Bearer ${user}`}})
          .then(res=>{
              if(res.data !== null){
                this.setState({card_details:res.data, isActive:false});
                  let selected= res.data.filter(item=>item.day.id === 1);
                  if(selected !== undefined){
                      this.setState({data:selected})
                  }
              }
          })
          .catch(error=>{
          });

          axios.get(`https://media.test.backend.kokrokooad.com/api/fetch-days-and-units`)
            .then(res=>{
                this.setState({days:res.data.days,isActive:false})
            })

      }

    

getDetails=(id)=>{
    let tempData = this.state.card_details;
    const newId = Number(id)
    let selectedDetaisl = tempData.filter(item=> item.day.id === newId);
    if(selectedDetaisl != undefined){
      this.setState({data:selectedDetaisl})
    }
    else{
      this.setState({data:[]})
    }
  }

    render(){
    return (
      <>
      <Header/>
        <Container className=" mt--8" fluid>
        {this.state.card_details.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <Row>
              <Col md="12">
              <Row>
            <Col md="12">
            <Card className=" shadow"> 
                <CardHeader className="text-uppercase" style={{padding:"0px 0px 0px 0px", margin:"20px 20px 0px 0px"}}>
                    <h2 style={{marginLeft:"40px"}}>
                    {this.props.location.state.title}
                    </h2>
                    </CardHeader>
                    <CardBody>
                    <Container>
                        
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                {this.state.days.map((value,index)=>(
                                <NavItem key={index}>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={this.state.activeTab === `${value.id}` ? "active" : ""}
                                    onClick={() => {
                                    this.toggle(`${value.id}`);
                                    this.getDetails(value.id)
                                    }}
                                >
                                <h4 style={{color:"#404E67"}}>
                                    {value.day}</h4>
                                </NavLink>
                                </NavItem>
                            ))}
                            </Nav>
                            </div>
                        </div>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId={this.state.activeTab}>
                            {this.state.data.length<=0?
                            <Row>
                                <Col style={{textAlign:"center"}}>
                                    <h3>No Data Provided For This Day</h3>
                                </Col>
                            </Row>
                            :
                            <>
                            {this.state.data.map((value,index)=>(
                            <Container style={{borderBottom:"1px solid rgb(64 78 103 / 30%)"}}>
                                <br/>
                            <Row>
                                <Col md="6">
                                <h3><span style={{fontSize:"14px",textTransform:"uppercase", fontWeight:400}}>Number Of Spots:</span> {value.no_of_spots}</h3>
                                <h3><span  style={{fontSize:"14px",textTransform:"uppercase", fontWeight:400}}>Time Frame:</span> {value.start_time} - {value.end_time}</h3>
                                </Col>
                            </Row>
                            <br/>
                            
                            <Row>
                            <Col>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <th style={{fontWeight:1000,backgroundColor:"#01a9ac",color:"white"}}>DURATION</th>
                                            {value.duration.map((item, index)=>(
                                            <td>{item.duration} {item.unit.unit}</td>
                                            ))}

                                        </tr>
                                        <tr>
                                            <th style={{fontWeight:1000,backgroundColor:"#01a9ac",color:"white"}}>RATE</th>
                                            {value.duration.map((item, index)=>(
                                            <td>{item.rate}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>
                                </Col>
                            </Row>
                        
                            <br/>
                            
                            </Container>
                        ))}
                        </>
                            }
                            </TabPane>
                            </TabContent>
                        </Container>
                        </CardBody>
                </Card>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col>
            <Button
            color="danger"
            onClick={()=>this.props.history.push("/client/rate-cards",{media_house_id:this.props.location.state.media_house_id})}
            >
            Back
            </Button>
            </Col>
            
            </Row>
              </Col>
          </Row>
         
          }
        </Container>
      </>
    );
  }
}


export default RateCardDetails;
