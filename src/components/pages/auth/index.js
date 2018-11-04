import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../../redux/actions/authentication';

class AuthApp extends Component {
    render() {
        const { props } = this;
        const {
            className,
            style,
            logoutUser,
        } = props;
        const name = props.user.getUsername ? props.user.getUsername() : props.user.name;
        return (
            <div className={className} style={style}>
                Welcome
                {' '}
                {name}
!!
                <Button label="Logout" onClick={logoutUser} />
            </div>
        );
    }
}

AuthApp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

AuthApp.defaultProps = {
    className: undefined,
    style: {},
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
