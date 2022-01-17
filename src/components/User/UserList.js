import React, {useRef} from "react";
import {Link} from 'react-router-dom';
import UserCard from '../User/UserCard';
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

const UserList = (props) =>{
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const inputElement = useRef(""); 

    {/* Handle log out functionality and redirect user to login page */}
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
    };

    {/* Handle delete user */}
    const deleteUserHandler = (id) =>{
        props.getUserId(id);
    }

    {/* Display the users in Cards */}
    const renderUserList = props.users.map((user) => {
        return  <UserCard key={user.id} user={user} clickHandler={deleteUserHandler} />;     
    });

    {/* Get the user search keywords entered */}
    const getSearchTerm = () =>{
        props.searchKeyword(inputElement.current.value);
    }
    
    return(
        <div className="ui fluid main container">
            <h2> User List 
                {/* Go to the add user */}
                <Link to="/add" style={{paddingLeft:"20px"}}>
                    <button 
                        className="ui button blue"
                    >Add User</button>
                </Link>
                {/* Log out button */}
                <button className="ui button blue center" onClick={handleLogout}>Log Out</button>
            </h2>
            {/* Search  user by username */}
            <div className="ui search">
                <div className="ui icon input">
                    <input 
                        ref={inputElement}
                        type="text" 
                        placeholder="Search User" 
                        className="prompt" 
                        value={props.term} 
                        onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            {/* Display user list */}
            <div className="ui called list">
                {renderUserList.length > 0 
                  ? renderUserList
                  : "No users available"
                }         
            </div>
        </div>

    );
}

export default UserList;