import { CalendarNode } from './CalendarNode';
import { StorageGroup } from './StorageGroup';
export declare class LeafCalendar implements CalendarNode {
    private _hash;
    private _name;
    private _parent;
    private _timestamp;
    private _storageGroup;
    constructor(hash: string, name: string, parent: CalendarNode, timestamp: Date, storageGroup: StorageGroup);
    get hash(): string;
    set hash(value: string);
    get name(): string;
    set name(value: string);
    get parent(): CalendarNode;
    set parent(value: CalendarNode);
    get timestamp(): Date;
    set timestamp(value: Date);
    get storageGroup(): StorageGroup;
    set storageGroup(value: StorageGroup);
}
