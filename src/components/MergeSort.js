let speed = 0;
let startArray = [];

const algoInfo = [
  {
    name: "Merge Sort",
    description:
      "Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The major portion of the algorithm is given two sorted arrays, we have to merge them into a single sorted array.",
    timeComplexity: "Time complexity: O(nlog(n))"
  }
];

const normalColor = "rgba(75, 192, 192, 0.6)";
const pivotColor = "rgba(0, 192, 0, 0.6)";
const processingColor = "rgba(175, 175, 0, 0.6)";
const swapColor = "rgba(192, 0, 0, 0.6)";

export function getMergeSortInfo() {
  return algoInfo;
}

function setColorsToNormal(size) {
  let array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = normalColor;
  }
  return array;
}

/* Function to merge the two haves arr[l..m] and 
    arr[m+1..r] of array arr[] */
async function merge(arr, l, m, r) {
  let i, j, k;
  let n1 = m - l + 1;
  let n2 = r - m;

  /* create temp arrays */
  let L = new Array(n1);
  let R = new Array(n2);

  /* Copy data to temp arrays L[] 
        and R[] */
  for (i = 0; i < n1; i++) L[i] = arr[l + i];
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  /* Merge the temp arrays back into 
        arr[l..r]*/
  i = 0;
  j = 0;
  k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  /* Copy the remaining elements of  
        L[], if there are any */
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  /* Copy the remaining elements of 
        R[], if there are any */
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

export async function mergeSort(arr, n, callbackUpdateChart, speedP) {
  speed = speedP;
  // For current size of subarrays to
  // be merged curr_size varies from
  // 1 to n/2
  let curr_size;

  // For picking starting index of
  // left subarray to be merged
  let left_start;

  // Merge subarrays in bottom up
  // manner. First merge subarrays
  // of size 1 to create sorted
  // subarrays of size 2, then merge
  // subarrays of size 2 to create
  // sorted subarrays of size 4, and
  // so on.
  for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    // Pick starting point of different
    // subarrays of current size
    for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      // Find ending point of left
      // subarray. mid+1 is starting
      // point of right
      let mid = Math.min(left_start + curr_size - 1, n - 1);

      let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

      // Merge Subarrays arr[left_start...mid]
      // & arr[mid+1...right_end]
      await merge(arr, left_start, mid, right_end, callbackUpdateChart);

      let colors = setColorsToNormal(arr.length);
      colors[left_start] = pivotColor;
      colors[right_end] = pivotColor;
      callbackUpdateChart(
        arr.slice(),
        colors,
        "Step right and compare to pivot"
      );
      await wait(speed);
    }
  }

  callbackUpdateChart(arr.slice(), setColorsToNormal(arr.length), "Finished");
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
