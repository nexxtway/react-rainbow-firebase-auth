import React from 'react';
import PropTypes from 'prop-types';

function Content({ results, content }) {
    return results.map(({ data }) => (
        data[content].map(({ text }, index) => {
            const key = `paragraph-${index}`;
            return (
                <p key={key}>
                    {text}
                    <br />
                    <br />
                </p>
            );
        })
    ));
}

export default function PrismicContent(props) {
    const {
        className,
        style,
        response,
        content,
    } = props;

    if (response && Array.isArray(response.results)) {
        return (
            <div className={className} style={style}>
                <Content results={response.results} content={content} />
            </div>
        );
    }
    return null;
}

PrismicContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    response: PropTypes.object,
    content: PropTypes.string,
};

PrismicContent.defaultProps = {
    className: undefined,
    style: {},
    response: null,
    content: '',
};
