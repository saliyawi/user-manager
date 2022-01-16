import React from "react";
import {Link} from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) =>{
    const{ id, name, email, username} = props.contact;

    return(
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link to={`/contact/${id}`}  state={{contact: props.contact}}>
                    <div className="header">{name}</div>
                    <div>User Name : {username  }</div>
                    <div>{email}</div>
                </Link>
                <div>
                    <Link to={`/edit/${id}`}  state={{contact: props.contact}}>
                        <i 
                        className="edit alternate outline icon" 
                        style={{color:"blue", margin:"7px"}}
                        ></i>
                    </Link>
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
export default ContactCard;