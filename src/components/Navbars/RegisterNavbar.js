import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  NavbarBrand
} from "reactstrap";


class RegisterNavbar extends React.Component {

  
  
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
            <Nav className="align-items-center d-none d-md-flex" navbar style={{marginRight:"50px"}}>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                      <span className="mb-0 text-sm font-weight-bold" style={{color:"#32325d"}}>
                        LOGIN <i className="fa fa-chevron-down ml-2" style={{fontSize:"11px"}}/>
                      </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem to="/auth/login-page" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Client</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="https://demo.media.kokrokooad.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-tv" />
                    <span>Media</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default RegisterNavbar;
