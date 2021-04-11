import React from 'react';
import Auth from './Auth/Auth';
import TabsMain from './Tabs/TabsMain'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TabCreate from './Tabs/TabCreate';

export type TabIndexState = {
    sessionToken: string | null;
    showAuth: boolean;
    open: boolean;
    showCreate: boolean;
}

export default class TabIndex extends React.Component<{}, TabIndexState> {
    constructor(props: {}){
        super(props)
        this.state ={
            sessionToken: "",
            showAuth: false,
            open: false,
            showCreate: false
        };
        this.updateToken = this.updateToken.bind(this);
        this.clearToken = this.clearToken.bind(this);
        this.toggleAuth = this.toggleAuth.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
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

    toggleCreate = () => {
        this.setState({showCreate: !this.state.showCreate})
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
                        <p onClick={this.toggleCreate}>Create New</p>
                        {
                            this.state.showCreate ? 
                            <Dialog open={this.state.showCreate} onClose={this.toggleCreate} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                    <TabCreate sessionToken={this.state.sessionToken} />         
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleCreate} color="primary">
                                Cancel
                                </Button>
                            </DialogActions>
                            </Dialog> :
                            <></>
                        }
                    </div>
                    <div className="signInControlls">
                        {protectedViews}
                        {
                            this.state.sessionToken === localStorage.getItem('token') ? <p color="primary" onClick={this.clearToken}>Logout</p> : <></>
                        }
                    </div>
                </div>
                    {
                        this.state.showAuth && this.state.sessionToken !== localStorage.getItem('token') ?
                            <Dialog open={this.state.showAuth} onClose={this.toggleAuth} aria-labelledby="form-dialog-title">
                              <DialogContent>
                                    <Auth updateToken={this.updateToken} />         
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={this.toggleAuth} color="primary">
                                  Cancel
                                </Button>
                              </DialogActions>
                            </Dialog>
                        : <></>
                    }
                <TabsMain sessionToken={this.state.sessionToken} />
            </div>
        )
    }
}