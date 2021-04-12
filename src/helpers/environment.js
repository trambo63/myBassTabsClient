let APIURL = '';

switch (window.locate.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://localhost:4200';
        break;
    case 'tlr-mybasstabs-client.herokuapp.com':
        APIURL = 'https://tlr-mybasstabs-server'
}

export default APIURL;