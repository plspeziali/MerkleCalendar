export declare class ProofTree {
    private _rootProof;
    private _rootHash;
    private _yearProof;
    private _yearHash;
    private _monthProof;
    private _monthHash;
    constructor(rootProof: any[], rootHash: string, yearProof: any[], yearHash: string, monthProof: any[], monthHash: string);
    get rootProof(): any[];
    set rootProof(value: any[]);
    get rootHash(): string;
    set rootHash(value: string);
    get yearProof(): any[];
    set yearProof(value: any[]);
    get yearHash(): string;
    set yearHash(value: string);
    get monthProof(): any[];
    set monthProof(value: any[]);
    get monthHash(): string;
    set monthHash(value: string);
}
