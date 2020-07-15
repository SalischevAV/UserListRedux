import React from "react";
import { NavLink} from "react-router-dom";

export default (props) => {
    return (
        <ul className="nav nav-pills">
            <li><NavLink exact to="/" activeClassName="nav-item active">Users</NavLink></li>
            <li><NavLink to="/create" activeClassName="nav-item active">Create</NavLink></li>
            <li><NavLink to="/update" activeClassName="nav-item active">Update</NavLink></li>
        </ul>
    )
}