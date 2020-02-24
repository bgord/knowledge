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

**Tree**

```js
import uuid from "uuid/v4";

export class Tree {
  constructor() {
    this.struct = {
      root: {
        id: "trunk",
        type: "trunk",
        children: []
      }
    };
  }
  addNode(nodeToBeAdded) {
    if (nodeToBeAdded.parentId === "trunk") {
      this.struct.root.children.push(nodeToBeAdded);
      return this.struct;
    }

    const parentNode = this.findNode(
      this.struct.root,
      node => node.id === nodeToBeAdded.parentId && node.type === "directory"
    );

    if (!parentNode)
      throw new Error(
        `Directory node with id: ${nodeToBeAdded.parentId} not found.`
      );

    parentNode.children.push(nodeToBeAdded);
  }

  deleteNode(nodeToBeDeleted) {
    if (nodeToBeDeleted.parentId === "trunk") {
      const newChildren = this.struct.root.children.filter(
        node => node.id !== nodeToBeDeleted.id
      );
      this.struct.root.children = newChildren;
      return;
    }

    const parentNode = this.findNode(
      this.struct.root,
      node => node.id === nodeToBeDeleted.parentId
    );

    if (!parentNode)
      throw new Error(`Node with id: ${nodeToBeDeleted.id} not found.`);

    const newChildren = parentNode.children.filter(
      node => node.id !== nodeToBeDeleted.id
    );
    parentNode.children = newChildren;
    return;
  }

  updateNode(nodeToBeUpdated, payload) {
    if (nodeToBeUpdated.parentId === "trunk") {
      const newChildren = this.struct.root.children.map(node =>
        node.id === nodeToBeUpdated.id
          ? {
              ...nodeToBeUpdated,
              ...payload
            }
          : node
      );
      this.struct.root.children = newChildren;
      return;
    }

    const parentNode = this.findNode(
      this.struct.root,
      node => node.id === nodeToBeUpdated.parentId
    );

    if (!parentNode)
      throw new Error(`Node with id: ${nodeToBeUpdated.id} not found.`);

    const newChildren = parentNode.children.map(node =>
      node.id === nodeToBeUpdated.id
        ? {
            ...nodeToBeUpdated,
            ...payload
          }
        : node
    );
    parentNode.children = newChildren;
    return;
  }

  findNode(subTree, matchFn) {
    for (let node of subTree.children) {
      if (matchFn(node)) return node;

      if (node.children) {
        const childNode = this.findNode(node, matchFn);
        if (childNode) return childNode;
      }
    }
    return null;
  }
}

class Node {
  constructor(name, parentId) {
    this.id = uuid();
    this.name = name;
    this.parentId = parentId;

    const now = Date.now();

    this.created_at = now;
    this.updated_at = now;
  }
}

export class FileNode extends Node {
  constructor(name, parentId = "trunk") {
    super(name, parentId);
    this.type = "file";
  }
}

export class DirectoryNode extends Node {
  constructor(name, parentId = "trunk") {
    super(name, parentId);
    this.type = "directory";
    this.children = [];
    this.isCollapsed = false;
  }
}
```

---
