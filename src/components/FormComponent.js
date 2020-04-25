import React, { Component } from "react";
import { Card, CardBody, Button, Container, Row, Col, Input } from "reactstrap";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import API from "../constants/API";
import { getFacebookProfile } from "../utils/user";
import { withRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom';
class FormComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  __onChageHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <div style={{ marginTop: 100 }}>
              <Card>
                <CardBody>
                  <Input
                    onChange={this.__onChageHandler}
                    value={this.state.name}
                    style={{ marginBottom: 10 }}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  <Row>
                    <Col md={6}>
                      <Button
                        onClick={() => {
                          this.props.setFoxInfo({
                            name: this.state.name,
                          });
                        }}
                        color="info"
                        style={{ width: "100%" }}
                      >
                        Let's start!
                      </Button>
                    </Col>
                    <Col md={6}>
                      <FacebookLogin
                        appId="2658551874377386"
                        callback={async (res) => {
                          const profile = await getFacebookProfile(
                            res.accessToken
                          );
                          this.props.setFoxInfo({
                            name: profile.first_name,
                            image: `http://graph.facebook.com/${profile.id}/picture?type=large`,
                          });
                          this.props.history.push("/start");
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
    );
  }
}


export default withRouter(FormComponent);
