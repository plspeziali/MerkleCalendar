import {CalendarNode} from "./CalendarNode";
import {StorageGroup} from "./StorageGroup";

export class LeafCalendar implements CalendarNode{
    private _hash: string;
    private _name: string;
    private _parent: CalendarNode;
    private _timestamp: Date;
    private _storageGroup: StorageGroup[];


    constructor(hash: string, name: string, parent: CalendarNode, timestamp: Date, storageGroup: StorageGroup[]) {
        this._hash = hash;
        this._name = name;
        this._parent = parent;
        this._timestamp = timestamp;
        this._storageGroup = storageGroup;
    }


    get hash(): string {
        return this._hash;
    }

    set hash(value: string) {
        this._hash = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get parent(): CalendarNode {
        return this._parent;
    }

    set parent(value: CalendarNode) {
        this._parent = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp(value: Date) {
        this._timestamp = value;
    }

    public getDay(): int{

    }

    get storageGroup(): StorageGroup[] {
        return this._storageGroup;
    }

    set storageGroup(value: StorageGroup[]) {
        this._storageGroup = value;
    }
}