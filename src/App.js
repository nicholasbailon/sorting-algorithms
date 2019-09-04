import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SortingChart from "./components/SortingChart";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import CustomNavBar from "./components/CustomNavBar";

const helpInfo = [
  {
    name: "Quick guide",
    description:
      "Pick a sorting algorithm and see how it works. You can change the size to visualize the algorithm with more/less data. Shuffle rearrages the data.",
    timeComplexity: "Have fun!"
  }
];

var divStyle = {
  height: "1px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.changeDataSize = this.changeDataSize.bind(this);
    this.state = {
      progressBar: 0,
      algoName: helpInfo[0].name,
      algoDescription: helpInfo[0].description,
      algoTimeComplexity: helpInfo[0].timeComplexity
    };
  }

  shuffle = () => {
    this.refs.sortingChartRef.RandomizeChartData(true);
  };

  changeDataSize(eventKey) {
    this.refs.sortingChartRef.ChangeDataSize(eventKey);
  }

  sort(eventKey) {
    this.refs.sortingChartRef.Sort(eventKey);
  }

  updateProgressBar = val => {
    this.setState({ progressBar: val });
  };

  updateAlgorithmInfo = algoInfo => {
    this.setState({
      algoName: algoInfo[0].name,
      algoDescription: algoInfo[0].description,
      algoTimeComplexity: algoInfo[0].timeComplexity
    });
  };

  render() {
    return (
      <React.Fragment>
        <CustomNavBar></CustomNavBar>
        <div className="App">
          <Container>
            <SortingChart
              ref="sortingChartRef"
              progressBarCallback={this.updateProgressBar}
              algorithmInfoCallback={this.updateAlgorithmInfo}
            />
          </Container>
          <Container className="mb-4">
            <Row>
              <Col>
                <Button variant="outline-primary" onClick={this.shuffle}>
                  Shuffle
                </Button>
              </Col>
              <Col>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Data size"
                  onSelect={this.changeDataSize}
                >
                  <Dropdown.Item eventKey="1">Small</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Medium</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Large</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Sort"
                  onSelect={this.sort}
                >
                  <Dropdown.Item eventKey="quicksort">Quick sort</Dropdown.Item>
                  <Dropdown.Item eventKey="mergesort">Merge sort</Dropdown.Item>
                  <Dropdown.Item eventKey="bubblesort">
                    Bubble sort
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col className="align-self-center">
                <ProgressBar now={this.state.progressBar} style={divStyle} />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <div className="card bg-light mb-3">
                  <h4 className="card-header">{this.state.algoName}</h4>
                  <div className="card-body">
                    <p className="card-text">{this.state.algoDescription}</p>
                    <hr />
                    <h5>{this.state.algoTimeComplexity}</h5>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
