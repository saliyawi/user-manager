import React,{useState, useEffect} from "react";
import {Link, useLocation} from 'react-router-dom';
import api from '../../api/users';
import AlbumCard from "../Album/AlbumCard";


const UserAlbums = () =>{

    const location = useLocation()
    const { user } = location.state;
    const [albums, setAlbums] = useState([]);

    {/* Request to get all albums for the given userid */}
    const retrieveUserAlbums = async() =>{
        const response = await api.get(`/albums?userId=${user.id}`);
        return response.data;
    }

    {/* Retrieve user albums whenever user changed */}
    useEffect(()=>{
        const getUserAlbums = async () => {
          const userAlbums = await retrieveUserAlbums();
          if(userAlbums) setAlbums(userAlbums);
        };
    
        getUserAlbums();
    }, [user.id])

    {/* Display the user's Albums in Cards */}
    const renderAlbumList = albums.map((album) => {
        return  <AlbumCard key={album.id} album={album} user={user}/>;     
    });
    
    return(
        <div className="main">
            <div className="center-div" style={{paddingTop:"50px"}}>
                {/* Go back to the user list */}
               <Link to="/users">
                    <button className="ui button blue center">Back to User List</button>
               </Link>
            </div>
            <h2>User Albums</h2>
            {/* Display the user list  */}
            <div className="ui cards" style={{paddingTop:"20px"}}>
                {renderAlbumList.length > 0 
                  ? renderAlbumList
                  : "No album available"
                }         
            </div>
        </div>
    )
}
export default UserAlbums;