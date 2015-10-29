import React from 'react';
import AltContainer from 'alt/AltContainer';
import UserStore from 'stores/UserStore';
import { Link } from 'react-router';
import Master from './Master';
/*
    Functions as the alt container wrapper for the application
*/
class App extends React.Component{
    /*render(){
        return (
            <p>Hello from react app</p>  
        );
    }*/
    /* support for multiple containers
    return (
      <AltContainer stores={{
        UserStore: UserStore,
        TopicStore: TopicStore
      }}>
        <Navigation />
        {this.props.children}
      </AltContainer>
    );
    */
    render() {
        return (
            <AltContainer stores={{
                UserStore: UserStore
            }}>
                <Master>
                    {this.props.children}
                </Master>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
                <Link to="/client">Client</Link>
            </AltContainer>
        );
    }
    
}

App.propTypes = { children: React.PropTypes.object };

export default App;