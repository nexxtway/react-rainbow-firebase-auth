import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    FormattedMessage,
    intlShape,
    injectIntl,
    defineMessages,
} from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-rainbow-components/components/Button';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import Avatar from 'react-rainbow-components/components/Avatar';
import Input from 'react-rainbow-components/components/Input';
import updateProfile from '../../../../redux/actions/profile/update-profile';
import CloseIcon from '../../../icons/close';
import UserIcon from '../../../icons/user';
import EmailIcon from '../../../icons/email';
import PhoneIcon from '../../../icons/phone';
import LockIcon from '../../../icons/lock';
import validate from './validate';
import './styles.css';

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
        defaultValue: 'Enter your password',
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
    } = props;

    const getContainerClassNames = () => classnames('rainbow-auth-firebase_profile', className);

    const handleProfileChange = (profile) => {
        updateProfile(profile);
    };

    return (
        <form noValidate onSubmit={handleSubmit(handleProfileChange)}>
            <section className={getContainerClassNames()} style={style}>
                <div className="rainbow-auth-firebase-profile_top-bar">
                    <span className="rainbow-auth-firebase-profile_top-bar-title">
                        <FormattedMessage id="profile.title" defaultMessage="Edit Profile" />
                    </span>
                    <Link to="/app/home">
                        <ButtonIcon icon={<CloseIcon className="rainbow-auth-firebase-profile_top-bar-close-icon" />} />
                    </Link>
                </div>
                <div className="rainbow-auth-firebase-profile_content">
                    <div>
                        <Field
                            component={Input}
                            name="displayName"
                            className="rainbow-auth-firebase-profile_content-input"
                            label={<FormattedMessage id="form.displayName.label" defaultMessage="Name" />}
                            required
                            placeholder={intl.formatMessage(translations.displayNamePlaceholder)}
                            icon={<UserIcon />} />
                        <Field
                            component={Input}
                            name="email"
                            className="rainbow-auth-firebase-profile_content-input"
                            label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                            required
                            placeholder={intl.formatMessage(translations.emailPlaceholder)}
                            icon={<EmailIcon />} />
                        <Field
                            component={Input}
                            name="phoneNumber"
                            className="rainbow-auth-firebase-profile_content-input"
                            label={<FormattedMessage id="form.phone.label" defaultMessage="Phone number" />}
                            placeholder={intl.formatMessage(translations.phonePlaceholder)}
                            icon={<PhoneIcon />} />
                        <Field
                            component={Input}
                            name="password"
                            label={<FormattedMessage id="form.password.label" defaultMessage="Password" />}
                            placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                            type="password"
                            className="rainbow-auth-firebase-profile_content-input"
                            icon={<LockIcon />} />
                    </div>
                    <div className="rainbow-auth-firebase-profile_content-user-photo-container">
                        <FormattedMessage id="profile.photo" defaultMessage="Profile Photo" />
                        <Avatar
                            src={user.photoURL}
                            assistiveText="user profile"
                            className="rainbow-auth-firebase-profile_content-user-photo" />
                    </div>
                </div>
                <div className="rainbow-auth-firebase-profile_actions">
                    <Button
                        className="rainbow-auth-firebase-profile_actions-buttons"
                        label=<FormattedMessage id="cancel" defaultMessage="Cancel" /> />
                    <Button
                        className="rainbow-auth-firebase-profile_actions-buttons"
                        label={<FormattedMessage id="profile.save.changes" defaultMessage="Save changes" />}
                        variant="brand"
                        type="submit"
                        isLoading={isLoading} />
                </div>
            </section>
        </form>
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
};

Profile.defaultProps = {
    className: undefined,
    style: {},
    user: {},
    isLoading: false,
    updateProfile: () => {},
};

function stateToProps(state) {
    const { authentication, profile } = state;
    const { user } = authentication.toJS();
    const isLoading = profile.get('isLoading');
    return {
        user,
        isLoading,
        initialValues: {
            displayName: user.displayName,
            email: user.email,
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
