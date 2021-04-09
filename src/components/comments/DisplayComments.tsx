import React from 'react';
import {IComments} from '../Interfaces'
import {
    ListGroup, ListGroupItem
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CommentEdit from './CommentEdit'

export type DisplayProps = {
    tabId: string;
    sessionToken: string | null;
}

export type DisplayState = {
    comments: IComments[],
    showEdit: boolean,

}

export default class DisplayTabs extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps){
        super(props)
        this.state ={
            comments: [],
            showEdit: false

        }
        this.fetchComments = this.fetchComments.bind(this);
    }
    componentDidMount() {
        this.fetchComments()
    }
    fetchComments = () => {
        let url: string = `http://localhost:4200/comment/${this.props.tabId}`
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
        let commentUrl: string = `http://localhost:4200/comment/${id}`
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

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
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
                                        <div onClick={this.toggleEdit}>edit</div>
                                        {
                                            this.state.showEdit ? 
                                            <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title">
                                            <DialogContent>
                                                    <CommentEdit toggleEdit={this.toggleEdit} sessionToken={this.props.sessionToken} comment={comment} fetchComments={this.fetchComments}/>         
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.toggleEdit} color="primary">
                                                Cancel
                                                </Button>
                                            </DialogActions>
                                            </Dialog> :
                                            <></>
                                        }
                                            <div onClick={() => this.deleteComment(comment.id, this.props.sessionToken)}>Delete</div>
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