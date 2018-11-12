import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Prismic, QueryAt } from 'react-prismic-cms';
import Content from '../../../experiences/prismic-content';
import Back from '../../../icons/back';
import './styles.css';

function TermsAndConditions(props) {
    const {
        className,
        style,
    } = props;

    return (
        <div className={className} style={style}>
            <div className="rainbow-auth-firebase-terms-condition_header">
                <Link className="rainbow-auth-firebase-terms-condition_back" to="/home/signup">
                    <Button variant="base">
                        <Back className="rainbow-auth-firebase-terms-condition_back-icon" />
                        Back
                    </Button>
                </Link>
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
