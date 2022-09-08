// @ts-ignore
import * as MerkleTree from '../node_modules/merkle-tools/merkletools';

export class MerkleTools{

    private static _tree: MerkleTree;

    public static initMT() {
        MerkleTools._tree =  new MerkleTree({hashType: 'sha256'});
    }

    static get tree(): MerkleTree {
        return this._tree;
    }

    static set tree(value: MerkleTree) {
        this._tree = value;
    }
}
