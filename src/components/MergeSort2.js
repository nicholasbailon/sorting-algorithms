let speed = 0;

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

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
async function merge(arr, l, m, r) {
  // Find sizes of two subarrays to be merged
  let n1 = m - l + 1;
  let n2 = r - m;

  /* Create temp arrays */
  let L = [];
  let R = [];

  /*Copy data to temp arrays*/
  for (let i = 0; i < n1; ++i) L[i] = arr[l + i];
  for (let j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

  /* Merge the temp arrays */

  // Initial indexes of first and second subarrays
  let i = 0,
    j = 0;

  // Initial index of merged subarry array
  let k = l;
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

  /* Copy remaining elements of L[] if any */
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  /* Copy remaining elements of R[] if any */
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

// Main function that sorts arr[l..r] using
// merge()
async function sort(arr, low, right) {
  if (low < right) {
    // Find the middle point
    let m = (low + right) / 2;

    // Sort first and second halves
    sort(arr, low, m);
    sort(arr, m + 1, right);

    // Merge the sorted halves
    merge(arr, low, m, right);
  }
}

export async function mergeSort(arr, callbackUpdateChart, speedP) {
  speed = speedP;
  await sort(arr, 0, arr.length - 1);
  console.log(arr);
  callbackUpdateChart(arr.slice(), setColorsToNormal(arr.length), "Finished");
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
