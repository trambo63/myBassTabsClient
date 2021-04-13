import React, { SyntheticEvent } from 'react';
import { AuthProps } from './Auth';
import {IUser} from '../Interfaces';
import APIURL from '../../helpers/environment';

export default class SignIn extends React.Component<AuthProps, IUser> {
    constructor(props: AuthProps) {
        super(props)
        this.state ={
            userName: "",
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        let url: string = `${APIURL}/user/login`
        let reqBody = {
            user: {
                userName: this.state.userName,
                password: this.state.password
            }
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            // props.this.updateToken(json.token)
            this.props.updateToken(json.sessionToken)
            localStorage.setItem('userId', json.user.id);
            localStorage.setItem('role', json.user.role);
            window.location.reload();

        })
    }

    handleChange(e: SyntheticEvent) {
        const input = e.target as HTMLInputElement;
        console.log(input.name, input.value);
        this.setState((prevState: IUser) => {
            let pick: Pick<IUser, keyof IUser> = {
                ...prevState,
                [input.name]: input.value
            }
            return pick
        })
    }

    render() {
        return(
            <div>
            <h2>SignIn</h2>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor='userName'>username:</label>
            <br />
            <input type='text' id='userName' name='userName' value={this.state.userName} onChange={this.handleChange} /> 
            <br />
            <label htmlFor='password'>password:</label>
            <br />
            <input type='text' id='password' name='password' value={this.state.password} onChange={this.handleChange} />
            <br />
            <button type='submit'>Submit</button>
            </form>
        </div>
        )
    }
}