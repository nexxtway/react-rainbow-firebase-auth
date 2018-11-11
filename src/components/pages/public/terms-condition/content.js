import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ContentItems({ results }) {
    console.log(results);
    return results.map(({ data }) => (
        data['terms-and-conditions'].map(({ text }) => (
            <div className="rainbow-auth-firebase-terms-condition_content">
                {text}
            </div>
        ))
    ));
}

export default function Content(props) {
    const {
        className,
        style,
        response,
    } = props;
    console.log(response);
    if (response && Array.isArray(response.results)) {
        return (
            <div className={className} style={style}>
                <ContentItems results={response.results} />
            </div>
        );
    }
    return null;
}

Content.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    response: PropTypes.object,
};

Content.defaultProps = {
    className: undefined,
    style: {},
    response: null
};
