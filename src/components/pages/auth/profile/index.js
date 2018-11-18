import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    FormattedMessage,
    intlShape,
    injectIntl,
    defineMessages,
} from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import RenderIf from 'react-rainbow-components/components/RenderIf';
import Avatar from 'react-rainbow-components/components/Avatar';
import Input from 'react-rainbow-components/components/Input';
import Button from 'react-rainbow-components/components/Button';
import updateProfile from '../../../../redux/actions/profile/update-profile';
import UserIcon from '../../../icons/user';
import EmailIcon from '../../../icons/email';
import LockIcon from '../../../icons/lock';
import PersonIcon from '../../../icons/person';
import TopBar from '../top-bar/index.js';
import validate from './validate';
import isChangedValue from './isChangedValue';
import './styles.css';
import './media-queries.css';

const translations = defineMessages({
    displayNamePlaceholder: {
        id: 'form.displayName.placeholder',
        defaultValue: 'Enter your name',
    },
    emailPlaceholder: {
        id: 'form.email.placeholder',
        defaultValue: 'Enter your email address',
    },
    phonePlaceholder: {
        id: 'form.phone.placeholder',
        defaultValue: 'Enter your phone number',
    },
    passwordPlaceholder: {
        id: 'form.password.placeholder',
        defaultValue: 'Enter new password',
    },
});

function Profile(props) {
    const {
        className,
        style,
        user,
        isLoading,
        updateProfile,
        handleSubmit,
        intl,
        currentValues,
        initialValues,
        isSocialMediaUser,
    } = props;

    const getContainerClassNames = () => classnames('rainbow-auth-firebase_profile', className);

    const getBottomBarClassNames = () => classnames('rainbow-auth-firebase-profile_actions', {
        'rainbow-auth-firebase-profile_actions--shown': isChangedValue(currentValues, initialValues),
    });

    return (
        <section>
            <TopBar />
            <form noValidate onSubmit={handleSubmit(updateProfile)}>
                <section className={getContainerClassNames()} style={style}>
                    <h1 className="rainbow-auth-firebase-profile_title">
                        <FormattedMessage id="profile.title" defaultMessage="Edit Profile" />
                    </h1>
                    <div className="rainbow-auth-firebase-profile_content">
                        <div className="rainbow-auth-firebase-profile_content-input-container">
                            <Field
                                disabled={isSocialMediaUser}
                                component={Input}
                                name="displayName"
                                className="rainbow-auth-firebase-profile_content-input"
                                label={<FormattedMessage id="form.displayName.label" defaultMessage="Name" />}
                                required
                                placeholder={
                                    intl.formatMessage(translations.displayNamePlaceholder)
                                }
                                icon={<UserIcon />} />
                            <Field
                                disabled={isSocialMediaUser}
                                component={Input}
                                name="email"
                                className="rainbow-auth-firebase-profile_content-input"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                                type="email"
                                icon={<EmailIcon />} />
                            <RenderIf isTrue={!isSocialMediaUser}>
                                <Field
                                    component={Input}
                                    name="password"
                                    label={
                                        <FormattedMessage id="form.password.label" defaultMessage="Change password" />
                                    }
                                    placeholder={
                                        intl.formatMessage(translations.passwordPlaceholder)
                                    }
                                    type="password"
                                    className="rainbow-auth-firebase-profile_content-input"
                                    icon={<LockIcon />} />
                            </RenderIf>

                        </div>
                        <div className="rainbow-auth-firebase-profile_content-user-photo-container">
                            <span className="rainbow-auth-firebase-profile_content-user-photo-label">
                                <FormattedMessage id="profile.photo" defaultMessage="Profile Photo" />
                            </span>
                            <Avatar
                                src={user.photoURL}
                                icon={<PersonIcon className="rainbow-auth-firebase-profile_content-user-icon" />}
                                assistiveText="user profile"
                                className="rainbow-auth-firebase-profile_content-user-photo" />
                        </div>
                    </div>
                    <div className={getBottomBarClassNames()}>
                        <Button
                            className="rainbow-auth-firebase-profile_actions-buttons"
                            label={<FormattedMessage id="profile.save.changes" defaultMessage="Save changes" />}
                            variant="brand"
                            type="submit"
                            isLoading={isLoading} />
                    </div>
                </section>
            </form>
        </section>
    );
}

Profile.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    updateProfile: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    currentValues: PropTypes.object,
    initialValues: PropTypes.object,
    isSocialMediaUser: PropTypes.bool,
};

Profile.defaultProps = {
    className: undefined,
    style: {},
    user: {},
    isLoading: false,
    updateProfile: () => {},
    currentValues: {},
    initialValues: {},
    isSocialMediaUser: false,
};

const selector = formValueSelector('profile');
function stateToProps(state) {
    const { authentication, profile } = state;
    const { user } = authentication.toJS();
    return {
        user,
        isLoading: profile.get('isLoading'),
        isSocialMediaUser: user.isGoogleUser() || user.isFacebookUser(),
        initialValues: {
            displayName: user.displayName,
            email: user.getEmail(),
            password: '',
        },
        currentValues: {
            displayName: selector(state, 'displayName'),
            email: selector(state, 'email'),
            password: selector(state, 'password'),
        },
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        updateProfile,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'profile',
        touchOnBlur: false,
        validate,
    })(injectIntl(Profile)),
);
