import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardTitle,Spinner,Tooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
//import history from "../history";
import Ratecard from "components/Cards/RateCard.js"

let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";
function RateCards(props) {
    const [ratecards, setRatecards] = React.useState([]);
    const [isActive, setIsActive] = React.useState(true);
   

React.useEffect(()=>{
  setIsActive(true)
    axios.get(`${domain}/api/view/${props.location.state.media_house_id}/ratecards`,{
    headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setRatecards(res.data);
        setIsActive(false);
    })
    .catch(error=>{
      console.log(error)
        if(!error.response){
        alert("check your internet connection")
        setIsActive(false)
        }
    })
},[props.location.state.media_house_id])

    return (
      <>
      <Header/>
        <Container className=" mt--8" fluid>
        {isActive?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!isActive && ratecards.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No Ratecard Available For This Company</h4> 
            </Col>
          </Row>
          :
          <>
          <p
            style={{fontSize:"13px", fontWeight:500}}
            >Which Rate Card Do You Want To <span style={{color:"red"}}>View</span>, Select A RateCard.</p>
          <Row style={{marginTop:"20px"}}>
              {ratecards.map((value,key)=>(
               <Ratecard key={key} data={value} media={props.location.state.media_house_id} {...props}/>
              ))}
             
            </Row>
          </>
          }
            <br/>
            <Row>
            <Col>
            <Link to="/client/published-companies">
            <Button
            color="danger"

            >
            Back
                </Button>
                </Link>
            </Col>
            
            </Row>
          </>}
        
        </Container>
      </>
    );
  }


export default RateCards;
