import React from 'react';
import PropTypes from 'prop-types';
import {
    FormattedMessage,
    injectIntl,
    defineMessages,
} from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';
import RenderIf from 'react-rainbow-components/components/RenderIf';
import Input from 'react-rainbow-components/components/Input';
import Button from 'react-rainbow-components/components/Button';
import Modal from 'react-rainbow-components/components/Modal';
import updateProfile from '../../../redux/actions/profile/update-profile';
import hideReauthenticateModal from '../../../redux/actions/profile/hide-reauthenticate-modal';
import handleReauthentication from '../../../redux/actions/profile/handle-reauthentication';
import UserIcon from '../../../components/icons/user';
import EmailIcon from '../../../components/icons/email';
import LockIcon from '../../../components/icons/lock';
import TopBar from '../top-bar';
import validate from './validate';
import isChangedValue from './isChangedValue';
import ReauthenticateForm from './reauthenticateForm';
import StyledSection from './styled/section';
import StyledTitle from './styled/title';
import StyledContent from './styled/content';
import StyledInputContainer from './styled/inputContainer';
import StyledInput from './styled/input';
import StyledAvatarContainer from './styled/avatarContainer';
import StyledAvatarLabel from './styled/avatarLabel';
import StyledAvatar from './styled/avatar';
import StyledPersonIcon from './styled/personIcon';
import StyledBottomBar from './styled/bottomBar';
import StyledReauthenticateFormTitle from './styled/reauthenticateFormTitle';

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
        id: 'form.password.change.placeholder',
        defaultValue: 'Enter new password',
    },
    reauthenticateTitle: {
        id: 'profile.reauthenticate.title',
        defaultValue: 'Renew your credentials',
    },
});

function Profile(props) {
    const {
        className,
        style,
        user,
        isLoading,
        isModalOpen,
        updateProfile,
        handleSubmit,
        hideReauthenticateModal,
        handleReauthentication,
        intl,
        currentValues,
        initialValues,
        isSocialMediaUser,
    } = props;

    const onSubmit = (credentials) => {
        handleReauthentication(credentials, currentValues);
    };

    const isBottomBarVisible = isChangedValue(currentValues, initialValues);

    return (
        <section>
            <TopBar />
            <form noValidate onSubmit={handleSubmit(updateProfile)}>
                <StyledSection className={className} style={style}>
                    <StyledTitle>
                        <FormattedMessage id="profile.title" defaultMessage="Edit Profile" />
                    </StyledTitle>
                    <StyledContent>
                        <StyledInputContainer>
                            <StyledInput
                                readOnly={isSocialMediaUser}
                                component={Input}
                                name="displayName"
                                label={<FormattedMessage id="form.displayName.label" defaultMessage="Name" />}
                                required
                                placeholder={
                                    intl.formatMessage(translations.displayNamePlaceholder)
                                }
                                icon={<UserIcon />} />
                            <StyledInput
                                readOnly={isSocialMediaUser}
                                component={Input}
                                name="email"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                                type="email"
                                icon={<EmailIcon />} />
                            <RenderIf isTrue={!isSocialMediaUser}>
                                <StyledInput
                                    component={Input}
                                    name="password"
                                    label={(
                                        <FormattedMessage
                                            id="form.password.change.label"
                                            defaultMessage="Change password" />
                                    )}
                                    placeholder={
                                        intl.formatMessage(translations.passwordPlaceholder)
                                    }
                                    type="password"
                                    icon={<LockIcon />} />
                            </RenderIf>

                        </StyledInputContainer>
                        <StyledAvatarContainer>
                            <StyledAvatarLabel>
                                <FormattedMessage id="profile.photo" defaultMessage="Profile Photo" />
                            </StyledAvatarLabel>
                            <StyledAvatar
                                src={user.photoURL}
                                icon={<StyledPersonIcon />}
                                assistiveText="user profile" />
                        </StyledAvatarContainer>
                    </StyledContent>
                    <StyledBottomBar isBottomBarVisible={isBottomBarVisible}>
                        <Button
                            label={<FormattedMessage id="profile.save.changes" defaultMessage="Save changes" />}
                            variant="brand"
                            type="submit"
                            isLoading={isLoading} />
                    </StyledBottomBar>
                </StyledSection>
            </form>
            <Modal
                title={intl.formatMessage(translations.reauthenticateTitle)}
                isOpen={isModalOpen}
                onRequestClose={hideReauthenticateModal}>
                <StyledReauthenticateFormTitle>
                    <FormattedMessage
                        id="profile.reauthenticate.message"
                        defaultMessage="This operation is sensitive and requires recent login, please, reauthenticate" />
                </StyledReauthenticateFormTitle>
                <ReauthenticateForm onSubmit={onSubmit} />
            </Modal>
        </section>
    );
}

Profile.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    isModalOpen: PropTypes.bool.isRequired,
    updateProfile: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    hideReauthenticateModal: PropTypes.func.isRequired,
    handleReauthentication: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
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
        isModalOpen: profile.get('showModal'),
        isSocialMediaUser: user.isGoogleUser() || user.isFacebookUser(),
        initialValues: {
            displayName: user.displayName,
            email: user.getEmail(),
            password: undefined,
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
        hideReauthenticateModal,
        handleReauthentication,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'profile',
        touchOnBlur: false,
        validate,
    })(injectIntl(Profile)),
);
