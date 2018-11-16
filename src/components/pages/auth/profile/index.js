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
import updateProfile from '../../../../redux/actions/profile/update-profile';
import UserIcon from '../../../icons/user';
import EmailIcon from '../../../icons/email';
import PhoneIcon from '../../../icons/phone';
import LockIcon from '../../../icons/lock';
import PersonIcon from '../../../icons/person';
import TopBar from '../top-bar/index.js';
import validate from './validate';
import ProfileActions from './profileActions';
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
    } = props;

    const getContainerClassNames = () => classnames('rainbow-auth-firebase_profile', className);

    const handleProfileChange = (profile) => {
        updateProfile(profile);
    };

    return (
        <section>
            <TopBar />
            <form noValidate onSubmit={handleSubmit(handleProfileChange)}>
                <section className={getContainerClassNames()} style={style}>
                    <h1 className="rainbow-auth-firebase-profile_title">
                        <FormattedMessage id="profile.title" defaultMessage="Edit Profile" />
                    </h1>
                    <div className="rainbow-auth-firebase-profile_content">
                        <div className="rainbow-auth-firebase-profile_content-input-container">
                            <Field
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
                                component={Input}
                                name="email"
                                className="rainbow-auth-firebase-profile_content-input"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                                type="email"
                                icon={<EmailIcon />} />
                            <Field
                                component={Input}
                                name="phoneNumber"
                                className="rainbow-auth-firebase-profile_content-input"
                                label={<FormattedMessage id="form.phone.label" defaultMessage="Phone number" />}
                                placeholder={intl.formatMessage(translations.phonePlaceholder)}
                                type="tel"
                                icon={<PhoneIcon />} />
                            <Field
                                component={Input}
                                name="password"
                                label={<FormattedMessage id="form.password.label" defaultMessage="Change password" />}
                                placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                                type="password"
                                className="rainbow-auth-firebase-profile_content-input"
                                icon={<LockIcon />} />
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
                    <RenderIf isTrue={isChangedValue(currentValues, initialValues)}>
                        <ProfileActions isLoading={isLoading} />
                    </RenderIf>
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
};

Profile.defaultProps = {
    className: undefined,
    style: {},
    user: {},
    isLoading: false,
    updateProfile: () => {},
    currentValues: {},
    initialValues: {},
};

const selector = formValueSelector('profile');
function stateToProps(state) {
    const { authentication, profile } = state;
    const { user } = authentication.toJS();
    const isLoading = profile.get('isLoading');
    const displayName = selector(state, 'displayName');
    const email = selector(state, 'email');
    const phoneNumber = selector(state, 'phoneNumber');
    const password = selector(state, 'password');
    return {
        user,
        isLoading,
        initialValues: {
            displayName: user.displayName,
            email: user.getEmail(),
            phoneNumber: undefined,
            password: undefined,
        },
        currentValues: {
            displayName,
            email,
            phoneNumber,
            password,
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
