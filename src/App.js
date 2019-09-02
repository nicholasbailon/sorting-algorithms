import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SortingChart from "./components/SortingChart";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

var divStyle = {
  height: "1px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  shuffle = () => {
    this.refs.sortingChartRef.RandomizeChartData(true);
  };

  sort(eventKey) {
    this.refs.sortingChartRef.Sort(eventKey);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="mt-4">
            <Col>
              <h1 className="text-center">Sorting Algorithms</h1>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-center">
              <Button variant="outline-primary" onClick={this.shuffle}>
                Shuffle
              </Button>
            </Col>
            <Col className="text-center">
              <DropdownButton
                id="dropdown-basic-button"
                title="Sort"
                onSelect={this.sort}
              >
                <Dropdown.Item eventKey="quicksort">Quick sort</Dropdown.Item>
                <Dropdown.Item eventKey="mergesort">Merge sort</Dropdown.Item>
                <Dropdown.Item eventKey="bubblesort">Bubble sort</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col className="align-self-center">
              <ProgressBar now={0} style={divStyle} />
            </Col>
          </Row>
        </Container>
        <Container fluid="true">
          <SortingChart ref="sortingChartRef" />
        </Container>
      </div>
    );
  }
}

export default App;
