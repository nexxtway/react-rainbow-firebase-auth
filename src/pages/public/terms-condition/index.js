import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Prismic, QueryAt } from 'react-prismic-cms';
import Content from '../../../components/experiences/prismic-content';
import BackButton from '../../../components/experiences/back-button';
import './styles.css';

function TermsAndConditions(props) {
    const {
        className,
        style,
    } = props;

    return (
        <div className={className} style={style}>
            <div className="rainbow-auth-firebase-terms-condition_header">
                <BackButton className="rainbow-auth-firebase-terms-condition_back-button" />
                <FormattedMessage
                    id="terms"
                    defaultMessage="Terms and Conditions" />
            </div>
            <Prismic repo="rainbow-doc">
                <QueryAt
                    className="rainbow-auth-firebase-terms-condition_content"
                    path="document.type"
                    value="terms-and-conditions"
                    content="terms-and-conditions"
                    component={Content} />
            </Prismic>
        </div>
    );
}

TermsAndConditions.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

TermsAndConditions.defaultProps = {
    className: undefined,
    style: {},
};

export default TermsAndConditions;
