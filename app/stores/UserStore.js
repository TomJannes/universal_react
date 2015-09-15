import UserActions from '../actions/UserActions';
import alt from 'altInstance';
import Immutable from 'immutable';

class UserStore {
    constructor() {
        this.user = Immutable.Map({});
        this.on('bootstrap', this.bootstrap);
        
        this.bindListeners({
           handleLoginAttempt: UserActions.LOGIN,
           handleLoginSuccess: UserActions.LOGINSUCCESS,
           handleLoginFailed: UserActions.LOGINFAILED
        });
    }
    
    bootstrap(){
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }
    
    handleLoginAttempt(){
        this.user = this.user.merge({'isWaiting':true});
        this.emitChange();
    }
    
    handleLoginSuccess() {
        this.user = this.user.merge({ isWaiting: false, authenticated: true });
        this.emitChange();
    }
    
    handleLoginFailed() {
        this.user = this.user.merge({ isWaiting: false, authenticated: false });
        this.emitChange();
    }
}

export default alt.createStore(UserStore, 'UserStore');