import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardTitle,
  Spinner,Tooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
//import history from "../history";
import ResubscribeRateCard from "components/Cards/ResubscribeRateCard";

let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";

function SelectRateCardRes(props) {
    const [ratecards, setRatecards] = React.useState([]);
    const [isActive, setIsActive] = React.useState(true);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);


    console.log("meida ghouse",props.location.state)

React.useEffect(()=>{
  setIsActive(true)
    axios.get(`${domain}/api/view/${props.location.state.media_house_id}/ratecards`,{
    headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log("message:",res.data);
        setRatecards(res.data);
        setIsActive(false)
    })
    .catch(error=>{
      if(!error.response){
        alert("check your internet connection");
    }
    else{
    }
    })
},[])

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
            >Which Ratecard Service Are You In Search Of? (Hover Over Titles For Service Descriptions).</p>
          <Row style={{marginTop:"20px"}}>
              {ratecards.map((value,key)=>(
                <ResubscribeRateCard key={key} data={value} {...props}/>
              ))}
             
            </Row>
            </>
          }
            <br/>
            <Row>
            <Col>
            <Button
            color="danger"
            onClick={()=>props.history.push("/client/published-companies-create",{id:props.location.state.id})}
            >
            Back
            </Button>
            </Col>
            
            </Row>
        </>}
        
        </Container>
      </>
    );
  }


export default SelectRateCardRes;
