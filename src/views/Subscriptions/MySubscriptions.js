
import React from "react";
import axios from 'axios';
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";


// reactstrap components
import { Card, Container, Row ,Col, CardBody, Table,Button, Modal,ModalBody,ModalFooter, ModalHeader, Spinner
} from "reactstrap";
import Pagination from "react-js-pagination";

// core components
import Header from "components/Headers/Header.js";
var domain = "https://backend.demo.kokrokooad.com";
let user =localStorage.getItem('access_token');

class MySubscription extends React.Component {

  state={
    subscriptions:[],
    data:[],
    meta:[],
    selectedSub:[],
    title:"",
    modal:false,
    deleteModal:false,
    rateDetails:[],
    total:0,
    data:[],
    no_of_weeks:1,
    isActive:false,
    deleteId:null,
    spinnerActive:true,
    total:0,
    selectedPrintSub:[],
    printmodal:false,
    order:null,
    column:null
  }

  componentDidMount(){
   this.getSubscription();
  }


  getSubscription=(pageNumber=1, column=null, order=null)=>{
    this.setState({spinnerActive:true, order:order, column:column})
    axios.get(`${domain}/api/all-subscriptions?page=${pageNumber}`,{
      headers:{ 'Authorization':`Bearer ${user}`},
      params:{order:order, column_name:column},
    })
    .then(res=>{
      console.log(res.data);
      this.setState({subscriptions:res.data, data:res.data.data, meta:res.data.meta, spinnerActive:false})
    })
    .catch(error=>{
      console.log(error)
    })
  }

   handleView=(id, title)=>{
     this.setState({isActive:true})
     let total =0;
   axios.get(`${domain}/api/subscription/${id}/details`,
   {headers:{ 'Authorization':`Bearer ${user}`}})
   .then(res=>{
     console.log(res.data);
     let data=res.data;
     if(res.data[0].details[0].duration !== null){
      for(var i=0; i<data.length; i++){
        console.log(data[i].total_amount)
        total = Number(data[i].total_amount) + total;
      }
      console.log(total)
     this.setState({selectedSub:res.data, total:total, title:title,modal:true,isActive:false})
      }
      else{
        for(var i=0; i<data.length; i++){
          console.log(data[i].total_amount)
          total = Number(data[i].total_amount) + total;
        }
        this.setState({selectedPrintSub:res.data, title:title, printmodal:true, isActive:false, total:total})
      }
    })
   .catch(error=>{
     console.log(error)
     this.setState({isActive:false})
   })
  }

  handleDelete=(id)=>{
    console.log(id);
    this.setState({deleteModal:false})
    axios.delete(`${domain}/api/scheduledAd/${id}/delete`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "deleted"){
        let newSubs = this.state.data.filter(item=>item.id !== id);
        this.setState({data:newSubs})
      }

    })
    .catch(error=>{
      console.log(error)
    })
  }


  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {this.state.spinnerActive?
              <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!this.state.spinnerActive && this.state.data.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>You Have No Campaigns</h4> 
            </Col>
          </Row>
          :
          <>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >View, Edit or Delete Campaigns You Have Created.</p>
          <Row style={{marginTop:"20px"}}>
            <Col lg="12" md="12" xl="12" sm="12" xs="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"scroll"}}>
            <Table striped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Campaign ID</th>
              <th>
                <Row>
                  <Col>
                    Title
                  </Col>
                  <Col>
                  <div>
                    <button className="sort" onClick={()=>this.getSubscription(1, "title", "asc")}>▲</button>
                    <button className="sort" onClick={()=>this.getSubscription(1, "title", "desc")}>▼</button>
                  </div>
                  </Col>
                </Row>
              </th>
              <th>
                      Ratecard Title
              </th>
              <th>Media House</th>
              <th>Media Type</th>
              <th>Status</th>
              <th>
              <Row>
                    <Col>
                      Date Time
                    </Col>
                    <Col>
                    <div>
                      <button className="sort" onClick={()=>this.getSubscription(1, "created_at", "asc")}>▲</button>
                      <button className="sort" onClick={()=>this.getSubscription(1, "created_at", "desc")}>▼</button>
                    </div>
                    </Col>
                  </Row>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value, index)=>(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{value.generated_id}</td>
              <td>{value.title}</td>
              <td>{value.rate_card_title.title}</td>
              <td>{value.company.media_house}</td>
              <td>{value.company.media_type}</td>
              {value.cart_id === null?
              <td>moved to pay later</td>
              :
              value.cart_id !==null && value.cart_id.payment_status === 'unpaid'?
              <td>in_cart</td>
              :
              value.cart_id !== null && value.cart_id.payment_status ==="paid"?
              <td>{value.status}</td>
              :
              <td>{value.status}</td>
              }
              <td>{value.date} {value.time}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" >

                  <Button color="info" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}}
                  onClick={()=>this.handleView(value.id,value.title)}
                  ><i className="fa fa-eye"/></Button>

                  {value.status === 'approved'?
                  <></>
                  :
                  <Button color="success" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}}
                    onClick={()=>this.props.history.push("/client/select-edit-type",{
                      id:value.rate_card_title.id,
                      title:value.rate_card_title.title,
                      title_id:value.id,
                      ad_duration:value.ad_duration,
                      file_types:value.rate_card_title.file_types,
                      videoTitle:value.title,
                      payment_status:value.cart_id,
                      mediaType:value.company.media_type,
                      mediaHouse:value.company.media_house,
                      media_house_id:value.company.media_house_id
                    })}
                  ><i className="fa fa-pencil"/></Button>
                  }
                  
                  {value.cart_id !==null && value.cart_id.payment_status === "paid"?
                 <></>
                 :
                 <Button color="danger" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}}
                  onClick={()=>{this.setState({deleteModal:true,deleteId:value.id})}}
                  ><i className="fa fa-trash"/>
                  </Button>
                  }

                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
                  <Modal isOpen={this.state.deleteModal}>
                    <ModalHeader>
                      Are you sure want to delete?
                    </ModalHeader>
                    <ModalFooter>
                    <Button color="danger" onClick={()=>this.handleDelete(this.state.deleteId)}>
                      yes
                    </Button>
                    <Button color="info" onClick={()=>this.setState({deleteModal:false})}>
                      No
                    </Button>
                    </ModalFooter>
                  </Modal>
          </Table>
          <Modal isOpen={this.state.modal}  style={{ maxWidth:"90%"}}>
          <ModalHeader style={{display:"inline"}}>
          <div>
          <Row>
            <Col>
              <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
            </Col>
            <Col>
            <div style={{float:"right"}}>
              <h3>Total Amount :<span style={{color:"red"}}> GH¢ {this.state.total}</span></h3>
            </div>
            </Col>
          </Row>
          </div>
          </ModalHeader>
            <ModalBody>
            {this.state.selectedSub.map((item,key)=>(
              <Row style={{marginBottom:"20px"}}>
                <Col md="12">
                  <h3>Amount  : GH¢ {item.total_amount}</h3>
                  <p style={{marginBottom:"0px"}}>{item.selected_date} - {item.day.day}</p>{/* 
                  <p style={{marginTop:"0px"}}>Roll over {item.no_of_weeks} weeks</p> */}
                
                <Table  bordered>
                <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                  <tr>
                  <td>#</td>
                  <td>duration</td>
                  <td>Rate</td>
                  <td>Selected Spots</td>
                  <td>Time Segment</td>
                  <td>Amount</td>
                  </tr>
                  </thead>
                  <tbody>
                  {item.details.map((value,index)=>(
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.duration.duration} {value.duration.unit.unit}</td>
                      <td>{value.duration.rate}</td>
                      <td>{value.selected_spots}</td>
                      <td>{value.ratecard.start_time} - {value.ratecard.end_time}</td>
                      <td>{value.amount}</td>
                    </tr>
                    ))}
                  </tbody>
              </Table>
                </Col>
              </Row>
             
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=>this.setState({modal:false})}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.printmodal}  style={{ maxWidth:"90%"}}>
          <ModalHeader style={{display:"inline"}}>
          <div>
          <Row>
            <Col>
              <h4 style={{textTransform:"uppercase"}}>{this.state.title}</h4>
            </Col>
            <Col>
            <div style={{float:"right"}}>
              <h3>Total Amount :<span style={{color:"red"}}> GH¢ {this.state.total}</span></h3>
            </div>
            </Col>
          </Row>
          </div>
          </ModalHeader>
            <ModalBody>
            {this.state.selectedPrintSub.map((item,key)=>(
              <Row style={{marginBottom:"20px"}}>
                <Col md="12">
                  <h3>Amount  : GH¢ {item.total_amount}</h3>
                  <p style={{marginBottom:"0px"}}>{item.selected_date} - {item.day.day}</p>{/* 
                  <p style={{marginTop:"0px"}}>Roll over {item.no_of_weeks} weeks</p> */}
                
                <Table  bordered>
                <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                  <tr>
                  <td>#</td>
                  <td>Size</td>
                  <td>Page Section</td>
                  <td>Amount</td>
                  </tr>
                  </thead>
                  <tbody>
                  {item.details.map((value,index)=>(
                    <tr>
                      <td>1</td>
                      <td>{value.ratecard.size}</td>
                      <td>{value.ratecard.page_section}</td>
                      <td>{value.ratecard.cost}</td>
                    </tr>
                    ))}
                  </tbody>
              </Table>
                </Col>
              </Row>
             
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=>this.setState({printmodal:false})}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          </CardBody>
          <CardBody>
          <Pagination
                totalItemsCount={this.state.meta&&this.state.meta.total}
                activePage={this.state.meta&&this.state.meta.current_page}
                itemsCountPerPage={this.state.meta&&this.state.meta.per_page}
                onChange={(pageNumber)=>this.getSubscription(pageNumber, this.state.column, this.state.order)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
          </CardBody>
          </Card>
            </Col>
          </Row>
        </>}
        </>
        }
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}

export default MySubscription;
