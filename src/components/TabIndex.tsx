import React from 'react';
import Auth from './Auth/Auth';
import Navbar from './Tabs/Navbar';
import Tabs from './Tabs/Tabs';

type TabIndexState = {
    sessionToken: string | null;
}

export default class TabIndex extends React.Component<{}, TabIndexState> {
    constructor(props: {}){
        super(props)
        this.state ={
            sessionToken: ""
        };
        this.updateToken = this.updateToken.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }

    setSessionToken = (token: string | null) => {
        this.setState({sessionToken: token})
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            this.setSessionToken(localStorage.getItem('token'));
        }
    }
    
    updateToken = (sessionToken: string) => {
        localStorage.setItem('token', sessionToken);
        this.setSessionToken(sessionToken)
    }

    clearToken() {
        localStorage.clear();
        this.setSessionToken('');
    }

    render(){
        const protectedViews = !this.state.sessionToken ? <Auth updateToken={this.updateToken} /> : <Tabs clearToken={this.clearToken} />
        return(
            <div>
                <h1>Tab Index</h1>
                <Navbar />
                {protectedViews}
            </div>
        )
    }
}