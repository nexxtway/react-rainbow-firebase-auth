import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AvatarMenu from 'react-rainbow-components/components/AvatarMenu';
import Avatar from 'react-rainbow-components/components/Avatar';
import MenuDivider from 'react-rainbow-components/components/MenuDivider';
import MenuItem from 'react-rainbow-components/components/MenuItem';
import Select from 'react-rainbow-components/components/Select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    FormattedMessage,
} from 'react-intl';
import { logoutUser } from '../../../redux/actions/authentication';
import PowerIcon from './powerIcon';
import PencilIcon from './pencilIcon';
import './styles.css';

const languageOptions = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'es',
        label: 'Español',
    },
];

function AuthApp(props) {
    const {
        className,
        style,
        logoutUser,
    } = props;

    const getContainerClassNames = () => classnames('rainbow-auth-firebase-auth_container', className);

    return (
        <section className={getContainerClassNames()} style={style}>
            <div className="rainbow-auth-firebase-auth_top-bar">
                <img
                    src="/assets/rainbow-logo.svg"
                    alt="rainbow logo"
                    className="rainbow-auth-firebase-signin_image" />
                <div className="rainbow-auth-firebase_top-bar-content">
                    <Select options={languageOptions} className="rainbow-auth-firebase_language-selector" />
                    <AvatarMenu
                        id="avatar-menu"
                        src="/assets/user2.jpg"
                        assistiveText="Tahimi Leon"
                        menuAlignment="right"
                        menuSize="small"
                        avatarSize="large"
                        title="Tahimi Leon">
                        <li>
                            <Avatar
                                src="/assets/user2.jpg"
                                assistiveText="Tahimi Leon"
                                title="Tahimi Leon"
                                size="medium" />
                            <div className="rainbow-m-left_x-small">
                                <p className="rainbow-font-size-text_medium rainbow-color_dark-1">Tahimi</p>
                                <p className="rainbow-font-size-text_small rainbow-color_gray-3">janedoe@gmail.com</p>
                            </div>
                        </li>
                        <MenuDivider variant="space" />
                        <MenuItem
                            label={<FormattedMessage id="authenticated.profile.edit" defaultMessage="Edit profile" />}
                            icon={<PencilIcon />}
                            iconPosition="left" />
                        <MenuItem
                            label={<FormattedMessage id="authenticated.exp.logout" defaultMessage="Logout" />}
                            onClick={logoutUser}
                            icon={<PowerIcon />}
                            iconPosition="left" />
                    </AvatarMenu>
                </div>
            </div>
            <span className="rainbow-auth-firebase-auth_title">Wellcome Tahimi</span>
        </section>
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
