export default function toIndexMap(arr) {
  return arr.reduce((res, item, index) => {
    res[item] = index;
    return res;
  }, {});
}
