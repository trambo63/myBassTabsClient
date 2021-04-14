import React, { SyntheticEvent } from 'react';
import {IComments} from '../Interfaces'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export type CommentEditProps = {
    sessionToken: string | null,
    // comment: IComments,
    comment: string,
    commentId: string,
    tabId: string,
    fetchComments: () => void,
}

export type CommentEditState = {
    comment: string,
    commentId: string,
    tabId: string,
    showEdit: boolean,
}


export default class TabCreate extends React.Component<CommentEditProps, CommentEditState> {
    constructor(props: CommentEditProps) {
        super(props);
        this.state = {
            // id: this.props.comment.id,
            comment: this.props.comment,
            commentId: this.props.commentId,
            tabId: this.props.tabId,
            showEdit: false
            // tabId: this.props.comment.tabId,
            // userId: this.props.comment.userId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        this.toggleEdit()
        console.log(this.state.comment)
        e.preventDefault();
        let url: string = `http://localhost:4200/comment/${this.state.commentId}`
        let reqBody = {
            comment: {
                comment: `${this.state.comment}`,
                tabId: `${this.state.tabId}`
            }
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
            this.props.fetchComments()
        })
    }

    handleChange(e: SyntheticEvent) {
        const input = e.target as HTMLInputElement;
        console.log(input.name, input.value);
        this.setState((prevState: CommentEditState) => {
            let pick: Pick<CommentEditState, keyof CommentEditState> = {
                ...prevState,
                [input.name]: input.value
            }
            return pick
        })
    }

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    render() {
        return(
            <>
                {
                    this.state.showEdit ? 
                    <div>
                    <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title" className="dialogView">
                    <DialogContent>
                        <h2>Edit Comment</h2>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label htmlFor={this.state.commentId}>Comment:</label>
                        <br />
                        <input type='text' id={this.state.commentId} name='comment' value={this.state.comment} onChange={this.handleChange} />
                        <br />
                        <button type='submit'>Submit</button> 
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleEdit} color="primary">
                        Cancel
                        </Button>
                    </DialogActions>
                    </Dialog> 
                    </div> : <div onClick={this.toggleEdit}>Edit</div>
                }
            </>
        )
    }
}