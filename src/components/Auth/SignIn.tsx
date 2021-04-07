import React from 'react';
import { AuthProps } from './Auth';
import {IUser} from '../Interfaces'



export default class SignIn extends React.Component<AuthProps, IUser> {
    constructor(props: AuthProps) {
        super(props)
        this.state ={
            userName: "",
            email: "",
            password: ""
        }
    }
    render() {
        return(
            <div>
            <h2>SignUp</h2>
            <div>
            <label htmlFor='userName'>username:</label>
            <br />
            <input type='text' id='userName' name='userName' value={this.state.userName}  /> 
            <br />
            <label htmlFor='password'>password:</label>
            <br />
            <input type='text' id='password' name='password' value={this.state.password}  />
            </div>
        </div>
        )
    }
}