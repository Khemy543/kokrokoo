import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,Modal,ModalHeader,Spinner,ModalFooter
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from "axios";
import Header from "components/Headers/Header";

let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";
class Profile extends React.Component {

  state={
    username:"",
    email:"",
    phone1:"",
    phone2:"",
    title:"", 
    id:"",
    isActive:false,
    modal:false,
    message:"",
    company_name:"",
    company_email:'',
    address:"",
    website:"",
    country:"",
    industry_type:"",
    logo:"",
    business_cert:"",
    company_hide:false,
    imagePreviewUrl:"",
    percentage:0,
    company_id:"",
    newBusinesscCert:""
  }

componentDidMount(){
  this.setState({isActive:true})
  axios.get(`${domain}/api/client`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        if(res.data.user !== null){
          this.setState({
            username:res.data.user.name, 
            email:res.data.user.email,
            phone1:res.data.user.phone1,
            phone2:res.data.user.phone2,
            title:res.data.user.title,
            id:res.data.user.id,
            isActive:false
          })

          if(res.data.company !== undefined){
            

            this.setState({
              company_name:res.data.company.company_name,
              company_email:res.data.company.company_email,
              address:res.data.company.address,
              country:res.data.company.country,
              industry_type:res.data.company.industry_type,
              website:res.data.company.website,
              business_cert:res.data.company.business_cert,
              logo:res.data.company.logo,
              company_id:res.data.company.id,
              imagePreviewUrl:`https://uploads.kokrokooad.com/${res.data.company.logo}`
            })
          }
          else{
            this.setState({company_hide:true})
          }
        }

        }).catch(error=>{
          if(!error.response){
            alert("check your internet connection")
            this.setState({isActive:false});
          }
          else{
          this.setState({isActive:false});
          }
        });
}


handleSubmit=(e)=>{
  e.preventDefault();
  axios.post(`${domain}/api/client/${this.state.id}/update`,{ _method:"PATCH",
  name:this.state.username, email:this.state.email,phone1:this.state.phone1,phone2:this.state.phone2,title:this.state.title, industry_type:"organisation"},{
    headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      this.setState({message:"UPDATED!!",modal:true});
  
      /* setTimeout(
        function(){
            this.setState({modal:false})
        }.bind(this),2000) */
    
    })
  .catch(error=>{
    if(!error.response){
      this.setState({
        modal:true,
        message:"Please Check Your Internet Connection"
      })
    }
    else{
      this.setState({
        message:error.response.data.errors.email || 
        error.response.data.errors.phone1 || 
        error.response.data.errors.phone2 ||
        error.response.data.errors.username ||
        error.response.data.errors.title,
        modal:true,isActive:false
      })
      
    }
  })
}


handleCompanySubmit=(e)=>{
 e.preventDefault();
 axios.patch(`${domain}/api/auth/company/${this.state.company_id}/update`,
 { company_name:this.state.company_name,
  company_email:this.state.company_email,
  website:this.state.website,
  industry_type:this.state.industry_type,
  country:this.state.country,
  address:this.state.address},
 { headers:{ 'Authorization':`Bearer ${user}`}})
 .then(res=>{
   this.setState({message:"UPDATED!!",modal:true});
 })
 .catch(error=>{
  if(error.response.data.status === "Forbidden"){
    this.setState({modal:true, message:"Access Denied"})
  }else{
      this.setState({
          modal:true, isActive:false, 
          message: error.response.data.errors.company_name || 
          error.response.data.errors.industry_type || 
          error.response.data.errors.website
          || error.response.data.errors.company_email || 
          error.response.data.errors.country || 
          error.response.data.errors.address
      })
  }
})

 let bodyFormData = new FormData();
 bodyFormData.append('logo', this.state.logo);
 bodyFormData.append('business_cert', this.state.newBusinesscCert);
 bodyFormData.append('_method',"PATCH")

 for(var pair of bodyFormData.entries()) {
}

axios({
  method:'post',
  url:`${domain}/api/auth/company/${this.state.company_id}/files-update`,
  data:bodyFormData,
  headers: {'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}`}
})
.then(res=>{
  this.setState({message:"UPDATED!!",modal:true});
})
.catch(error=>{
  if(error.response.data.status === "Forbidden"){
    this.setState({modal:true, message:"Access Denied"})
  }else{
  this.setState({
    modal:true, isActive:false, message:error.response.data.errors.business_cert || error.response.data.errors.logo
  })
}
})

 /* axios.patch(`${domain}/api/auth/company/${this.state.company_id}/files-update`,
 {
  logo:this.state.logo,
  business_cert:this.state.newBusinesscCert
 },
 { headers:{'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}`}})
 .then(res=>{
 })
 .catch(error=>{
 }) */
  /*let bodyFormData = new FormData();
  bodyFormData.append('company_name', this.state.company_name);
  bodyFormData.append('company_email', this.state.company_email);
  bodyFormData.append('address', this.state.address);
  bodyFormData.append('website', this.state.website);
  bodyFormData.append('industry_type', this.state.industry_type);
  bodyFormData.append('logo', this.state.logo);
  bodyFormData.append('business_cert', this.state.business_cert);
  bodyFormData.append('country', this.state.country);

  for(var pair of bodyFormData.entries()) {
}

  axios({
    method:'patch',
    url:`${domain}/api/auth/company/${this.state.company_id}/update`,
    data:bodyFormData,
    headers: {'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}`},
    onUploadProgress: (progressEvent) => {
        const {loaded , total} = progressEvent;
        let percentage = Math.floor(loaded * 100 / total);
        if(percentage<100){
            this.setState({percentage:percentage});
        }
        else{
            this.setState({percentage:100})
        }
}})
.then(res=>{
    setTimeout(
        function(){
            this.setState({modal:false});
            this.props.history.push("/auth/await-verification",{
                email:this.state.email
            })
        }
        .bind(this),
        2000
    )
})
.catch(error=>{
   if(error.response){
        this.setState({
            modal:true, isActive:false, message:error.response.data.errors.business_cert || error.response.data.errors.operation_cert || error.response.data.errors.logo || error.response.data.errors.company_name || error.response.data.errors.media_house || error.response.data.errors.website
            || error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2
        })
    }
})*/
} 

_handleImageChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    this.setState({
      logo: file,
      imagePreviewUrl: reader.result
    });
  }

  reader.readAsDataURL(file)
}

  render() {
    return (
      <>
        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
        {this.state.isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
        :
          <Row>
            <Col className="order-xl-1" xl="10">
            <p style={{fontSize:"13px", fontWeight:500}}>View And Edit Your Profile.</p>
            {!this.state.company_hide?
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit = {this.handleCompanySubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Company Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-username"
                            >
                              Company Name
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.company_name}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={e=>this.setState({company_name:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-email"
                            >
                              Company Email
                            </small>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email"
                              value={this.state.company_email}
                              type="email"
                              onChange={e=>this.setState({company_email:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-first-name"
                            >
                              Company Address
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.address}
                              placeholder="Address"
                              type="text"
                              onChange={e=>this.setState({address:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-last-name"
                            >
                              Country
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.country}
                              placeholder="Country"
                              type="text"
                              onChange={e=>this.setState({country:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-title"
                            >
                              Industry Type
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.industry_type}
                              id="input-title"
                              placeholder="Industry Type"
                              type="text"
                              onChange={e=>this.setState({industry_type:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                        <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-title"
                            >
                              Website
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.website}
                              id="input-title"
                              placeholder="Website"
                              type="text"
                              onChange={e=>this.setState({website:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row> 
                        <Col sm="12" xs="12" md="6">
                            <small className=" d-block text-uppercase font-weight-bold mb-4">
                              Company Logo
                            </small>
                            <img
                              alt="..."
                              className=" img-fluid rounded-circle shadow"
                              src={this.state.imagePreviewUrl}
                              style={ {width: "150px", height:"150px",marginBottom:"20px"} }
                            ></img>
                            <br/>
                        <Input type="file" 
                                      onChange={(e)=>this._handleImageChange(e)} />
                          </Col>
                          <Col lg="6" md="6" style={{marginTop:"20px"}}>
                          
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                            >
                              Business Certificate
                            </small>
                            <br/>
                            <br/>
                            <a target="_blank" rel="noopener noreferrer" href={`https://uploads.kokrokooad.com/${this.state.business_cert}`}>
                            <Button color="info"><i className="fa fa-file-text"/> Open File</Button>
                            </a>
                            <br/>
                            <br/>
                            <Input
                              type="file"
                              onChange={e=>this.setState({newBusinesscCert:e.target.files[0]})}
                              style={{overFlowX:"hidden"}}
                            />
                    </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    
                    <Button
                      color="info"
                      type="submit"
                    >
                  Edit Company Profile
                </Button>
                  </Form>
                </CardBody>
              </Card>
              :
              <div></div>
            }
              <Card className="bg-secondary shadow" style={{marginTop:"20px"}}>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My Account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit = {this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-username"
                            >
                              Username
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.username}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={e=>this.setState({username:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-email"
                            >
                              Email address
                            </small>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email"
                              value={this.state.email}
                              type="email"
                              onChange={e=>this.setState({email:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-first-name"
                            >
                              Phone 1
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.phone1}
                              placeholder="Phone"
                              type="text"
                              onChange={e=>this.setState({phone1:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-last-name"
                            >
                              Phone 2
                            </small>
                            <Input
                              className="form-control-alternative"
                              value={this.state.phone2}
                              placeholder="Phone"
                              type="text"
                              onChange={e=>this.setState({phone2:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                            <small
                            className=" d-block text-uppercase font-weight-bold mb-4"
                              htmlFor="input-title"
                            >
                              Title
                            </small>
                            <Input 
                              className="form-control-alternative" type="select" value={this.state.title} onChange={e=>this.setState({title:e.target.value})}>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    
                    <Button
                      color="info"
                      type="submit"
                    >
                  Edit profile
                </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        }
        </Container>
        <Modal isOpen={this.state.modal}>
        <ModalHeader>
        <h4>{this.state.message}</h4>
        </ModalHeader>
        <ModalFooter>
        <Button color="danger" onClick={()=>this.setState({modal:false})}>Close</Button>
        </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Profile;
