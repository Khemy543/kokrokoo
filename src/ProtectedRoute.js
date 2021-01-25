import React from 'react'
import { Route,Redirect } from 'react-router-dom';

let isAuthenitcated = localStorage.getItem('access_token');
class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const path = this.props.path;
        const key = this.props.key;
        
        if(isAuthenitcated === null){
            return (
                <Redirect to={{ pathname: '/auth/login-page' }} />
        )} 
        else{
        return(
            <Route 
            path={path}
            component={Component}
            key={key}
           />
        )}
    }
}

export default ProtectedRoute;  