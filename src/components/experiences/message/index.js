import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import CloseIcon from '../../icons/close/index.js';
import ErrorIcon from '../../icons/error/index.js';
import hideErrorMessage from '../../../redux/actions/app/hide-error-message';
import './styles.css';

function Message(props) {
    const {
        className,
        style,
        errorMessage,
        hideErrorMessage,
    } = props;

    function getClassName() {
        return classnames('rainbow-auth-firebase-message_container', className);
    }

    if (errorMessage) {
        return (
            <article className={getClassName()} style={style}>
                <div className="rainbow-auth-firebase-message_content">
                    <ErrorIcon className="rainbow-auth-firebase-message_icon" />
                    <p className="rainbow-auth-firebase-message_text">
                        {errorMessage}
                    </p>
                    <ButtonIcon
                        size="medium"
                        icon={<CloseIcon />}
                        onClick={hideErrorMessage}
                        className="rainbow-auth-firebase-message_close-button" />
                </div>
            </article>
        );
    }
    return null;
}

Message.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    errorMessage: PropTypes.node,
    hideErrorMessage: PropTypes.func.isRequired,
};

Message.defaultProps = {
    className: undefined,
    style: {},
    errorMessage: undefined,
};

function stateToProps(state) {
    return {
        errorMessage: state.app.get('errorMessage'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        hideErrorMessage,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(Message);
