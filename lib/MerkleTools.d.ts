export declare class MerkleTools {
    private static _tree;
    static initMT(): void;
    static concatHash(strings: string[]): string;
    static calculateTree(list: string[]): any;
    static getProof(leaf: string): object;
    static validateProof(proof: object, targetHash: string, merkleRoot: string): boolean;
}
