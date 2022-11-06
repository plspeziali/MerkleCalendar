export declare class MerkleTools {
    private static _tree;
    static initMT(): void;
    static concatHash(strings: string[]): string;
    static calculateTree(list: string[]): string;
    static getProof(leaf: string): object;
    static validateProof(proof: any[], targetHash: string, merkleRoot: string): boolean;
}
