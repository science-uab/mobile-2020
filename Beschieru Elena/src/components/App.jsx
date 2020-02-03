import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clickme } from "../actions";
import { bindActionCreators } from "redux";
import "../index.css";
import moment from "moment";

const img_logo = require("../img/Irinelu.jpg");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dataLimita: "",
      img: null,
      mainImg: null
    };
  }
  addReminder() {
    console.log();
    this.props.addReminder(this.state.text, this.state.dataLimita);
  }
  deleteReminder(id) {
    console.log("delete rem id", id);
    console.log("this props", this.props);
    this.props.deleteReminder(id);
  }
  clickme() {
    this.props.clickme();
  }
  renderReminders() {
    const { reminders } = this.props;
    console.log("remainders", reminders);
    return (
      <>
        <div className="main">
          <ul className="list-group col-sm-4">
            {reminders.map(reminder => {
              return (
                <li key={reminder.id} className="list-group-item">
                  <div className="list-item">
                    <div>{reminder.text}</div>
                    <div>
                      <em>{moment(new Date(reminder.dataLimita)).fromNow()}</em>
                    </div>
                  </div>

                  <div
                    className="list-item delete-button"
                    onClick={() => this.deleteReminder(reminder.id)}
                  >
                    &#x2715;
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button type="button" onClick={() => this.clickme()}>
          CLICK
        </button>
      </>
    );
  }
  render() {
    const finalImg = this.state.mainImg
      ? URL.createObjectURL(this.state.mainImg)
      : img_logo;
    console.log("props", this.props);
    return (
      <div className="App">
        <div className="title">Jurnalul Activitatilor</div>
        <div className="logo_img">
          <input
            type="file"
            accept="image/*"
            ref={ref => (this.state.img = ref)}
            hidden
            onChange={e => this.setState({ mainImg: e.target.files[0] })}
          />
          <img
            className="logo"
            src={finalImg}
            alt="Logo"
            onClick={() => this.state.img.click()}
          ></img>
        </div>
        <div className="form-inline reminder-form">
          <div className=" form-group">
            <input
              className="form-control"
              placeholder="Ar trebui sa..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={e => this.setState({ dataLimita: e.target.value })}
              value={this.state.dataLimita}
            />
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Adauga activitate
          </button>
        </div>
        {this.renderReminders()}
      </div>
    );
  }
}

function mapStateProps(state) {
  return {
    reminders: state
  };
}
function mapDispatchToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateProps, {
  addReminder,
  deleteReminder,
  clickme
})(App);
