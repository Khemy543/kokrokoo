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
/* import {
  Docxtemplater,
  JSZip
} from "docxtemplater"; */

var domain = "https://backend.kokrokooad.com";
let user =localStorage.getItem('access_token');
function UploadFile(props){

  const [videoFile, setVideoFile] = React.useState(null);
  const [file_duration, setFile_duration] = React.useState(0);
  const [title, setTitle] =React.useState("");
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [text, setMyText] = React.useState("")



  const pass=(e)=>{
    e.preventDefault();
    if(videoFile !== null){
    setIsActive(true);
    let no_of_words=0;
    let textArray = text.split(' ' || "/n");
    no_of_words = textArray.length

    axios.post(`${domain}/api/subscription/create`,
    {title:title,rate_card_title_id:props.location.state.id},
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      if(Number(localStorage.getItem("media_id")) !==3){
        props.history.push("/client/calendar",{
          file_duration:file_duration ,
          videoFile:videoFile,
          rate_card:props.location.state, 
          videoTitle:title, 
          title_id:res.data.id,
          media_house_id:props.location.state.media_house_id,
          media_house_name:props.location.state.media_house_name,
          no_of_words:no_of_words
        });
        setIsActive(false);
      }
      else{
        props.history.push("/client/print-calendar",{
          videoFile:videoFile,
          rate_card:props.location.state, 
          videoTitle:title, 
          title_id:res.data.id,
          media_house_id:props.location.state.media_house_id,
          media_house_name:props.location.state.media_house_name,
          no_of_words:no_of_words,
          file_duration:0
        });
        setIsActive(false);
      }
      
      
    })
    .catch(error=>{
      if(error.response){
          setModal(true)
          setAlertMessage(error.response.data.errors.title);
          setIsActive(false)
      }
    })
  }
}

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const nextPage = () => {
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

    //compare file type to media file types
    for(var j =0; j<file_types.length; j++){
      if(my_type === file_types[j]){
        checker.push(file_types[j]);
        break;
      }else{
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
      let extensionArray = videoFile.name.split(".");
      let extension = extensionArray[1]
      if(extension !== "docx"){
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
    else{

      var reader = new FileReader()
      reader.onload=function(){
        const mytext = reader.result
        setMyText(mytext);
        document.getElementById('output') 
                        .textContent=`${mytext.split(" " || "/n").length} words from file`; 
      }
      reader.readAsText(videoFile);
    }
  }
    else if(my_type ==="image"){
      return(
        <div>
        <img src={URL.createObjectURL(videoFile)} alt="#" style={{height:"80vh",width:"100%", objectFit:"cover"}}/>
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
            >What Type Of File Do You Want To Publish, Upload A File To Continue</p>
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
                            setVideoFile(file);
                          }}
                        />
                        <br/>
                        <pre id="output"></pre> 
                        <React.Fragment>
                        {videoFile&&renderPreview(videoFile.type)}
                        </React.Fragment>
                        </Col>
                        {/* <Col>
                        <pre id="output"></pre> 
                        </Col> */}
                        <Col>
                        <Button
                          color="info"
                          type="submit"
                          >
                          Next
                        </Button>
                        </Col>
                        <Col>
                        <Button
                        color="danger"
                        style={{marginLeft:"-45px"}}
                        onClick={()=>props.history.push("/client/create-sub-rate-cards",{media_house_id:props.location.state.media_house_id})}
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



export default UploadFile;
