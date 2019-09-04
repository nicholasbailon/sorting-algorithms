let index = 0;
const algoInfo = [
  {
    name: "Bubble Sort",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order. This is a very slow sorting algorithm compared to algorithms like quicksort, with worst-case complexity O(n^2). However, the tradeoff is that bubble sort is one of the easiest sorting algorithms to implement from scratch.",
    timeComplexity: "Time complexity: O(n^2)"
  }
];

export function getBubbleSortInfo() {
  return algoInfo;
}

export function bubbleSort(arr, steps, indexP) {
  index = indexP;
  sort(arr, steps);
}

function sort(arr, steps) {
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        let temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
        sorted = false;

        steps[index] = Array.from(arr);
        index++;
      }
    }
  }
}
