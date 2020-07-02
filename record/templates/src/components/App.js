import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, RedirBrowserRouterect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';

import store from '../store';
import Home from './layout/Home';
import NavBar from './layout/NavBar';
import Metric from './bioreg/metrics/Metric';
import RegForm from './bioreg/RegForm';
import ListView from './bioreg/ListView';
import DetailView from './bioreg/DetailView'
import Login from './accounts/Login';
import Register from './accounts/Register';
import StaffReg from './accounts/StaffReg';
import LineChart from "../components/bioreg/metrics/LineChart"
// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
};



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <NavBar />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path="/metrics" component={Metric} />
                                    <Route exact path="/catmetrics" component={LineChart} />
                                    <Route exact path="/register" component={RegForm} />
                                    <Route exact path="/listview" component={ListView} />
                                    <Route exact path="/bio/:pk" component={DetailView} />
                                    <Route exact path="/staff_signup" component={StaffReg} />
                                    <Route exact path="/signup" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));