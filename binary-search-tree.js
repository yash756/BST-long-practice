// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here
// Do not change this
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        // Your code here
        this.root = null;
    }

    insert(val, currentNode = this.root) {
        // Your code here
        let node = new TreeNode(val);

        if (!this.root) {
            this.root = node;
        } else if (val < currentNode.val) {
            if (currentNode.left === null) {
                currentNode.left = node;
            } else {
                this.insert(val, currentNode.left);
            }
        } else if (val > currentNode.val) {
            if (currentNode.right === null) {
                currentNode.right = node;
            } else {
                this.insert(val, currentNode.right);
            }
        }
    }

    search(val) {
        // Your code here
        let temp = this.root;

        while (temp) {
            if (temp.val === val) {
                return true;
            } else if (val < temp.val) {
                temp = temp.left;
            } else if (val > temp.val) {
                temp = temp.right;
            }
        }

        return false;
    }

    preOrderTraversal(currentNode = this.root) {
        // Your code here
        if (!currentNode) {
            return;
        }

        console.log(currentNode.val);
        this.preOrderTraversal(currentNode.left);
        this.preOrderTraversal(currentNode.right);
    }

    inOrderTraversal(currentNode = this.root) {
        // Your code here
        if (!currentNode) {
            return;
        }

        this.inOrderTraversal(currentNode.left);
        console.log(currentNode.val);
        this.inOrderTraversal(currentNode.right);
    }

    postOrderTraversal(currentNode = this.root) {
        // Your code here
        if (!currentNode) return;

        this.postOrderTraversal(currentNode.left);
        this.postOrderTraversal(currentNode.right);
        console.log(currentNode.val);
    }

    // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
        // your code here
        let queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            let temp = queue.shift();
            console.log(temp.val);

            if (temp.left) queue.push(temp.left);
            if (temp.right) queue.push(temp.right);
        }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
        // your code here
        let stack = [];
        stack.push(this.root);

        while (stack.length > 0) {
            let temp = stack.pop();
            console.log(temp.val);

            if (temp.left) stack.push(temp.left);
            if (temp.right) stack.push(temp.right);
        }
    }
}

module.exports = { BinarySearchTree, TreeNode };
