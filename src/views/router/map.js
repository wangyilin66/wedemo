import React, { Component, } from 'react';
import { Switch, Route, Redirect,} from "react-router-dom";

export default class map extends Component {
    render() {
        const { routes, } = this.props;
        const defaultRoute = <Route key={0} path="/" render={() => {
            return <Redirect to="/login"/>;
        }} exact/>;
        return <Switch>
            { 
                routes && routes.map((v,i) => {
                    const TempComponent = v.component;
                    if(TempComponent){
                        return <Route key={i} path={v.path} render={(config)=>{
                            const children = v.children === undefined?[]:v.children;
                            return<TempComponent routes={children} {...config}></TempComponent>;
                        }}/>;
                    }
                    return null;
                }).concat([defaultRoute,])
            }

        </Switch>;
 
    }
}
