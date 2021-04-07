import React from 'react';
import { TabIndexState } from '../TabIndex';
import { ListGroup, ListGroupItem } from 'reactstrap';

export type TabsProps = {
    sessionToken: string | null
}

export type TabsState = {

}

export default class Tabs extends React.Component<TabsProps, TabIndexState, TabsState> {
    constructor(props: TabsProps){
        super(props)
    }

    fetchTabs = () => {
        let url: string = 'http://localhost:4200/tab/allTabs'
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            // props.this.updateToken(json.token)
        })
    }

    componentDidMount = () => {
        this.fetchTabs()
    }

    render() {
        return(
            <div>
                <h1>Tabs</h1>
            </div>
        )
    }
}

