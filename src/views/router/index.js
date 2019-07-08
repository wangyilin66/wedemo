import React, { Component, } from 'react';
import Routes from "./routes";
import RouterMap from "./map";


export default class RouterView extends Component {
    render() {
        const routes = this.props.routes ? this.props.routes : Routes;
  
        return <RouterMap routes={routes}/>;
        
    }
}
  