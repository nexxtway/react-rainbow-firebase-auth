import React from 'react';
import {
    Router,
    Redirect,
    Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { AuthRoute } from './components';
import PublicRoute from './components/public-route';
import PublicRoutes from './pages/public';
import AuthRoutes from './pages/auth';

export default function Routes({ isAuth }) {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Redirect from="/" exact to="/home" />
                    <PublicRoute path="/home" component={PublicRoutes} isAuth={isAuth} />
                    <AuthRoute path="/app" component={AuthRoutes} isAuth={isAuth} />
                </Switch>
            </div>
        </Router>
    );
}

Routes.propTypes = {
    isAuth: PropTypes.bool,
};

Routes.defaultProps = {
    isAuth: false,
};
