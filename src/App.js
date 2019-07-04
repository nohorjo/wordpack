import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import Menu from './Menu';
import Learn from './Learn';
import Test from './Test';
import Settings from './Settings';

import './App.css';

const routes = [
    {path: '/', component: Menu, exact: true},
    {path: '/learn/:entity/:lang', component: Learn},
    {path: '/test/:lang', component: Test},
    {path: '/settings', component: Settings},
];

class App extends Component {
    render() {
        return (
            <Router
                basename="/"
            >
                <div className="App">
                    {routes.map((r, i) => (
                        <Route key={`route_${i}`} {...r}/>
                    ))}
                </div>
            </Router>
        );
    }
}

export default App;
