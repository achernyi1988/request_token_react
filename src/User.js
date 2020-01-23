import React from "react";
import {connect} from 'react-redux'
import "./style.css"
import {fetchData, updateData} from "./redux/action"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import _ from "lodash"


const Level = {
    IDLE: "idle",
    NAME: "name",
    HOBBY: "hobby",
    SUB_HOBBY: "sub_hobby"
}

class User extends React.Component {

    state = {
        editing: false,
        editText: {id: "", text: ""},
        level: Level.IDLE
    }

    componentDidMount() {
      //  if (this.props.isLoggin && prevProps.isLoggin !== this.props.isLoggin) {
            console.log("request API");

            this.props.fetchData();

      //  }

        //  this.props.updateData();
    }

    onClickName = (e) => {

        console.log("onClickName", e.currentTarget.id)

        //  console.log("onClickName", this.props.userData[e.currentTarget.id])

        this.setState({
            editText: {id: e.currentTarget.id, text: this.props.userData[e.currentTarget.id]},
            level: Level.NAME,
            editing: true
        });

    }

    onEditHobby = (id) => {

        console.log("onEditHobby", this.props.userData.hobby[id])


        this.setState({
            editText: {id, text: id},
            level: Level.HOBBY,
            editing: true
        });

    }

    onEditSubHobby = (key, obj, index) => {

        console.log("onEditSubHobby", key)
        console.log("onEditSubHobby", obj)
        console.log("onEditSubHobby", index)

        this.setState({
            subHobby: {key, obj, index},
            editText: {id: obj.id, text: obj.name},
            level: Level.SUB_HOBBY,
            editing: true
        });

    }

    renderHobby = (hobbies) => {

        if (_.isEmpty(hobbies)) {
            return null;
        }

        let hobbyDOM = []

        hobbyDOM.push(<li key={hobbyDOM.length}> hobbies: </li>)

        let subHobbies = [];
        Object.keys(hobbies).forEach((key, index) => {

            for (let i = 0; i < hobbies[key].length; i++) {

               // console.log("index", hobbies[key][i]);

                subHobbies.push(<ul key={i}>

                    <li key={i}> {hobbies[key][i].name}

                        <i onClick={(e) => this.onEditSubHobby(key, hobbies[key][i], i) }
                           className="pencil alternate blue icon" style={{visibility: this.props.isLoggin ? "visible": "hidden"}} />
                        <i className="remove red icon"
                           onClick={(e) => this.removeSubHobby(hobbies[key], hobbies[key][i].id)} style={{visibility: this.props.isLoggin ? "visible": "hidden"}}/>

                    </li>
                </ul>)
            }

            hobbyDOM.push(<ul key={hobbyDOM.length}>
                <li key={index}> {key}
                    <i onClick={() => this.onEditHobby(key)}
                       className="pencil alternate blue icon" style={{visibility: this.props.isLoggin ? "visible": "hidden"}}/>
                    <i className="remove red icon"
                       onClick={() => this.removeHobby(hobbies[key], key)} style={{visibility: this.props.isLoggin ? "visible": "hidden"}}/>
                </li>
                {
                    subHobbies
                }
            </ul>)
            subHobbies = [];

        });

        return (hobbyDOM);
    }

    renderList = () => {
        if (!this.props.userData) {
            return null;
        }
        return (
            <ul>
                <li> first name: {this.props.userData.first_name}
                <i onClick={ this.onClickName} id={"first_name"} className="pencil alternate blue icon"
                   style={{visibility: this.props.isLoggin ? "visible": "hidden"}}/></li>
                <li> second name: {this.props.userData.last_name}
                    <i onClick={ this.onClickName} id={"last_name"} className="pencil alternate blue icon"
                       style={{visibility: this.props.isLoggin ? "visible": "hidden"}}/></li>

                {this.renderHobby(this.props.userData.hobby)}

            </ul>
        )
    }

    removeSubHobby = (obj, id) => {
        console.log("removeSubHobby", id)
        _.remove(obj, (elem) => {
            //  console.log(" remove SUB_HOBBY",elem.id)
            // console.log(" remove SUB_HOBBY",this.state.subHobby.obj.id)
            return elem.id === id
        });

        this.setState(this.state);
    }

    removeHobby = (obj, id) => {
        console.log("removeHobby", obj, id)

        delete  this.props.userData.hobby[id];

        this.setState(this.state);
    }


    handleSubmit = (event) => {

        event.preventDefault();

        console.log("handleSubmit", this.state.level);


        switch (this.state.level) {
            case Level.NAME:
                this.props.userData[this.state.editText.id] = event.target[0].value;
                break;
            case Level.HOBBY:

                // console.log("handleSubmit 2",  this.state.editText.id );
                // console.log("handleSubmit 2",  event.target[0].value);


                this.props.userData.hobby[event.target[0].value] = this.props.userData.hobby[this.state.editText.id];

                if (this.state.editText.id !== event.target[0].value) {
                    delete this.props.userData.hobby[this.state.editText.id];
                }


                break;
            case Level.SUB_HOBBY:
                console.log("SUB_HOBBY ", this.state.subHobby.obj.name);
                console.log("SUB_HOBBY ", event.target[0].value);


                if (this.state.subHobby.obj.name !== event.target[0].value) {
                    this.removeSubHobby(this.state.subHobby.obj, this.state.subHobby.obj.id);
                    this.props.userData.hobby[this.state.subHobby.key].push(
                        {id: this.state.subHobby.obj.id, name: event.target[0].value});
                }

                break;


            default:
                break;
        }

        console.log("handleSubmit ", this.props.userData.hobby);

        // this.props.updateData(this.props.userData)

        this.setState({editText: {id: "", text: "", level: ""}, editing: false});
    }

    handleTextChange = (event) => {

        console.log("handleTextChange", this.state.editText.id);

        this.setState({editText: {text: event.target.value, id: this.state.editText.id,}, level: this.state.level});
    }

    handleClickAway = () => {
        this.setState({editText: {}, editing: false});
    };

    renderInput = () => {
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.editText.text} onChange={this.handleTextChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </ClickAwayListener>
        );
    }

    render() {

        return (
            <div>
                {this.renderList()}
                {this.state.editing ? this.renderInput() : null}
            </div>
        )
    }

};


const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        isLoggin: state.isLoggin,
        userData: state.userData,
    };
};


export default connect(mapStateToProps, {fetchData, updateData})(User)
