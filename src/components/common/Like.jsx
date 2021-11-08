import React from "react";
import PropTypes from "prop-types";

function Like({ isLiked, onLike }) {
    const styleClasses = (isLiked ? "fas" : "far").concat(" fa-heart");

    return (<i
        style={{ cursor: "pointer" }}
        className={styleClasses} aria-hidden="true"
        onClick={onLike} />);
}

export default Like;

Like.propTypes = {
    isLiked: PropTypes.bool.isRequired, 
    onLike: PropTypes.func.isRequired
};

Like.defaultProps = {
    isLiked: false
};
