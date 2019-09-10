let speed = 0;

const algoInfo = [
  {
    name: "Quick Sort",
    description:
      "Quick sort is an efficient divide and conquer sorting algorithm. Average case time complexity of Quick Sort is O(nlog(n)) with worst case time complexity being O(n^2). The steps involved in Quick Sort are: Choose an element to serve as a pivot, in this case, the last element of the array is the pivot. Partitioning: Sort the array in such a manner that all elements less than the pivot are to the left, and all elements greater than the pivot are to the right. Call Quicksort recursively, taking into account the previous pivot to properly subdivide the left and right arrays.",
    timeComplexity: "Time complexity: O(nlog(n))"
  }
];

const normalColor = "rgba(75, 192, 192, 0.6)";
const pivotColor = "rgba(0, 192, 0, 0.6)";
const processingColor = "rgba(175, 175, 0, 0.6)";
const swapColor = "rgba(192, 0, 0, 0.6)";

export function getQuickSortInfo() {
  return algoInfo;
}

function setColorsToNormal(size) {
  let array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = normalColor;
  }
  return array;
}

/* This function takes last element as pivot, 
       places the pivot element at its correct 
       position in sorted array, and places all 
       smaller (smaller than pivot) to left of 
       pivot and all greater elements to right 
       of pivot */
async function partition(arr, low, high, callbackUpdateChart) {
  const pivot = arr[high];
  let colors = setColorsToNormal(arr.length);
  colors[high] = pivotColor;
  callbackUpdateChart(arr.slice(), colors, "Select the pivot");
  await wait(speed);

  let i = low - 1; // index of smaller element
  for (let j = low; j < high; j++) {
    colors = setColorsToNormal(arr.length);
    colors[high] = pivotColor;
    colors[i] = processingColor;
    colors[j] = processingColor;
    callbackUpdateChart(
      arr.slice(),
      colors,
      "Processing range: indexes[" + i + ", " + j + "]"
    );
    await wait(speed);
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;

      colors = setColorsToNormal(arr.length);
      colors[high] = pivotColor;
      colors[i] = processingColor;
      colors[j] = processingColor;
      callbackUpdateChart(arr.slice(), colors, "Step right and compare");
      await wait(speed);

      // swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      colors = setColorsToNormal(arr.length);
      colors[high] = pivotColor;
      colors[i] = swapColor;
      colors[j] = swapColor;
      callbackUpdateChart(arr.slice(), colors, "Swap");
      await wait(speed);
    }
  }

  colors = setColorsToNormal(arr.length);
  colors[high] = pivotColor;
  colors[i + 1] = processingColor;
  colors[high] = processingColor;
  callbackUpdateChart(arr.slice(), colors, "Step right and compare to pivot");
  await wait(speed);

  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  colors = setColorsToNormal(arr.length);
  colors[high] = pivotColor;
  colors[i + 1] = swapColor;
  colors[high] = swapColor;
  callbackUpdateChart(arr.slice(), colors, "Swap with pivot");
  await wait(speed);

  return i + 1;
}

/* The main function that implements QuickSort() 
      arr[] --> Array to be sorted, 
      low  --> Starting index, 
      high  --> Ending index */
async function sort(arr, low, high, callbackUpdateChart) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is  
              now at right place */
    let pi = await partition(arr, low, high, callbackUpdateChart);

    // Recursively sort elements before
    // partition and after partition
    await sort(arr, low, pi - 1, callbackUpdateChart);
    await sort(arr, pi + 1, high, callbackUpdateChart);
  }
}

export async function quickSort(arr, low, high, callbackUpdateChart, speedP) {
  speed = speedP;
  await sort(arr, low, high, callbackUpdateChart);
  callbackUpdateChart(arr.slice(), setColorsToNormal(arr.length), "Finished");
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
