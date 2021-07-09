import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button
  ,Spinner, Tooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import ResubscribeCompanyCard from "components/Cards/ResubscribeCompanyCard";

function SelectCompanyRes(props) {
 const [media_houses, setMedia_houses] = React.useState([]);
 const [isActive, setIsActive] = React.useState(true);
 const [tooltipOpen, setTooltipOpen] = React.useState(false);


 const toggle = () => setTooltipOpen(!tooltipOpen);

 let user =localStorage.getItem('access_token');
 var domain = "https://backend.kokrokooad.com";
 React.useEffect(()=>{
   setIsActive(true)
   if(props.location.state === undefined){
     props.history.push("/client/create-subscription")
   }else{
    axios.get(`${domain}/api/view/${props.location.state.id}/published-companies`,{
    headers:{ 'Authorization':`Bearer ${user}`}}
).then(res=>{
    setMedia_houses(res.data);
    setIsActive(false)
}).catch(error=>{
})
 }},[])


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
          {!isActive && media_houses.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No Company Has Been Published Yet</h4> 
            </Col>
          </Row>
          :
          <>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >Which Media House Do You Want To Place An <span style={{color:"red"}}>Ad Campaign</span> With? Select A Media House.</p>
          <Row style={{marginTop:"20px"}}>
              {media_houses.map((value,index)=>(
                <ResubscribeCompanyCard data={value} {...props}/>
              ))}
            
          </Row>
          </>
          }
          <br/>
          <Row>
              <Col>
              <Link to="/client/create-subscription">
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


export default SelectCompanyRes;
