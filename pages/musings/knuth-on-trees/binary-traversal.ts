import { TreeNode } from 'ai-ui-components/Tree';

// All of these algorithms assume there are at most two children for a node.

export function inOrder<T extends TreeNode<T>>(
  node: T,
  callback: (node: T) => void
): void {
  let left: T | undefined, right: T | undefined;

  if (node.children) {
    [left, right] = node.children;
  }

  if (left) {
    inOrder(left, callback);
  }

  callback(node);

  if (right) {
    inOrder(right, callback);
  }
}

export function preOrder<T extends TreeNode<T>>(
  node: T,
  callback: (node: T) => void
): void {
  let left: T | undefined, right: T | undefined;

  if (node.children) {
    [left, right] = node.children;
  }

  callback(node);

  if (left) {
    inOrder(left, callback);
  }

  if (right) {
    inOrder(right, callback);
  }
}

export function postOrder<T extends TreeNode<T>>(
  node: T,
  callback: (node: T) => void
): void {
  let left: T | undefined, right: T | undefined;

  if (node.children) {
    [left, right] = node.children;
  }

  if (left) {
    inOrder(left, callback);
  }

  if (right) {
    inOrder(right, callback);
  }

  callback(node);
}
