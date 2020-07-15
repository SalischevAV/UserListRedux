import React from "react";
import UserCard from "./UserCard";

export default (props) => {
    return (
        <div>
            {props.data.map(
                (user) => <UserCard key={user.id} {...user} />
            )}
        </div>
    );
}