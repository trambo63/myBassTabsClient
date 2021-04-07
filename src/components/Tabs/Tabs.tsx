import React from 'react';
import { TabIndexState } from '../TabIndex';

export type TabsProps = {
    clearToken: () => void;
}

export type TabsState = {

}

export default class Tabs extends React.Component<TabsProps, TabIndexState, TabsState> {
    constructor(props: TabsProps){
        super(props)
    }
    render() {
        return(
            <h1>Tabs</h1>
        )
    }
}