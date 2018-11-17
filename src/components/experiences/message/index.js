import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import CloseIcon from '../../icons/close/index.js';
import MessageIcon from './icon';
import hideMessage from '../../../redux/actions/app/hide-message';
import './styles.css';

function Message(props) {
    const {
        className,
        style,
        message,
        variant,
        hideMessage,
    } = props;

    function getClassName() {
        return classnames(
            'rainbow-auth-firebase-message_container',
            `rainbow-auth-firebase-message_container-${variant}`,
            className,
        );
    }

    if (message) {
        return (
            <article className={getClassName()} style={style}>
                <div className="rainbow-auth-firebase-message_content">
                    <MessageIcon variant={variant} />
                    <p className="rainbow-auth-firebase-message_text">
                        {message}
                    </p>
                    <ButtonIcon
                        size="medium"
                        icon={<CloseIcon />}
                        onClick={hideMessage}
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
    message: PropTypes.node,
    variant: PropTypes.string,
    hideMessage: PropTypes.func.isRequired,
};

Message.defaultProps = {
    className: undefined,
    style: {},
    message: undefined,
    variant: undefined,
};

function stateToProps(state) {
    return {
        message: state.app.get('message'),
        variant: state.app.get('messageVariant'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        hideMessage,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(Message);
