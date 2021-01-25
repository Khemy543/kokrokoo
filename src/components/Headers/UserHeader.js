import React from "react";

// reactstrap components
import {  Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/brand/user-profile1.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
        {console.log("props:",this.props)}
          {/* Mask */}
          <span style={{background:"linear-gradient(87deg, #6061639e 0, #6061639e 100%)"}} />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">{this.props.userName}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can view and edit your profile
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
