import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Input,
  Progress,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader, ModalFooter,Label,InputGroup, InputGroupAddon,CardHeader,CardFooter, FormGroup,InputGroupText,
} from "reactstrap";
import RegisterNavbar from "components/Navbars/RegisterNavbar";
import axios from "axios";
import { Animated } from "react-animated-css";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

var domain = "https://backend.demo.kokrokooad.com";

class MediaAccount extends React.Component {

    state={
        disable:false,
        message:"",
        modal:false,
        percentage:0,
        userHide:false,
        companyHide:true,
        bankHide:false,
        mediaTypes:[],
        company_name:"",
        company_email:"",
        address:"",
        media_house:"",
        media_type:1,
        business_cert:"",
        operational_cert:"",
        website:"",
        logo:"",
        languages:[],
        isActive:false,
        country:"Ghana",
        others:"",

        name:"",
        email:"",
        title:"Mr",
        phone1:"",
        phone2:"",
        password:"",
        confirm_password:"",
        terms:false,
        id:null,
        purpose:"",
        regions:[]

    }

    componentDidMount(){
        axios.get(`${domain}/api/media-types`)
        .then(res=>{
            console.log(res.data);
            this.setState({mediaTypes:res.data});
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        //adding other and Languages
        let tempLanguages = this.state.languages;
        let tempOthers = this.state.others.split(",");
        let newArray = tempLanguages.concat(tempOthers)
        console.log(newArray)

        if(this.state.password === this.state.confirm_password){
        this.setState({isActive:true})
        var bodyFormData = new FormData();
        bodyFormData.append('business_cert',this.state.business_cert);
        bodyFormData.append('operation_cert',this.state.operational_cert);
        bodyFormData.append('logo',this.state.logo);
        bodyFormData.append('company_email',this.state.company_email);
        bodyFormData.append('company_name',this.state.company_name);
        bodyFormData.append('address',this.state.address);
        bodyFormData.append('media_house',this.state.media_house);
        bodyFormData.append('media_type',this.state.media_type);
        bodyFormData.append('website',this.state.website);
        bodyFormData.append('purpose',this.state.purpose);
        bodyFormData.append('languages',newArray);
        bodyFormData.append('region',this.state.regions);
        bodyFormData.append('country',this.state.country);
        bodyFormData.append('name',this.state.name);
        bodyFormData.append('email',this.state.email);
        bodyFormData.append('title',this.state.title);
        bodyFormData.append('phone1',this.state.phone1);
        bodyFormData.append('phone2',this.state.phone2);
        bodyFormData.append('password',this.state.password);
        bodyFormData.append('terms',this.state.terms);
        bodyFormData.append('account',"media");
        
            for(var pair of bodyFormData.entries()) {
                console.log(pair[0]+ ': '+ pair[1]); 
            }

            axios({
                method:'post',
                url:`${domain}/api/auth/register`,
                data:bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const {loaded , total} = progressEvent;
                    let percentage = Math.floor(loaded * 100 / total);
                    console.log(percentage)
                    if(percentage<100){
                        this.setState({percentage:percentage});
                    }
                    else{
                        this.setState({percentage:100})
                    }
            }})
            .then(res=>{
                console.log("data",res.data);
                this.setState({isActive:false, message:"Registration Successful!", modal:true
                })
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
                this.setState({isActive:false});
                if(error.response){
                    console.log(error.response.data);
                    this.setState({
                        modal:true, isActive:false,
                        message:error.response.data.errors.business_cert 
                        || error.response.data.errors.operation_cert 
                        || error.response.data.errors.logo 
                        || error.response.data.errors.company_name 
                        || error.response.data.errors.media_house 
                        || error.response.data.errors.website
                        || error.response.data.errors.company_email
                        || error.response.data.errors.address
                        || error.response.data.errors.media_type
                        || error.response.data.errors.password
                        || error.response.data.errors.phone1
                        || error.response.data.errors.phone2
                        || error.response.data.errors.title
                        || error.response.data.errors.email
                        || error.response.data.errors.name
                        || error.response.data.errors.country
                        || error.response.data.errors.region
                        || error.response.data.errors.languages
                        || error.response.data.errors.purpose
                    })
                }
            })
        }
        else{
            this.setState({
                modal:true,
                message:"Passwords Do Not Match!!"
            })
        }
    }

    handleCompanyHide=()=>{
        const {company_name, company_email,address,media_house,website,business_cert,logo, purpose} = this.state;
        if(company_name !== "" && company_email !== "" && purpose !== "" && address !== "" &&  media_house !== "" && website !== "" && business_cert!== "" && logo !== ""){
            this.setState({companyHide:false, userHide:true, bankHide:false})
        }
        else{
            this.setState({
                message:"All Fields with * are required", modal:true
            })
        }
    }

    

    handlBackCompany=()=>{
        this.setState({
            companyHide:true,
            userHide:false,
            bankHide:false
        })
    }

    handleBackUser=()=>{
        this.setState({
            companyHide:false,
            userHide:true,
            bankHide:false
        })
    }


    pushType = (value,checked)=>{
        let tempRegions = this.state.regions;
        if(checked){
            tempRegions.push(value);
            this.setState({regions:tempRegions})
        }else{
           let index = tempRegions.indexOf(value);
           if(index!==-1){
               tempRegions.splice(index,1);
               this.setState({regions:tempRegions})
           }
        }
        
        console.log(tempRegions)
    }

    

    pushLanguages = (value,checked)=>{
        let tempLanguages = this.state.languages;
        if(checked){
            tempLanguages.push(value);
            this.setState({languages:tempLanguages})
        }else{
           let index = tempLanguages.indexOf(value);
           if(index!==-1){
               tempLanguages.splice(index,1);
               this.setState({languages:tempLanguages})
           }
        }
        
        console.log(tempLanguages)
    }

   /*  checkOthers=()=>{
        let tempLanguages = this.state.languages;
        let tempOthers = this.state.others.split(",");
        let newArray = tempLanguages.concat(tempOthers)
        console.log(newArray)

    } */

  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <div
        style={{
          height:"100vh"
        }}
      >
      
      <div className="filter" />
        <RegisterNavbar />
        <div style={{marginTop:"10px"}}>
        <Container>
        
        <Form onSubmit={this.handleSubmit}>
            
            <Row>
                <Col md="12">
                {this.state.companyHide?
                <Animated animationOut="bounceOutRight" isVisible={this.state.companyHide}>
                <div className="account">
                    <h3>Media House Information</h3>
                    
                    <hr className="my-3" />
                    <Row style={{marginTop:"20px"}}>
                        <Col md="9" className="ml-auto mr-auto">
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Company Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Company Name" value={this.state.company_name} onChange={e=>this.setState({company_name:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Company Email*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-envelope" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="email" placeholder="Company Email"  value={this.state.company_email} onChange={e=>this.setState({company_email:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Media House Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-television" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Media House Name"  value={this.state.media_house} onChange={e=>this.setState({media_house:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Media Type*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="select" placeholder="Media Type"  value={this.state.media_type} onChange={e=>this.setState({media_type:e.target.value})} required>
                            {this.state.mediaTypes.map(value=>(<option key={value.id} value={value.id}>{value.mediaType}</option>))}
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Website*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-safari" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Website"  value={this.state.website} onChange={e=>this.setState({website:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Purpose*</label>
                            {/* <Input type="select" placeholder="Purpose"  value={this.state.purpose} onChange={e=>this.setState({purpose:e.target.value})}>
                            <option value="Public">Public</option>
                            <option value="Public(Foreign)">Public(Foreign)</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Kids Entertainment">Kids Entertainment</option>
                            <option value="Sports">Sports</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="News & Business">News & Business</option>
                            <option value="Others">Others</option>
                            </Input> */}
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                   {/*  <i className="fa fa-user" /> */}
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Purpose" value={this.state.purpose} onChange={e=>this.setState({purpose:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                             <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Country*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-globe" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="select"  value={this.state.country} onChange={e=>this.setState({country:e.target.value})} required>
                            <option value="Ghana">Ghana</option>
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Address*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-map-marker" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Company Address"  value={this.state.address} onChange={e=>this.setState({address:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                           
                        </Row>
                        <label>Coverage Regions *</label>
                        <Row style={{marginLeft:"20px"}}>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Greater Accra" checked={this.state.regions.some(item=>item === "Greater Accra")}  onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}}>Greater Accra</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Ashanti" checked={this.state.regions.some(item=>item === "Ashanti")}  onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ashanti</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Western" checked={this.state.regions.some(item=>item === "Western")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Western</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Central" checked={this.state.regions.some(item=>item === "Central")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Central</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Northern" checked={this.state.regions.some(item=>item === "Northern")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Northern</p></Col>
                        </Row>
                        <Row style={{marginLeft:"20px"}}>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Volta" checked={this.state.regions.some(item=>item === "Volta")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Volta</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Oti" checked={this.state.regions.some(item=>item === "Oti")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Oti </p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Bono East" checked={this.state.regions.some(item=>item === "Bono East")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Bono East</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Bono" checked={this.state.regions.some(item=>item === "Bono")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Bono</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="North East" checked={this.state.regions.some(item=>item === "North East")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >North East</p></Col>
                        </Row>
                        <Row style={{marginLeft:"20px"}}>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Savannah" checked={this.state.regions.some(item=>item === "Savannah")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Savannah</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Eastern" checked={this.state.regions.some(item=>item === "Eastern")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Eastern</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Western North" checked={this.state.regions.some(item=>item === "Western North")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Western North</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Upper East" checked={this.state.regions.some(item=>item === "Upper East")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Upper East</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Upper West" checked={this.state.regions.some(item=>item === "Upper West")} onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Upper West</p></Col>
                        </Row>
                        <Row style={{marginLeft:"20px"}}>
                            <Col><Input type="checkbox" value="Ahafo" onChange={(e)=>this.pushType(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ahafo</p></Col>
                        </Row>
                            <br/>
                            <label>Languages Of Communication</label>
                        <Row style={{marginLeft:"20px"}}>
                            <Col xs="4" sm="4"><Input type="checkbox" value="English" checked={this.state.languages.some(item=>item === "English")}  onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}}>English</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="French" checked={this.state.languages.some(item=>item === "French")}  onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >French</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Ghanaian Language(Twi)" checked={this.state.languages.some(item=>item === "Ghanaian Language(Twi)")} onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ghanaian Language(Twi)</p></Col>
                        </Row>
                        <Row style={{marginLeft:"20px"}}>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Ghanaian Language(Ewe)" checked={this.state.languages.some(item=>item === "Ghanaian Language(Ewe)")} onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ghanaian Language(Ewe)</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Ghanaian Language(Hausa)" checked={this.state.languages.some(item=>item === "Ghanaian Language(Hausa)")} onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ghanaian Language(Hausa)</p></Col>
                            <Col xs="4" sm="4"><Input type="checkbox" value="Ghanaian Language(Fante)" checked={this.state.languages.some(item=>item === "Ghanaian Language(Fante)")} onChange={(e)=>this.pushLanguages(e.target.value,e.target.checked)}  /><p style={{fontSize:"13px", fontWeight:700}} >Ghanaian Language(Fante)</p></Col>
                        
                        </Row>
                        <Row style={{marginLeft:"0px"}}>
                        <Col md="6">
                            <label>Others</label>
                            <Input type="textarea" 
                                    placeholder="Eg: Italian, Japanese"
                                    onChange={e=>this.setState({others:e.target.value})}
                                    value={this.state.others}
                                    style={{height:"60px"}}
                                    />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Business Certificate*</label>
                            <Input type="file" onChange={e=>{
                                const file = e.target.files[0];
                                console.log(file)
                                this.setState({business_cert:file})}
                                } required
                                style={{overflowX:"hidden"}}
                                />
                            </Col>
                            <Col>
                            <label>Operating License</label>
                            <Input type="file" onChange={e=>{
                                const file = e.target.files[0];
                                console.log(file)
                                this.setState({operational_cert:file})}
                                } required
                                style={{overflowX:"hidden"}}/>
                            </Col>
                            <Col>
                            <label>Upload Logo*</label>
                            <Input type="file" onChange={e=>{
                                const file = e.target.files[0];
                                console.log(file)
                                this.setState({logo:file})}
                                } required
                                style={{overflowX:"hidden"}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col md="6">
                                <Button
                                style={{borderRadius:"20px", color: "#1b1e21",
                                background: "#F1CF00",
                                border:"1px solid #F1CF00"}}
                                onClick={()=>this.handleCompanyHide()}
                                >
                                    Next <i className="fa fa-chevron-right"/>
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>

                    
                </div>
                </Animated>
                :
                <>
                </>
            }
            {this.state.userHide?
                <Animated animationIn="bounceInRight" isVisible={this.state.userHide} >
                <div className="account" style={{marginTop:"30px"}}>
                    <h3>User Account Information</h3>
                    
                    <hr className="my-3" />
                    {this.state.percentage === 0?
                    <></>:
                    <Progress value={this.state.percentage} />
                    }
                    
                    <Row style={{marginTop:"30px"}}>
                        <Col md="9" className="ml-auto mr-auto">
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Full Name*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Full Name"  value={this.state.name} onChange={e=>this.setState({name:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Email*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-envelope" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Email"  value={this.state.email} onChange={e=>this.setState({email:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Title*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="select" value={this.state.title} onChange={e=>this.setState({title:e.target.value})} required>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            </Input>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Phone No. 1*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-phone" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" placeholder="Phone Number"  value={this.state.phone1} onChange={e=>this.setState({phone1:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Phone No. 2</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-phone" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="text" value={this.state.phone2} placeholder="Optional"  onChange={e=>this.setState({phone2:e.target.value})}/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Password*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-key" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="password" placeholder="Password"  value={this.state.password} onChange={e=>this.setState({password:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6" xs="12">
                            <label>Re-type Password*</label>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-key" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <Input type="password" placeholder="Re-type Password"  value={this.state.confirm_password} onChange={e=>this.setState({confirm_password:e.target.value})} required/>
                            </InputGroup>
                            </FormGroup>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop:"20px",marginBottom:"50px"}}>
                    <Row>
                    <Col md="8" className="ml-auto mr-auto">
                    <Input type="checkbox" value={this.state.terms} onChange={e=>this.setState({terms:e.target.checked})} required/> <p style={{fontSize:"13px", fontWeight:700}} >Agree To <a href="/auth/terms&conditions-media">Terms And Conditions</a></p>
                    <br/>
                    <Row>
                    <Col>
                        <Button
                        onClick={()=>this.handlBackCompany()}
                        type="button"
                        className="btn btn-round"
                        style={{
                            borderRadius:"20px",
                            color: "#1b1e21",
                            background: "rgb(241 0 0)",
                            border:"1px solid rgb(241 0 0)"
                        }}
                        ><i className="fa fa-chevron-left"/>Back</Button> 
                        </Col>
                        <Col>
                        <Button
                        className="btn btn-round"
                        style={{
                            borderRadius:"20px",
                            color: "#1b1e21",
                            background: "#F1CF00",
                            border:"1px solid #F1CF00"
                        }}
                        >Submit <i className="fa fa-chevron-right"/></Button> 
                        </Col>
                    </Row>
                        
                    </Col>
                    </Row>
                </div>
                </Animated>
                :
                <>
                </>
            }
                </Col>
            </Row>
        </Form>
  
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>
                    {this.state.message}
                    </ModalHeader>
                    <ModalFooter>
                    <Button color="danger" onClick={()=>this.setState({modal:false})}>
                    close
                    </Button>
                    </ModalFooter>
                </Modal>
        </Container>
        </div>
        </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default MediaAccount;
