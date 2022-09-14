import * as MerkleTree from '../node_modules/merkle-tools/merkletools';
export declare class MerkleTools {
    private static _tree;
    static initMT(): void;
    static get tree(): MerkleTree;
    static set tree(value: MerkleTree);
    static concatHash(strings: string[]): string;
    static calculateTree(list: string[]): any;
    static getProof(leaf: string): object;
    static validateProof(proof: object, targetHash: string, merkleRoot: string): boolean;
}
