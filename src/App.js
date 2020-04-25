import React, { createRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoxComponent from './components/FoxComponent';
import FormComponent from './components/FormComponent';
import ItemComponent from './components/ItemComponent';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import items from './constants/items';

const foxInfoInit = {
  image: "/assets/images/icon.png",
  name: null,
  hp: 50,
  fullHp: 50
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isEndGame: false,
      foxStatus: "standing",
      isLogin: false,
      foxInfo: foxInfoInit,
      foxCurrent: null,
      items: []
    };
    this.foxRef = createRef();
    this.backgroundMusic = new Audio("/assets/sounds/01_background_music.mp3");
    this.passSound = new Audio("/assets/sounds/02_coins.wav");
    this.endSound = new Audio("/assets/sounds/04_bass.wav");
    this.backgroundMusic.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }

  __getFoxStatus = () => {
    return this.state.foxStatus;
  }
  __keyDownHandler = (e) => {
    if (e.keyCode === 32) {
      switch (this.state.foxStatus) {
        case "standing": {
          this.__startGame();
          break;
        }
        case "running": {
          this.__setFoxStatus("jumping");
          break;
        }
        default:
      }
    } else if (e.keyCode === 27) {
      this.__endGame();
    }
  }

  __setFoxStatus = (foxStatus) => {
    this.setState({
      foxStatus
    });
  }

  __setFoxInfo = (data) => {
    this.setState({
      foxInfo: {
        ...this.state.foxInfo,
        ...data
      }
    });
    this.props.history.push("/start");
  }

  __startGame = ()=>{
    this.backgroundMusic.play();
    this.setState({
      items:[],
      foxInfo: {
        ...this.state.foxInfo,
        hp: foxInfoInit.hp
      }
    });
    this.__setFoxStatus("running");
    this.__randomItem();
  }

  __endGame = () => {
    this.backgroundMusic.pause();
    this.setState({
      isEndGame: true,
      foxStatus: "standing"
    });
  }

  __exitGame = () => {
    this.__endGame();
    this.setState({
      foxInfo: foxInfoInit
    });
  }

  updateDimensions = () => {
    this.setState({
      foxCurrent: this.foxRef.current
    });
  }

  componentDidMount = () => {
    this.setState({
      foxCurrent: this.foxRef.current,
    });
  }

  __removeItem = (key)=>{
    this.setState({
      items: this.state.items.filter(item=>item.key !== key)
    });
  }

  __getFoxCurrent = ()=>{
    return this.foxRef.current;
  }

  __randomNumber(from,to){
    return Math.floor(Math.random() * to) + from 
  }

  __randomItem(){
    setTimeout(()=>{
      if(this.__getFoxStatus() !== "standing"){
        let key = Date.now();
        this.setState({
          items: this.state.items.concat([
            {
              key,
              component: <ItemComponent
              key={key}
              componentKey={key}
              foxCurrent={this.state.foxCurrent}
              item={items[this.__randomNumber(0,21)]}
              endGame={this.__endGame}
              foxStatus={this.__getFoxStatus}
              removeItem={this.__removeItem}
              getFoxCurrent={this.__getFoxCurrent}
              keepItem={this.__keepItem}
            />
            }
          ])
        });
        this.__randomItem();
      }
     
    },this.__randomNumber(700,2000));
  }

  __keepItem = (item)=>{
    console.log(item);
    let hp = this.state.foxInfo.hp+item.hp;
    if(hp <= 0){
      hp = 0;
      this.__endGame();
      this.endSound.play();
    }
    if(hp > foxInfoInit.fullHp){
      hp = foxInfoInit.fullHp;
    }
    this.passSound.play();
    this.setState({
      foxInfo: {
        ...this.state.foxInfo,
        hp
      }
    });
  }

  __getFoxInfo = ()=>{
    return this.state.foxInfo;
  }

  render() {
    return (
      <div className={`background ${this.state.foxStatus === "standing" ? "" : "background-running"}`} tabIndex="0" onKeyDown={this.__keyDownHandler}>
        <Switch>
          <Route path="/start">
            {this.state.items.map(item=>item.component)}
            <FoxComponent getFoxInfo={this.__getFoxInfo} isEndGame={this.state.isEndGame} foxRef={this.foxRef} exitGame={this.__exitGame} setFoxInfo={this.__setFoxInfo} foxInfo={this.state.foxInfo} setFoxStatus={this.__setFoxStatus} foxStatus={this.state.foxStatus} />
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
