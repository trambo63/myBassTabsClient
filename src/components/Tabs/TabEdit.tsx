import React, { SyntheticEvent } from 'react';
import {ITabs} from '../Interfaces'
import APIURL from '../../helpers/environment'

export type TabEditProps = {
    sessionToken: string | null,
    tab: ITabs
}


export default class TabCreate extends React.Component<TabEditProps, ITabs> {
    constructor(props: TabEditProps) {
        super(props);
        this.state = {
            id: this.props.tab.id,
            title: this.props.tab.title,
            img: this.props.tab.img,
            difficulty: this.props.tab.difficulty,
            likes: 0,
            dislikes: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        let url: string = `${APIURL}/tab/${this.state.id}`
        let reqBody = {
            title: this.state.title,
            // imgUrl: this.state.img,
            difficulty: this.state.difficulty
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
        })
    }

    handleChange(e: SyntheticEvent) {
        const input = e.target as HTMLInputElement;
        console.log(input.name, input.value);
        this.setState((prevState: ITabs) => {
            let pick: Pick<ITabs, keyof ITabs> = {
                ...prevState,
                [input.name]: input.value
            }
            return pick
        })
    }

    render() {
        return(
            <div>
                <h2>Edit Tab</h2>
                <p>{this.state.likes} | {this.state.dislikes}</p>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor='Title'>Title:</label>
                <br />
                <input type='text' id='title' name='title' value={this.state.title} onChange={this.handleChange} /> 
                <br />
                <label htmlFor='difficulty'>difficulty:</label>
                <br />
                <input type='text' id='difficulty' name='difficulty' value={this.state.difficulty} onChange={this.handleChange} /> 
                <br />
                <label htmlFor="imgUrl">Tab:</label>
                <br />
                <input type='text' id='imgUrl' name='imgUrl' onChange={this.handleChange} />
                <br />
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}