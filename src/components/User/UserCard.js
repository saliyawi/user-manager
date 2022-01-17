import React from "react";
import {Link} from 'react-router-dom';
import user from '../../images/user.png';

const UserCard = (props) =>{
    const{ id, name, email, username} = props.user;

    return(
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link to={`/user/${id}`}  state={{user: props.user}}>
                    <div className="header">{name}</div>
                    <div>User Name : {username  }</div>
                    <div>{email}</div>
                </Link>
                <div>
                    <i 
                    className="trash alternate outline icon" 
                    style={{color:"red", margin:"7px", marginLeft:"10px"}}
                    onClick={()=> props.clickHandler(id)}
                    ></i>
                </div>
            </div>
        </div>
    )
}
export default UserCard;