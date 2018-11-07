import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Application from 'react-rainbow-components/components/Application';
import { startApplication } from './redux/actions/app';
import InitializingApp from './components/experiences/initializing-app';
import Routes from './routes';
import Message from './components/experiences/message';

class App extends Component {
    componentDidMount() {
        const { startApplication } = this.props;
        startApplication();
    }

    render() {
        const { isInitializing, isAuthenticated } = this.props;
        if (isInitializing) {
            return (
                <Application>
                    <InitializingApp />
                </Application>
            );
        }
        return (
            <Application>
                <Message />
                <Routes isAuth={isAuthenticated} />
            </Application>
        );
    }
}

App.propTypes = {
    isInitializing: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    startApplication: PropTypes.func.isRequired,
};

function stateToProps(state) {
    const { app, authentication } = state;
    return {
        isAuthenticated: !!authentication.get('user'),
        isInitializing: app.get('isInitializing'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        startApplication,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(App);
