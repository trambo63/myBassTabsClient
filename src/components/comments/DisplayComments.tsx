import React from 'react';
import {IComments} from '../Interfaces'
import {
    ListGroup, ListGroupItem
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {IUser} from '../Interfaces'

import CommentEdit from './CommentEdit'
import { AccessControl } from 'accesscontrol';
import APIURL from '../../helpers/environment';


export type DisplayProps = {
    tabId: string;
    sessionToken: string | null;
}

export type DisplayState = {
    comments: IComments[],
}

export default class DisplayTabs extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps){
        super(props)
        this.state ={
            comments: []
        }
        this.fetchComments = this.fetchComments.bind(this);
    }
    componentDidMount() {
            this.fetchComments()
    }
    fetchComments = () => {
        let url: string = `${APIURL}/comment/${this.props.tabId}`
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

    //add eventhandler for createComment with req body



    deleteComment = (id: string, sessionToken: string | null) => {
        console.log(this.props.sessionToken);
        let commentUrl: string = `${APIURL}/comment/${id}`
        fetch(commentUrl, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => console.log(json))
        .then(this.fetchComments)
    }

    componentDidUpdate = () => {
        console.log('update')
    }

    render(){
        console.log(this.props.sessionToken)
        return(
            <div>
                {
                    this.state.comments.map((comment, index) => {
                        return(
                            <div>
                                <ListGroup id={"commentsDispaly"}>
                                    <ListGroupItem id={"commentsDispalyList"} key={index}>
                                        <div>
                                            <div>{comment.comment}</div>
                                        </div>
                                        <div>
                                        {
                                            localStorage.getItem("userId") === comment.userId ? 
                                            <>
                                                <div onClick={() => this.deleteComment(comment.id, this.props.sessionToken)}>Delete</div>
                                                <CommentEdit sessionToken={this.props.sessionToken} comment={comment.comment} commentId={comment.id} tabId={comment.tabId}  fetchComments={this.fetchComments}/>         
                                            </> : <></>
                                        }
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}