import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './home';
import Profile from './profile';

export default function AuthRoutes(props) {
    const {
        className,
        style,
    } = props;
    return (
        <Switch className={className} style={style}>
            <Redirect from="/app" exact to="/app/home" />
            <Route path="/app/home" component={Home} />
            <Route path="/app/profile" component={Profile} />
        </Switch>
    );
}

AuthRoutes.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

AuthRoutes.defaultProps = {
    className: undefined,
    style: undefined,
};
