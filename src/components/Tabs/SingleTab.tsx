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
    singleTab: ITabs;
    sessionToken: string | null;
    deleteTab: (id: string) => void;
    fetchTabs: () => void;
}

export type SingleTabState = {
    showEdit: boolean;
    showCreate: boolean;
    likes: number;
    dislikes: number;
    clickLimitLike: number;
    clickLimitDislike: number;
}

export default class SingleTab extends React.Component<SingleProps, SingleTabState> {
    constructor(props: SingleProps){
        super(props)
        this.state = {
            showEdit: false,
            showCreate: false,
            likes: this.props.singleTab.likes,
            dislikes: this.props.singleTab.dislikes,
            clickLimitLike: 0,
            clickLimitDislike: 0
        }
        this.toggleCreate = this.toggleCreate.bind(this);
        this.updateLike = this.updateLike.bind(this);
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
        .then((json) => {
            console.log(json);
            this.props.fetchTabs()
        })
    }

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    toggleCreate = () => {
        this.setState({showCreate: !this.state.showCreate})
    }

    updateLike = () => {
        if(this.state.clickLimitLike > 0){
            return
        } else{
            this.setState({
                clickLimitLike: 1
            })
            let url: string = `${APIURL}/tab/like/${this.props.singleTab.id}`
            let newLike: number = this.props.singleTab.likes + 1;
            let reqBody = {
                likes: newLike
            }
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(reqBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.sessionToken}`
                })
            }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    likes: this.state.likes + 1
                })
            })
        }
    }

    updateDislike = () => {
        if(this.state.clickLimitDislike > 0){
            return
        } else{
            this.setState({
                clickLimitDislike: 1
            })
            let url: string = `${APIURL}/tab/dislike/${this.props.singleTab.id}`
            let newDisLike: number = this.props.singleTab.dislikes + 1;
            let reqBody = {
                dislikes: newDisLike
            }
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(reqBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.sessionToken}`
                })
            }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    dislikes: this.state.dislikes + 1
                })
            })
        }
    }
    
    render(){
        console.log(this.props.singleTab)
        return(
            <div>
                <div className="singleTab">
                    <h2>{this.props.singleTab.title}</h2>
                    <div>
                        <p onClick={this.updateLike}>Likes: {this.state.likes}</p>
                        <p onClick={this.updateDislike}>Dislikes: {this.state.dislikes}</p>
                    </div>
                    <img src={`${APIURL}/static/${this.props.singleTab.imgUrl}`} />
                </div>
                <div>
                    {
                        localStorage.getItem("userId") === this.props.singleTab.userId ? 
                        <>
                        <div onClick={this.toggleEdit}>edit</div> 
                        <div onClick={() => this.props.deleteTab(this.props.singleTab.id)}>delete</div>
                        </>
                        : <></>
                    }
                        {
                            this.state.showEdit ? 
                            <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                    <TabEdit fetchTabs={this.props.fetchTabs} sessionToken={this.props.sessionToken} tab={this.props.singleTab} toggleEdit={this.toggleEdit}/>         
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleEdit} color="primary">
                                Cancel
                                </Button>
                            </DialogActions>
                            </Dialog> :
                            <></>
                        }
                    </div>
                    {
                        this.props.sessionToken ? <p onClick={this.toggleCreate}>Create New Comment</p> :
                        <></>
                    }
                    
                        {
                            this.state.showCreate ? 
                            <Dialog open={this.state.showCreate} onClose={this.toggleCreate} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                    <CommentCreate toggleCreate={this.toggleCreate} sessionToken={this.props.sessionToken} tabId={this.props.singleTab.id} />         
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
