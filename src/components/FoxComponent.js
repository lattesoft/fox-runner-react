import React from 'react';

export default class FoxComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            foxStatus: null,
            bottom: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        let bottom = 20;
        if(props.foxStatus === "jumping"){
            bottom = 150;
        }
        return {
            bottom,
            foxStatus: props.foxStatus
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.foxStatus !== this.state.foxStatus
    }

    componentDidUpdate(){
        if(this.state.foxStatus === "jumping"){
            console.log("jumping");
            setTimeout(()=>{
                this.setState({
                    bottom: 20
                });
                console.log("set running");
                this.props.setFoxStatus("running");
            },500);
        }
    }

    render(){
        let {bottom,foxStatus} = this.state;
        return <div style={{bottom}} className={`fox-object ${foxStatus === "standing" ? "fox-standing" : "fox-running"}`}></div>
    }
}