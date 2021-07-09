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
  Spinner,Tooltip 
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import RateCompanyCard from "components/Cards/RateCompanyCard.js";

let user =localStorage.getItem('access_token')

function PublishedCompanies(props) {
 const [media_houses, setMedia_houses] = React.useState([]);
 const [isActive, setIsActive] = React.useState(true)

 let media_id =localStorage.getItem('media_id');
 var domain = "https://backend.kokrokooad.com";
 React.useEffect(()=>{
   setIsActive(true)
    axios.get(`${domain}/api/view/${media_id}/published-companies`,{
    headers:{ 'Authorization':`Bearer ${user}`}}
).then(res=>{
    setMedia_houses(res.data);
    setIsActive(false);
}).catch(error=>{
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
          {!isActive && media_houses.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No Media House Published Yet</h4> 
            </Col>
          </Row>
          :
          <>
          <p style={{fontSize:"13px", fontWeight:500}}>Which Media House Do You Want To View Ratecards?</p>
          <Row style={{marginTop:"20px"}}>
              {media_houses.map((value,index)=>(
               <RateCompanyCard key={index} data = {value} {...props}/>
              ))}
            
          </Row>
          
          </>
          }
          <br/>
          <Row>
              <Col>
              <Link to="/client/view-ratecards"> 
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


export default PublishedCompanies;
