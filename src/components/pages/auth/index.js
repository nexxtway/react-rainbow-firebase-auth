import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../../redux/actions/authentication';

function AuthApp(props) {
    const {
        className,
        style,
        logoutUser,
        user,
    } = props;

    const name = user.getUsername ? user.getUsername() : user.name;

    return (
        <div className={className} style={style}>
            {`Welcome ${name}!!`}
            <Button label="Logout" onClick={logoutUser} />
        </div>
    );
}

AuthApp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    logoutUser: PropTypes.func,
};

AuthApp.defaultProps = {
    className: undefined,
    style: {},
    user: {},
    logoutUser: () => {},
};

function stateToProps(state) {
    const { authentication } = state;
    return {
        user: authentication.get('user'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        logoutUser,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(AuthApp);
