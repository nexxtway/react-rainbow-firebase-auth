import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
    const {
        component: Component,
        isAuth,
        ...rest
    } = props;

    function render(props) {
        if (isAuth) {
            return <Component {...props} />;
        }
        const to = {
            pathname: '/home',
            state: { from: props.location },
        };
        return <Redirect to={to} />;
    }

    return <Route {...rest} render={render} />;
}
