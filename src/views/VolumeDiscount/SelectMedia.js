import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
  Spinner,
  Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

var domain = "https://backend.kokrokooad.com";
let user =localStorage.getItem('access_token');


function SelectMedia(props){

const [mediaHouses, setMediaHouses] = React.useState([]);
const [media_id , setMedia_id] = React.useState("");
const [isActive, setIsActive]= React.useState(false);

React.useEffect(()=>{
  setIsActive(true)
   axios.get(`${domain}/api/view/${props.location.state.id}/published-companies`,{
   headers:{ 'Authorization':`Bearer ${user}`}}
).then(res=>{
   console.log(res.data);
   setMediaHouses(res.data);
   setMedia_id(res.data[0].id)
   setIsActive(false)
}).catch(error=>{
 console.log(error)
})
},[])

const pass=()=>{
  let tempMedia = mediaHouses;
  let selected = tempMedia.find(item=>item.id === Number(media_id))
  console.log(media_id)
  console.log(selected)
  props.history.push("/client/volume-discount",{id:media_id,mediaHouse:selected})
}

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--8" fluid>
            {isActive?
              <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!isActive && mediaHouses.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No Media House Published Yet</h4> 
            </Col>
          </Row>
          :
          <>
          <Row>
            <div className=" col">
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >Select A Media House to <span style={{color:"red"}}>View</span> Volume Discounts.</p>
              <Card className=" shadow" style={{marginTop:"20px"}}>
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">SELECT MEDIA HOUSE</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                      <Input type="select" value={media_id} onChange={e=>{setMedia_id(e.target.value)}}>
                      {mediaHouses.map(value => <option key={value.id} value={value.id}>{value.media_house}</option>)}
                      </Input>
                    <br/>
                    <br/>
                    <br/>
                      <Button
                      color="info"
                      onClick={pass}
                      >
                      Next
                        </Button>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
          </>
          }
          {/* <br/>
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
              
              </Row> */}
          </>}
          
        </Container>

      </>
    );
  }


export default SelectMedia;


        