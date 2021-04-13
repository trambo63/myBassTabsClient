import Auth from './Auth/Auth';
import TabsMain from './Tabs/TabsMain'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TabCreate from './Tabs/TabCreate';
import {ISearchTerm} from './Interfaces';
import React, { SyntheticEvent } from 'react';

export type TabIndexState = {
    sessionToken: string | null;
    showAuth: boolean;
    open: boolean;
    showCreate: boolean;
    searchTerm: string;
    searchTab: boolean;
}

export default class TabIndex extends React.Component<{}, TabIndexState> {
    constructor(props: {}){
        super(props)
        this.state ={
            sessionToken: "",
            showAuth: false,
            open: false,
            showCreate: false,
            searchTerm: "",
            searchTab: false
        };
        this.updateToken = this.updateToken.bind(this);
        this.clearToken = this.clearToken.bind(this);
        this.toggleAuth = this.toggleAuth.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleSearchTab = this.toggleSearchTab.bind(this);
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

    handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(this.state.searchTerm);
        this.setState({searchTab: !this.state.searchTab})
    }

    toggleSearchTab = () => {
        this.setState({searchTab: false})
    }

    handleChange(e: SyntheticEvent) {
        const input = e.target as HTMLInputElement;
        console.log(input.name, input.value);
        this.setState((prevState: ISearchTerm) => {
            let pick: Pick<ISearchTerm, keyof ISearchTerm> = {
                ...prevState,
                [input.name]: input.value
            }
            return pick
        })
    }

    render(){
        console.log(this.state.searchTab)
        const protectedViews = this.state.sessionToken === localStorage.getItem('token') ? <></> : <p onClick={this.toggleAuth}>Login</p>
        return(
            <div className="tabIndexMain">
                <div className="navbar">
                    <span>My Bass Tabs</span>
                    <form onSubmit={this.handleSubmit}>
                        <div className="navSearch">
                            <input type="text" id="searchTerms" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="signInControlls">
                        {
                            this.state.sessionToken ? <p onClick={this.toggleCreate}>Create New</p> : <></>
                        }
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
                <TabsMain toggleSearchTab={this.toggleSearchTab} sessionToken={this.state.sessionToken} searchTerm={this.state.searchTerm} searchTab={this.state.searchTab} />
            </div>
        )
    }
}