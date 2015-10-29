import $ from 'jquery';
import CookieHelper from './CookieHelper';

const WebApiUtils = {
    get: (url, data) => {
        return $.ajax({
            url: url,
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },
    post: (url, data) => {
        return $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                let access_token = CookieHelper.getCookie('access_token');
                if(access_token){
                    xhr.setRequestHeader('Authorization', 'bearer ' + access_token); 
                }
            },
        });
    },
    
};



export default WebApiUtils;