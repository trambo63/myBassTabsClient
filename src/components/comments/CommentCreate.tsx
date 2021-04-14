import React, { SyntheticEvent } from 'react';
import {IComments} from '../Interfaces'
import APIURL from '../../helpers/environment';


export type CommentCreateProps = {
    sessionToken: string | null
    tabId: string
    toggleCreate: () => void;
    fetchComments: () => void;
}

export default class CommentCreate extends React.Component<CommentCreateProps, IComments> {
    constructor(props: CommentCreateProps) {
        super(props);
        this.state = {
            id: "",
            comment: "",
            userId: "",
            tabId: this.props.tabId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        console.log(this.state.comment)
        let url: string = `${APIURL}/comment/postComment`
        let reqBody = {
            comment: {
                comment: `${this.state.comment}`,
                tabId: `${this.state.tabId}`
            }
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.props.toggleCreate()
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
                <h2>Create New Comment</h2>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor='comment'>Comment:</label>
                <br />
                <input type='text' id='comment' name='comment' value={this.state.comment} onChange={this.handleChange} /> 
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}