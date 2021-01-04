const swap = (arr: any[], i: number, j: number) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export default swap;
