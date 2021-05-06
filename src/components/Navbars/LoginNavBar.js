import React from "react";
import { Link } from 'react';
// reactstrap components
import {
  Navbar,
  Container,NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import Button from "reactstrap/lib/Button";


class LoginNavbar extends React.Component {

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
                      <Button  className="mb-0 text-sm font-weight-bold">
                        REGISTER HERE <i className="fa fa-chevron-down ml-2" style={{fontSize:"11px"}}/>
                      </Button>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="/auth/personal-account">
                    <span>CLIENT(PERSONAL)</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/auth/organization-account">
                    <span>CLIENT(ORGANIZATION)</span>
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

export default LoginNavbar;
