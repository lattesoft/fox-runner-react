import React from 'react';
import "./css/style.css";
import FoxComponent from './components/FoxComponent';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      foxStatus: "standing"
    };
  }

  keyDownHandler = (e)=>{
    if(this.state.foxStatus === "standing"){
      this.setState({
        foxStatus: "running"
      });
    }
  }
  
  render(){
    return (
      <div className={`background ${this.state.foxStatus === "running" && "background-running"}`} tabIndex="0" onKeyDown={this.keyDownHandler}>
        <FoxComponent status={this.state.foxStatus}/>
      </div>
    );
  }
}

export default App;
