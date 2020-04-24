import React from 'react';
import { Tooltip } from 'reactstrap';
import {withRouter} from 'react-router-dom';

class FoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foxStatus: null,
            bottom: null,
            isPopoverOpen: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        let bottom = 20;
        if (props.foxStatus === "jumping") {
            bottom = 150;
        }
        return {
            bottom,
            foxStatus: props.foxStatus
        };
    }

    componentDidMount() {
        if(!this.props.foxInfo.name){
            this.props.history.push("/");
        }
        this.setState({
            isPopoverOpen: true,
        });
    }

    render() {
        let { bottom, foxStatus } = this.state;
        if (foxStatus === "jumping") {
            console.log("jumping");
            setTimeout(() => {
                this.setState({
                    bottom: 20
                });
                this.props.setFoxStatus("running");
            }, 500);
        }
        return (
            <div id="foxObject" style={{ bottom }} className={`fox-object ${foxStatus === "standing" ? "fox-standing" : "fox-running"}`}>
                {
                    this.props.foxInfo.name &&
                    <Tooltip placement="top" isOpen={this.state.isPopoverOpen} target={"foxObject"} >{this.props.foxInfo.name}</Tooltip>
                }
            </div>
        )
    }
}

export default withRouter(FoxComponent);