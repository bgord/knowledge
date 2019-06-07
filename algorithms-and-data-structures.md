**Binary search**

Performed only on a sorted array.

`[1, 2, 3, 4, 5]`

Recursive version:

- go to the first and the last index of an array
- if either first or last array element matches the value, return start/end index
- if the distance between first and last index is 1, return null (no element found)
- calculate the distance between the first element, and the distance between the last element
- calculate the middle index
- if a value is closer to the first element, call the binary search with the first and the middle index
- if a value is closer to the last element, call the binary search with the middle and the end index

```js
function binarySearch(list, value, start, end) {
  if (list[start] === value) return start;
  if (list[end] === value) return end;

  if (end - start === 1) return null;

  const startDiff = Math.abs(value - list[start]);
  const endDiff = Math.abs(value - list[end]);

  const middle = Math.floor((start + end) / 2);

  if (startDiff <= endDiff) {
    return binarySearch(list, value, start, middle);
  }
  return binarySearch(list, value, middle, end);
}

module.exports = { binarySearch };
```

---
