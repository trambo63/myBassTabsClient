let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4200';
        break;
    case 'tlr-mybasstabs-client.herokuapp.com':
        APIURL = 'https://tlr-mybasstabs-server'
}

export default APIURL;