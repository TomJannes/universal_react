import React from 'react';
import Table from 'material-ui/lib/table'
//import ClientStore from 'stores/ClientStore';
//import ClientActions from 'actions/ClientActions';

class ClientOverview extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" label="Add client">
                    <FontIcon className="muidocs-icon-custom-github"/> Add client x
                </RaisedButton>
            </div>
        );
    }
}

export default ClientOverview;