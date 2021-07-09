import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Input,
  Button,Col,Spinner,Form, FormGroup,Label,Modal, ModalHeader,ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

var domain = "https://backend.kokrokooad.com";
function SelectEditType(props) {
  const [radio, setRadio] = React.useState('');
  const [modal, setModal] = React.useState(false)


  const handleSubmit=(e)=>{
    e.preventDefault()
    if(radio === "details"){
        if(props.location.state.payment_status !== null && props.location.state.payment_status.payment_status==="paid"){
          setModal(true)
    }
    else if(props.location.state.mediaType === "Print"){
        props.history.push('/client/edit-print-campaign',{
          title_id:props.location.state.title_id,
          rate_card:{id:props.location.state.id, title:props.location.state.title},
          videoTitle:props.location.state.videoTitle,
          media_house_name:props.location.state.mediaHouse,
          media_house_id:props.location.state.media_house_id
        })
    }
    else if(props.location.state.mediaType !=="Print"){
      props.history.push("/client/edit-adcampaign",{
        rate_card:{id:props.location.state.id, title:props.location.state.title}, 
        title_id:props.location.state.title_id,
        file_duration:props.location.state.ad_duration,
        videoTitle:props.location.state.videoTitle,
        media_house_name:props.location.state.mediaHouse,
        media_house_id:props.location.state.media_house_id
      })
    }
    }
    else{
        props.history.push("/client/change-adfile",{
          title_id:props.location.state.title_id, 
          file_types:props.location.state.file_types,
          ad_duration:props.location.state.ad_duration,
          title:props.location.state.title,
          videoTitle:props.location.state.videoTitle
          })
        }
    }
  
 

  return (
    <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >Edit Campaign Details or Change Ad File and Title</p>
          {/* Table */}
          <Row style={{marginTop:"20px"}}>
            <Col lg="9" md="9">
              <Card className=" shadow">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                <div onChange={e=>setRadio(e.target.value)}>
                <FormGroup check>
                    <Label check>
                    <Input type="radio" value="details" name="change"/>{' '}<h3 style={{fontWeight:600, fontSize:"14px"}}>Edit Campaign Schedules</h3>
                    </Label>
                </FormGroup>
                <br/>
                <FormGroup check>
                    <Label check>
                    <Input type="radio" value="file" name="change"/>{' '}<h3 style={{fontWeight:600, fontSize:"14px"}}>Change Title or Ad File</h3>
                    </Label>
                </FormGroup>
                </div>
                <br/>
                <div style={{float:"right"}}>
                <Button color="info" type="submit">Next</Button>
                </div>
                </Form>
              </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={modal}>
            <ModalHeader>
            Payment Already Made For This Campaign
            </ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
            </ModalFooter>
          </Modal>
       
        </Container>
    </>
  );
}


export default SelectEditType;
