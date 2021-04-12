import { ITabs } from "../Interfaces"
import React from 'react';
import DisplayComment from '../comments/DisplayComments'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TabEdit from './TabEdit';
import CommentCreate from '../comments/CommentCreate';
import APIURL from '../../helpers/environment';

interface SingleProps{
    singleTab: ITabs
    sessionToken: string | null
    deleteTab: (id: string) => void;
}

export type SingleTabState = {
    showEdit: boolean;
    showCreate: boolean;
}

export default class SingleTab extends React.Component<SingleProps, SingleTabState> {
    constructor(props: SingleProps){
        super(props)
        this.state = {
            showEdit: false,
            showCreate: false
        }
        this.toggleCreate = this.toggleCreate.bind(this);
    }

    createCommet = () => {
        console.log(this.props.sessionToken);
        let createUrl: string = `${APIURL}/comment/postComment`;
        fetch(createUrl, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => console.log(json))
    }

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    toggleCreate = () => {
        this.setState({showCreate: !this.state.showCreate})
    }

    render(){
        return(
            <div>
                <div className="singleTab">
                    <h2>{this.props.singleTab.title}</h2>
                </div>
                <div>
                    {
                        <div onClick={this.toggleEdit}>edit</div>
                    }
                        {
                            this.state.showEdit ? 
                            <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                    <TabEdit sessionToken={this.props.sessionToken} tab={this.props.singleTab} />         
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleEdit} color="primary">
                                Cancel
                                </Button>
                            </DialogActions>
                            </Dialog> :
                            <></>
                        }
                        <div onClick={() => this.props.deleteTab(this.props.singleTab.id)}>delete</div>
                    </div>
                    <p onClick={this.toggleCreate}>Create New Comment</p>
                        {
                            this.state.showCreate ? 
                            <Dialog open={this.state.showCreate} onClose={this.toggleCreate} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                    <CommentCreate sessionToken={this.props.sessionToken} tabId={this.props.singleTab.id} />         
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleCreate} color="primary">
                                Cancel
                                </Button>
                            </DialogActions>
                            </Dialog> :
                            <></>
                        }
                <div>
                    <DisplayComment sessionToken={this.props.sessionToken} tabId={this.props.singleTab.id} />
                </div>
            </div>

        )
    }
}
