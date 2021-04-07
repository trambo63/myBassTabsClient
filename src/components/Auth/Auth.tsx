import React from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'

export type AuthProps = {
    updateToken: (newToken: string) => void;
}

export type State = {
    login: boolean;
}

export default class Auth extends React.Component<AuthProps, State> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            login: true
        }
    }

    toggle = () => {
        this.setState({login: !this.state.login})
    }

    render(){
        const text = this.state.login ? 'SignUp' : 'SignIn';
        const form = this.state.login == true ? <SignIn updateToken={this.props.updateToken} /> : <SignUp updateToken={this.props.updateToken} />;
        return(
            <div>
                <h3>Auth</h3>
                {form}
                <p onClick={this.toggle}>{text}</p>
            </div>
        )
    }
}