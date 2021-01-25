import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
 
} from "reactstrap";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <div>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
          <NavbarBrand className="pt-0">
              <img
                alt="#"
                className="navbar-brand-img"
                src={require("../../assets/img/brand/kokro-yellow.png")}
              />
            </NavbarBrand>
            
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/"
                  >
                <NavLink>
                  
                  HOME
                  
                </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to = "/about-us">
                <NavLink>
                
                  ABOUT
                  
                </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/services"
                  >
                <NavLink>
                
                  SERVICES
                 
                </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/hosting"
                  >
                <NavLink>
                
                  HOW IT WORKS
                 
                </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/hosting"
                  >
                <NavLink>
                
                  CONTACT US
                 
                </NavLink>
                </Link>
              </NavItem>

              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/hosting"
                  >
                <NavLink>
                
                REGISTER
                 
                </NavLink>
                </Link>
              </NavItem>

              <NavItem>
              <Link
                  style={{textDecoration:"none"}}
                  to="/hosting"
                  >
                <NavLink>
                
                  LOGIN
                 
                </NavLink>
                </Link>
              </NavItem>
              
             
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default ExamplesNavbar;