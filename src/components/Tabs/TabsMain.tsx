import React from 'react';
import {ITabs} from '../Interfaces';
import SingleTab from './SingleTab';
import DisplayTabs from './DisplayTabs'
import APIURL from '../../helpers/environment';

export type TabsMainProps = {
    sessionToken: string | null;
    searchTerm: string;
    searchTab: boolean;
    toggleSearchTab: () => void;
}

export type TabsState = {
    singleTab: ITabs,
    tabs: ITabs[],
    toggleSingleTab: boolean,
}

export default class TabsMain extends React.Component<TabsMainProps, TabsState> {
    constructor(props: TabsMainProps){
        super(props)
        this.state = {
            singleTab: {id: "", title: "", imgUrl: "", difficulty: "", likes: 0, dislikes: 0, userId: ""},
            tabs: [],
            toggleSingleTab: false,
        }
        this.toggleSingleTab = this.toggleSingleTab.bind(this);
        this.setSingleTab = this.setSingleTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
    }

    fetchTabs = () => {
        let url: string = `${APIURL}/tab/allTabs` 
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
        let url: string = `${APIURL}/tab/${id}`
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.fetchTabs();
        })
    }

    fetchTab = () => {
        console.log('fetchtab')
        let url: string = `${APIURL}/tab/${this.props.searchTerm}` 
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.setSingleTab(json.tab[0])
            this.toggleSingleTab()
            this.props.toggleSearchTab()
        })
    }

    componentDidMount = () => {
        this.fetchTabs() 
    }
    
    componentDidUpdate = () => {
        console.log('update' + this.props.searchTab)
        if (this.props.searchTab) {
            this.fetchTab()
        }
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
        console.log(this.props.sessionToken)
        console.log(this.state.singleTab)
        return(
            <>
            {
                this.state.toggleSingleTab ? <SingleTab fetchTabs={this.fetchTabs} sessionToken={this.props.sessionToken} deleteTab={this.deleteTab} singleTab={this.state.singleTab} /> : <DisplayTabs fetchTabs={this.fetchTabs} tabs={this.state.tabs} toggleSingleTab={this.toggleSingleTab} setSingleTab={this.setSingleTab} deleteTab={this.deleteTab} sessionToken={this.props.sessionToken} />
            }
            </>
        )
    }
}



