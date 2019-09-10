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

export function quickSort(arr, start, end, algoSteps) {
  index = -1;
  /*algoSteps[0].values[index] = arr.slice();
  algoSteps[0].colors[index] = setColorsToNormal(arr.size);
  index++;*/
  sortHelper(arr, start, end, algoSteps);
}

function sortHelper(arr, start, end, algoSteps) {
  if (start < end) {
    // You can learn about how the pivot value is derived in the comments below
    let pivot = partition(arr, start, end, algoSteps);

    // Make sure to read the below comments to understand why pivot - 1 and pivot + 1 are used
    // These are the recursive calls to quickSort
    sortHelper(arr, start, pivot - 1, algoSteps);
    sortHelper(arr, pivot + 1, end, algoSteps);
  }
}

function partition(arr, start, end, algoSteps) {
  let pivot = end;
  // Set i to start - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  // Succeeding comments will expound upon the above comment
  let i = start - 1;
  let j = start;
  algoSteps[0].values[++index] = arr.slice();
  algoSteps[0].colors[index] = setColorsToNormal(arr.length);
  algoSteps[0].colors[index][j] = processingColor;
  algoSteps[0].colors[index][pivot] = pivotColor;

  // Increment j up to the index preceding the pivot
  while (j < pivot) {
    // If the value is greater than the pivot increment j
    if (arr[j] > arr[pivot]) {
      j++;
      algoSteps[0].values[++index] = arr.slice();
      algoSteps[0].colors[index] = setColorsToNormal(arr.length);
      algoSteps[0].colors[index][j] = processingColor;
      algoSteps[0].colors[index][pivot] = pivotColor;
    }

    // When the value at arr[j] is less than the pivot:
    // increment i (arr[i] will be a value greater than arr[pivot]) and swap the value at arr[i] and arr[j]
    else {
      i++;
      algoSteps[0].values[++index] = arr.slice();
      algoSteps[0].colors[index] = setColorsToNormal(arr.length);
      algoSteps[0].colors[index][j] = processingColor;
      algoSteps[0].colors[index][i] = processingColor;
      algoSteps[0].colors[index][pivot] = pivotColor;
      swap(arr, j, i);
      if (j !== i) {
        algoSteps[0].values[++index] = arr.slice();
        algoSteps[0].colors[index] = setColorsToNormal(arr.length);
        algoSteps[0].colors[index][j] = swapColor;
        algoSteps[0].colors[index][i] = swapColor;
        algoSteps[0].colors[index][pivot] = pivotColor;
      }
      j++;
      algoSteps[0].values[++index] = arr.slice();
      algoSteps[0].colors[index] = setColorsToNormal(arr.length);
      algoSteps[0].colors[index][j] = processingColor;
      algoSteps[0].colors[index][pivot] = pivotColor;
    }
  }

  //The value at arr[i + 1] will be greater than the value of arr[pivot]
  swap(arr, i + 1, pivot);
  if (i + 1 !== pivot) {
    algoSteps[0].values[++index] = arr.slice();
    algoSteps[0].colors[index] = setColorsToNormal(arr.length);
    algoSteps[0].colors[index][i + 1] = swapColor;
    algoSteps[0].colors[index][pivot] = swapColor;
  }

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return i + 1;
}

function swap(arr, firstIndex, secondIndex) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}
