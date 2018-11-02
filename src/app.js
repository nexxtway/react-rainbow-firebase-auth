import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Application from 'react-rainbow-components/components/Application';
import startApp from './redux/actions/start-app';
import InitializingApp from './components/experiences/initializing-app';
import Routes from './routes';
import Message from './components/experiences/message';

class App extends Component {
    componentWillMount() {
        this.props.startApp();
    }

    render() {
        const { isInitializing, isAuth } = this.props;
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
                <Routes isAuth={isAuth} />
            </Application>
        )
    }
}


function stateToProps(state) {
    return {
        ...state.app,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        startApp,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(App);

