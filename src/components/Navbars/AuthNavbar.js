import React from "react";
// reactstrap components
import {
  Navbar,
  Container,NavbarBrand
} from "reactstrap";


class AuthNavbar extends React.Component {

  
  
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" style={{marginTop:"0px"}}>
          <Container fluid>
          <NavbarBrand className="pt-0">
              <a href="/auth/landing-page">
              <img
                alt="#"
                className="navbar-brand-img"
                src={require("../../assets/img/brand/kokro-yellow.png")}
              />
              </a>
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AuthNavbar;
