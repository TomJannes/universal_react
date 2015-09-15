import React from 'react';
import UserStore from 'stores/UserStore';

class Hello extends React.Component{
    constructor(props){
        super(props);
        this.state =  UserStore.getState();
    }
    
    render(){
        return (
            <p>Hello {this.state.user.get('name')}</p>  
        );
    }
}

export default Hello;