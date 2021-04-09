import React, { SyntheticEvent } from 'react';
import {IComments} from '../Interfaces'

export type CommentEditProps = {
    sessionToken: string | null,
    comment: IComments,
    fetchComments: () => void,
    toggleEdit: () => void
}


export default class TabCreate extends React.Component<CommentEditProps, IComments> {
    constructor(props: CommentEditProps) {
        super(props);
        this.state = {
            id: this.props.comment.id,
            comment: this.props.comment.comment,
            tabId: this.props.comment.tabId,
            userId: this.props.comment.userId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        this.props.toggleEdit()
        console.log(this.state.comment)
        e.preventDefault();
        let url: string = `http://localhost:4200/comment/${this.state.id}`
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
        this.setState((prevState: IComments) => {
            let pick: Pick<IComments, keyof IComments> = {
                ...prevState,
                [input.name]: input.value
            }
            return pick
        })
    }

    render() {
        return(
            <div>
                <h2>Edit Comment</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor={this.state.id}>Comment:</label>
                <br />
                <input type='text' id={this.state.id} name='comment' value={this.state.comment} onChange={this.handleChange} />
                <br />
                <button type='submit'>Submit</button> 
                </form>
            </div>
        )
    }
}