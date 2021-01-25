import React from "react";
import {
  Row, Col
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar";/* 
import "../../assets/css/guest/style.css" */

class MediaHouse extends React.Component {
  render() {
    return (
      <>
        <AuthNavbar />
        <section id="about-us" style={{marginTop:"-100px"}}>

    <div id="about-us-1" className="big-padding">
        <div className="container">
             <div className="row text-center">
             <div className="col-md-12">
                <h2 className="big-text text-center">ADVERTISING <strong style={{color:"#E6AA00"}}>MEDIA OUTLET </strong>REGISTRATION</h2> 
                </div>
             </div>
             <hr/>
            <div className="row">
                 <div className="col-md-3 col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                 </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
                        <p style={{lineHeight:"22px",
                        fontSize: "13px",
                        fontWeight: 400
                        }}>
                           The advertising media outlets partnering with KOKROKOO are purposefully and strategically interested in building a hub for marketers, clients, and potential clients seeking to advertise. As KOKROKOO provides technological solutions niched for the advertising industry, it coherently ensures a highly secure and safe service for a complete ad placement procedure; It is therefore important that before registering on KOKROKOO all Advertising Media Outlets are to be fully compliant with media regulatory bodies of their respective countries as all of such checks will be undertaken before Media Houses are approved.
                        </p>

                      <h5 style={{paddingTop:"10px",textAlign:"center", color:"#E6AA00"}}>ADVERTISING MEDIA OUTLET SERVICES</h5>
                    
                      <p style={{fontSize:"15px",color:"#E6AA00"}}> <i className="fa fa-tv"> </i> <strong>TV</strong></p>
                      <p style={{lineHeight:"20px", paddingBottom:"20px",fontSize: "13px",
                        fontWeight: 400}}>
                          The KOKROKOO services offers its platform to the different kinds of TV Broadcast systems namely, Analogue Terrestrial TV, Digital Satellite TV, Cable TV and new technologies such as Pay-per-view, Web TV etc.

                      </p>

                      <p style={{fontSize:"15px",color:"#E6AA00"}}> <i className="fa fa-microphone"> </i> <strong>Radio</strong></p>
                      <p style={{lineHeight:"20px", paddingBottom:"20px",fontSize: "13px",
                        fontWeight: 400}}>
                          Radio stations benefit from our services as well. From FM, AM to online radio. Our system accommodates all of the listed radio transmission systems.

                      </p>

                      <p style={{fontSize:"15px",color:"#E6AA00"}}> <i className="fa fa-newspaper-o"> </i> <strong>Print</strong></p>
                      <p style={{lineHeight:"20px",fontSize: "13px",
                        fontWeight: 400}}>
                         The KOKROKOO platform also houses the print media outlets. Specifically, suited for daily newspapers. Magazines and other forms of print media advertising are to be available soon.

                      </p>

                      <p style={{fontSize:"15px",color:"#E6AA00"}}> <i className="fa fa-podcast"> </i> <strong>Online Advertising</strong></p>
                      <p style={{lineHeight:"20px",fontSize: "13px",
                        fontWeight: 400}}>
                        Coming soon
                      </p>
                      
                      <Row style={{paddingTop:"10px"}}>
                          <Col md="6" sm="12" xs="12" lg="6" xl="6">
                              <a href="/auth/landing-page" role="button" className="btn btn-primary">Go back</a>
                          </Col>
                          <Col md="6" sm="12" xs="12" lg="6" xl="6">
                              <a href="/auth/media-account" role="button" className="btn btn-success">Register as Media House</a>
                          </Col>
                              
                      </Row>
                      </div>
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                </div>
            </div>
        </div>
    </div>
    </section>
      </>
    );
  }
}

export default MediaHouse;
