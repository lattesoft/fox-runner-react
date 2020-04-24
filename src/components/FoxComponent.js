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

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.foxStatus !== this.props.foxStatus
    
    }

    render(){
        let {bottom,foxStatus} = this.state;
        if(foxStatus === "jumping"){
            console.log("jumping");
            setTimeout(()=>{
                this.setState({
                    bottom: 20
                });
                this.props.setFoxStatus("running");
            },500);
        }
        return <div style={{bottom}} className={`fox-object ${foxStatus === "standing" ? "fox-standing" : "fox-running"}`}></div>
    }
}