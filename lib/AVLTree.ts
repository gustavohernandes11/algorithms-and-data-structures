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

    count() {
        let _count = 0
        super.inOrderTranverse(() => _count++)
        return _count
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

    rotationLL(node: NullableBinaryNode): NullableBinaryNode {
        if (node == null) return null

        const temp = node.left
        if (temp != null) {
            node.left = temp.right
            temp.right = node
        }
        return temp
    }

    rotationRR(node: NullableBinaryNode): NullableBinaryNode {
        if (node == null) return null

        const temp = node.right
        if (temp != null) {
            node.right = temp.left
            temp.left = node
        }
        return temp
    }

    rotationRL(node: NullableBinaryNode): NullableBinaryNode {
        if (node == null) return null

        if (node.right != null) {
            node.right = this.rotationLL(node.right)
        }
        return this.rotationRR(node)
    }

    rotationLR(node: NullableBinaryNode): NullableBinaryNode {
        if (node == null) return null

        if (node.left != null) {
            node.left = this.rotationRR(node.left)
        }
        return this.rotationLL(node)
    }

    unbalancedInsert(key: ValidValueType) {
        if (this.root == null) this.root = new BinaryNode(key)
        else super.insertNode(this.root, key)
    }

    insert(key: ValidValueType) {
        this.root = this.insertNode(this.root, key)
    }
    override insertNode(
        node: NullableBinaryNode,
        key: ValidValueType
    ): NullableBinaryNode {
        if (node == null) {
            return new BinaryNode(key)
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node // chave duplicada
        }

        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node!.left?.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node!.right?.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node)
            } else {
                return this.rotationRL(node)
            }
        }
        return node
    }
    removeNode(
        node: NullableBinaryNode,
        key: ValidValueType
    ): NullableBinaryNode {
        if (node == null) return null

        node = super.removeNode(node, key)

        if (node == null) return node

        const balanceFactor = this.getBalanceFactor(node)

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left)

            if (
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                return this.rotationLL(node)
            }

            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node)
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right)

            if (
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.rotationRR(node)
            }

            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node)
            }
        }

        return node
    }
}
