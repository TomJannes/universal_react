import React from 'react';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = UserStore.getState();
    }
    
    componentDidMount(){
        UserStore.listen(this._onChange);
    }
    
    componentWillUnmount(){
        UserStore.unlisten(this._onChange);
    }
    
    _onChange = () => {
        this.setState(UserStore.getState());
    }
    
    _onLoginSubmit = () => {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        UserActions.login({
            username: username,
            password: password
        });
    }
    
    render(){
        let result;
        if (this.state.user.get('isWaiting')) {
            result = (<h1>Waiting ...</h1>);
        } else {
            result = (
                <div>
                    <h1>log in</h1>
                    <input type="text" ref="username" placeholder="username" />
                    <input type="password" ref="password" placeholder="password" />
                    <button onClick={this._onLoginSubmit}>Login</button>
                </div>
            );
        }
        return (result);
    }
}

export default Login;