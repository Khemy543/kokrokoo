import React from "react";
import {
    Col,
    Card,
    CardBody,
    Row,
    Tooltip
} from "reactstrap"


export default function RateCompanyCard(props){
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const {id, media_house,langauage,regions,logo,purpose} = props.data

    return(
        <>
             <Col lg="4" md="4" sm="12" xs="12">
                <Card id={"tooltip-" + id} className="card-stats mb-4 mb-xl-0 shadow" style={{cursor:"pointer", borderRadius:"0px"}} onClick={()=>{props.history.push("/client/rate-cards",{media_house_id:id})}}>
                    <CardBody>
                      <Row>
                        <Col md="6" sm="6" lg="6" xs="6" xl="6">
                          <div className="avatar avatar-sm rounded-circle">
                              <img alt="#" src={`https://uploads.kokrokooad.com/${logo}`} style={{width:"55px",height:"auto"}}/>
                          </div>
                        </Col>
                        <Col md="6" sm="6" lg="6" xs="6" xl="6" style={{marginTop:"10px"}}>
                          <div>
                          <h3 style={{textTransform:"uppercase",marginBottom:"0px"}}>{media_house}</h3>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Tooltip key={id} placement="right" isOpen={tooltipOpen} target={"tooltip-" + id} toggle={toggle}>
                  <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>PURPOSE: <br/><span>{purpose}</span></p>
                  <br/>
                    <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>COVERAGE REGIONS:<br/> <span>{regions.toString()}</span></p>
                    <br/>
                    <p style={{fontSize:"12px",fontWeight:600, marginTop:"0px",marginBottom:"0px", color:"white"}}>LANGUAGE OF COMMUNICATION: <br/><span>{langauage.toString()}</span></p>
                  </Tooltip>
            </Col>
        </>
    )
}