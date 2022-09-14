export declare class ProofTree {
    private _rootProof;
    private _rootHash;
    private _yearProof;
    private _yearHash;
    private _monthProof;
    private _monthHash;
    constructor(rootProof: object, rootHash: string, yearProof: object, yearHash: string, monthProof: object, monthHash: string);
    get rootProof(): object;
    set rootProof(value: object);
    get rootHash(): string;
    set rootHash(value: string);
    get yearProof(): object;
    set yearProof(value: object);
    get yearHash(): string;
    set yearHash(value: string);
    get monthProof(): object;
    set monthProof(value: object);
    get monthHash(): string;
    set monthHash(value: string);
}
