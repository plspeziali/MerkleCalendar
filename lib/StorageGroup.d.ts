import { StorageUnit } from './StorageUnit';
export declare class StorageGroup {
    private _hash;
    private _map;
    constructor(hash: string, map: StorageUnit[]);
    get hash(): string;
    set hash(value: string);
    get map(): StorageUnit[];
    set map(value: StorageUnit[]);
    addToSG(o: StorageUnit): void;
}
