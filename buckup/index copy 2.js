import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import {createStore} from "redux";

const root = document.getElementById("root");

const UserCard = (props) => {
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

const UserCardList = (props) => {
    return (
        <div>
            {props.data.map(
                (user) => <UserCard key={user.id} {...user} />
            )}
        </div>
    );
}

const AddUpdateuserForm = (props) => {
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

const Navigation = (props) => {
    return (
        <ul className="nav nav-pills">
            <li><NavLink exact to="/" activeClassName="nav-item active">Users</NavLink></li>
            <li><NavLink to="/create" activeClassName="nav-item active">Create</NavLink></li>
            <li><NavLink to="/update" activeClassName="nav-item active">Update</NavLink></li>
        </ul>
    )
}



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            job: "",
        };
        this.handlerButtonClickAdd = this.handlerButtonClickAdd.bind(this);
        this.handlerButtonClickUpdate = this.handlerButtonClickUpdate.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
        this.storeUpdate = this.storeUpdate.bind(this);
    }

    async componentDidMount() {
        this.unSubscribe = this.props.store.subscribe(this.storeUpdate); //load data from server
        this.props.ac.load()(this.props.store.dispatch);
    }

    componentWillUnmount(){
        this.unSubscribe(); 
    }

    storeUpdate(){
        this.setState({})
    }

    async handlerButtonClickAdd() { //add
        const response = await fetch("https://reqres.in/api/users",
            {
                headers: {
                    "content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    job: this.state.job,
                })
            }
        )
        console.dir(response);
        const result = await response.json();
        console.dir(result);
    }

    async handlerButtonClickUpdate() { //update
        const response = await fetch("https://reqres.in/api/users/3",
            {
                headers: {
                    "content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    name: this.state.name,
                    job: this.state.job,
                })
            }
        )
        console.dir(response);
        const result = await response.json();
        console.dir(result);
    }


    handlerInputChange(event) { //input update
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/create" render={() =>
                            <AddUpdateuserForm
                                name={this.state.name}
                                job={this.state.job}
                                buttonText="Add"
                                handlerInputChange={this.handlerInputChange}
                                handlerButtonClick={this.handlerButtonClickAdd}
                            />}
                        />
                        <Route path="/update" render={() =>
                            <AddUpdateuserForm
                                name={this.state.name}
                                job={this.state.job}
                                buttonText="Update"
                                handlerInputChange={this.handlerInputChange}
                                handlerButtonClick={this.handlerButtonClickUpdate}
                            />}
                        />
                        <Route render={() => <UserCardList data={this.props.store.getState().data} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
}



//-------------------------------------------------------------------------------------------------
const initialState ={
    requestState : null, //"START" "ERROR"
    data: [],
};
const reducer =  (state= initialState, action) =>{
    const newState = {...state};
    switch(action.type){
        case "NEW_DATA":
            newState.requestState = null;
            newState.data = action.data;
            return newState;
        case "DATA_REQUEST":
            newState.requestState = "START";
            return newState;
        case "DATA_ERROR":
            newState.requestState = "ERROR";
            return newState;
        default:
            return state;
    }
};

const store = createStore(reducer); 
console.log(store.getState());
store.subscribe(
    ()=>console.log(store.getState())
 );


//----------------------------------------------------------------------------------------------------------------

const actionCreator={
    _DATA_REQUEST(){
        return{
            type: "DATA_REQUEST"
        };
    },
    _DATA_SUCCESS(data){
        return{
            type: "NEW_DATA",
            data: data
        };
    },
    _DATA_ERROR(err){
        return{
            type: "DATA_ERROR",
            error: err
        };
    },
    load(){
        return async(dispatch) =>{
            dispatch(this._DATA_REQUEST());
            try{
            const response = await fetch("https://reqres.in/api/users");
            const result = await response.json();
            dispatch(this._DATA_SUCCESS(result.data));
            } catch (err) {
                dispatch(this._DATA_ERROR(err));
            }
        };
    }
}


//---------------------------------------------------------------------------------------------------------------
ReactDOM.render(
    <App store={store} ac={actionCreator} />,
    root
)







/*
store.subscribe(
   ()=>console.log(store.getState())
);

(async function() {
        const response = await fetch("https://reqres.in/api/users");
        const result = await response.json();
        store.dispatch({
            type: "NEW_DATA",
            data: result.data,
        })
       })()
*/