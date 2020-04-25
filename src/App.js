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
      foxInfo: {
          image: "/assets/images/icon.png",
          name: "Fox Runner",
          hp: 500,
          fullHp: 500
      },
    };
  }

  componentDidMount(){
    document.body.addEventListener('keydown', this.__keyDownHandler);
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

  __setFoxName = (name) => {
    this.setState({
      foxInfo: {
        ...this.state.foxInfo,
        name
      }
    });
    this.props.history.push("/start");
  }

  __endGame(){
    this.setState({
      foxStatus: "standing",
      foxInfo: {
          name: null
      },
    });
    this.props.history.push("/");
  }

  render() {
    return (

      <div className={`background ${this.state.foxStatus === "standing" ? "" : "background-running"}`}>
        <Switch>
          <Route path="/start">
            <FoxComponent foxInfo={this.state.foxInfo} setFoxStatus={this.__setFoxStatus} foxStatus={this.state.foxStatus} />
          </Route>
          <Route path="/">
            <FormComponent setFoxName={this.__setFoxName} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
