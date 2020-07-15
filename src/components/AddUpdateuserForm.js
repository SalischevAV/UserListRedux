import React from "react";

export default (props) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <label>
                                Name:
                                <input type="text" name="name" value={props.name} onChange={props.handlerInputChange} />
                            </label>
                        </td>
                        <td>
                            <label>
                                Job:
                                <input type="text" name="job" value={props.job} onChange={props.handlerInputChange} />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button className="btn btn-success btn-block" onClick={props.handlerButtonClick}>
                                {props.buttonText}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}