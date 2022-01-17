import React from "react";

{/* Component to show Photo card */}
const PhotoCard = (props) => {
    const { id, title, thumbnailUrl } = props.data;

    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{`Photo ${id}`}</div>
                <div>
                    {`Title : ${title}`}
                </div>
                <div className="image">
                    <img src={`${thumbnailUrl}`} />
                </div>
            </div>
        </div>
    )
}

export default PhotoCard;