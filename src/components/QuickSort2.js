let index = 0;
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
function partition(arr, low, high, algoSteps) {
  const pivot = arr[high];
  algoSteps[0].values[++index] = arr.slice();
  algoSteps[0].colors[index] = setColorsToNormal(arr.length);
  algoSteps[0].colors[index][high] = pivotColor;
  algoSteps[0].texts[index] = "Select the pivot.";
  let i = low - 1; // index of smaller element
  for (let j = low; j < high; j++) {
    algoSteps[0].values[++index] = arr.slice();
    algoSteps[0].colors[index] = setColorsToNormal(arr.length);
    algoSteps[0].colors[index][high] = pivotColor;
    algoSteps[0].colors[index][j] = processingColor;
    algoSteps[0].colors[index][i] = processingColor;
    algoSteps[0].texts[index] = "Step right.";
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;

      algoSteps[0].values[++index] = arr.slice();
      algoSteps[0].colors[index] = setColorsToNormal(arr.length);
      algoSteps[0].colors[index][high] = pivotColor;
      algoSteps[0].colors[index][i] = processingColor;
      algoSteps[0].colors[index][j] = processingColor;

      // swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      algoSteps[0].values[++index] = arr.slice();
      algoSteps[0].colors[index] = setColorsToNormal(arr.length);
      algoSteps[0].colors[index][high] = pivotColor;
      algoSteps[0].colors[index][i] = swapColor;
      algoSteps[0].colors[index][j] = swapColor;
      algoSteps[0].texts[index] = "Swap.";
    }
  }

  algoSteps[0].values[++index] = arr.slice();
  algoSteps[0].colors[index] = setColorsToNormal(arr.length);
  algoSteps[0].colors[index][i + 1] = processingColor;
  algoSteps[0].colors[index][high] = processingColor;
  // swap arr[i+1] and arr[high] (or pivot)
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  algoSteps[0].values[++index] = arr.slice();
  algoSteps[0].colors[index] = setColorsToNormal(arr.length);
  //algoSteps[0].colors[index][high] = pivotColor;
  algoSteps[0].colors[index][i + 1] = swapColor;
  algoSteps[0].colors[index][high] = swapColor;
  algoSteps[0].texts[index] = "Swap.";

  return i + 1;
}

/* The main function that implements QuickSort() 
      arr[] --> Array to be sorted, 
      low  --> Starting index, 
      high  --> Ending index */
function sort(arr, low, high, algoSteps) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is  
              now at right place */
    let pi = partition(arr, low, high, algoSteps);

    // Recursively sort elements before
    // partition and after partition
    sort(arr, low, pi - 1, algoSteps);
    sort(arr, pi + 1, high, algoSteps);
  }
}

export function quickSort(arr, low, high, algoSteps) {
  index = -1;
  sort(arr, low, high, algoSteps);
}
