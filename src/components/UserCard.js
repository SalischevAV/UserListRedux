import React from "react";

export default (props) => {
    return (
        <div className="table-responsive">
            <table className="table table-borded table-sm">
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <img src={props.avatar}></img>
                        </td>
                        <td>{props.first_name}</td>
                        <td>{props.last_name}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">{props.email}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
    );
}