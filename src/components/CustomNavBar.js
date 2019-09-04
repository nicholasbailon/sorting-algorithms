import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class CustomNavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="/site_icon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <span className="ml-2 h4">Sorting Algorithms</span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default CustomNavBar;
