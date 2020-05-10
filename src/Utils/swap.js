export default function swap(arr, indexA, indexB) {
  const valueA = arr[indexA];
  const valueB = arr[indexB];
  return arr.map((value, index) => {
    if (index === indexA) {
      return valueB;
    }
    if (index === indexB) {
      return valueA;
    }
    return value;
  });
}
