import React from 'react';
import Auth from './Auth/Auth';
import Navbar from './Tabs/Navbar';
import Tabs from './Tabs/Tabs';

export type TabIndexState = {
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
    
    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setSessionToken(newToken)
    }

    clearToken() {
        localStorage.clear();
        this.setSessionToken('');
    }

    render(){
        const protectedViews = this.state.sessionToken === localStorage.getItem('token') ? <Tabs clearToken={this.clearToken} /> : <Auth updateToken={this.updateToken} />
        return(
            <div>
                <h1>Tab Index</h1>
                <Navbar />
                {protectedViews}
            </div>
        )
    }
}