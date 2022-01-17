import React from "react";

class AddUser extends React.Component{

    state={
        name:"",
        email:""
    }
    
    addUser = (e) =>{
        e.preventDefault();

        if(this.state.name === "" || this.state.email === ""){
            return;
        }
        this.props.addUserHandler(this.state);
        this.setState ({name:"", email:""});
    }

    render(){
        {/* Add new user here */}
        return(
            <div className="ui fluid main container">
                <h2>Add User</h2>
                <form className="ui form" onSubmit={this.addUser}>
                    {/* User's name */}
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="Name" 
                            placeholder="Name"  
                            value={this.state.name}
                            onChange={ (e) => this.setState({name: e.target.value})}
                        />
                    </div>
                    {/* User's email address */}
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={ (e) => this.setState({email : e.target.value})}
                        />
                    </div>
                    {/* Add button to add new user */}
                    <button className="ui button blue">Add</button>
                </form>

            </div>
        )
    }
}

export default AddUser;