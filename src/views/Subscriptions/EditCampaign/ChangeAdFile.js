import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,Form, Modal, ModalFooter, ModalHeader
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

var domain = "https://backend.kokrokooad.com";
let user =localStorage.getItem('access_token');
function ChangeAdFile(props){

  const [videoFile, setVideoFile] = React.useState(null);
  const [file_duration, setFile_duration] = React.useState(null);
  const [title, setTitle] =React.useState(props.location.state.videoTitle);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);


 React.useEffect(()=>{
   console.log(props.location)
 }) 
 
  const pass=(e)=>{
    e.preventDefault();
    if(videoFile !== null){
      console.log(Math.round(file_duration), props.location.state.ad_duration);
      if(Math.round(file_duration) === Number(props.location.state.ad_duration)){
    setIsActive(true);
    console.log(title)
    let formData = new FormData();
        formData.append('ad',videoFile);
        formData.append('file_duration',file_duration)
        formData.append('title', title)
        formData.append('_method','PATCH')
        axios({
            method:'post',
            headers:{
                "Authorization":`Bearer ${user}`,
                "Content-Type":"mutipart/form-data"
            },
            data:formData,
            url:`${domain}/api/scheduledAd/${props.location.state.title_id}/update`,
            onUploadProgress: (progressEvent) => {
                const {loaded , total} = progressEvent;
                let percent = Math.floor(loaded * 100 / total);
                console.log(percent)
                if(percent<100){
                    setPercentage(percent);
                }
                else{
                    setPercentage(100)
                }
            }
            }).then(res=>{
                    console.log(res.data);
                    setModal(true);
                    setAlertMessage("File Updated")    
                    setTimeout(
                            function(){
                                props.history.push("/client/my-subscription")
                            }.bind(this),
                            1500)
                })
                .catch(error=>{
                    console.log(error.response.data)
                    isActive(false)
                })
      
      
   
  }
  else{
    setModal(true);
    setAlertMessage("File Duration Must Be Equal To Previous File Duration")    
  }
  }
  else{
    setModal(true);
    setAlertMessage("Ad File is Required") 
  }
}

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const nextPage = () => {
    console.log("start next...")
    const currentPageNumber = pageNumber;
    let nextPageNumber;
 
    if (currentPageNumber + 1 > numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
 
    setPageNumber(nextPageNumber)
  }

  const renderPreview=(type)=>{
    let file_types = props.location.state.file_types;
    console.log(file_types)
    let video_type = type;
    let new_type =[];
    let checker =[];
    
    //stringigy video file type
    for(var i=0; i<video_type.length; i++){
      if(video_type[i] !== "/"){
        new_type.push(video_type[i]);
        continue;
      }
      else{
        break;
      }
    }
    let my_type = new_type.join('');
    console.log(my_type)

    //compare file type to media file types
    for(var j =0; j<file_types.length; j++){
      if(file_types[j] === my_type){
        checker.push(file_types[j]);
        break;
      }else{
        console.log("not found")
        continue;
      }
    }
    if(checker.length<=0){
      setModal(true);
      setAlertMessage("File Type Is Not Accepted For This RateCard")
      setVideoFile(null)
    }
    else{
    //Retrun appropriate preview dislplay
    if(my_type === "application"){
      return(
        <div onClick={()=>nextPage()}>
          <Document
            file={videoFile}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      )
    }
    else if(my_type ==="image"){
      return(
        <div>
        <img src={URL.createObjectURL(videoFile)} alt="#" style={{height:"80vh",width:"70vh"}}/>
        </div>
      )
    }
    else if(my_type === "video" || my_type === "audio"){
      return(
        <div>
        {videoFile && (
          <video
            controls={true}
            width="250"
            onLoadedMetadata={e => {
              setFile_duration(e.target.duration);
            }}
            required
          >
            <source src={URL.createObjectURL(videoFile)} 
              type="video/mp4" />
          </video>
        )}
        {file_duration && (
          <div>
            <p>
              <code>Duration: {Math.round(file_duration)} sec</code>
            </p>
          </div>
        )}
        </div>
      )
    }
  }
}

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
        <p
            style={{fontSize:"13px", fontWeight:500}}
            >Change Your Ad Title and Ad File</p>
          {/* Table */}
          <Row style={{marginTop:"20px"}}>
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">UPLOAD MEDIA FILE</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={pass}>
                  <Row>
                    <Col md="8">
                    <Input placeholder="Enter Title" type="text" style={{width:"100%"}} value={title} onChange={e=>setTitle(e.target.value)} required/>
                    </Col>
                    
                  </Row>
                  <Row className=" icon-examples">
                    <Col md="9">
                        <Input
                          type="file"
                          onChange={e => {
                            const file = e.target.files[0];
                            console.log(file)
                            setVideoFile(file);
                          }}
                        />
                        <br/>
                        <React.Fragment>
                        {videoFile&&renderPreview(videoFile.type)}

                        </React.Fragment>
                        </Col>
                        <Col md="3">
                          <h4>Accepted File Types</h4>
                          {
                            props.location.state.file_types.map((value,key)=>(
                              <>
                              {value==="application"?
                                <h5>document</h5>
                                :
                                <h5>{value}</h5>
                              }
                              </>
                            ))
                          }
                        </Col>
                       {/*  <Col md="3">
                       
                        </Col> */}
                        <Col>
                        <Button
                          color="info"
                          type="submit"
                          >
                          Change
                        </Button>
                        <Button
                        color="danger"
                        onClick={()=>props.history.push("/client/my-subscription")}
                        >
                        Back
                        </Button>
                        </Col>
                  </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal}>
            <ModalHeader>
            {alertmessage}
            </ModalHeader>
            <ModalFooter>
            <Button color="danger" onClick={()=>setModal(false)}>
              close
            </Button>
            </ModalFooter>
          </Modal>
        </Container>
        </LoadingOverlay>
      </>
    );
  }



export default ChangeAdFile;
