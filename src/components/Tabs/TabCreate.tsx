import React, { SyntheticEvent } from 'react';
import {ITabs} from '../Interfaces'

export type TabCreateProps = {
    sessionToken: string | null
}

export default class TabCreate extends React.Component<TabCreateProps, ITabs> {
    constructor(props: TabCreateProps) {
        super(props);
        this.state = {
            id: "",
            title: "",
            img: null,
            difficulty: "",
            likes: 0,
            dislikes: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileOnChange = this.fileOnChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        if (this.state.img){
            console.log(this.state.img)
            console.log(this.state.title)
            console.log(this.state.difficulty)
            e.preventDefault();
            let url: string = 'http://localhost:4200/tab/postTab'
            let formData = new FormData();
            formData.append("image", this.state.img.item.name)
            formData.append("title", this.state.title)
            formData.append("difficulty", this.state.difficulty)
            // {
            //     title: this.state.title,
            //     difficulty: this.state.difficulty
            // }
            fetch(url, {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.sessionToken}`
                })
            }).then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
        }
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

    fileOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({img: e.currentTarget.files})
    }

    render() {
        return(
            <div>
                <h2>Create New Tab</h2>
                <form onSubmit={this.handleSubmit}>
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
                <input type='file' id='imgUrl' name='imgUrl' onChange={this.fileOnChange} />
                <br />
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}