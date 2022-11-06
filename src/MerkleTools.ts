// @ts-ignore
const { MerkleTree } = require('merkletreejs')
import * as crypto from 'crypto';

export class MerkleTools {
  private static _tree: typeof MerkleTree;

  public static initMT() {
    MerkleTools._tree = new MerkleTree([],{ hashType: 'sha256' });
  }

  public static concatHash(strings: string[]) {
    let longString = '';
    for (const s of strings) {
      longString += s;
    }
    return `${crypto.createHash('sha256').update(longString).digest('hex')}`;
  }

  public static calculateTree(list: string[]) {
    this._tree.resetTree();
    this._tree.addLeaves(list);
    let root = this._tree.getRoot()
    return this._tree.bufferToHex(root);
  }

  public static getProof(leaf: string): object {
    for (let i = 0; i < this._tree.getLeafCount(); i++) {
      if (this._tree.getLeaf(i).toString('hex') === leaf) {
        return this._tree.getProof(i);
      }
    }
    return null as any;
  }

  public static validateProof(proof: object, targetHash: string, merkleRoot: string): boolean {
    return this._tree.verify(proof, targetHash, merkleRoot);
  }
}
