import React from 'react';
import Auth from './Auth/Auth';
import TabsMain from './Tabs/TabsMain'

export type TabIndexState = {
    sessionToken: string | null;
    showAuth: boolean
}

export default class TabIndex extends React.Component<{}, TabIndexState> {
    constructor(props: {}){
        super(props)
        this.state ={
            sessionToken: "",
            showAuth: false
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
        this.setState({showAuth: false})
    }

    toggleAuth = () => {
        this.setState({showAuth: !this.state.showAuth})
    }

    render(){
        const protectedViews = this.state.sessionToken === localStorage.getItem('token') ? <></> : <p onClick={this.toggleAuth}>Login</p>
        return(
            <div className="tabIndexMain">
                <div className="navbar">
                    <span>My Bass Tabs</span>
                    <div className="navSearch">
                        <input type="text"/>
                        <button>Search</button>
                    </div>
                    <div className="signInControlls">
                        {protectedViews}
                        {
                            this.state.sessionToken === localStorage.getItem('token') ? <p onClick={this.clearToken}>Logout</p> : <></>
                        }
                    </div>
                </div>
                    {
                        this.state.showAuth && this.state.sessionToken !== localStorage.getItem('token') ? <div>
                        <Auth updateToken={this.updateToken} />
                        </div> : <></>
                    }
                <TabsMain sessionToken={this.state.sessionToken} />
            </div>
        )
    }
}