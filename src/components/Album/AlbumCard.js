import React from "react";
import { Link } from 'react-router-dom';

{/* Component to show user albums in Cards */}
const AlbumCard = (props) => {
    const { id, title } = props.album;

    return (
        <div className="ui card">
            {/* Go to the user photos */}
            <Link to={`/photos/${id}`} state={{ album: props.album, user: props.user }}>
                <div className="content">
                    <div className="header">{`Album ${id}`}</div>
                    <div>
                        {`Title : ${title}`}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AlbumCard;