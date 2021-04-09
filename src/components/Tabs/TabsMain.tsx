import React from 'react';
import {ITabs} from '../Interfaces';
import SingleTab from './SingleTab';
import DisplayTabs from './DisplayTabs'

export type TabsMainProps = {
    sessionToken: string | null
}

export type TabsState = {
    singleTab: ITabs,
    tabs: ITabs[],
    toggleSingleTab: boolean,
    sessionToken: string | null
}

export default class TabsMain extends React.Component<TabsMainProps, TabsState> {
    constructor(props: TabsMainProps){
        super(props)
        this.state = {
            singleTab: {id: "", title: "", imgUrl: "", difficulty: "", likes: 0, dislikes: 0},
            tabs: [],
            toggleSingleTab: false,
            sessionToken: this.props.sessionToken
        }
        this.toggleSingleTab = this.toggleSingleTab.bind(this);
        this.setSingleTab = this.setSingleTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
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
            this.setState({tabs: json.tabs})
        })
    }

    deleteTab = (id: string) => {
        let url: string = `http://localhost:4200/tab/${id}`
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.state.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
        })
    }

    componentDidMount = () => {
        this.fetchTabs()
    }

    toggleSingleTab = () => {
        this.setState({
            toggleSingleTab: !this.state.toggleSingleTab
        })
    }

    setSingleTab = (singleTab: ITabs) => {
        this.setState({
            singleTab: singleTab
        })
    }
    
    render() {
        console.log(this.state.singleTab)
        return(
            <>
            {
                this.state.toggleSingleTab ? <SingleTab singleTab={this.state.singleTab} /> : <DisplayTabs tabs={this.state.tabs} toggleSingleTab={this.toggleSingleTab} setSingleTab={this.setSingleTab} deleteTab={this.deleteTab} sessionToken={this.props.sessionToken} />
            }
            </>
        )
    }
}



