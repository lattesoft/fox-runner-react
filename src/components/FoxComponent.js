import React from 'react';

export default class FoxComponent extends React.Component {
    render(){
        return <div className={`fox-object ${this.props.status === "standing" ? "fox-standing" : "fox-running"}`}></div>
    }
}