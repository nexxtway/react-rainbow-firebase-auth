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
import { Field, reduxForm } from 'redux-form';
import Button from 'react-rainbow-components/components/Button';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import Avatar from 'react-rainbow-components/components/Avatar';
import Input from 'react-rainbow-components/components/Input';
import updateProfile from '../../../../redux/services/firebase/update-profile';
import CloseIcon from '../../../icons/close';
import UserIcon from '../../../icons/user';
import EmailIcon from '../../../icons/email';
import PhoneIcon from '../../../icons/phone';
import LockIcon from '../../../icons/lock';
import validate from './validate';
import './styles.css';

function Profile(props) {
    const {
        className,
        style,
        user,
        intl,
        handleSubmit,
    } = props;

    const translations = defineMessages({
        usernamePlaceholder: {
            id: 'form.username.placeholder',
            defaultValue: 'Enter your user name',
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

    const getContainerClassNames = () => classnames('rainbow-auth-firebase_profile', className);

    const handleProfileChange = (profile) => {
        updateProfile(profile);
    };

    return (
        <section className={getContainerClassNames()} style={style}>
            <div className="rainbow-auth-firebase-profile_top-bar">
                <span className="rainbow-auth-firebase-profile_top-bar-title">
                    <FormattedMessage id="profile.title" defaultMessage="Edit Profile" />
                </span>
                <ButtonIcon icon={<CloseIcon className="rainbow-auth-firebase-profile_top-bar-close-icon" />} />
            </div>
            <div className="rainbow-auth-firebase-profile_content">
                <div>
                    <Field
                        component={Input}
                        name="username"
                        className="rainbow-auth-firebase-profile_content-input"
                        label={<FormattedMessage id="form.username.label" defaultMessage="User name" />}
                        required
                        placeholder={intl.formatMessage(translations.usernamePlaceholder)}
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
                        name="phone"
                        className="rainbow-auth-firebase-profile_content-input"
                        label={<FormattedMessage id="form.phone.label" defaultMessage="Phone number" />}
                        required
                        placeholder={intl.formatMessage(translations.phonePlaceholder)}
                        icon={<PhoneIcon />} />
                    <Field
                        component={Input}
                        name="password"
                        label={<FormattedMessage id="form.password.label" defaultMessage="Password" />}
                        placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                        type="password"
                        className="rainbow-auth-firebase-profile_content-input"
                        required
                        icon={<LockIcon />} />
                </div>
                <div className="rainbow-auth-firebase-profile_content-user-photo-container">
                    <span>
                        <FormattedMessage id="profile.photo" defaultMessage="Profile Photo" />
                    </span>
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
                    onClick={handleSubmit(handleProfileChange)} />
            </div>
        </section>
    );
}

Profile.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

Profile.defaultProps = {
    className: undefined,
    style: {},
    user: {},
};

function stateToProps(state) {
    const { authentication } = state;
    const { user } = authentication.toJS();
    return {
        user,
        initialValues: {
            username: user.displayName,
            email: user.email,
            phone: user.phone,
            password: user.password,
        },
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'profile',
        touchOnBlur: false,
        validate,
    })(injectIntl(Profile)),
);
