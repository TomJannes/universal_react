import alt from 'altInstance';
import WebApiUtils from 'WebApiUtils';

class ClientActions {
    save(data) {
        this.dispatch();
        WebApiUtils.post('/api/client', data)
            .then((response, status) => {
                if(status == 'success'){
                    this.actions.loginsuccess();
                } else {
                    this.actions.loginfailed();
                }
            });
        /*UserWebAPIUtils.manuallogin(data)
          .then((response, textStatus) => {
            if (textStatus === 'success') {
              // Dispatch another event for successful login
              this.actions.loginsuccess(data.email);
            }
          }, () => {
            // Dispatch another event for a bad login
     });*/
    }
      
    savesuccess() {
        this.dispatch();
    }
    
    savefailed() {
        this.dispatch();
    }
}

export default alt.createActions(ClientActions);