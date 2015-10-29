import ClientActions from '../actions/ClientActions';
import alt from 'altInstance';
import Immutable from 'immutable';

class UserStore {
    constructor() {
        this.user = Immutable.Map({});
        this.on('bootstrap', this.bootstrap);
        
        this.bindListeners({
           handleSaveAttempt: ClientActions.SAVE,
           handleSaveSuccess: ClientActions.SAVESUCCESS,
           handleSaveFailed: ClientActions.SAVEFAILED
        });
    }
    
    /*bootstrap(){
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }*/
    
    handleSaveAttempt(){
        this.user = this.user.merge({'isWaiting':true});
        this.emitChange();
    }
    
    handleSaveSuccess() {
        this.user = this.user.merge({ isWaiting: false, authenticated: true });
        this.emitChange();
    }
    
    handleSaveFailed() {
        this.user = this.user.merge({ isWaiting: false, authenticated: false });
        this.emitChange();
    }
}

export default alt.createStore(UserStore, 'UserStore');