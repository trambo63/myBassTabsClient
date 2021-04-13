import React, { SyntheticEvent } from 'react';
import {ITabs} from '../Interfaces'
import APIURL from '../../helpers/environment'

export type TabEditProps = {
    sessionToken: string | null,
    tab: ITabs
    toggleEdit: () => void;
    fetchTabs: () => void;
}


export default class TabCreate extends React.Component<TabEditProps, ITabs> {
    constructor(props: TabEditProps) {
        super(props);
        this.state = {
            id: this.props.tab.id,
            title: this.props.tab.title,
            imgUrl: this.props.tab.imgUrl,
            difficulty: this.props.tab.difficulty,
            likes: 0,
            dislikes: 0,
            userId: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileOnChange = this.fileOnChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        let url: string = `${APIURL}/tab/${this.state.id}`
        let formData = new FormData();
        formData.append("image", this.state.imgUrl);
        formData.append("title", `${this.state.title}`);
        formData.append("difficulty", `${this.state.difficulty}`);
        console.log(formData.getAll("image"));
        fetch(url, {
            method: 'PUT',
            body: formData,
            headers: new Headers({
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.props.toggleEdit()
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

    fileOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files){
            return
        }
        this.setState({imgUrl: e.target.files[0]})
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
                <input type='file' id='imgUrl' name='imgUrl' onChange={this.fileOnChange} />
                <br />
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}