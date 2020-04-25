import React, { Component } from 'react'
import {
    Card, CardBody, Button, Container, Row, Col, Input
} from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

export default class FormComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: ""
        }
    }

    __onChageHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <div style={{ marginTop: 100 }}>
                            <Card>
                                <CardBody>
                                    <Input onChange={this.__onChageHandler} value={this.state.name} style={{ marginBottom: 10 }} type="text" name="name" placeholder="Your Name" />
                                    <Row>
                                        <Col md={6}>
                                            <Button onClick={() => {
                                                this.props.setFoxInfo({
                                                    name: this.state.name
                                                });
                                            }} color="info" style={{ width: "100%" }}>Let's start!</Button>
                                        </Col>
                                        <Col md={6}>
                                            <FacebookLogin
                                                appId="2658551874377386"
                                                callback={(res) => {
                                                    axios.get("https://graph.facebook.com/v6.0/me?fields=id%2Cfirst_name&access_token=" + res.accessToken).then((resProfile) => {
                                                        let {first_name,id} = resProfile.data
                                                        this.props.setFoxInfo({
                                                            name: first_name,
                                                            image: `http://graph.facebook.com/${id}/picture?type=large`
                                                        });
                                                    });

                                                }}
                                                cssClass="btn btn-primary btn-facebook"
                                                icon="fa-facebook"
                                            />
                                        </Col>
                                    </Row>



                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
