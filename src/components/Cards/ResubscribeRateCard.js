import React from 'react';
import {
    Col, 
    Row,
    Card,
    CardBody,
    Tooltip,
    CardTitle
} from "reactstrap";
import history from "history.js";


export default function ResubscribeRateCard(props) {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);


    const {id,title,file_types,description} = props.data;

    return(
        <>
         <Col lg="3" md="4" sm="6" xs="6">
              <Card id={"subcard-" + id} className="card-stats mb-4 mb-xl-0 shadow" style={{cursor:"pointer", borderRadius:"0px"}} onClick={()=>props.history.push("/client/resubscribe/upload-file",
                  {title:title, id:id, media_house_name:props.location.state.media_house_name,media_house_id:props.location.state.media_house_id,file_types:file_types,
                  media_type_id:props.location.state.id, campaign_id:props.location.state.campaign_id, campaign_title:props.location.state.campaign_title, campaign_amount:props.location.state.campaign_amount
                  }
                  )}>
                    <CardTitle style={{textTransform:"uppercase", marginTop:"15px",marginLeft:"20px", fontWeight:600}}>
                      {title}
                    </CardTitle>
                    <CardBody>
                      <Row>
                        <Col>
                          <h4 className="h5 mb-0" >Accepted File</h4>
                          {file_types.map((type,index)=>(
                            <div>
                            {type === "application"?
                            <p style={{fontSize:"13px",margin:"0px 0px 0px 0px",textTransform:"capitalize"}}>document</p>
                            :
                            <p style={{fontSize:"13px",margin:"0px 0px 0px 0px",textTransform:"capitalize"}}>{type}</p>
                            }
                            </div>
                        ))}
                        
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                  <Tooltip key={id} placement="right" isOpen={tooltipOpen} target={"subcard-" + id} toggle={toggle}>
                          <span   className="h5 mb-1" style={{color:"white", textTransform:"uppercase"}}>
                            Service Description:<br/> 
                            <h5 style={{textTransform:"lowercase",color:"white"}}>{description}</h5>
                          </span>
                  </Tooltip>
              <br/>
            </Col>
        </>
    )
}