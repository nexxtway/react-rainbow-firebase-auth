import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import ResetPasswordConfirmation from './reset-password-confirmation';
import TermsAndConditions from './terms-condition';
import PrivacyPolicy from './privacy-policy';

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
            <Route path="/home/reset-password-confirmation" component={ResetPasswordConfirmation} />
            <Route path="/home/terms" component={TermsAndConditions} />
            <Route path="/home/privacy" component={PrivacyPolicy} />
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
