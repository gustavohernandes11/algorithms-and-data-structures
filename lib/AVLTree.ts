import { BinarySearchTree } from './BinarySearchTree'
import {
    BinaryNode,
    NullableBinaryNode,
    ValidValueType,
} from './models/BinaryNode'
import { Compare, defaultCompare } from './utils/defaultCompare'

export const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5,
}

export class AVLTree extends BinarySearchTree {
    root: NullableBinaryNode
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    getNodeHeight(node: NullableBinaryNode): number {
        if (node == null) {
            return -1
        }
        return (
            Math.max(
                this.getNodeHeight(node.left),
                this.getNodeHeight(node.right)
            ) + 1
        )
    }

    getBalanceFactor(node: NullableBinaryNode) {
        const heightDifference =
            this.getNodeHeight(node!?.left) - this.getNodeHeight(node!?.right)

        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }
    // override removeNode(
    //     node: NullableBinaryNode,
    //     key: ValidValueType
    // ): NullableBinaryNode {
    //     return null
    // }
    rotationLL(node: NullableBinaryNode) {
        const temp = node.left
        node.left = temp.right
        temp.right = node
        return temp
    }
    rotationRR(node: NullableBinaryNode) {
        const temp = node.right
        node.right = temp.left
        temp.left = node
        return temp
    }
    rotationRL(node: NullableBinaryNode) {
        if (!!node) node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }
    rotationLR(node: NullableBinaryNode) {
        if (!!node) node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }
    unbalancedInsert(key: ValidValueType) {
        if (this.root == null) this.root = new BinaryNode(key)
        else super.insertNode(this.root, key)
    }

    override insert(key: ValidValueType) {
        if (!this.root) {
            this.root = new BinaryNode(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    override insertNode(node: NullableBinaryNode, key: ValidValueType) {
        if (this.compareFn(node?.key, key) === Compare.BIGGER_THAN) {
            if (node?.left == null) {
                node!.left = new BinaryNode(key)
            } else {
                this.insertNode(node?.left, key)
            }
        } else {
            if (node?.right == null) {
                node!.right = new BinaryNode(key)
            } else {
                this.insertNode(node?.right, key)
            }
        }
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node!.left?.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node!.right?.key) === Compare.LESS_THAN) {
                node = this.rotationRR(node)
            } else {
                return this.rotationRL(node)
            }
        }
    }
}
