import React from "react";
import {connect} from "react-redux"
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import AddUpdateuserForm from "./../components/AddUpdateuserForm";
import Navigation from "./../components/Navigation";
import UserCardList from "./../components/UserCardList";
import * as actionCreator from "./../actions";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            job: "",
        };
        this.handlerInputChange = this.handlerInputChange.bind(this);
        this.handlerButtonClickAdd =this.handlerButtonClickAdd.bind(this);
        this.handlerButtonClickUpdate =this.handlerButtonClickUpdate.bind(this);
    }

    componentDidMount() {        
        this.props.load();
    }

    handlerButtonClickAdd(){
        this.props.handlerButtonClickAdd(this.state.name, this.state.job);
    }

    handlerButtonClickUpdate(){
        this.props.handlerButtonClickUpdate(this.state.name, this.state.job);
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
                        <Route render={() => <UserCardList data={this.props.data} />} />
                    </Switch>
                </div>
            </Router>
        )
    } 
}

function mapStateToProps(state){
    return {
        data: state.userReducer.data
    };
}

function mapDispatchToProps(dispatch){
    return {
        load: ()=>actionCreator.load()(dispatch),
        handlerButtonClickAdd : actionCreator.handlerButtonClickAdd,
        handlerButtonClickUpdate:actionCreator.handlerButtonClickUpdate,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);