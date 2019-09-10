const algoInfo = [
  {
    name: "Bubble Sort",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order. This is a very slow sorting algorithm compared to algorithms like quicksort, with worst-case complexity O(n^2). However, the tradeoff is that bubble sort is one of the easiest sorting algorithms to implement from scratch.",
    timeComplexity: "Time complexity: O(n^2)"
  }
];

let speed = 0;
const normalColor = "rgba(75, 192, 192, 0.6)";
const processingColor = "rgba(175, 175, 0, 0.6)";
const swapColor = "rgba(192, 0, 0, 0.6)";

function setColorsToNormal(size) {
  let array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = normalColor;
  }
  return array;
}

export function getBubbleSortInfo() {
  return algoInfo;
}

export async function bubbleSort(arr, callbackUpdateChart, speedP) {
  speed = speedP;
  await sort(arr, callbackUpdateChart);
  callbackUpdateChart(arr.slice(), setColorsToNormal(arr.length), "Finished");
}

async function sort(arr, callbackUpdateChart) {
  let sorted = false;
  let colors;

  while (!sorted) {
    sorted = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        colors = setColorsToNormal(arr.length);
        colors[i] = processingColor;
        colors[i - 1] = processingColor;
        callbackUpdateChart(
          arr.slice(),
          colors,
          "Processing index: " + i + " and index: " + (i - 1)
        );
        await wait(speed);

        let temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
        sorted = false;

        colors = setColorsToNormal(arr.length);
        colors[i] = swapColor;
        colors[i - 1] = swapColor;
        callbackUpdateChart(arr.slice(), colors, "Swap");
        await wait(speed);
      }
    }
  }
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
