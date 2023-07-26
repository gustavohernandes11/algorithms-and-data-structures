export type NullableBinaryNode = BinaryNode | null
export type ValidValueType = number

export class BinaryNode {
    key: ValidValueType
    right: NullableBinaryNode
    left: NullableBinaryNode

    constructor(
        key: ValidValueType,
        right: NullableBinaryNode = null,
        left: NullableBinaryNode = null
    ) {
        this.key = key
        this.right = right
        this.left = left
    }
}
