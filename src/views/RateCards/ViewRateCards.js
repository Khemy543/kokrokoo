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
  Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

var domain = "https://backend.demo.kokrokooad.com";
function ViewRateCard({history}){

const [media_types, setMedia_types] = React.useState([]);
const [media_id , setMedia_id] = React.useState(1);
React.useEffect(()=>{
      axios.get(`${domain}/api/media-types`)
      .then(res=>{
          console.log(res.data);
          const media_types = res.data;
          setMedia_types(media_types);
      })
      .catch(error=>{
        console.log(error)
      })
  },[])

  const pass_id=()=>{
    localStorage.setItem('media_id',media_id);
    history.push("/client/published-companies");
  }

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          {media_types.length<=0?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <Row>
            <div className=" col">
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >What Type Of Media Outlet Do You Want View?</p>
              <Card className=" shadow" style={{marginTop:"20px"}}>
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">SELECT MEDIA OUTLET TYPE</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                    
                      <Input type="select" value={media_id} onChange={e=>{setMedia_id(e.target.value); console.log(media_id)}}>
                      {media_types.map(value => <option key={value.id} value={value.id}>{value.mediaType}</option>)}
                      </Input>
                    <br/>
                    <br/>
                        
                  </Row>

                  <br/>
                  <Row>
                      <Button
                      color="info"
                      type="submit"
                      onClick = {pass_id}
                      >
                      Next
                        </Button>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>}
         
        </Container>
      </>
    );
  }


export default ViewRateCard;
