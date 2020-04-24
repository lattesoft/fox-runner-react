import React, { Component } from 'react'
import {
    Card, CardBody, Button,Container, Row, Col,Input
  } from 'reactstrap';

export default class FormComponent extends Component {
    constructor(){
        super();
        this.state = {
            name: ""
        }
    }

    __onChageHandler = (e)=>{
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{size: 8, offset: 2}}>
                        <div style={{marginTop: 100}}>
                            <Card>
                                <CardBody>
                                    <Input onChange={this.__onChageHandler} value={this.state.name}  style={{marginBottom: 10}} type="text" name="name" placeholder="Your Name" />
                                    <Button onClick={()=>{
                                        this.props.setFoxName(this.state.name);
                                    }} color="primary" style={{width: "100%"}}>Let's start!</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
