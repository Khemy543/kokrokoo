import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media, Form, FormGroup, Input, InputGroupAddon, InputGroup, InputGroupText
} from "reactstrap";
import {RateConsumer} from "../../context.js";


let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";

class AdminNavbar extends React.Component {

  state={
    searchKey:""
  }

  handleSearch=(e)=>{
    e.preventDefault();
    let query = this.state.searchKey
    axios.get(`${domain}/api/search/item`,{
      params:{search:this.state.searchKey}
    }).then(res=>{
      console.log(res.data);
      let companies = res.data.filter(item=>item.type === "companies");
      let ratecards = res.data.filter(item=>item.type === "rate_card_titles");
      let campaigns = res.data.filter(item=>item.type === "scheduled_ads");

      this.props.history.push({
        pathname:'/client/search-results',
        state:{
          searchKey:this.state.searchKey,
          companies:companies,
          ratecards:ratecards,
          campaigns:campaigns,
          searchResults:res.data
            },
        search:'?search='+query
        });
    })
    .catch(error=>{
      console.log(error)
    })
  }
  

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark shadow" expand="md" style={{marginTop:"0px",padding:"0px"}}>
          <Container fluid>
            <div
              className="h4 mb-0 text-uppercase d-none d-lg-inline-block"
              
            >
              {this.props.brandText}
            </div>
            <Form role="form" className="navbar-search navbar form-inline mr-3 d-none d-md-flex" style={{color:"rgba(50, 50, 93, 0.62)", marginTop:"0px"}} onSubmit={this.handleSearch}>
              <FormGroup className="mb-0 mt-0" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                <InputGroup className="input-group-alternative" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                  <InputGroupAddon addonType="prepend" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                    <InputGroupText style={{color:"rgba(50, 50, 93, 0.62)"}}>
                      <i className="fa fa-search" style={{color:"rgba(50, 50, 93, 0.62)"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="search" style={{color:"rgba(50, 50, 93, 0.62)"}} value={this.state.searchKey} onChange={e=>this.setState({searchKey:e.target.value})}/>
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
                <RateConsumer>
                  {value=>(
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                  {value.company?
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={`https://uploads.kokrokooad.com/${value.logo}`}
                      />
                    </span>
                    :
                    <div></div>
                  }
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold" style={{color:"#32325d"}}>
                        {value.username} <i className="fa fa-chevron-down ml-2" style={{fontSize:"11px"}}/>
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/client/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
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
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
