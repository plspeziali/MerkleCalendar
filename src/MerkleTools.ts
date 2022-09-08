// @ts-ignore
import * as MerkleTree from '../node_modules/merkle-tools/merkletools';
import * as crypto from "crypto";

export class MerkleTools{

    private static _tree: MerkleTree;

    public static initMT() {
        MerkleTools._tree =  new MerkleTree({hashType: 'sha256'});
    }

    public static get tree(): MerkleTree {
        return this._tree;
    }

    public static set tree(value: MerkleTree) {
        this._tree = value;
    }

    public static concatHash(strings: string[]){
        let longString = "";
        for (const s of strings) {
            longString += s;
        }
        return `${crypto.createHash("sha256")
            .update(longString)
            .digest("hex")}`;
    }

    public static calculateTree(list: string[]) {
        this._tree.resetTree();
        this._tree.addLeaves(list);
        this._tree.makeTree()
        const root = this._tree.getMerkleRoot().toString('hex');
        return root;
    }

    public static getProof(leaf): Object {
        for (let i = 0; i < this._tree.getLeafCount(); i++) {
            if (this._tree.getLeaf(i).toString('hex') == leaf) {
                return this._tree.getProof(i);
            }
        }
        return null;
    }

    public static validateProof(proof: Object, targetHash: string, merkleRoot: string): boolean{
        return this._tree.validateProof(proof, targetHash, merkleRoot);
    }
}
