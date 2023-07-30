import {
    BinaryNode,
    NullableBinaryNode,
    ValidValueType,
} from './models/BinaryNode'
import { Compare, defaultCompare } from './utils'

export class BinarySearchTree {
    compareFn: Function
    root: NullableBinaryNode = null
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
    }

    insert(key: ValidValueType) {
        if (!this.root) {
            this.root = new BinaryNode(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    protected insertNode(node: BinaryNode, key: ValidValueType) {
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            if (node.left == null) {
                node.left = new BinaryNode(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new BinaryNode(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    search(key: ValidValueType) {
        if (this.root == null) return false
        return !!this.searchNode(key, this.root)
    }
    private searchNode(key: ValidValueType, node: NullableBinaryNode): any {
        if (node == null) return null
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            return this.searchNode(key, node.left)
        } else if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            return this.searchNode(key, node.right)
        } else {
            return node
        }
    }

    inOrderTranverse(callback: Function) {
        this.inOrderTranverseNode(this.root, callback)
    }

    private inOrderTranverseNode(
        node: NullableBinaryNode,
        callback?: Function
    ) {
        if (node != null) {
            this.inOrderTranverseNode(node.left, callback)
            if (!!callback) callback(node)
            this.inOrderTranverseNode(node.right, callback)
        }
    }

    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback)
    }

    private preOrderTraverseNode(node: NullableBinaryNode, callback: Function) {
        if (node != null) {
            if (!!callback) callback(node)
            this.inOrderTranverseNode(node.left, callback)
            this.inOrderTranverseNode(node.right, callback)
        }
    }

    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback)
    }

    private postOrderTraverseNode(
        node: NullableBinaryNode,
        callback: Function
    ) {
        if (node != null) {
            this.inOrderTranverseNode(node.left, callback)
            this.inOrderTranverseNode(node.right, callback)
            if (!!callback) callback(node)
        }
    }
    min(): NullableBinaryNode {
        return this.minNode(this.root)
    }
    private minNode(node: NullableBinaryNode): NullableBinaryNode {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    max(): NullableBinaryNode {
        if (!this.root) return null
        return this.maxNode(this.root)
    }
    private maxNode(node: BinaryNode): NullableBinaryNode {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
    remove(key: ValidValueType) {
        this.root = this.removeNode(this.root, key)
    }
    protected removeNode(
        node: NullableBinaryNode,
        key: ValidValueType
    ): NullableBinaryNode {
        if (node == null) return null
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            if (node.left == null && node.right == null) {
                node = null
                return node
            }

            if (node.left == null) {
                node = node.right
                return node
            } else if (node.right == null) {
                node = node.left
                return node
            }

            const aux = this.minNode(node.right)

            if (aux != null) {
                node.key = aux.key
                node.right = this.removeNode(node.right, aux.key)
            }
            return node
        }
    }
}
