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
}

const DisplayTab = ({tabs, toggleSingleTab, setSingleTab}: DisplayProps) => {
    return(
    <div className='displayTabs'>
        {
            tabs.map((tab) => {
                return(
                    <div className='Tab' onClick={() => {toggleSingleTab(); setSingleTab(tab)}}>
                        <ListGroup>
                            <ListGroupItem>Title: {tab.title} Difficulty: {tab.difficulty}</ListGroupItem>
                        </ListGroup>
                    </div>
                )
            })
        }
    </div>
    )
}

export default DisplayTab;