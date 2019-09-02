import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import quickSort from "./QuickSort";
import bubbleSort from "./BubbleSort";

let dataSorting = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
let steps = [[]];
let index = 0;
const normalColor = "rgba(75, 192, 192, 0.6)";
const changedColor = "rgba(192, 75, 192, 0.6)";
const animationDuration = 1000;

class SortingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ["", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          data: this.RandomizeChartData(false),
          borderWidth: 2,
          backgroundColor: normalColor
        }
      ]
    };
  }

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
    } else if (sortType === "bubblesort") {
      bubbleSort(
        this.chartReference.chartInstance.data.datasets[0].data,
        steps,
        index
      );
    }
    this.showSteps();
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
        }, 1000);
        clearInterval(intervalId);
      }
      console.log(steps[i]);
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
    }, 1000);
  };

  // this function randomizes the elements in the array using a modern implementation of
  // Fisher and Yates' shuffle algorithm, time complexity O(n)
  RandomizeChartData = calledFromParent => {
    dataSorting = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    for (let i = dataSorting.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * dataSorting.length);
      const temp = dataSorting[i];
      dataSorting[i] = dataSorting[j];
      dataSorting[j] = temp;
    }
    if (calledFromParent) {
      this.chartReference.chartInstance.options.animation.duration = animationDuration;
      this.chartReference.chartInstance.data.datasets[0].data = dataSorting;
      this.chartReference.chartInstance.update();
    } else {
      return dataSorting;
    }
  };

  render() {
    return (
      <Bar
        ref={reference => (this.chartReference = reference)}
        data={this.state}
        options={{
          title: {
            display: false,
            text: "Quick sort",
            fontSize: 20
          },
          scales: {
            yAxes: [{ ticks: { beginAtZero: true, display: false } }]
          },
          layout: {
            padding: {
              left: 100,
              right: 100,
              top: 20,
              bottom: 100
            }
          },
          legend: {
            display: false
          },
          maintainAspectRatio: true
        }}
      />
    );
  }
}

export default SortingChart;
