import React from 'react';
//import ClientStore from 'stores/ClientStore';
import ClientActions from 'actions/ClientActions';

class Client extends React.Component{
    constructor(props){
        super(props);
    }
    
    performCall = () => {
        ClientActions.save({bla:'bla'});
    }
    
    render(){
        return (
            <button onClick={this.performCall}>Perform call with bearer token</button>  
        );
    }
}

export default Client;