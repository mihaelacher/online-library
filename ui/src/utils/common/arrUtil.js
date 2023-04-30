export function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

export function unsetArrElement(key, array) {
  array.splice(array.indexOf(key), 1);
  return array;
}
