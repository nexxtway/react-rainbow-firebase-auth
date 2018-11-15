import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { FormattedMessage } from 'react-intl';

export default function ProfileActions({ isLoading }) {
    return (
        <div className="rainbow-auth-firebase-profile_actions">
            <Button
                className="rainbow-auth-firebase-profile_actions-buttons"
                label={<FormattedMessage id="profile.save.changes" defaultMessage="Save changes" />}
                variant="brand"
                type="submit"
                isLoading={isLoading} />
        </div>
    );
}

ProfileActions.propTypes = {
    isLoading: PropTypes.bool,
};

ProfileActions.defaultProps = {
    isLoading: false,
};
