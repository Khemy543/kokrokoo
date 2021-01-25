/* eslint-disable no-loop-func */

import React from "react";
import  { Prompt } from 'react-router-dom';
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,Modal, ModalBody,ModalHeader, ModalFooter,Spinner,
  InputGroup,Table,Progress
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
var domain = "https://backend.demo.kokrokooad.com";
class EditCampaign extends React.Component{
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
        data:[],
        no_of_weeks:0,
        date:"",
        day_id:"",
        selectedValue:[],
        saveModal:false,
        uploadModal:false,
        setSavedData:[],
        dayDataSaved:[],
        percentage:0,
        changeText:false,
        total_amount:0,
        volumeModal:false,
        prompt:true,
        volume:[],
        discount:0
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
        console.log("today:",today)
        let discount = 0;
        let newEvents = [];
        axios.get(`${domain}/api/view-ratecard/${this.props.location.state.rate_card.id}/details`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data)
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
                    grand_total = Number(res.data[i].total_amount) + grand_total;
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
                this.setState({data:res.data, total_amount:grand_total,eventData:newEvents, discount_amount:discount});

            })
            
        })
        .catch(error=>{
            if(!error.response){
                alert("check your internet connection");
            }
            else{
            }
        });
        
      }


     
      handleDateClick=(calEvent, jsEvent, view)=>{
          let total = 0;
          let no_of_weeks=0;
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
         var id = calEvent.event._def.publicId;
         const selectedCard = this.getRateCard(id);
         let selectedDate = this.state.data.find(item=>item.selected_date === formatted_date);
         if(selectedDate !== undefined){
            no_of_weeks = selectedDate.no_of_weeks;
            for(var i=0; i<selectedDate.details.length; i++){
                total = total + selectedDate.details[i].duration.rate * selectedDate.details[i].selected_spots;
            }
            let twice = Number(selectedDate.no_of_weeks)+1;
            total = total * twice
         }
         if(Number(id) !== 0){
            this.setState({rateDetails:selectedCard, date:formatted_date,day_id:Number(calEvent.event._def.publicId) ,modal:true, total:total, no_of_weeks:no_of_weeks});
            }
     }

     /* handleDate=(arg)=>{
        console.log("arg:",arg.dateStr)
     } */

      getRateCard = id =>{
         let tempRateCards = [...this.state.rateCards];
         const newId = Number(id)
         let selectedRateCard = tempRateCards.filter(item=> item.day.id === newId);
         return selectedRateCard;
     }

     handleCompare=(duration,unit)=>{
        if(unit === 'Hr'){
            duration = duration*3600;
            if(duration < this.state.file_duration){
                return true
            }
            else{
                return false
            }
        }else

        if(unit === 'Min'){
            duration = duration*60;
            if(duration < this.state.file_duration){
                return true
            }else{
                return false
            }
        }else

        if(unit === 'Sec'){
            if(duration < this.state.file_duration){
                
                return true
            }
            else{
                return false
            }
        }
        else
        
        if(unit === "Words"){
            if(duration <= this.props.location.state.no_of_words){
                return true
            }
            else{
                return false
            }
        }
    }

    handleCheck=(id, date)=>{

        let tempData = this.state.data;
        let selected = tempData.find(item=>item.selected_date === date);
        if(selected === undefined){
            return false;
        }
        else{
            if(selected.details.some(item=>item.duration.id === id)){
                return true;
            }
            else {
                return false;
            }
        }
        
    }
   

    getSpot=(id)=>{
        let tempData = this.state.data;
        let selected = tempData.find(item=>item.selected_date === this.state.date);
        if(selected !== undefined){
            let itemselect = selected.details.find(item=>item.ratecard.id === id);
            if(itemselect !== undefined){
                return itemselect.selected_spots;
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
        let total = 0;
        let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
        if(selectedDate !== undefined){
            selectedDate.no_of_weeks = value;
            for(var i=0; i<selectedDate.details.length; i++){
                total = total + selectedDate.details[i].duration.rate * selectedDate.details[i].selected_spots;
                }
            let twice = Number(value)+1;
            total = twice*total;
            this.setState({data:tempData, total:total})
        }
    }

    handleRadioChange=(id, index, ratecard_id,date)=>{
        let data = this.state.data;
        let checker = false;
        let total=0;
        let tempData = this.state.rateDetails;
        let selectedIndex = tempData[index];
        let selectedDuration =  selectedIndex.duration.find(item=>item.id === id);
        if(data.length<=0){
            data.push({
                selected_date:this.state.date,
                no_of_weeks:0, 
                new:true,
                details:[{duration_id:selectedDuration.id, ratecard_id:ratecard_id, duration:selectedDuration, selected_spots:1, ratecard:{id:ratecard_id}, amount:selectedDuration.rate}]
            });
            for(var i=0; i<data[0].details.length; i++){
                total = total + data[0].details[i].duration.rate * data[0].details[i].selected_spots
            }
            this.setState({data:data, total:total});
        }
        else
        {

            let selectedDate = data.find(item=>item.selected_date === date);
            if(selectedDate !== undefined){
                let selectedRateDetails = selectedDate.details.find(item=>item.ratecard.id === ratecard_id);
                if(selectedRateDetails !== undefined){
                    selectedRateDetails.duration_id=selectedDuration.id;
                    selectedRateDetails.duration = selectedDuration;
                    selectedRateDetails.selected_spots =1;
                    selectedRateDetails.ratecard.id=ratecard_id;
                    selectedRateDetails.amount = selectedDuration.rate;
                    selectedRateDetails.ratecard_id=ratecard_id;
                }else{
                    selectedDate.details.push({
                        duration_id:selectedDuration.id,
                        duration:selectedDuration,
                        selected_spots:1,
                        ratecard:{id:ratecard_id},
                        amount:selectedDuration.rate,
                        ratecard_id:ratecard_id
                    })
                }
                for(var i=0; i<selectedDate.details.length; i++){
                    total = total + selectedDate.details[i].duration.rate * selectedDate.details[i].selected_spots;

                }
                let twice = Number(selectedDate.no_of_weeks)+1;
                total = total* twice
                this.setState({data:data, total:total})
            }
            else{
                data.push({
                    selected_date:this.state.date, 
                    no_of_weeks:0,
                    new:true,
                    details:[{duration_id:selectedDuration.id, ratecard_id:ratecard_id, duration:selectedDuration, selected_spots:1,ratecard:{id:ratecard_id}, amount:selectedDuration.rate}]
                });
                this.setState({data:data, total:selectedDuration.rate})
            }
            
    }
        
    }

    handleSpotChange=(id, value)=>{
        let data = this.state.data;
        let total = 0;
        let selectedDate = data.find(item=>item.selected_date === this.state.date);
        if(selectedDate !== undefined){
            let itemselect = selectedDate.details.find(item=>item.ratecard.id === id);
            if(itemselect !== undefined){
                itemselect.selected_spots = value;
                itemselect.amount = itemselect.duration.rate * itemselect.selected_spots;
            }
            for(var i=0; i<selectedDate.details.length; i++){
                total = total + selectedDate.details[i].duration.rate * selectedDate.details[i].selected_spots;
            }
            let twice = Number(selectedDate.no_of_weeks)+1;
            total = total * twice;
            this.setState({data:data,total:total});
        }
        
        
    }

    handleClear=(id)=>{
       let tempData = this.state.data;
       let newArray =[];
       let newDataArray = []
       let total =0;
       let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
       if(selectedDate !== undefined){
           
           let selectedItem = selectedDate.details.find(item=>item.ratecard.id === id);
           if(selectedItem !== undefined){
               newArray = selectedDate.details.filter(item=>item.ratecard.id !== id);
               selectedItem.selected_spots = 0;
                this.setState({data:tempData})
               if(newArray.length <= 0){
                newDataArray = tempData.filter(item=>item.selected_date !== this.state.date);
                 this.setState({data:newDataArray, total:0})
               }
               else{
                selectedDate.details=newArray;
                for(var i=0; i<selectedDate.details.length; i++){
                total = total + selectedDate.details[i].duration.rate * selectedDate.details[i].selected_spots;
                }
                let twice = Number(selectedDate.no_of_weeks)+1;
                total = total * twice;
                this.setState({data:tempData, total:total})
                  
               }
               
           }
       }
           
       }

    handleSave=()=>{
        let tempData = this.state.data;
        let newEvents = [...this.state.eventData]
        let selectedDate = tempData.find(item=>item.selected_date === this.state.date);
        let no_of_weeks = 0;
        let segments =[];
        let grand_total=0;
        let discount = 0;
        if(selectedDate !== undefined){
            no_of_weeks = selectedDate.no_of_weeks;
            segments = selectedDate.details;
        }
        this.setState({isActive:false})
        if(selectedDate.new === true){
            axios.post(`${domain}/api/subscription-store/${this.props.location.state.title_id}/details`,
        {
            subscription_title:this.state.title,
            total_amount:this.state.total,
            no_of_weeks:no_of_weeks,
            selected_date:this.state.date,
            day_id:this.state.day_id,
            segments: segments
        },{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("res",res.data);
            this.setState({isActive:false})
            let grand_total=0;
            for(var i=0; i<res.data.length;i++){
                console.log("ampunt",res.data[i].total_amount)
                 grand_total = Number(res.data[i].total_amount) + grand_total;
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
                if(Number(range[0])<=grand_total && grand_total<=Number(range[1])){
                    console.log("yes")
                    discount = (this.state.volume[t].percentile/100) * grand_total
                    console.log(discount)
                }
            }

                this.setState({no_of_weeks:0, saveModal:true, data:res.data,total_amount:grand_total, eventData:newEvents, discount_amount:discount});

                setTimeout(
                    function(){
                        this.setState({saveModal:false,modal:false})
                    }.bind(this),2000)
        })
        .catch(error=>{
            this.setState({isActive:false})
        })
        }
        else{
            axios.patch(`${domain}/api/subscription/${selectedDate.id}/update`,
        {
            subscription_title:this.state.title,
            total_amount:this.state.total,
            no_of_weeks:no_of_weeks,
            selected_date:this.state.date,
            day_id:this.state.day_id,
            segments: segments
        },{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("res",res.data);
            this.setState({isActive:false})
            let grand_total=0;
            for(var i=0; i<res.data.length;i++){
                console.log("ampunt",res.data[i].total_amount)
                 grand_total = Number(res.data[i].total_amount) + grand_total;
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
                if(Number(range[0])<=grand_total && grand_total<=Number(range[1])){
                    console.log("yes")
                    discount = (this.state.volume[t].percentile/100) * grand_total
                    console.log(discount)
                }
            }
                this.setState({no_of_weeks:0, saveModal:true, data:res.data,total_amount:grand_total, eventData:newEvents, discount_amount:discount});

                setTimeout(
                    function(){
                        this.setState({saveModal:false,modal:false})
                    }.bind(this),2000)
        })
        .catch(error=>{
            this.setState({isActive:false})
        })
        }
      }

     /*  handleUpload=()=>{
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
            url:`${domain}/api/${this.props.location.state.title_id}/upload-ad`,
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
                    if(res.data.status === "ad saved"){
                        this.setState({isActive:false, changeText:false});
                        setTimeout(
                            function(){
                                this.setState({uploadModal:false})
                                this.props.history.push("/client/edit-campaign",{
                                    id:this.props.location.state.title_id, 
                                    title:this.state.title
                                })
                            }.bind(this),
                            1500)
                    }
                })
                .catch(error=>{
                    console.log(error.response.data)
                    this.setState({isActive:true})
                })
     
    } */

    handleUpload=()=>{
        this.setState({prompt:false});
        setTimeout(
            function(){
                this.props.history.push("/client/edit-campaign",{
                    id:this.props.location.state.title_id, 
                    title:this.state.title
                })
            }.bind(this),
            500)
    }
    
     

     
    render(){
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
    {/*   <Prompt
        when={this.state.prompt}
        message="You have unsaved changes, are you sure you want to leave?"
        /> */}
        <Header />
        {/* Page content */}
        <Container className=" mt--9" fluid>
          {/* Table */}
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
                <Col>

                <h3>Total Campaign Amount: <span style={{color:"red"}}>GH¢ {this.state.total_amount}</span></h3>
                <h3>Expected Discount: <span style={{color:"red"}}>GH¢ {this.state.discount_amount}</span></h3>
                <div>
                    <h1 style={{color:"#3788d8",fontSize:"40px", fontWeight:1000}}>. <span style={{fontSize:"13px", color:"black",fontWeight:500}}>Days Available</span></h1>
                    <h1 style={{color:"red",fontSize:"40px", fontWeight:1000, marginTop:"-40px"}}>. <span style={{fontSize:"13px", color:"black",fontWeight:500}}>Days Subscribed To</span></h1>
                </div>
                </Col>
                <Col>
                    <Button
                    color="info"
                    style={{float:"right"}}
                    onClick={()=>this.setState({volumeModal:true})}
                    >
                        Volume Discount
                    </Button>
                </Col>
            </Row>
            <Row>
            <Col md="12" sm="12" lg="12" xl="12" xs="12">
            <Card className="shadow">
            <CardBody>
            <FullCalendar
            plugins={[ dayGridPlugin ,interactionPlugin ]}
            events={this.state.eventData}
            eventClick = {this.handleDateClick}
            dayCellDidMount={this.handleCellDidMount}
            height="68vh"
            />
            </CardBody>
            </Card>
            </Col>
          </Row>
          <br/>
          <Row>
           <Col md="12" sm="12" lg="12" xl="12" xs="12" style={{display:"flex",justifyContent:"flex-end"}}>
          <Button className="text-uppercase" color="info" style={{marginLeft:"10px"}} onClick={()=>this.handleUpload()}>
                Finish
            </Button>
           </Col> 
          </Row> 
            </Col>
        </Row>
          }
         <Modal isOpen={this.state.modal} style={{ maxWidth:"90%"}}>
          <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'}/>}
            >
            <ModalHeader style={{maxWidth:"100%"}}>
            <div style={{width:"100%"}}> 
            <Row>
            <Col md="12" sm="12" lg="12" xl="12" xs="12">    
              <h4 className="text-uppercase">{this.props.location.state.rate_card.title}</h4>
              <h4 >UPLOADED VIDEO DURATION : {this.state.file_duration} sec</h4>
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
                {this.state.rateDetails.map((value,index)=>(
                <form key={value.id}>
                <div  style={{marginBottom:"50px" ,paddingBottom:"20px", borderBottom:"1px solid #0000004a"}}>
                <h3>Time: {value.start_time} - {value.end_time}</h3>
                <Table bordered>
                <thead style={{backgroundColor:"#01a9ac", color:"white", fontSize:"12px"}}>
                        <tr>
                        <th>#</th>
                        <th>Duration</th>
                        <th>rate</th>
                        <th>select</th>
                        </tr>
                    </thead>
                    <tbody>
                       {value.duration.map((item, key)=>(
                        <tr key={item.id}>
                        <th>{key +1}</th>
                        <td>{item.duration} {item.unit.unit}</td>
                        <td>{item.rate}</td>
                        <td><input type="radio" id={`${item.id}`}  name={`${value.id}`} value={`${item.id}`}
                        checked={this.handleCheck(item.id,this.state.date)}
                        disabled={this.handleCompare(item.duration,item.unit.unit)}
                         onClick={()=>this.handleRadioChange(item.id, index,value.id, this.state.date)}
                         /></td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
                    <Row>
                    <Col md="10" sm="12" lg="10" xl="10" xs="12">
                    <h5>Enter number of spots  <input type="number"  max={value.no_of_spots} min={1} value={this.getSpot(value.id)}
                    required onChange={e=>this.handleSpotChange(value.id, e.target.value)}
                    /> 1 to {value.no_of_spots}</h5>
                    </Col>
                    <Col md="2" className="mr-auto mr-auto">
                        <Button
                        color="warning"
                        type="reset"
                        onClick={()=>this.handleClear(value.id)}
                        > 
                            clear
                        </Button>
                    </Col>
                    </Row>
                    </div>
                    </form>
                ))}
                    </Col>
                    </Row>
                </ModalBody>
                </LoadingOverlay>
                <ModalFooter style={{display:"inline"}}>
                {/* <Row>
                <Col>   
                <h5>Enter the number of weeks you want to roll over this subscription for this day (optional)</h5>
                </Col>
                <Col>
                <Input type="number" value={this.getRollOver()} onChange={(e)=>this.handelRollOverChange(e.target.value)} 
                style={{width:"60px"}}
                />
                </Col>
                </Row> */}
                <Row>
                <Col md="5">
                <h4>TOTAL :<span style={{color:"red"}}>GH¢ {this.state.total}</span></h4>
                </Col>
                <Col md="4">

                </Col>
                <Col md="3">
                <Button color="info" onClick={()=>this.handleSave()}>save</Button>
                <Button color="danger" onClick={this.toggle}>close</Button>
                </Col>
                  
                </Row>
                 
                </ModalFooter>
            </Modal> 
            <Modal isOpen={this.state.saveModal}>
            <ModalHeader  style={{textAlign:"center", display:"block"}}>
                <h4>Details Saved </h4>
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
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}


export default EditCampaign;