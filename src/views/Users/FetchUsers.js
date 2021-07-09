import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Button,
  Col, Table,Spinner,Modal,ModalHeader,ModalFooter
} from "reactstrap";
import Pagination from "react-js-pagination";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import Header from "components/Headers/Header";
import axios from 'axios';

var domain = "https://backend.kokrokooad.com";
let user =localStorage.getItem('access_token');
function GetUsers(props) {
const [isActive, setIsActive] = React.useState(false);
const [users, setUsers] = React.useState([]);
const [modal, setModal] = React.useState(false);
const [id, setId] = React.useState(null);
const [data, setData]=React.useState([]);
const [alertmessage, setMessage] = React.useState("");
const [alertModal, setAlertModal] = React.useState(false)

React.useEffect(()=>{
    getUsers();
},[])

function getUsers(pageNumber=1){
    axios.get(`${domain}/api/super-admin/get-all/users?page=${pageNumber}`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        setUsers(res.data);
        setData(res.data.data)
    })
    .catch(error=>{
        if(error.response.status === 403){
          setAlertModal(true);
          setMessage("Access Denied")
          setData([])
        }
    })
}

const handleBlock=(id)=>{
  let tempData = data
    axios.post(`${domain}/api/super-admin/block/${id}`,null,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        let selected = tempData.find(item=>item.id === id);
        selected.isActive = "inactive";
        setData(tempData);
        setAlertModal(true);
        setMessage("UserBlocked")
        setTimeout(
          function(){
            setAlertModal(false)
          }.bind(this),1500)
    })
    .catch(error=>{
    })
}


const handleUnBlock=(id)=>{
    let tempData = data;
    axios.post(`${domain}/api/super-admin/unblock/${id}`,null,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        let selected = tempData.find(item=>item.id === id);
        selected.isActive = "active";
        setData(tempData);
        setAlertModal(true);
        setMessage("User UnBlocked!")
        setTimeout(
          function(){
            setAlertModal(false)
          }.bind(this),1500)
    })
    .catch(error=>{
    })
}

const deleteUser=(id)=>{
    let tempData = data;
    axios.delete(`${domain}/api/super-admin/delete/${id}`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        let newData = tempData.filter(item=>item.id !== id);
        setData(newData);
        setModal(false)
    })
    .catch(error=>{
    })
}


const { meta} = users;
  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
      <Header />
      <Container className=" mt--9" fluid>
      {isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
          :
        <>
          {!isActive && data && data.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No User Created Yet</h4> 
            </Col>
          </Row>
          :
        <>
        <p style={{fontSize:"13px", fontWeight:500}}
            >View, Edit or Delete Users You Have Created.</p>
          <Row style={{marginTop:"20px"}}>
            <Col lg="12" md="12" xl="12" sm="12" xs="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"scroll"}}>
            <Table striped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value,key)=>(
          <tr>
                <td>{key+1}</td>
                <td>{value.title}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone1}</td>
                <td>{value.role.role}</td>
                <td>{value.role.created_at}</td>
                <td>
                  <Row>
                    <Col md="6" lg="6" sm="6" xs="6" >
                    {value.isActive === "active"?
                    <Button color="warning" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>handleBlock(value.id)}
                    ><i className="fa fa-lock"/></Button>
                    :
                    <Button color="success" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>handleUnBlock(value.id)}
                    ><i className="fa fa-unlock"/></Button>
                    }
                    <Button color="danger" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>{setModal(true); setId(value.id)}}
                    ><i className="fa fa-trash"/>
                    </Button>
                    </Col>
                  </Row>  
                  </td>
          </tr>
          ))}
          </tbody>
          </Table>
          </CardBody>
          <CardBody>
          <Pagination
            totalItemsCount={meta&&meta.total}
            activePage={meta&&meta.current_page}
            itemsCountPerPage={meta&&meta.per_page}
            onChange={(pageNumber)=>getUsers(pageNumber)}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First"
            lastPageText = "Last"
            />
          </CardBody>
          </Card>
          </Col>
          </Row>
          </>
          }
          </>
          }
      </Container>
            <Modal isOpen={alertModal}>
              <ModalHeader>
                {alertmessage}
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={()=>setAlertModal(false)}>Close</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={modal}>
                    <ModalHeader>
                      Are you sure want to delete?
                    </ModalHeader>
                    <ModalFooter>
                    <Button color="danger" onClick={()=>deleteUser(id)}>
                      yes
                    </Button>
                    <Button color="info" onClick={()=>setModal(false)}>
                      No
                    </Button>
                    </ModalFooter>
                  </Modal>
      </LoadingOverlay>
    </>
  );
}


export default GetUsers;
