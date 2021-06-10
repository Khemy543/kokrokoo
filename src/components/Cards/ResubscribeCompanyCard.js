import React from "react";
import {
    Col,
    Card,
    CardBody,
    Row,
    Tooltip
} from "reactstrap"


export default function ResubscribeCompanyCard(props){
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const {id, media_house,langauage,regions, company_name, logo, purpose} = props.data

    return(
        <>
             <Col lg="4" md="4" sm="12" xs="12" style={{marginBottom:"10px"}}>
                <Card id={"tooltip-" + id} className="card-stats mb-xl-0 shadow" style={{cursor:"pointer", borderRadius:"0px"}} onClick={()=>{
                   props.history.push("/client/resubscribe/rate-card",{media_house_id:id, 
                   media_house_name:media_house,
                   id:props.location.state.id, 
                   campaign_id:props.location.state.campaign_id,
                   campaign_title:props.location.state.campaign_title,
                   campaign_amount:props.location.state.campaign_amount
                   })
                }}>
                    <CardBody>
                      <Row>
                        <Col md="4" sm="4" lg="4" xs="4" xl="4">
                              <img alt="#" src={`https://uploads.kokrokooad.com/${logo}`} style={{width:"55px",height:"55px", objectFit:"cover"}}/>
                        </Col>
                        <Col md="8" sm="8" lg="8" xs="8" xl="8" style={{marginTop:"10px"}}>
                          <div>
                          <h3 style={{textTransform:"uppercase",marginBottom:"0px", fontSize:"14px"}}>{media_house}</h3>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Tooltip key={id} placement="right" isOpen={tooltipOpen} target={"tooltip-" + id} toggle={toggle}>
                  <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>PURPOSE: <br/><span>{purpose}</span></p>
                  <br/>
                    <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>COVERAGE REGIONS:<br/> <span>{regions.toString().replace(/,/g, ", ")}</span></p>
                    <br/>
                    <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>LANGUAGE OF COMMUNICATION: <br/><span>{langauage.toString().replace(/,/g, ", ")}</span></p>
                  </Tooltip>
            </Col>
        </>
    )
}