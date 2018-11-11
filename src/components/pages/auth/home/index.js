import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AvatarMenu from 'react-rainbow-components/components/AvatarMenu';
import Avatar from 'react-rainbow-components/components/Avatar';
import MenuDivider from 'react-rainbow-components/components/MenuDivider';
import MenuItem from 'react-rainbow-components/components/MenuItem';
import { navigateTo } from '../../../../history';
import { logoutUser } from '../../../../redux/actions/authentication';
import LanguageSelector from '../../../experiences/language-selector';
import PowerIcon from '../../../icons/power';
import PencilIcon from '../../../icons/pencil';
import './styles.css';

function Home(props) {
    const {
        className,
        style,
        user,
        logoutUser,
    } = props;

    const userName = {
        name: user.displayName,
    };

    const getContainerClassNames = () => classnames('rainbow-auth-firebase-auth_container', className);

    return (
        <section className={getContainerClassNames()} style={style}>
            <div className="rainbow-auth-firebase-auth_top-bar">
                <img
                    src="/assets/rainbow-logo.svg"
                    alt="rainbow logo"
                    className="rainbow-auth-firebase-signin_image" />
                <div className="rainbow-auth-firebase_top-bar-content">
                    <LanguageSelector />
                    <AvatarMenu
                        id="avatar-menu"
                        src={user.photoURL}
                        assistiveText={user.displayName}
                        menuAlignment="right"
                        menuSize="small"
                        avatarSize="large"
                        className="rainbow-auth-firebase_avatar-menu"
                        title={user.displayName}>
                        <li className="rainbow-auth-firebase_avatar-menu_user">
                            <Avatar
                                src={user.photoURL}
                                assistiveText={user.displayName}
                                title={user.displayName}
                                size="medium" />
                            <div className="rainbow-auth-firebase_avatar-menu_user-detail">
                                <p className="rainbow-auth-firebase_avatar-menu_user-name">{user.displayName}</p>
                                <p className="rainbow-auth-firebase_avatar-menu_user-email">{user.email}</p>
                            </div>
                        </li>
                        <MenuDivider variant="space" />
                        <MenuItem
                            onClick={() => navigateTo('profile')}
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
            <span className="rainbow-auth-firebase-auth_title">
                <FormattedMessage id="welcome" values={userName} defaultMessage={`Wellcome ${user.displayName}`} />
            </span>
        </section>
    );
}

Home.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    logoutUser: PropTypes.func,
};

Home.defaultProps = {
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

export default connect(stateToProps, dispatchToProps)(Home);
