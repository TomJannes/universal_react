import UserActions from 'actions/UserActions';
import alt from 'altInstance';
import Immutable from 'immutable';

class UserStore {
    constructor() {
        //this.user = 'Tom';
        this.on('bootstrap', this.bootstrap);
    }
    
    bootstrap(){
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }
}

export default alt.createStore(UserStore, 'UserStore');