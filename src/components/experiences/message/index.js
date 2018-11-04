import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import CloseIcon from '../../icons/close/index.js';
import ErrorIcon from '../../icons/error/index.js';
import './styles.css';

function Message(props) {
    const {
        className,
        style,
        errorMessage,
    } = props;

    function getClassName() {
        return classnames('aws-amplify-app-message_container', className);
    }

    if (errorMessage) {
        return (
            <article className={getClassName()} style={style}>
                <div className="aws-amplify-app-message_content">
                    <ErrorIcon className="aws-amplify-app-message_icon" />
                    <p className="aws-amplify-app-message_text">
                        {errorMessage}
                    </p>
                    <ButtonIcon
                        size="medium"
                        icon={<CloseIcon />}
                        onClick={() => {}}
                        className="aws-amplify-app-message_close-button" />
                </div>
            </article>
        );
    }
    return null;
}

Message.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

Message.defaultProps = {
    className: undefined,
    style: {},
};

function stateToProps(state) {
    const { errorMessage } = state.app;
    return {
        errorMessage,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(Message);
