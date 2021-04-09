import React from 'react';
import {IComments} from '../Interfaces'
import {
    ListGroup, ListGroupItem
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

export type DisplayProps = {
    tabId: string
}

export type DisplayState = {
    comments: IComments[]
}

export default class DisplayTabs extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps){
        super(props)
        this.state ={
            comments: []
        }
        this.fetchComments = this.fetchComments.bind(this)
    }
    componentDidMount() {
        this.fetchComments()
    }
    fetchComments = () => {
        let url: string = `http://localhost:4200/comment/${this.props.tabId}`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.setState({comments: json.comment})
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.comments.map((comment) => {
                        return(
                            <ListGroup>
                                <ListGroupItem>
                                    <div>{comment.comment}</div>
                                </ListGroupItem>
                            </ListGroup>
                        )
                    })
                }
            </div>
        )
    }
}