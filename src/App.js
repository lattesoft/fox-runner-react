import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoxComponent from './components/FoxComponent';
import FormComponent from './components/FormComponent';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foxStatus: "standing",
      isLogin: false,
      foxInfo: {
          image: "/assets/images/icon.png",
          name: null,
          hp: 500,
          fullHp: 500
      },
    };
  }

  __keyDownHandler = (e) => {
    if (e.keyCode === 32) {
      switch (this.state.foxStatus) {
        case "standing": {
          this.__setFoxStatus("running");
          break;
        }
        case "running": {
          this.__setFoxStatus("jumping");
          break;
        }
        default:
      }
    } else if(e.keyCode === 27){
      this.__endGame();
    }
  }

  __setFoxStatus = (foxStatus) => {
    this.setState({
      foxStatus
    });
  }

    __setFoxInfo= (data) => {
    this.setState({
      foxInfo: {
        ...this.state.foxInfo,
        ...data
      }
    });
    this.props.history.push("/start");
  }

  __endGame = ()=>{
    this.setState({
      foxStatus: "standing",
      foxInfo: {
          image: "/assets/images/icon.png",
          name: null,
          hp: 500,
          fullHp: 500
      },
    });
  }

  render() {
    return (

      <div className={`background ${this.state.foxStatus === "standing" ? "" : "background-running"}`} tabIndex="0" onKeyDown={this.__keyDownHandler}>
        <Switch>
          <Route path="/start">
            <FoxComponent endGame={this.__endGame} setFoxInfo={this.__setFoxInfo} foxInfo={this.state.foxInfo} setFoxStatus={this.__setFoxStatus} foxStatus={this.state.foxStatus} />
          </Route>
          <Route path="/">
            <FormComponent setFoxInfo={this.__setFoxInfo} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
