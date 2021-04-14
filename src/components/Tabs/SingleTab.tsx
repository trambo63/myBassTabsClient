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
import {IComments} from '../Interfaces'
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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
    comments: IComments[],
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
            clickLimitDislike: 0,
            comments: []
        }
        this.toggleCreate = this.toggleCreate.bind(this);
        this.updateLike = this.updateLike.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
    }

    componentDidMount = () => {
        this.fetchComments()
    }

    fetchComments = () => {
        let url: string = `${APIURL}/comment/${this.props.singleTab.id}`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.setState({comments: json.comment})
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
            <div className="singleTab">
                <div>
                    <h2 id="singeTab_title">{this.props.singleTab.title}</h2>
                    <img src={`${APIURL}/static/${this.props.singleTab.imgUrl}`} />
                    <div className="singleTab_controls">
                        {
                            this.props.sessionToken ? 
                            <div className="singleTab_likes">
                                <p id="controls" onClick={this.updateLike}><ThumbUpIcon /> {this.state.likes}</p>
                                <p  id="controls" onClick={this.updateDislike}><ThumbDownIcon />{this.state.dislikes}</p>
                            </div> :
                            <></>
                        }
                        {
                            localStorage.getItem("userId") === this.props.singleTab.userId ? 
                            <>
                            <p id="controls" onClick={this.toggleEdit}>edit</p> 
                            <p id="controls" onClick={() => this.props.deleteTab(this.props.singleTab.id)}>delete</p>
                            </>
                            : <></>
                        }
                        {
                            this.props.sessionToken ? <p id="controls" onClick={this.toggleCreate}>Create New Comment</p> :
                            <></>
                        }
                    </div>
                </div>
                <div >
                        {
                            this.state.showEdit ? 
                            <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title" className="dialogView">
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
                            this.state.showCreate ? 
                            <Dialog open={this.state.showCreate} onClose={this.toggleCreate} aria-labelledby="form-dialog-title" className="dialogView">
                            <DialogContent>
                                    <CommentCreate fetchComments={this.fetchComments} toggleCreate={this.toggleCreate} sessionToken={this.props.sessionToken} tabId={this.props.singleTab.id} />         
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
                    <DisplayComment comments={this.state.comments} fetchComments={this.fetchComments} sessionToken={this.props.sessionToken} tabId={this.props.singleTab.id} />
                </div>
            </div>

        )
    }
}
