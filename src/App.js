import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Menu from './Menu';
import Learn from './Learn';
import Test from './Test';

import './App.css';

const routes = [
    {path: '/', component: Menu, exact: true},
    {path: '/learn/:lang', component: Learn},
    {path: '/test/:lang', component: Test},
];

class App extends Component {
    render() {
        return (
            <Router>
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
