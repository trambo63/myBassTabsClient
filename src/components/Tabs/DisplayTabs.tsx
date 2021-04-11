import {ITabs} from '../Interfaces';
import React from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export type DisplayProps = {
    tabs: ITabs[]
    toggleSingleTab: () => void;
    setSingleTab: (tab: ITabs) => void;
    deleteTab: (id: string) => void;
    sessionToken: string | null
}

export type DisplayTabState = {
}


export default class DisplayTab extends React.Component<DisplayProps, DisplayTabState> {
    constructor(props: DisplayProps){
        super(props)

    }
    
    render() {
        return(
        <div id='displayTabs'>
            {
                this.props.tabs.map((tab, index) => {
                    return(
                        <div id='tab'>
                            <ListGroup id='tab'>
                                <ListGroupItem id='tab' key={index}>
                                    <div onClick={() => {this.props.toggleSingleTab(); this.props.setSingleTab(tab)}}>
                                        <div>Title: {tab.title} Difficulty: {tab.difficulty}</div>
                                        <div>Likes: {tab.likes} Dislikes: {tab.dislikes}</div>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    )
                })
            }
        </div>
        )

    }
}
