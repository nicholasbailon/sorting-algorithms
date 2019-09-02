let index = 0;

function bubbleSort(arr, steps, indexP) {
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

export default bubbleSort;
