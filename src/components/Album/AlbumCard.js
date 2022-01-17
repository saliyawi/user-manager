import React from "react";
import { Link } from 'react-router-dom';

const AlbumCard = (props) => {
    const { id, title } = props.album;

    return (
        <div className="ui card">
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