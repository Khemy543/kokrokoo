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


export default function Ratecard(props) {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    console.log(localStorage.getItem("media_id"))
    const {id,title,file_types,description} = props.data;

    return(
        <>
         <Col lg="3" md="4" sm="6" xs="6">
              <Card id={"ratecard-" + id} className="card-stats mb-4 mb-xl-0 shadow" style={{cursor:"pointer", borderRadius:"0px"}}
               onClick={()=>{
                if(Number(localStorage.getItem("media_id")) !== 3){
                props.history.push("/client/rate-card-details",
                  {title:title, id:id, file_types:file_types, media_house_id:props.media}
                  )
                  }
                
                else{
                  props.history.push("/client/view-ratecards-details-print",{
                    title:title, id:id, file_types:file_types, media_house_id:props.media
                  })
                }
                  }}>
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
                  <Tooltip key={id} placement="right" isOpen={tooltipOpen} target={"ratecard-" + id} toggle={toggle}>
                          <span   className="h5 mb-1" style={{color:"white",textTransform:"uppercase"}}>
                            Service Description:<br/> 
                            <h5 style={{textTransform:"lowercase",color:"white"}}>{description}</h5>
                          </span>
                  </Tooltip>
              <br/>
            </Col>
        </>
    )
}