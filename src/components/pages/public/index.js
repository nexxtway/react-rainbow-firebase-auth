import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';

export default function PublicRoutes(props) {
    const {
        className,
        style,
    } = props;
    return (
        <Switch className={className} style={style}>
            <Redirect from="/home" exact to="/home/signin" />
            <Route path="/home/signin" component={SignIn} />
            <Route path="/home/signup" component={SignUp} />
            <Route path="/home/forgot-password" component={ForgotPassword} />
        </Switch>
    );
}

PublicRoutes.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

PublicRoutes.defaultProps = {
    className: undefined,
    style: undefined,
};
