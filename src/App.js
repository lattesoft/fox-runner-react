import React from 'react';
import FoxComponent from './components/FoxComponent';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      foxStatus: "standing"
    };
  }

  __keyDownHandler = (e)=>{
    
    if(e.keyCode === 32){
      switch(this.state.foxStatus){
        case "standing": {
          this.__setFoxStatus("running");
          break;
        }
        case "running": {
          this.__setFoxStatus("jumping");
          break;
        }
      }
    }
  }

  __setFoxStatus = (foxStatus)=>{
    this.setState({
      foxStatus
    });
  }
  
  render(){
    return (
      <div className={`background ${this.state.foxStatus === "standing" ? "" : "background-running"}`} tabIndex="0" onKeyDown={this.__keyDownHandler}>
        <FoxComponent setFoxStatus={this.__setFoxStatus} foxStatus={this.state.foxStatus}/>
      </div>
    );
  }
}

export default App;
