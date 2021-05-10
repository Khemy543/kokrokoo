import React from "react";
import AuthFooter from "components/Footers/AuthFooter";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledPopover,
  PopoverBody,
  ListGroup,
  ListGroupItem
 
} from "reactstrap";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

var domain = "https://backend.kokrokooad.com";

function LandingPage(){
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [registerCollpase, setRegisterCollapse] = React.useState(false);
  const [LoginOpen, setLoginOpen] = React.useState(false);
  const [loginCollapse, setLoginCollapse] = React.useState(false);

  const [name, setName]=React.useState("");
  const [email, setEmail]=React.useState("");
  const [phone, setPhone]=React.useState("");
  const [subject, setSubject]=React.useState("");
  const [message, setMessage]=React.useState("");


  const toggleRegisterCollapse = () => setRegisterCollapse(!registerCollpase);
  const toggleLoginCollapse = () => setLoginCollapse(!loginCollapse);
  const toggle = () => setDropdownOpen(!dropdownOpen)
  const toggleLogin = () => setLoginOpen(!LoginOpen)

  React.useEffect(() => {
    AOS.init({
      duration : 2000
    });

    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("info");
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
  },[]);

  const handleAppClick=()=>{
    if(collapseOpen === true){
      document.documentElement.classList.toggle("nav-open");
      setCollapseOpen(false)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`${domain}/api/lets-talk`,{
      name:name,
      email:email,
      phone:phone,
      message:message
    })
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "message sent"){
        alert("Message Sent!!")
        setName("");
        setEmail("");
        setMessage("");
        setPhone("")
      }
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }
      return (
        <div style={{position:"relative"}}>
          <div style={{position:"fixed", zIndex:"999999", bottom:20, right:20}} title="Request for Ad Production">
            <a href="/auth/request-ad-production">
            <div className="adProductionButton">
              <i className="fa fa-video-camera"/>
            </div>
            </a>
          </div>
          <div id="app">
          <Navbar className={"fixed-top " + navbarColor} expand="lg" >
          <Container>
          <div className="navbar-translate">
            <NavbarBrand
            data-placement="bottom"
            >
            <a href="/auth/landing-page">
            <img alt="#" src={require("assets/img/brand/kokro-yellow.png")}/>
            </a>
            </NavbarBrand>
            
            
          </div>
          <div
              className="phone-view-hide"
              style={{marginRight:"20px"}}
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(true);
              }}
              aria-expanded={collapseOpen}
            >
            <i className="fa fa-bars" style={{color:"rgb(230, 170, 0)"}}/>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem className="active">
                <NavLink href="#Home"
                className="scroll"
                >
                  HOME
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink  href="#about-us"
                className="scroll"
                >
                  ABOUT
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink  href="#services"
                className="scroll"
                >
                  SERVICES
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <NavLink href="#portfolio"
                className="scroll"
                >
                  HOW IT WORKS
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink  href="#contact-us"
                className="scroll"
                >
                  CONTACT US
                </NavLink>
              </NavItem>
              <NavItem className="desktop-view">
              <NavLink id="Popover2" style={{cursor:"pointer"}}>
                    REGISTER <i className={!dropdownOpen?"fa fa-chevron-down ml-1" :"fa fa-chevron-up ml-1"}/>
                  </NavLink>
              <UncontrolledPopover trigger="legacy" isOpen={dropdownOpen} placement="bottom" toggle={toggle} target="Popover2">
                  <PopoverBody style={{paddingLeft:"0px",paddingRight:"0px"}}>
                   <ListGroup >  
                   <a href="/auth/blog"><ListGroupItem style={{border:"none", textAlign:"left", color:"black"}} className="userdrop">CLIENT(PERSONAL)</ListGroupItem></a>
                   <a href="/auth/blog"><ListGroupItem style={{border:"none", textAlign:"left", color:"black"}} className="userdrop">CLIENT(ORGANIZATION)</ListGroupItem></a>
                   <a href="/auth/media-house"><ListGroupItem style={{border:"none", textAlign:"left", color:"black"}} className="userdrop">MEDIA HOUSE</ListGroupItem></a>
                  </ListGroup>
                  </PopoverBody>
                  </UncontrolledPopover>
              </NavItem>
              <NavItem className="phone-view">
                <NavLink onClick={()=>toggleRegisterCollapse()}>REGISTER <i className={!registerCollpase?"fa fa-chevron-down ml-2":"fa fa-chevron-up ml-2" }/></NavLink>
                <Collapse isOpen={registerCollpase} style={{backgroundColor:"#f5f5f5"}}>
                  <NavLink href="/auth/blog">CLIENT(PERSONAL)</NavLink>
                  <NavLink href="/auth/blog">CLIENT(ORGANIZATION)</NavLink>
                  <NavLink href="/auth/media-house">MEDIA HOUSE</NavLink>
                </Collapse>
              </NavItem>{/* 
              <NavItem>
                <NavLink
                href="/auth/login-page"
                >
                <i className="fa fa-sign-in" /> <b>LOGIN</b>
                </NavLink>
              </NavItem> */}
              <NavItem className="desktop-view">
              <NavLink id="Popover3" style={{cursor:"pointer"}}>
              LOGIN <i className="fa fa-sign-in" />
                  </NavLink>
              <UncontrolledPopover trigger="legacy" isOpen={LoginOpen} placement="bottom" toggle={toggleLogin} target="Popover3">
                  <PopoverBody style={{paddingLeft:"0px",paddingRight:"0px"}}>
                   <ListGroup >  
                   <a href="/auth/login-page"><ListGroupItem style={{border:"none", textAlign:"left", color:"black"}} className="userdrop">CLIENT</ListGroupItem></a>
                   <a href="https://media.kokrokooad.com/" target="_blank" rel="noopener noreferrer"><ListGroupItem style={{border:"none", textAlign:"left", color:"black"}} className="userdrop">MEDIA HOUSE</ListGroupItem></a>
                  </ListGroup>
                  </PopoverBody>
                  </UncontrolledPopover>
              </NavItem>
              <NavItem className="phone-view">
                <NavLink onClick={()=>toggleLoginCollapse()}>LOGIN <i className="fa fa-sign-in" /></NavLink>
                <Collapse isOpen={loginCollapse} style={{backgroundColor:"#f5f5f5"}}>
                  <NavLink href="/auth/login-page">CLIENT</NavLink>
                  <NavLink href="https://media.kokrokooad.com/">MEDIA HOUSE</NavLink>
                </Collapse>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      
      <div 
            onClick={()=>handleAppClick()}>
        <section id="Home">
              {/*nav end*/}
              <div id="slider">
                {/* START REVOLUTION SLIDER 5.0 */}
                <div className="rev_slider_wrapper">
                  <div id="slider1" className="rev_slider" data-version="5.0">
                    <ul>
                      <li
                        data-transition="slideup"
                        data-title="01"
                        data-delay="5000"
                      >
                        {/* MAIN IMAGE */}
                        <img
                          src={require("assets/img/brand/slider1.jpeg")}
                          alt="cover"
                          height="1280"
                          width="1920"
                          className="image-filter"
                        />
                        {/* LAYER NR. 1 */}
                        <h1
                         className="tp-caption News-Title text-center"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset=""
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="y:-50px;opacity:0;s:1500;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1000" data-fontsize="65"
                        >
                          Advertising
                        </h1>
                        <h1
                         className="tp-caption News-Title  text-center middleman"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset="70"
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="x:-50px;opacity:0;s:2000;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1500" data-width="670" data-fontsize="65"
                        >
                          made <span>easier</span>
                        </h1>
                        <p
                          className="tp-caption News-Title  text-center news-liner"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset="125"
                        data-whitespace="normal"
                        data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="2200" data-width="870" 
                        >
                          providing an advanced way of linking you to advertising
                          media outlets with limited human intervention.
                        </p>
                        {/* <div
                          className="tp-caption  News-Title tp-resizeme"
                          data-x="middle"
                          data-y="middle"
                          data-voffset="200"
                          data-hoffset="['-80','-00','-150','-200']"
                          data-transform_idle="o:1;"
                          data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                          data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                          data-start="3000"
                        >
                          <a href="#about-us" className="btn button first scroll" style={{borderRadius:"20px", marginLeft:"30px"}}>
                            Start Now
                          </a>
                        </div> */}
                      </li>
                      <li
                        data-transition="slideup"
                        data-title="02"
                        data-delay="5000"
                      >
                        {/* MAIN IMAGE */}
                        <img
                          src={require("assets/img/brand/slider2.jpeg")}
                          alt="cover"
                          style={{height:1280, width:1920}}
                        />
                        {/* LAYER NR. 1 */}
                        <h1
                            className="tp-caption News-Title text-center"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset=""
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="y:-50px;opacity:0;s:1500;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1000" data-fontsize="65"
                        >
                          Track
                        </h1>
                        <h1
                          className="tp-caption News-Title  text-center middleman"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset="70"
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="x:-50px;opacity:0;s:2000;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1500" data-width="670" data-fontsize="65"
                        >
                          ads <span>anytime</span>
                        </h1>
                        <p
                          className="tp-caption News-Title  text-center news-liner"
                       data-x="middle" data-hoffset=""
                       data-y="middle" data-voffset="125"
                       data-whitespace="normal"
                       data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                       data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                       data-start="2200" data-width="870" 
                        >
                          Tracking of ad campaigns while sitting at the comfort
                          of your homes and offices.
                        </p>
                        {/* <div
                          className="tp-caption  News-Title tp-resizeme"
                          data-x="middle"
                          data-y="middle"
                          data-voffset="200"
                          data-hoffset="['-80','-80','-150','-200']"
                          data-transform_idle="o:1;"
                          data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                          data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                          data-start="3000"
                        >
                          <a href="#about-us" className="btn button first scroll" style={{borderRadius:"20px"}}>
                            Start Now
                          </a>
                        </div> */}
                      </li>
                      <li
                        data-transition="slideup"
                        data-title="03"
                        data-delay="5000"
                      >
                        {/* MAIN IMAGE */}
                        <img
                          src={require("assets/img/brand/slider3.jpeg")}
                          alt="cover"
                          style={{height:1280, width:1920}}
                        />
                        {/* LAYER NR. 1 */}
                        <h1
                          className="tp-caption News-Title text-center"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset=""
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="y:-50px;opacity:0;s:1500;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1000" data-fontsize="60"
                        >
                          Growing
                        </h1>
                        <h1
                          className="tp-caption News-Title  text-center middleman"
                        data-x="middle" data-hoffset=""
                        data-y="middle" data-voffset="70"
                        data-whitespace="normal"
                        data-transform_idle="o:1;"
                        data-transform_in="x:-50px;opacity:0;s:2000;e:Power3.easeOut;"
                        data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                        data-start="1500" data-width="670" data-fontsize="60"
                        >
                          {" "}
                          <span>Businesses</span>
                          {" "}
                        </h1>
                        <p
                        className="tp-caption News-Title  text-center news-liner"
                       data-x="middle" data-hoffset=""
                       data-y="middle" data-voffset="125"
                       data-whitespace="normal"
                       data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                       data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                       data-start="2200" data-width="870" 
                        >
                          Ensuring better accountability on the part of
                          advertising media outlets and your marketing teams.
                        </p>
                        {/* <div
                          className="tp-caption  News-Title tp-resizeme"
                          data-x="middle"
                          data-y="middle"
                          data-voffset="200"
                          data-hoffset="['-80','-80','-150','-200']"
                          data-transform_idle="o:1;"
                          data-transform_in="z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;s:1000;e:Power2.easeOut;"
                          data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                          data-start="3000"
                        > 
                          <a href="#about-us" className="btn button first scroll" style={{borderRadius:"20px"}}>
                            Start Now
                          </a>
                        </div> */}
                      </li>
                    </ul>
                  </div>
                </div>
                {/* END OF SLIDER WRAPPER */}
                {/* END REVOLUTION SLIDER */}
              </div>
            </section>
            <section id="about-us">
            <div id="about us-1" className="big-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-7 wow slideInDown">
                      <div className="section-top-heading">
                      <h2 className="big-text">
                            Announcing <strong>You</strong> <br />
                             To The World
                          </h2>
                      </div>
                        <div className="left-section">
                          <img
                            src={require("assets/img/brand/site-logo1.png")}
                            className="img-responsive"
                            alt="laptop"
                          />
                        </div>
                    </div>
                    <div className="col-sm-5" >
                      <div className="right-section">
                        <h3 style={{ color: "#E6AA00",fontSize:"32px" }}>Who we are</h3>
                        <hr />
                        <p>
                        Kokrokoo is Africa's premier advertising hub where brands, entrepreneurs, organisations and even individuals interact directly with TV, radio stations and print media for advertisements via the internet with limited human intervention.<br/><br/>

                        In the similitude of the crow of a cock to announce the break of day, Kokrokoo also seeks to Announce you to the world.<br/><br/>

                        Kokrokoo gives it's users real-time access to media houses and their various rates for advertisements, as well as a scheduling and monitoring tool for all advertisement subscriptions and a host of other services.<br/><br/>

                        It's a whole new experience!!
                        </p>
                      </div>
                    </div>
                      </div>
                </div>
              </div>
              </section>
              <section id="services" style={{marginTop:"-70px"}}>
              {/*  service-1 start */}
              <div id="service-1" className="big-padding">
                <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-7">
                    <div className="section-top-heading">
                        <h2 className="big-text">What We Do<br/>
                        <strong>Our Services</strong></h2>
                      </div>
                    </div>
                </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-7  wow slideInDown">
                        <div className="left-section">
                          <img
                            src={require("assets/img/brand/picture3.png")}
                            className="img-responsive"
                            alt="laptop"
                          />
                        </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="right-section wow slideInRight">
                        <div className="feature">
                          <div className="row">
                            <div className="col-sm-2">
                              <h2 className="icon">
                                <i className="fa fa-microphone" aria-hidden="true" />
                                <span className="sr-only">icon</span>
                              </h2>
                            </div>
                            <div className="col-sm-10">
                              <h4>Radio Advertisement</h4>
                              <p>
                                Have all your ads played seamlessly
                                by your preferred radio stations just by the click of a button.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="feature middle">
                          <div className="row">
                            <div className="col-sm-2 ">
                              <h2 className="icon">
                                <i
                                  className="fa fa-television"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">icon</span>
                              </h2>
                            </div>
                            <div className="col-sm-10">
                              <h4>Television Advertisement</h4>
                              <p>
                                At your own comfort, we link you to all our
                                TV station partners for production of your ads
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="feature">
                          <div className="row">
                            <div className="col-sm-2 ">
                              <h2 className="icon">
                                <i className="fa fa-newspaper-o" aria-hidden="true" />
                                <span className="sr-only">icon</span>
                              </h2>
                            </div>
                            <div
                              className="col-sm-10"
                              style={{ marginBottom: 50 }}
                            >
                              <h4>Print media advertisement</h4>
                              <p>
                                We make it easier for our registered users
                                to publish their ads in newspaper and magazines since they can easily
                                send their ad via Kokrokoo to various print media houses for
                                advertisements.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="feature">
                        <div className="row"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  service-1 end */}
              {/*  service-2 start */}
              <div id="service-2" className="mid-level-padding">
                <div id="responsiveTabsDemo">
                  <ul className="text-center">
                    <li>
                      <a href="#tab-1">Radio</a>
                    </li>
                    <li>
                      <a href="#tab-2">Print Media</a>
                    </li>{/* 
                    <li>
                      <a href="#tab-3">Billboard</a>
                    </li> */}
                    <li>
                      <a href="#tab-4">Television</a>
                    </li>
                  </ul>
                  <div id="tab-1">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={require("assets/img/brand/picture6.jpg")}
                            width={542}
                            height={470}
                            alt="pineapple"
                            className="element-center"
                            style={{objectFit:"cover"}}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="tabs-bg">
                            <h3>Online solutions for radio advertisements.</h3>
                            <p>
                              Kokrokoo enables customers to place ads easily to
                              radio stations. From the services offered by our radio partners
                               one can easily select a
                              production time for their advertisement. Once payments are made
                              and approved, they become live for production
                            </p>
                            <a
                              style={{borderRadius:"20px", color:"white"}}
                              role="button"
                              href="#contact-us2"
                              className="btn button hvr-shutter-out-horizontal scroll"
                            >
                              Get In Touch
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab-2">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={require("assets/img/brand/print.jpg")}
                            width={542}
                            height={470}
                            alt="pineapple"
                            className="element-center"
                            style={{objectFit:"cover"}}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="tabs-bg">
                            <h3>
                              Advertise through print media with ease.
                            </h3>
                            <p>
                              Send your clear, crisp image files to
                              newspapers,magazines and other print media for
                              advertisements. It is easier and faster to publish
                              your ads now with no stress!
                            </p>
                            <a
                              role="button"
                              href="#contact-us2"
                              className="btn button hvr-shutter-out-horizontal scroll"
                              style={{borderRadius:"20px", color:"white"}}
                            >
                              Get In Touch
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{/* 
                  <div id="tab-3">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={require("../assets/img/brand/billboard.jpg")}
                            width={542}
                            height={470}
                            alt="pineapple"
                            className="element-center"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="tabs-bg">
                            <h3>Hustle free billboard advertising .</h3>
                            <p>
                              Aiming at sending direct messages to specific
                              customers over a wide territory through billboards,
                              kokrokoo offers the perfect platform for this. All
                              is required of you is to select the agency that
                              offers the particular billboard and location
                              prefered. It gets as simple as that.
                            </p>
                            <a
                              role="button"
                              href="#contact-us2"
                              className="btn button hvr-shutter-out-horizontal scroll"
                              style={{borderRadius:"20px", color:"white"}}
                            >
                              Get In Touch
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div id="tab-4">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={require("../assets/img/brand/picture7.jpg")}
                            width={542}
                            height={470}
                            alt="pineapple"
                            className="element-center"
                            style={{objectFit:"cover"}}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="tabs-bg">
                            {/* <h2>04</h2> */}
                            <h3>
                              Grow your business faster through television ads
                            </h3>
                            <p>
                              Do you aim at targeting larger audiences from Kokrokoo's
                              TV Stations partners?  Our software
                              which hosts numerous TV stations allows you to transfer ads
                              for advertisement.
                            </p>
                            <a
                              role="button"
                              href="#contact-us2"
                              className="btn button hvr-shutter-out-horizontal scroll"
                              style={{borderRadius:"20px", color:"white"}}
                            >
                              Get In Touch
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/*  service-2 end */}
              {/* service-2 start */}
              {/* <div id="service-3" className="mid-level-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 wow slideInLeft">
                      <div className="top-section vertical-heading">
                        <span>fun facts</span>
                        <h2
                          className="big-text"
                          style={{color:"black"}}
                        >
                          We Expect
                          <br />
                          <strong>Excellence</strong> Services
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="row wow fadeInUp" data-wow-duration="2s">
                    <div className="col-sm-12">
                      <div className="bottom-section text-center">
                        <div className="row">
                          <div className="col-sm-3 col-xs-6">
                            <div className="left-section section">
                              <h2>
                                <i className="fa fa-users" aria-hidden="true" />
                                <span className="sr-only">icon</span>
                              </h2>
                              <h3>125</h3>
                              <p>Happy Clients</p>
                            </div>
                          </div>
                          <div className="col-sm-3 col-xs-6">
                            <div className="left-section section">
                              <h2>
                                <i className="fa fa-codepen" aria-hidden="true" />
                                <span className="sr-only">icon</span>
                              </h2>
                              <h3>9102</h3>
                              <p>Media houses</p>
                            </div>
                          </div>
                          <div className="col-sm-3 col-xs-6">
                            <div className="left-section section">
                              <h2>
                                <i className="fa fa-trophy" aria-hidden="true" />
                                <span className="sr-only">icon</span>
                              </h2>
                              <h3>06</h3>
                              <p>Advertising partners</p>
                            </div>
                          </div>
                          <div className="col-sm-3 col-xs-6">
                            <div className="left-section section">
                              <h2>
                                <i
                                  className="fa fa-bar-chart"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">icon</span>
                              </h2>
                              <h3>06</h3>
                              <p>Awards Received</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* service-2 end */}
            </section>
            {/*  services end*/}
            <section id="portfolio">
              <div id="portfolio3" className="mid-level-padding">
                <div className="container">
                  <div className="row text-center">
                    <div className="col-xs-12">
                      <div className="section-top-heading">
                        <h2 className="big-text">How it works</h2>
                        <p>All you need you have to do as a registered client is:</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 wow fadeInLeft">
                      <div className="pricing-table">
                        <div className="type">
                          <h4>Step one</h4>
                        </div>
                        <div className="price">
                          <div className="row" style={{marginRight:"10px", marginLeft:"10px"}}>
                            <div className="col-xs-4 col-md-4">
                              <span className="fa fa-upload fa-2x" />
                            </div>
                            <div className="col-xs-8 col-md-8">
                              <p>
                              Upload Ad File (audio, video, image or document)
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <ul className="packages">
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Provide personal or organization details
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Make sure personal details are valid
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Upload the required documents
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Submit details
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    <div className="col-sm-4 wow fadeInUp" data-wow-duration="3s">
                      <div className="pricing-table black">
                        <div className="type">
                          <h4>Step two</h4>
                        </div>
                        <div className="price">
                          <div className="row" style={{marginRight:"10px", marginLeft:"10px"}}>
                            <div className="col-xs-4 col-md-4">
                              <span className="fa fa-sign-in fa-2x" />
                            </div>
                            <div className="col-xs-8 col-md-8">
                              <p>Schedule production dates and times</p>
                            </div>
                          </div>
                        </div>
                        {/* <ul className="packages">
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Click "create campaign" button{" "}
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                             Select a media house and upload ad file.
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Schedule ad production times
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Make payment.
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Submit ad
                          </li>
                        </ul> */}
                        <a
                          href="/auth/login-page"
                          className="btn button btn-block text-uppercase"
                          style={{borderRadius:"20px", marginTop:"5px"}}
                        >
                          Get Started
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-4 wow fadeInRight">
                      <div className="pricing-table">
                        <div className="type">
                          <h4>Step three</h4>
                        </div>
                        <div className="price">
                          <div className="row" style={{marginRight:"10px", marginLeft:"10px"}}>
                            <div className="col-xs-4 col-md-4">
                              <span className="fa fa-credit-card-alt fa-2x" />
                            </div>
                            <div className="col-xs-8 col-md-8">
                              <p>
                                Make payment instantly (Visa, Mastercard, Mobile Money)
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <ul className="packages">
                          
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Ad is reviewed by media house
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Confirmation email and sms is sent to you
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Ad is published live
                          </li>
                          <li>
                            <i className="fa fa-check" aria-hidden="true" />
                            Track your ad anytime
                          </li>
                        </ul> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* payment */}
           {/*  <div id="service-3" className="mid-level-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 wow slideInLeft">
                      <div className="top-section vertical-heading">
                        <span>Payment</span>
                        <h2
                          className="big-text"
                          style={{color:"black"}}
                        >
                          Payment <strong>Options</strong>
                          <br />
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="row wow fadeInUp" data-wow-duration="2s" style={{marginTop:"50px"}}>
                    <div className="col-sm-12">
                      <div className="bottom-section text-center">
                        <div className="row">
                          <div className="col-sm-3 col-xs-6">
                          <img 
                              src={require("assets/img/brand/Visa-MasterCard.jpg")}
                              alt="visa-master"
                            />
                          </div>
                          <div className="col-sm-3 col-xs-6">
                            <img 
                              src={require("assets/img/brand/mtn.png")}
                              alt="mtn"
                            />
                          </div>
                          <div className="col-sm-3 col-xs-6">
                          <img 
                              src={require("assets/img/brand/voda.jpeg")}
                              alt="voda"
                            />
                          </div>
                          <div className="col-sm-3 col-xs-6">
                          <img 
                              src={require("assets/img/brand/AirtelTigo.jpeg")}
                              alt="airtel"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* contact us start */}
            <section id="contact-us">
              {/*contact-us-1 start */}
              <div id="contact-us1">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 padding wow slideInLeft">
                      <div className="left-section">
                        <div className="hovereffect">
                          <a href="https://www.linkedin.com/company/kokrokoo-advertising-partners-webapp" target="_blank" rel="noopener noreferrer">
                            <img
                              src="https://www.themesindustry.com/html/riwa/images/insta1.jpg"
                              alt="social"
                            />
                            <i className="fa fa-linkedin" aria-hidden="true" />
                          </a>
                          <div className="overlay">
                            <a className="social" href="https://www.facebook.com/kokrokooad/" target="_blank" rel="noopener noreferrer">
                              <div>
                                <i className="fa fa-facebook mr-2"/>
                                <span style={{fontSize:"14px", fontWeight:700}}>
                                  Follow Us
                                </span>
                              </div>
                              <div>
                                <p style={{marginLeft:"10px", color:"white"}}>Kokrokoo is coming soon! </p>
                                <div className="subscriber">
                                  <span className="btn button" style={{borderRadius:"20px"}}>
                                    visit page
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 padding wow slideInRight">
                      <div className="right-section">
                        <a className="social" href="https://twitter.com/kokrokooad?s=09" target="_blank" rel="noopener noreferrer">
                          <div>
                            <i
                              className="fa fa-twitter mr-2"
                            />
                            <span style={{fontSize:"14px", fontWeight:700}}>Follow Us</span>
                          </div>
                          <div>
                            <p style={{color:"white"}}>Kokrokoo is coming soon.</p>
                            <div className="subscriber">
                              <span className="btn  button" style={{borderRadius:"20px"}}>visit page</span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="insta-2-3"
                          href="https://instagram.com/kokrokooad?igshid=1sxxfctr88krt"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="pull-left left">
                            <img
                              src="https://www.themesindustry.com/html/riwa/images/insta2.jpg"
                              className="pull-left"
                              alt="social"
                            />
                          </div>
                          <div className="pull-right right">
                            <img
                              src="https://www.themesindustry.com/html/riwa/images/insta3.jpg"
                              className="pull-right"
                              alt="social"
                            />
                          </div>
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*contact-us-1 end*/}
              {/* contact-us2 start */}
              <div id="contact-us2" className="mid-level-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="left-section">
                        <div className="vertical-heading">
                          <h2>
                            Get <br />
                            in <strong>Touch</strong>
                          </h2>
                        </div>
                        <p>
                          What advertising issues do you have? We are here to help
                          you.
                        </p>
                        <div id="countries">
                          <div className="row">
                            <div className="col-sm-6">
                              <h4>Ghana</h4>
                              <ul className="details one">
                                <li>
                                  <i
                                    className="fa fa-mobile"
                                    aria-hidden="true"
                                  />
                                  +233 245 976 569
                                </li>
                                <li>
                                  <i
                                    className="fa fa-envelope"
                                    aria-hidden="true"
                                  />
                                  support@kokrokooad.com
                                </li>
                                <li>
                                  <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                  />
                                  <span>
                                    Accra, Ghana
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-sm-6"></div>
                          </div>
                        </div>
                        <ul className="list-inline" id="horizontal-list">
                          <li>
                            <a href="https://www.facebook.com/kokrokooad/" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-fw fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="https://twitter.com/kokrokooad?s=09" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-fw fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="https://instagram.com/kokrokooad?igshid=1sxxfctr88krt" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-fw fa fa-instagram" />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.youtube.com/channel/UC-zQqCcXEi3tMLFEKl3jm0g" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-fw fa-youtube" />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.linkedin.com/company/kokrokoo-advertising-partners-webapp" target="_blank" rel="noopener noreferrer">
                              <i className="fa fa-fw fa-linkedin" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="right-section" id="form-elements">
                        <form onSubmit={handleSubmit}>
                          <h4>Let's Talk</h4>
                          <p>We will provide you with the support you want.</p>
                          <div className="row">
                            <div className="col-md-12 center">
                              <div id="result" />{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Your Name"
                                  required="required"
                                  name="name"
                                  value={name}
                                  onChange={(e)=>setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email Address"
                                  required="required"
                                  name="email"
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Phone No."
                                  required="required"
                                  name="phone"
                                  value={phone}
                                  onChange={e=>setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Subject"
                                  required="required"
                                  name="subject"
                                  value={subject}
                                  onChange={e=>setSubject(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Message"
                              required="required"
                              id="message"
                              name="message"
                              value={message}
                              onChange={e=>setMessage(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn button"
                            style={{borderRadius:"20px"}}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div class="loader">
            <div id="cssload-pgloading">
                <div class="cssload-loadingwrap">
                    <ul class="cssload-bokeh">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        
            <div class="cssload-loadingwrap">
                <ul class="cssload-bokeh">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <AuthFooter />
          </div>
        </div>
        </div>
      );
  };

  export default LandingPage;
  