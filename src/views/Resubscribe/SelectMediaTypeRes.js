import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Input,
  Button,Col,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

var domain = "https://backend.kokrokooad.com";
function SelectMediaTypeRes(props) {

  const [media_types, setMedia_types] = React.useState([]);
  const [media_id, setMedia_id] = React.useState(1);

  React.useEffect(() => {
    axios.get(`${domain}/api/media-types`)
      .then(res => {
        setMedia_types(res.data);
      })
      .catch(error=>{
        if(!error.response){
          alert("check your internet connection");
      }
      })
  }, []);

  const pass_id = () => {
    localStorage.setItem('media_id',media_id);
    props.history.push("/client/resubscribe/media-house", { id: media_id, 
      campaign_id: props.location.state.campaign_id,
      campaign_title:props.location.state.campaign_title,
      campaign_amount:props.location.state.campaign_amount
    });
  };

  return (
    <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
        {media_types.length<=0?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
        :
        <>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >What Type Of Media Outlet Do You Want To Place An Ad Campaign With?.</p>
          {/* Table */}
          <Row style={{marginTop:"20px"}}>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">SELECT MEDIA OUTLET TYPE</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">

                    <Input type="select" value={media_id} onChange={e => { setMedia_id(e.target.value); }}>
                      {media_types.map(value => <option key={value.id} value={value.id}>{value.mediaType}</option>)}
                    </Input>
                    <br />
                    <br />

                  </Row>
                  <br />
                  <Row>
                    
                    <Button
                      color="info"
                      type="submit"
                      onClick={pass_id}
                    >
                      Next
                        </Button>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </>}
       
        </Container>
    </>
  );
}


export default SelectMediaTypeRes;
