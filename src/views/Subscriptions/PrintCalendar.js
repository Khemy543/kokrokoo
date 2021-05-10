/* eslint-disable no-loop-func */

import React from "react";
import {Link} from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,Modal, ModalBody,ModalHeader, ModalFooter,
  InputGroup,Table, Form,Progress,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import data from "data/volumeData";


let user =localStorage.getItem('access_token');
var domain = "https://backend.kokrokooad.com";

class PrintCalender extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }

    state={
        eventData:[],
        rateCards:[],
        modal:false,
        isActive:false,
        rateDetails:[],
        title: this.props.location.state.videoTitle,
        file_duration:Math.round(this.props.location.state.file_duration),
        total:0,
        dayTotal:0,
        subscriptionid:null,
        data:[],
        no_of_weeks:"",
        date:"",
        day_id:"",
        total_amount:0,
        saveModal:false,
        changeText:false,
        uploadModal:false,
        volumeModal:false,
        modalmessage:"Details Saved",
        prompt:true,
        volume:[],
        discount_amount:0,
        loading:false
    }



    toggle =() => this.setState({modal:false});
    VolumeCollapseToggle=()=>this.setState({volumeModal:false})

      
      componentDidMount(){
        axios.get(`${domain}/api/company/${this.props.location.state.media_house_id}/volume-discounts`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            this.setState({volume:res.data})
        })
        var tomorrow = new Date();
        tomorrow.setDate(new Date(). getDate() +2);
        var dd = String(tomorrow.getDate()).padStart(2, '0');
        var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tomorrow.getFullYear();
        var today = yyyy + '-' + mm + '-' + dd;
        let discount =0;
        console.log("today:",today)
          this.setState({isActive:true})
        console.log("ne:",this.props.location.state)
        let newEvents = [];
        axios.get(`${domain}/api/view-ratecard/${this.props.location.state.rate_card.id}/details`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("details:",res.data);
            this.setState({rateCards:res.data})
            for(var i=0; i<res.data.length; i++){
                if(newEvents.some(item=>item.id === res.data[i].day.id)){
                    continue;
                }
                else{
                    newEvents.push({title:"",daysOfWeek:[`${res.data[i].day.id}`], id:res.data[i].day.id, startRecur: `${today}`,display:'list-item'})
                }
            }
            let grand_total = 0;
            axios.get(`${domain}/api/subscription/${this.props.location.state.title_id}/details`,
            {headers:{ 'Authorization':`Bearer ${user}`}})
            .then(res=>{
                console.log("mafia",res.data);
                for(var i=0; i<res.data.length;i++){
                  newEvents.push({title:"", start:`${res.data[i].selected_date}`, display:"list-item", allDay: true, backgroundColor:"red"})
                    grand_total = grand_total + Number(res.data[i].total_amount);
                }

                console.log("grand",grand_total);
                for(var t=0; t<this.state.volume.length; t++){
                let range = this.state.volume[t].amount_range.split("-");
                console.log(this.state.volume[t].amount_range)
                if(Number(range[0])<=grand_total && grand_total<=Number(range[1])){
                    console.log("yes")
                    discount = (this.state.volume[t].percentile/100) * grand_total
                    console.log(discount)
                }
            }
                this.setState({data:res.data, total_amount:grand_total, eventData:newEvents, isActive:false,discount_amount:discount})
            })
        })
        .catch(error=>{
                console.log(error)
        });

      }

      handleDateClick=(calEvent, jsEvent, view)=>{
        let total = 0; 
        let dayTotal = 0
        let no_of_weeks=0;
       console.log("check date:",calEvent.event.start);
       let current_datetime = calEvent.event.start;
          let year = current_datetime.getFullYear();
          let month = current_datetime.getMonth()+1;
          let dt = current_datetime.getDate();

          if (dt < 10) {
          dt = '0' + dt;
          }
          if (month < 10) {
          month = '0' + month;
          }
       let formatted_date = year+'-' + month + '-'+dt;
       console.log("formated:",`${formatted_date}`)
       var id = calEvent.event._def.publicId;
       const selectedCard = this.getRateCard(id);
       let selectedDate = this.state.data.find(item=>item.selected_date === formatted_date);
       if(selectedDate !== undefined){
          no_of_weeks = selectedDate.no_of_weeks;
          let twice = Number(selectedDate.no_of_weeks) +1;
          total = selectedDate.total_amount * twice
          console.log(selectedDate)
       }
       if(Number(id) !== 0){
        this.setState({rateDetails:selectedCard, date:formatted_date,day_id:Number(calEvent.event._def.publicId) ,modal:true, dayTotal:total, no_of_weeks:no_of_weeks});
      
       }
     }


      getRateCard = id =>{
         let tempRateCards = [...this.state.rateCards];
         const newId = Number(id)
         let selectedRateCard = tempRateCards.filter(item=> item.day.id === newId);
         console.log("selected",selectedRateCard)
         return selectedRateCard;
     }

    

    handleRadioChange=(index, id,checked)=>{
        console.log("starting", checked, id);
        let tempData = this.state.data;
        let tempDetails = this.state.rateDetails;
        let selected = tempDetails.find(item =>item.id === id);
        let subtotal = 0;
        let total = 0;
        console.log(selected)
        let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
        if(checked){
          if(selectedDate == undefined){
            tempData.push({new:true,selected_date:this.state.date,no_of_weeks:0, total_amount:selected.cost, details:[
              {
                ratecard_id:selected.id,
                amount:selected.cost
              }
            ]});
            console.log(tempData);
            for(var t=0; t<tempData.length; t++){
              total = total + Number(tempData[t].total_amount)
            }
           this.setState({data:tempData, total:total, dayTotal:selected.cost});
          }
          else{
            selectedDate.details.push({ratecard_id:selected.id, amount:selected.cost});
            for(var i=0; i<selectedDate.details.length; i++){
              subtotal = subtotal + Number(selectedDate.details[i].amount)
            }
            console.log(subtotal);
            selectedDate.total_amount = subtotal
            for(var t=0; t<tempData.length; t++){
              total = total + Number(tempData[t].total_amount)
            }
            console.log("total",total)
  
            this.setState({data:tempData, total:total, dayTotal:subtotal}) 
          }
        }else{
          if(selectedDate && selectedDate.details.some(item=>item.ratecard_id === id || (item.ratecard && item.ratecard.id === id))){
            let deleteItem = selectedDate.details.filter(item=> item.ratecard_id === id || (item.ratecard && item.ratecard.id === id));
            let deleteId = deleteItem[0].id;
            if(selectedDate.new){
              selectedDate.details = selectedDate.details.filter(item=> item.ratecard_id != id);
              for(var i=0; i<selectedDate.details.length; i++){
                subtotal = subtotal + Number(selectedDate.details[i].amount)
              }
              console.log(subtotal);
              selectedDate.total_amount = subtotal;
              let key = tempData.map(function(e) { return e.selected_date; }).indexOf(this.state.date);
              console.log('key',key);
              tempData[key] = selectedDate
              for(var t=0; t<tempData.length; t++){
                total = total + Number(tempData[t].total_amount)
              }
              console.log("total",tempData)
    
              this.setState({data:tempData, total:total, dayTotal:subtotal})
            }else{
            axios.delete(`${domain}/api/subscription-detail/${deleteId}/delete`,
            {headers:{ 'Authorization':`Bearer ${user}`}})
            .then(res=>{
              console.log(res.data);
              selectedDate.details = selectedDate.details.filter(item=> item.ratecard && item.ratecard.id != id);
              console.log("selectedDate",selectedDate);
              for(var i=0; i<selectedDate.details.length; i++){
                subtotal = subtotal + Number(selectedDate.details[i].amount)
              }
              console.log(subtotal);
              selectedDate.total_amount = subtotal;
              let key = tempData.map(function(e) { return e.selected_date; }).indexOf(this.state.date);
              console.log('key',key);
              tempData[key] = selectedDate
              for(var t=0; t<tempData.length; t++){
                total = total + Number(tempData[t].total_amount)
              }
              console.log("total",tempData)
    
              this.setState({data:tempData, total:total, dayTotal:subtotal})
  
            })
            .catch(error=>{
              console.log(error)
            })
          }
          }
          
        }
      }

    handleCheck=(id)=>{
      let tempData = this.state.data;
      let selected = tempData.find(item=>item.selected_date === this.state.date);
      if(selected === undefined){
        return false;
      }
      else{
      if(selected.details.some(item=>item.ratecard_id === id || (item.ratecard && item.ratecard.id === id))){
          return true;
      }
      else{
        return false
      }
    }
      
  }

  getRollOver =()=>{
    let tempData = this.state.data;
    let selected = tempData.find(item=>item.selected_date === this.state.date);
    if(selected !== undefined){
        return selected.no_of_weeks;
    }
  }

  handelRollOverChange=(value)=>{
    let tempData = this.state.data;
    let total=0
    let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
    if(selectedDate !== undefined){
        selectedDate.no_of_weeks = value;
        let twice = Number(value)+1;
        total = twice*selectedDate.ratecard.cost;
        this.setState({data:tempData, total:total})
    }
}

    handleSave=()=>{
        let total = 0;
        let tempData = this.state.data;
        let newEvents=[...this.state.eventData]
        let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
        let discount = 0;
        console.log(selectedDate)
        this.setState({isActive:false, loading:true})
        if(selectedDate.new === true){
          axios.post(`${domain}/api/subscription-store/${this.props.location.state.title_id}/details`,
        {
            subscription_title:this.state.title,
            total_amount:selectedDate.total_amount,
            no_of_weeks:selectedDate.no_of_weeks,
            selected_date:this.state.date,
            day_id:this.state.day_id,
            segments:selectedDate.details
        },{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("backdata",res.data);
            for(var i =0; i<res.data.length;i++){
              total = total + Number(res.data[i].total_amount);
              if(newEvents.some(item=>item.start === res.data[i].selected_date)){
                continue;
            }
            else{
            newEvents.push({title:"", start:`${res.data[i].selected_date}`, display:"list-item", allDay: true, backgroundColor:"red"})
            }
            }

            for(var t=0; t<this.state.volume.length; t++){
              let range = this.state.volume[t].amount_range.split("-");
              console.log("ha")
              if(Number(range[0])<=total && total<=Number(range[1])){
                  console.log("yes")
                  discount = (this.state.volume[t].percentile/100) * total
                  console.log(discount)
              }
          }
            
            this.setState({loading:false, isActive:false,data:res.data,saveModal:true, total_amount:total,eventData:newEvents, discount_amount:discount});

            setTimeout(
                function(){
                    this.setState({saveModal:false,modal:false})
                }.bind(this),2000)
        })
        .catch(error=>{
            this.setState({isActive:false, loading:false})
            console.log(error)
        })
        }
        else{
          axios.patch(`${domain}/api/subscription/${selectedDate.id}/update`,
        {
          subscription_title:this.state.title,
          total_amount:selectedDate.total_amount,
          no_of_weeks:selectedDate.no_of_weeks,
          selected_date:this.state.date,
          day_id:this.state.day_id,
          segments:selectedDate.details
        },{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            for(var i =0; i<res.data.length;i++){
              total = total + Number(res.data[i].total_amount)
              if(newEvents.some(item=>item.start === res.data[i].selected_date)){
                continue;
            }
            else{
            newEvents.push({title:"", start:`${res.data[i].selected_date}`, display:"list-item", allDay: true, backgroundColor:"red"})
            }
            }
            for(var t=0; t<this.state.volume.length; t++){
              let range = this.state.volume[t].amount_range.split("-");
              console.log("ha")
              if(Number(range[0])<=total && total<=Number(range[1])){
                  console.log("yes")
                  discount = (this.state.volume[t].percentile/100) * total
                  console.log(discount)
              }
          }
            this.setState({loading:false,isActive:false,data:res.data,saveModal:true, total_amount:total,eventData:newEvents, discount_amount:discount});

            setTimeout(
                function(){
                    this.setState({saveModal:false,modal:false})
                }.bind(this),2000)
        })
        .catch(error=>{
            this.setState({isActive:false, loading:false})
            console.log(error)
        })
        }
      }

      handleUpload=()=>{
        if(this.state.data.length <= 0){
          this.setState({saveModal:true, modalmessage:"No Schedule Created"})
          setTimeout(
            function(){
                this.setState({saveModal:false})
            }.bind(this),2000)
        }else{
        console.log("......")
        this.setState({uploadModal:true, changeText:true})
       let file  =this.props.location.state.videoFile;
       console.log(file);
       let formData = new FormData();
       formData.append('ad',file);
       console.log("bdy:",formData)
       axios({
           method:'post',
           headers:{
               "Authorization":`Bearer ${user}`,
               "Content-Type":"mutipart/form-data"
           },
           data:formData,
           url:`${domain}/api/${this.props.location.state.title_id}/upload-ad/${this.state.file_duration}`,
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
           }
           }).then(res=>{
                   console.log(res.data);
                       this.setState({isActive:false, changeText:false,prompt:false});
                       setTimeout(
                           function(){
                               this.props.history.push("/client/edit-printcampaign",{
                                 id:this.props.location.state.title_id, 
                                 title:this.state.title,
                                media_house_id:this.props.location.state.media_house_id
                                })
                           }.bind(this),2000)
               })
               .catch(error=>{
                   console.log(error)
                   this.setState({isActive:true})
               })
    
   }
  }
   
   handleDeleteCampaign=()=>{
    axios.delete(`${domain}/api/scheduledAd/${this.props.location.state.title_id}/delete`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data)
    })
}


    render(){
    return (
      <>
      <NavigationPrompt when={this.state.prompt} 
        afterConfirm={()=>this.handleDeleteCampaign()}
        disableNative={true}
        >
        {({ onConfirm, onCancel }) => (
            <Modal isOpen={this.state.prompt}>
                <ModalHeader>
                You have unsaved changes, are you sure you want to leave?
                </ModalHeader>
                <ModalFooter>
                    <Button color="danger" onClick={onConfirm}>Yes</Button>
                    <Button color="info" onClick={onCancel}>No</Button>
                </ModalFooter>
            </Modal>
        )}
        </NavigationPrompt>;
        <Header />
        {/* Page content */}
        <Container className=" mt--9" fluid>
        {this.state.eventData.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :

          <Row>
            <Col md="12">

          <Row>
            <Col md="12" sm="12" lg="12" xs="12" xl="12">
              <Row>
                <Col>
                <h3>Total Campaign Amount: <span style={{color:"red"}}>GH¢ {(this.state.total_amount).toFixed(2)}</span></h3>
                <h3>Discounted Total Amount (Expected): <span style={{color:"red"}}>GH¢ {(this.state.total_amount - this.state.discount_amount).toFixed(2)}</span></h3>
                
                <h1 style={{color:"#3788d8",fontSize:"40px", fontWeight:1000}}>. <span style={{fontSize:"13px", color:"black",fontWeight:500}}>Days Available</span></h1>
                    <h1 style={{color:"red",fontSize:"40px", fontWeight:1000, marginTop:"-40px"}}>. <span style={{fontSize:"13px", color:"black",fontWeight:500}}>Days Subscribed To</span></h1>

                </Col>
                <Col>
                    <Button
                    style={{ float:"right"}}
                    color="info"
                    onClick={()=>this.setState({volumeModal:true})}
                    >
                        Volume Discount
                    </Button>
                </Col>
              </Row>
            <Card className="shadow">
            <CardBody>
            <FullCalendar
            plugins={[ dayGridPlugin ,interactionPlugin ]}
            events={this.state.eventData}
            eventClick = {this.handleDateClick}
            height="68vh"
            />
            </CardBody>
            </Card>
            </Col>
          </Row>
          <br/>
          <Row>
           <Col md="8">
           </Col>
           <Col md="4">
           <Link to="/client/upload-file">
           <Button className="text-uppercase" color="danger" style={{marginLeft:"100px"}}>
                Back
            </Button>
            </Link>
          <Button className="text-uppercase" color="info" style={{float:"right"}} onClick={()=>this.handleUpload()}>
                Finish
            </Button>
           </Col> 
          </Row> 
          

        <Modal isOpen={this.state.modal} style={{ maxWidth:"90%"}}>
          <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'}/>}
            >
            <ModalHeader style={{maxWidth:"100%"}}>
            <div style={{width:"100%"}}> 
            <Row>
            <Col md="12">    
              <h4 className="text-uppercase">{this.props.location.state.rate_card.title}</h4>
             
              </Col>
              </Row>
              </div>
              </ModalHeader>
              <ModalBody>
                <Row>
                <Col>
                <label>Title</label>
              <InputGroup>
                <Input placeholder="Enter Title" type="text" style={{width:"100%"}} value={this.state.title} />
              </InputGroup>
                <br/>
                
                <Form>
                <div>
                <Table bordered>
                <thead style={{backgroundColor:"#01a9ac", color:"white", fontSize:"12px"}}>
                        <tr>
                        <th>#</th>
                        <th>Size</th>
                        <th>rate</th>
                        <th>Page Section</th>
                        <th>selected</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.rateDetails.map((item,key)=>(
                        <tr key={item.id}>
                        <th>{key +1}</th>
                        <td>{item.size}</td>
                        <td>{item.cost}</td>
                        <td>{item.page_section}</td>
                        <td><input type="checkbox" id={`${item.id}`}  value={`${item.id}`}
                        checked={this.handleCheck(item.id)}
                         onChange={(e)=>this.handleRadioChange(key,item.id,e.target.checked)}
                         /></td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
                    </div>
                    </Form>
                    </Col>
                    </Row>
                </ModalBody>
                </LoadingOverlay>
                <ModalFooter style={{display:"inline"}}>
                <Row>
                <Col md="5">
                <h4>TOTAL : <span style={{color:"red"}}>GH¢ {this.state.dayTotal}</span></h4>
                <p style={{fontSize:"13px", fontWeight:500}}>Prices are VAT and NHIL exclusive</p>
                </Col>
                <Col md="4">

                </Col>
                <Col md="3">
                {this.state.loading?
                <Button color="info" className="disabled" disabled>save</Button>
                :
                <Button color="info" onClick={()=>this.handleSave()}>save</Button>
                }
                <Button color="danger" onClick={this.toggle}>close</Button>
                </Col>
                  
                </Row>
                </ModalFooter>
            </Modal>
                     
            <Modal isOpen={this.state.saveModal}>
            <ModalHeader  style={{textAlign:"center", display:"block"}}>
                <h4> {this.state.modalmessage} </h4>
            </ModalHeader>
          </Modal>
          <Modal isOpen={this.state.uploadModal}>
          {this.state.changeText?
            <ModalHeader style={{textAlign:"center", display:"block"}}>
            Creating subscription
            <Progress value={this.state.percentage} style={{marginTop:"10px"}}/>
            </ModalHeader>
          :
            <ModalHeader style={{textAlign:"center", display:"block"}}>
            <i className="fa fa-check mr-1" style={{color:"green", fontSize:"25px"}}/>Subscription Created!!
            </ModalHeader>
            }
          </Modal>

          <Modal isOpen={this.state.volumeModal}  style={{ maxWidth:"90%"}} toggle={()=>this.VolumeCollapseToggle()}>
              <ModalHeader>
            <h3>{this.props.location.state.media_house_name}</h3>
              </ModalHeader>
              <ModalBody>
              <Container fluid>
            {this.state.volume.length<=0?
            <Row>
                <Col  style={{textAlign:"center"}}>
                    <h4>No Volume Discount</h4>
                </Col>
            </Row>
            :
            <Row>
            <Col lg="12" xs="12" md="12" sm="12" xl="12">
            <br/>
            <Table striped bordered>
            <thead>
                <tr>
                <th>#</th>
                <th style={{fontWeight:1000}}>Amount Range (Min-Max)</th>
                <th style={{fontWeight:1000}}>Discount Offer(%)</th>
                </tr>
            </thead>
            <tbody>
            {this.state.volume.map((value,key)=>(
                <tr>
                <th scope="row">{key+1}</th>
                <td>GH¢ {value.amount_range}</td>
                <td>{value.percentile}%</td>
                </tr>
                ))}
            </tbody>
            </Table>
            </Col>
            </Row>
            }
            </Container>
              </ModalBody>
              <ModalFooter>
                <Button
                color="danger"
                onClick={()=>this.setState({volumeModal:false})}
                >
                    Close
                </Button>
              </ModalFooter>
          </Modal>
            </Col>
          </Row>

        }
        </Container>
      </>
    );
  }
}


export default PrintCalender;