let index = 0;

function quickSort(arr, start, end, steps, indexP) {
  index = indexP;
  sortHelper(arr, start, end, steps);
}

function sortHelper(arr, start, end, steps) {
  if (start < end) {
    // You can learn about how the pivot value is derived in the comments below
    let pivot = partition(arr, start, end, steps);

    // Make sure to read the below comments to understand why pivot - 1 and pivot + 1 are used
    // These are the recursive calls to quickSort
    sortHelper(arr, start, pivot - 1, steps);
    sortHelper(arr, pivot + 1, end, steps);
  }
}

function partition(arr, start, end, steps) {
  let pivot = end;
  // Set i to start - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  // Succeeding comments will expound upon the above comment
  let i = start - 1;
  let j = start;

  // Increment j up to the index preceding the pivot
  while (j < pivot) {
    // If the value is greater than the pivot increment j
    if (arr[j] > arr[pivot]) {
      j++;
    }

    // When the value at arr[j] is less than the pivot:
    // increment i (arr[i] will be a value greater than arr[pivot]) and swap the value at arr[i] and arr[j]
    else {
      i++;
      swap(arr, j, i, steps);
      j++;
    }
  }

  //The value at arr[i + 1] will be greater than the value of arr[pivot]
  swap(arr, i + 1, pivot, steps);

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return i + 1;
}

function swap(arr, firstIndex, secondIndex, steps) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  if (index === 0 || JSON.stringify(arr) !== JSON.stringify(steps[index - 1])) {
    steps[index] = Array.from(arr);
    index++;
  }
}

export default quickSort;
