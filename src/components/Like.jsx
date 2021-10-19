import React from 'react';

function Like({ food, onLike }) {
    return (<i
        style={{ cursor: food.isEditing ? "default" : "pointer" }}
        className={getHeartClasses(food.isLiked)} aria-hidden="true"
        onClick={() => onLike && onLike(food)} />);
}

const getHeartClasses = (isLiked) => {
    let classes = isLiked ? "fas" : "far";
    return classes.concat(" fa-heart");
};

export default Like;
