import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    FormattedMessage,
    injectIntl,
    intlShape,
    defineMessages,
} from 'react-intl';
import { logoutUser } from '../../../redux/actions/authentication';

function AuthApp(props) {
    const {
        className,
        style,
        logoutUser,
        user,
        intl,
    } = props;

    const translations = defineMessages({
        logoutButton: {
            id: 'authenticated.exp.logout',
            defaultValue: 'Logout',
        },
    });

    const userName = {
        name: user.getUsername ? user.getUsername() : user.name,
    };

    console.log(userName, user);

    return (
        <div className={className} style={style}>
            <FormattedMessage
                id="authenticated.exp.welcome"
                values={userName}
                defaultMessage={`Welcome ${userName.name}!!`} />
            <Button label={intl.formatMessage(translations.logoutButton)} onClick={logoutUser} />
        </div>
    );
}

AuthApp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    logoutUser: PropTypes.func,
    intl: intlShape.isRequired,
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

export default connect(stateToProps, dispatchToProps)(injectIntl(AuthApp));
