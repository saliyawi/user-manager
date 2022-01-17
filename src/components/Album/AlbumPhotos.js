import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import api from '../../api/users';
import PhotoCard from "../Album/PhotoCard";
import Pagination from "../Pagination/Pagination";

const AlbumPhotos = () => {
    const location = useLocation()
    const { album, user } = location.state;

    const [photos, setPhotos] = useState([]);

    const retrieveAlbumPhotos = async () => {
        const response = await api.get(`/photos?albumId=1${album.id}`);
        return response.data;
    }

    useEffect(() => {
        const getAlbumPhotos = async () => {
            const albumPhotos = await retrieveAlbumPhotos();
            if (albumPhotos) setPhotos(albumPhotos);
        };

        getAlbumPhotos();
    }, [album.id])


    return (
        <div className="main" style={{ paddingTop: "50px" }}>
            <div className="center-div">
                <Link to={`/user/${user.id}`}  state={{user: user}}>
                    <button className="ui button blue center">Back to Albums</button>
                </Link>
            </div>
            <h2>{`Album / ${album.title} /  Photos`}</h2>
             <div>
              {photos.length > 0 ? (
                <>
                  <Pagination
                    data={photos}
                    RenderComponent={PhotoCard}
                    title="Photos"
                    pageLimit={5}
                    dataLimit={10}
                  />
                </>
              ) : (
               <h1>No photos to display</h1>
              )}
            </div>
        </div>
    )
}

export default AlbumPhotos;