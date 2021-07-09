import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col, Nav, NavLink,NavItem,TabContent,  TabPane,
  InputGroup, InputGroupAddon,CardHeader,CardFooter, Button,Input, Form, FormGroup,InputGroupText,Modal, ModalHeader, ModalFooter
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import Header from "components/Headers/Header";
import axios from 'axios';
import classnames from 'classnames';

var domain = "https://backend.kokrokooad.com";
let user =localStorage.getItem('access_token');
function CreateUsers(props) {
const [isActive, setIsActive] = React.useState(false);
const [phone1, setPhone1] = React.useState('');
const [phone2, setPhone2] = React.useState('');
const [email, setEmail]= React.useState("");
const [username, setUsername] = React.useState("");
const [role, setRole] = React.useState(2);
const [getRoles, setGetRoles] = React.useState([]);
const [title, setTitle] = React.useState("Mr");
const [message, setMessage] = React.useState("");
const [modal, setModal] = React.useState(false)



React.useEffect(()=>{
    axios.get(`${domain}/api/get-roles`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        setGetRoles(res.data)
    })
    .catch(error=>{
    })
},[])

const toggleModal=()=>setModal(!modal);

const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`${domain}/api/super-admin/add-new/staff`,{
        name:username,
        phone1:phone1,
        phone2:phone2,
        email:email,
        role_id:role,
        title:title
    },
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        setModal(true);
        setMessage("User Created!")
            setTimeout(
                function(){
                    setModal(false);
                     props.history.push("/client/all-users");
                },1500
            )
    })
    .catch(error=>{
        if(error.response.data.status === "Forbidden"){
            setModal(true)
            setMessage("Access Denied")
        }
        else{
            setIsActive(false);
            setModal(true)
            setMessage(error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2);
        }
    })
}


  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
      <Header />
      <Container className=" mt--7" fluid>
      <Row>
        <Col lg="7" className="ml-auto mr-auto">
        <p style={{fontSize:"13px", fontWeight:500}}>Create A New User for Your Company</p>
        <Card>
            <Form onSubmit={handleSubmit}>
            <CardHeader>
                Create New User
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                       <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-user" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="User Name" type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-envelope" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Row>
                        <Col>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Phone" type="text" name="phone" value={phone1} onChange={e=>setPhone1(e.target.value)} required/>
                        </InputGroup>
                        </Col>
                        <Col>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Phone (optional)" type="text" name="phone" value={phone2} onChange={e=>setPhone2(e.target.value)}/>
                        </InputGroup>
                        </Col>
                        </Row>
                        </FormGroup>
                        <Row>
                             <Col>
                                <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-briefcase" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Role" type="select" name="title" value={title} onChange={e=>setTitle(e.target.value)} required>
                                    <option vlaue="Mr">Mr</option>
                                    <option vlaue="Mrs">Mrs</option>
                                    <option vlaue="Miss">Miss</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-user" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Role" type="select" name="role" value={role} onChange={e=>setRole(e.target.value)} required>
                                    {getRoles.map((value,key)=>(
                                        value.role !== "studio_worker"?
                                        <option value={value.id} key={key}>{value.role}</option>
                                        :
                                        <></>
                                        
                                    ))}
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Button color="info" type="submit">Create</Button>
            </CardFooter>
            </Form> 
        </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader>
                {message}
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>

      </Container>
      </LoadingOverlay>
    </>
  );
}


export default CreateUsers;
