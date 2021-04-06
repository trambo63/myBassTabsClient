import React from 'react';
import TabIndex from '../TabIndex';

type Props = {
    updateToken: () => void;
}

export default class Auth extends React.Component<Props> {
    render(){
        return(
            <div>
                <h1>Auth</h1>
            </div>
        )
    }
}