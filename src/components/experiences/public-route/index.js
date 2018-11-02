import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute(props) {
    const {
        component: Component,
        isAuth,
        ...rest
    } = props;

    function render(props) {
        if (isAuth) {
            const to = {
                pathname: '/app/home',
                state: { from: props.location },
            };
            return <Redirect to={to} />;
        }
        return <Component {...props} />;

    }

    return <Route {...rest} render={render} />;
}
