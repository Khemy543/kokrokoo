import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

var domain = "https://backend.demo.kokrokooad.com";
const RateContext = React.createContext();


axios.interceptors.request.use(request=>{
  console.log(request);
  return request;
},
error=>{
    console.log(error);
    if(!error.response){
        alert("Please Check Your Internet Connection")
    }
})


axios.interceptors.response.use(response=>{
  console.log(response);
  return response;
})


let user =localStorage.getItem('access_token');
class RateProvider extends React.Component{

    state={
        cart:[],
        isActive:false,
        user:[],
        username:"",
        company:true,
        logo:""
    }

    componentDidMount(){
        this.isTokenExpired();/* 
        localStorage.clear(); */

        axios.get(`${domain}/api/client`,{
            headers:{ 'Authorization':`Bearer ${user}`}
                }
                )
                .then(res=>{
                console.log(res.data);
                this.setState({
                    username:res.data.user.name,
                    user:res.data
                })
                if(res.data.company !== undefined){
                    this.setState({company:true,logo:res.data.company.logo})
                }
                else{
                    this.setState({company:false})
                }

                }).catch(error=>{
                  console.log(error)
                });
        
    } 

    isTokenExpired() {
        try {
            const decoded = decode(user);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                localStorage.clear();
            }
        }
        catch (err) {
            return false;
        }
    }

    logout=()=>{
        axios.post(`${domain}/api/client/logout`,null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "logout success"){
                localStorage.clear();
                window.location.reload("/")
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }


    render(){
        return(
            <RateContext.Provider value={{
                ...this.state,
                logout:this.logout
            }}>
            <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'}/>}
            >
            {this.props.children}
            </LoadingOverlay>
            </RateContext.Provider>
        );
    }
}

const RateConsumer = RateContext.Consumer;



export {RateProvider,RateConsumer};