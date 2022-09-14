import { Category } from './Category';
import { CalendarNode } from './CalendarNode';
export declare class InternalCalendar implements CalendarNode {
    private _category;
    private _children;
    private _name;
    private _hash;
    private _parent;
    constructor(name: string, category: number, parent: CalendarNode);
    addChild(node: CalendarNode): void;
    calculateHash(): void;
    get category(): Category;
    get children(): CalendarNode[];
    get name(): string;
    set name(value: string);
    get parent(): CalendarNode;
    get hash(): string;
    set hash(value: string);
    getChildrenHashes(): string[];
    getChildByNum(num: number): CalendarNode;
    getChildByName(name: string): CalendarNode;
    indexOf(name: CalendarNode): number;
    findNode(hash: string): CalendarNode;
}
