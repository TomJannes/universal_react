import React from 'react';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

class Login extends React.Component{
    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        if(typeof window !== 'undefined' && window !== null) {
          window.location = '/auth/identity' + this.props.location.search;
        } 
    }
    
    render(){
        return(
            <p>You are not logged in and redirected to the log in screen</p>
        );
    }
}

export default Login;