import $ from 'jquery';

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
            data: JSON.stringify(data)
        });
    }
}

export default WebApiUtils;