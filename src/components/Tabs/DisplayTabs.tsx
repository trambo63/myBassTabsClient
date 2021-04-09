import {ITabs} from '../Interfaces';
import React from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TabEdit from './TabEdit';

export type DisplayProps = {
    tabs: ITabs[]
    toggleSingleTab: () => void;
    setSingleTab: (tab: ITabs) => void;
    deleteTab: (id: string) => void;
    sessionToken: string | null
}

export type DisplayTabState = {
    showEdit: boolean,
}


export default class DisplayTab extends React.Component<DisplayProps, DisplayTabState> {
    constructor(props: DisplayProps){
        super(props)
        this.state = {
            showEdit: false
        }
    }

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }
    
    render() {
        return(
        <div id='displayTabs'>
            {
                this.props.tabs.map((tab) => {
                    return(
                        <div id='tab'>
                            <ListGroup id='tab'>
                                <ListGroupItem id='tab'>
                                    <div  onClick={() => {this.props.toggleSingleTab(); this.props.setSingleTab(tab)}}>
                                        <div>Title: {tab.title} Difficulty: {tab.difficulty}</div>
                                        <div>Likes: {tab.likes} Dislikes: {tab.dislikes}</div>
                                    </div>
                                    <div>
                                        <div onClick={this.toggleEdit}>edit</div>
                                        {
                                            this.state.showEdit ? 
                                            <Dialog open={this.state.showEdit} onClose={this.toggleEdit} aria-labelledby="form-dialog-title">
                                            <DialogContent>
                                                    <TabEdit sessionToken={this.props.sessionToken} tab={tab} />         
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.toggleEdit} color="primary">
                                                Cancel
                                                </Button>
                                            </DialogActions>
                                            </Dialog> :
                                            <></>
                                        }
                                        <div onClick={() => this.props.deleteTab(tab.id)}>delete</div>
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
