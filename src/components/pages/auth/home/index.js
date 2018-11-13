import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from '../top-bar/index.js';
import './styles.css';
import './media-queries.css';

function Home(props) {
    const {
        className,
        style,
        user,
    } = props;

    const userName = {
        name: user.displayName,
    };

    const getContainerClassNames = () => classnames('rainbow-auth-firebase-auth_container', className);

    return (
        <section className={getContainerClassNames()} style={style}>
            <TopBar />
            <span className="rainbow-auth-firebase-auth_title">
                <FormattedMessage id="welcome" values={userName} defaultMessage={`Welcome ${user.displayName}`} />
            </span>
        </section>
    );
}

Home.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
};

Home.defaultProps = {
    className: undefined,
    style: {},
    user: {},
};

function stateToProps(state) {
    const { authentication } = state;
    return {
        user: authentication.toJS().user,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(Home);
