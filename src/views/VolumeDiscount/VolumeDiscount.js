import React from "react";
import {
    Container,Row,Col, Table,Spinner
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

import data from "data/volumeData.js"

let user =localStorage.getItem('access_token');
var domain = "https://backend.demo.kokrokooad.com";
class VolumeDiscount extends React.Component{
    
    state={
        volume:[],
        isActive:true
    }

    componentDidMount(){
        console.log(this.props.location.state)
        axios.get(`${domain}/api/company/${this.props.location.state.id}/volume-discounts`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            this.setState({volume:res.data, isActive:false});
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
            {this.state.isActive?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
            </Row>
            :
            <Row>
                <Col>
                    
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >See All <span style={{color:"red"}}>Discounts</span> On Various Price Ranges.</p>
            {this.state.volume<=0?
            <Row>
                <Col style={{textAlign:"center"}}>
                    <h3>No Discount Provided By Media House</h3>
                </Col>
            </Row>
            :
            <Row style={{marginTop:"20px"}}>
            <Col lg="12" xs="12" md="12" sm="12" xl="12">
            <h3>{this.props.location.state.mediaHouse.company_name}</h3>
            <p style={{fontWeight:500,fontSize:"13px"}}>{this.props.location.state.mediaHouse.media_house}</p>
            <Table striped bordered>
            <thead>
                <tr>
                <th>#</th>
                <th style={{fontWeight:1000}}>Amount Range (Min-Max) Ghs</th> 
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
                </Col>
            </Row>
            }
            </Container>
            </>
        )
    }
}
export default VolumeDiscount;