import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
    const {
        component: Component,
        isAuth,
        ...rest
    } = props;

    function render(props) {
        const { location } = props;
        if (isAuth) {
            return <Component {...props} />;
        }
        const to = {
            pathname: '/home',
            state: { from: location },
        };
        return <Redirect to={to} />;
    }

    return <Route {...rest} render={render} />;
}

AuthRoute.propTypes = {
    component: PropTypes.func,
    isAuth: PropTypes.bool,
    location: PropTypes.object,
};

AuthRoute.defaultProps = {
    component: () => {},
    isAuth: false,
    location: undefined,
};
