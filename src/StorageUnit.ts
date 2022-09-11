export class StorageUnit {

    private _hash: string;
    private _uuid: string;

    constructor(hash: string, uuid: string) {
        this._hash = hash;
        this._uuid = uuid;
    }

    get hash(): string {
        return this._hash;
    }

    set hash(value: string) {
        this._hash = value;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }
}