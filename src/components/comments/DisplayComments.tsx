import React from 'react';
import {IComments} from '../Interfaces'
import {
    ListGroup, ListGroupItem
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
import CommentEdit from './CommentEdit'
import APIURL from '../../helpers/environment';


export type DisplayProps = {
    tabId: string;
    sessionToken: string | null;
    fetchComments: () => void;
    comments: IComments[],
}

export type DisplayState = {
}

export default class DisplayTabs extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps){
        super(props)
        this.state ={
            comments: []
        }
        // this.fetchComments = this.fetchComments.bind(this);
    }
    // componentDidMount() {
    //         this.props.fetchComments()
    // }
    // fetchComments = () => {
    //     let url: string = `${APIURL}/comment/${this.props.tabId}`
    //     fetch(url, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     }).then((res) => res.json())
    //     .then((json) => {
    //         console.log(json);
    //         this.setState({comments: json.comment})
    //     })
    // }

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
        .then(this.props.fetchComments)
    }

    componentDidUpdate = () => {
        console.log('update')
    }

    render(){
        console.log(this.props.sessionToken)
        return(
            <div>
                {
                    this.props.comments.map((comment, index) => {
                        return(
                            <div className="displayComments">
                                <ListGroup id={"commentsDispaly"}>
                                    <ListGroupItem id={"commentsDispalyList"} key={index}>
                                        <div>
                                            <div>{comment.comment}</div>
                                        </div>
                                        <div className="commentControlls" >
                                        {
                                            localStorage.getItem("userId") === comment.userId ? 
                                            <>
                                                <CommentEdit sessionToken={this.props.sessionToken} comment={comment.comment} commentId={comment.id} tabId={comment.tabId}  fetchComments={this.props.fetchComments}/>         
                                                <div onClick={() => this.deleteComment(comment.id, this.props.sessionToken)}>Delete</div>
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