import React, { ChangeEvent, SyntheticEvent } from 'react';
import {ITabs} from '../Interfaces'
import APIURL from '../../helpers/environment'
import { Select, MenuItem, FormControl, InputLabel, makeStyles, Typography} from '@material-ui/core'

export type TabCreateProps = {
    sessionToken: string | null
}

export default class TabCreate extends React.Component<TabCreateProps, ITabs> {
    constructor(props: TabCreateProps) {
        super(props);
        this.state = {
            id: "",
            title: "",
            imgUrl: "",
            difficulty: "",
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
        let url: string = `${APIURL}/tab/postTab`
        let formData = new FormData();
        formData.append("image", this.state.imgUrl);
        formData.append("title", `${this.state.title}`);
        formData.append("difficulty", `${this.state.difficulty}`);
        console.log(formData.getAll("image"));
        // let reqBody = {
        //     "title": this.state.title,
        //     "difficulty": this.state.difficulty 
        // }
        fetch(url, {
            method: 'POST',
            body: formData,
            // body: JSON.stringify(reqBody), 
            headers: new Headers({
                // 'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            window.location.reload();
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

    // handleDropdown = (e: React.ChangeEvent<{value: string;}>) => {
    //         this.setState({difficulty: e.target.value})
    // }

    updateDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({difficulty: event.target.value as string})
    }

    render() {
        console.log(this.state.imgUrl);
        return(
            <div>
                <h2>Create New Tab</h2>
                <form onSubmit={this.handleSubmit}>
                {/* <label htmlFor='Title'>Title:</label> */}
                <Typography variant="h6">Title: </Typography>
                <input type='text' id='title' name='title' value={this.state.title} onChange={this.handleChange} /> 
                <br />
                <br />
                <FormControl >
                    <Typography variant="h6">Difficulty: </Typography>
                    <Select value={this.state.difficulty} onChange={(e) => this.updateDifficulty(e)}>
                        <MenuItem value={'easy'}>Easy</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'hard'}>Hard</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <Typography variant="h6">Tab: </Typography>
                <input type='file' id='imgUrl' name='imgUrl' onChange={this.fileOnChange} />
                <br />
                <br />
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}