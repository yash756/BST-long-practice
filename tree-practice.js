const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
    // Your code here
    let temp = rootNode;

    while (temp.left) {
        temp = temp.left;
    }

    return temp.val;
}

function findMaxBST(rootNode) {
    // Your code here
    let temp = rootNode;

    while (temp.right) {
        temp = temp.right;
    }

    return temp.val;
}

function findMinBT(rootNode) {
    // Your code here
    let stack = [];
    stack.push(rootNode);
    let min = Number.MAX_VALUE;

    while (stack.length > 0) {
        let temp = stack.pop();
        min = Math.min(min, temp.val);

        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }

    return min;
}

function findMaxBT(rootNode) {
    // Your code here
    let stack = [];
    stack.push(rootNode);
    let max = Number.MIN_VALUE;

    while (stack.length > 0) {
        let temp = stack.pop();
        max = Math.max(max, temp.val);

        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }

    return max;
}

function getHeight(rootNode) {
    // Your code here
    if (!rootNode) {
        return -1;
    }

    let height = 0;

    function checkHeight(node, tempheight) {
        if (!node.left && !node.right) {
            height = Math.max(height, tempheight);
            return;
        }

        if (node.left) checkHeight(node.left, tempheight + 1);
        if (node.right) checkHeight(node.right, tempheight + 1);
    }

    checkHeight(rootNode, 0);
    return height;
}

function balancedTree(rootNode) {
    // Your code here
    let stack = [];
    stack.push(rootNode);

    while (stack.length > 0) {
        let temp = stack.pop();

        let leftsub = temp.left;
        let rightsub = temp.right;

        let diff = Math.abs(getHeight(leftsub) - getHeight(rightsub));

        if (diff > 1) return false;

        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }

    return true;
}

function countNodes(rootNode) {
    // Your code here
    let count = 0;
    let stack = [];
    stack.push(rootNode);

    while (stack.length > 0) {
        let temp = stack.pop();
        count++;

        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }

    return count;
}

function getParentNode(rootNode, target) {
    // Your code here
    if (rootNode.val === target) return null;

    let stack = [];
    stack.push(rootNode);

    while (stack.length > 0) {
        let temp = stack.pop();

        if (temp.left) {
            if (temp.left.val === target) return temp;
            stack.push(temp.left);
        }

        if (temp.right) {
            if (temp.right.val === target) return temp;
            stack.push(temp.right);
        }
    }

    return undefined;
}

function inOrderPredecessor(rootNode, target) {
    // Your code here

    let nodes = [];

    function inorder(node) {
        if (node.left) inorder(node.left);
        nodes.push(node);
        if (node.right) inorder(node.right);
    }

    inorder(rootNode);

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].val === target) {
            if (i === 0) {
                return null;
            } else {
                return nodes[i - 1].val;
            }
        }
    }
}

function deleteNodeBST(rootNode, target) {
    // Do a traversal to find the node. Keep track of the parent
    // Undefined if the target cannot be found
    // Set target based on parent
    // Case 0: Zero children and no parent:
    //   return null
    // Case 1: Zero children:
    //   Set the parent that points to it to null
    // Case 2: Two children:
    //  Set the value to its in-order predecessor, then delete the predecessor
    //  Replace target node with the left most child on its right side,
    //  or the right most child on its left side.
    //  Then delete the child that it was replaced with.
    // Case 3: One child:
    //   Make the parent point to the child

    function getDetails(rootNode, target) {
        let parent = null;
        let toDelete = null;
        let child = null;

        let stack = [];
        stack.push(rootNode);

        while (stack.length > 0) {
            let temp = stack.pop();

            if (temp.val === target) break;

            if (temp.left) {
                if (temp.left.val === target) {
                    parent = temp;
                    toDelete = temp.left;
                    child = 'left';
                    break;
                }
                stack.push(temp.left);
            }

            if (temp.right) {
                if (temp.right.val === target) {
                    parent = temp;
                    toDelete = temp.right;
                    child = 'right';
                    break;
                }
                stack.push(temp.right);
            }
        }

        return [parent, toDelete, child];
    }

    let [parent, toDelete, child] = getDetails(rootNode, target);

    // to delete the root
    if (!parent && !toDelete) {
        toDelete = rootNode;
    }

    // delete a node with no children
    if (!toDelete.left && !toDelete.right) {
        if (child === 'left') parent.left = null;
        if (child === 'right') parent.right = null;
        return;
    }

    // delete a node with two children -- replace with inorder predecessor
    if (toDelete.left && toDelete.right) {
        let predecessor = inOrderPredecessor(rootNode, target);

        let [tempparent, temptoDelete, tempchild] = getDetails(
            rootNode,
            predecessor
        );

        if (tempchild === 'left') tempparent.left = null;
        if (tempchild === 'right') tempparent.right = null;

        toDelete.val = predecessor;
        return;
    }

    // delete a node with one child
    if (toDelete.left) {
        if (child === 'left') parent.left = toDelete.left;
        if (child === 'right') parent.right = toDelete.left;
        return;
    } else if (toDelete.right) {
        if (child === 'left') parent.left = toDelete.right;
        if (child === 'right') parent.right = toDelete.right;
        return;
    }
}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST,
};
