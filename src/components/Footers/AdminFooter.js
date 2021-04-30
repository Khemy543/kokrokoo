import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2021{" "}
              <a
                className="font-weight-bold ml-1 text-uppercase"
                href="!#"
                
              >
                Kokrokoo Advertising Partners
              </a>
            </div>
          </Col>

          {/* <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end text-uppercase">
              <NavItem>
                <NavLink
                  href="!#"
                >
                Kokrokoo Ads
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                className="text-uppercase"
                  href="!#"
                >
                  About Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col> */}
        </Row>
      </footer>
    );
  }
}

export default Footer;
