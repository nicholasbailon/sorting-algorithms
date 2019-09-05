import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { quickSort, getQuickSortInfo } from "./QuickSort";
import { bubbleSort, getBubbleSortInfo } from "./BubbleSort";

const dataSorting_01 = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
const dataSorting_02 = [
  100,
  95,
  90,
  85,
  80,
  75,
  70,
  65,
  60,
  55,
  50,
  45,
  40,
  35,
  30,
  25,
  20,
  15,
  10,
  5
];
const labels_01 = ["", "", "", "", "", "", "", "", "", ""];
const labels_02 = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];
const normalColor = "rgba(75, 192, 192, 0.6)";
const changedColor = "rgba(192, 75, 192, 0.6)";
const animationDuration = 1000;

let dataSorting = [];
let labels = [];
let steps = [[]];
let index = 0;
let speed = 1000;

class SortingChart extends Component {
  constructor(props) {
    super(props);

    dataSorting = dataSorting_01;
    labels = labels_01;

    this.state = {
      labels: labels_01,
      datasets: [
        {
          data: this.RandomizeChartData(false),
          borderWidth: 2,
          backgroundColor: normalColor
        }
      ]
    };
  }

  ChangeDataSize = sizeType => {
    switch (sizeType) {
      case "1":
        if (dataSorting.length === dataSorting_02.length) {
          for (let i = dataSorting_01.length; i < dataSorting_02.length; i++)
            this.chartReference.chartInstance.data.labels.pop();
        }

        dataSorting = dataSorting_01;
        labels = labels_01;
        break;
      case "2":
        if (dataSorting.length === dataSorting_01.length) {
          for (let i = dataSorting_01.length; i < dataSorting_02.length; i++)
            this.chartReference.chartInstance.data.labels.push("");
        }
        dataSorting = dataSorting_02;
        labels = labels_02;
        break;
      case "3":
        break;
      default:
        break;
    }
    this.RandomizeChartData(true);
  };

  ChangeSpeed = speedType => {
    switch (speedType) {
      case "1":
        speed = 1000;

        break;
      case "2":
        speed = 500;
        break;
      case "3":
        speed = 250;
        break;
      default:
        break;
    }
  };

  Sort = sortType => {
    index = 0;
    steps = [[]];
    steps[index++] = Array.from(
      this.chartReference.chartInstance.data.datasets[0].data
    );
    if (sortType === "quicksort") {
      quickSort(
        this.chartReference.chartInstance.data.datasets[0].data,
        0,
        this.chartReference.chartInstance.data.datasets[0].data.length - 1,
        steps,
        index
      );
      this.props.algorithmInfoCallback(getQuickSortInfo());
    } else if (sortType === "bubblesort") {
      bubbleSort(
        this.chartReference.chartInstance.data.datasets[0].data,
        steps,
        index
      );
      this.props.algorithmInfoCallback(getBubbleSortInfo());
    } else if (sortType === "mergesort") {
      //this.props.algorithmInfoCallback(getMergeSortInfo());
    }
    if (steps.length > 1) this.showSteps();
  };

  showSteps = () => {
    var i = 1;
    var self = this;
    this.chartReference.chartInstance.options.animation.duration = 0;
    var intervalId = setInterval(function() {
      if (i === steps.length - 1) {
        setTimeout(function() {
          self.chartReference.chartInstance.data.datasets[0].backgroundColor = normalColor;
          self.chartReference.chartInstance.update();
          self.props.progressBarCallback(0);
        }, 1000);
        clearInterval(intervalId);
      }
      //console.log(steps[i]);
      self.props.progressBarCallback((i * 100) / (steps.length - 1));
      self.chartReference.chartInstance.data.datasets[0].data = steps[i];

      if (i - 1 >= 0) {
        let colors = [steps.length];
        for (let y = 0; y < steps[i].length; y++) {
          colors[y] =
            steps[i - 1][y] === steps[i][y] ? normalColor : changedColor;
        }
        self.chartReference.chartInstance.data.datasets[0].backgroundColor = colors;
      }

      self.chartReference.chartInstance.update();
      i++;
    }, speed);
  };

  // this function randomizes the elements in the array using a modern implementation of
  // Fisher and Yates' shuffle algorithm, time complexity O(n)
  RandomizeChartData = calledFromParent => {
    for (let i = dataSorting.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * dataSorting.length);
      const temp = dataSorting[i];
      dataSorting[i] = dataSorting[j];
      dataSorting[j] = temp;
    }
    if (calledFromParent) {
      this.chartReference.chartInstance.options.animation.duration = animationDuration;
      this.chartReference.chartInstance.data.datasets[0].data = dataSorting;
      this.chartReference.chartInstance.labels = labels;
      this.chartReference.chartInstance.clear();
      this.chartReference.chartInstance.update();
    } else {
      return dataSorting;
    }
  };

  render() {
    return (
      <article className="mt-4">
        <Bar
          ref={reference => (this.chartReference = reference)}
          data={this.state}
          options={{
            title: {
              display: false
            },
            scales: {
              yAxes: [{ ticks: { beginAtZero: true, display: false } }]
            },
            legend: {
              display: false
            },
            maintainAspectRatio: true
          }}
        />
      </article>
    );
  }
}

export default SortingChart;
