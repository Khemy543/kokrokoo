import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import {RateConsumer} from "../../context.js";


class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    dashboardCollapse:true,
    subscriptionsCollapse:false,
    transactionCollapse:false,
    rateCollapse:false,
    cartCollapse:false,
    settingsCollapse:false,
    discountCollapse:false,
    userCollapse:false,
    trackerCollpase:false
  };

  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  //toggle dashboard
  toggleDashboardCollapse=()=>{
    this.setState({
      dashboardCollapse:!this.state.dashboardCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      settingsCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }

  toggleSubscriptionCollapse=()=>{
    this.setState({
      subscriptionsCollapse:!this.state.subscriptionsCollapse,
      dashboardCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      settingsCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }
  toggleTransCollapse=()=>{
    this.setState({
      transactionCollapse:!this.state.transactionCollapse,
      dashboardCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      settingsCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }
  toggleRateCollapse=()=>{
    this.setState({
      rateCollapse:!this.state.rateCollapse,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      cartCollapse:false,
      settingsCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }
  toggleCartCollapse=()=>{
    this.setState({
      cartCollapse:!this.state.cartCollapse,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      settingsCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }
  toggleSettingsCollapse=()=>{
    this.setState({
      settingsCollapse:!this.state.settingsCollapse,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:false
    })
  }

  toggleDiscountCollapse=()=>{
    this.setState({
      settingsCollapse:false,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      discountCollapse:!this.state.discountCollapse,
      userCollapse:false,
      trackerCollpase:false
    })
  }

  toggleUserCollapse=()=>{
    this.setState({
      settingsCollapse:false,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      discountCollapse:false,
      userCollapse:!this.state.userCollapse,
      trackerCollpase:false
    })
  }

  toggleTrackerCollapse=()=>{
    this.setState({
      settingsCollapse:false,
      dashboardCollapse:false,
      transactionCollapse:false,
      subscriptionsCollapse:false,
      rateCollapse:false,
      cartCollapse:false,
      discountCollapse:false,
      userCollapse:false,
      trackerCollpase:!this.state.trackerCollpase
    })
  }
  // creates the links that appear in the left menu / Sidebar
  createDashboardLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "dashboard"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }
  createSubLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "subscriptions"){
      return (
        <NavItem key={key}>
          <NavLink
          key={key}
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
          </NavItem>
      )
    }
    })
  }

  createTransLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "transactions"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createRateLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "rate"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createSettingsLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "settings"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createCartLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "cart"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createDiscountLinks = routes => { 
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "discount"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }


  createUserLinks = routes => { 
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "users"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createTrackerLinks = routes => { 
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "tracker"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }



  render() {
    const {  routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light"
        expand="md"
        id="sidenav-main"
        style={{backgroundColor:"#404E67", marginTop:"0px"}}

      >
        <Container fluid>
          {/* Toggler */}
          <div
            className="navbar-toggler"
            onClick={this.toggleCollapse}
          >
            <i className="fa fa-bars" style={{color:"white"}}/>
          </div>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
              <RateConsumer>
                {value=>(
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
              {value.company?
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                   <img src={`https://uploads.kokrokooad.com/${value.logo}`}/>
                  </span>
                </Media>
                :
                <h4><i className="fa fa-user fa-2x" style={{color:"white"}}/></h4>
                }
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem >
                  <i className="ni ni-single-02" />
                  <Link to="/client/user-profile"><span>My profile</span></Link>
                </DropdownItem>
              
                <DropdownItem divider />
                <DropdownItem onClick={()=>value.logout()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )}
            </RateConsumer>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <div
                    onClick={this.toggleCollapse}
                  >
                    <i className="fa fa-close"/>
                  </div>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <h4>Navigations</h4>
            <hr className="my-3" />
            {/*<Nav navbar>{this.createLinks(routes)}</Nav> */}

            <Nav navbar>
              <NavItem onClick={this.toggleDashboardCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-home"/>Dashboard{/* <i className = {this.state.dashboardCollapse?"fa fa-chevron-down":"fa fa-chevron-right"} style={{fontSize:"10px",textAlign:"right",float:"right"}}/> */}
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.dashboardCollapse}>
                {this.createDashboardLinks(routes)} 
              </Collapse>
               
              
              <NavItem onClick={this.toggleSubscriptionCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-briefcase"/>Ad Campaigns
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.subscriptionsCollapse}>
                {this.createSubLinks(routes)}
                </Collapse> 

                <NavItem onClick={this.toggleRateCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-eye"/>Rate Cards
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.rateCollapse}>
                {this.createRateLinks(routes)}
                </Collapse> 


                <NavItem onClick={this.toggleTrackerCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-fighter-jet"/>Ad Schedule Tracker
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.trackerCollpase}>
                {this.createTrackerLinks(routes)}
                </Collapse> 
              
                <NavItem onClick={this.toggleDiscountCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-thumbs-o-up"/>Discounts
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.discountCollapse}>
                {this.createDiscountLinks(routes)}
                </Collapse> 


              <NavItem onClick={this.toggleTransCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-credit-card"/>Transactions
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.transactionCollapse}>
                {this.createTransLinks(routes)}
                </Collapse> 

              
              <NavItem onClick={this.toggleCartCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-cart-plus"/>Cart
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.cartCollapse}>
                {this.createCartLinks(routes)}
                </Collapse> 
              
              <RateConsumer>
              {value=>(
                <>
                {value.company?
                <>
                <NavItem onClick={this.toggleUserCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-user"/>Users
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.userCollapse}>
                {this.createUserLinks(routes)}
                </Collapse> 
                </>
                :
                <></>
              } 
                </>
              )}
              </RateConsumer>

              <NavItem onClick={this.toggleSettingsCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer"}}>
                <i className="fa fa-cog"/>Settings
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.settingsCollapse}>
                {this.createSettingsLinks(routes)}
                </Collapse>  

            </Nav>
            {/* Divider */}
            <hr className="my-3" />
           
            {/* Navigation */}
            
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
