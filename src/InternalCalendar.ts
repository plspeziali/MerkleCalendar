import {LeafCalendar} from './LeafCalendar';
import {Category} from './Category';
import {CalendarNode} from './CalendarNode';
import {MerkleTools} from "./MerkleTools";

export class InternalCalendar implements CalendarNode{

    private _category: Category;    //0: Open or Closed Subtree root, 1: year, 2: month
    private _children: CalendarNode[];
    private _name: string;
    private _hash: string;
    private _parent: CalendarNode;


    constructor(name: string, category: number, parent: CalendarNode) {
        this._name = name;
        this._category = category;
        this._parent = parent;
        this._children = [];
        this._hash = null;
    }

    public addChild(node: CalendarNode) {
        this._children.push(node);
        if (this._category == 2) {
            this._children.sort((a: LeafCalendar, b: LeafCalendar) => a.timestamp.getTime() - b.timestamp.getTime() );
        } else {
            this._children.sort((a: InternalCalendar, b: InternalCalendar) => a.name.localeCompare(b.name));
        }
    }

    public calculateHash() {
        let list = [];
        for (let el of this.children) {
            if (el.hash != null) {
                list.push(el.hash);
            }
        }
        this._hash = MerkleTools.calculateTree(list);
    }

    get category(): Category {
        return this._category;
    }

    get children(): CalendarNode[] {
        return this._children;
    }

    get name(): string {
        return this._name;
    }

    get hash(): string {
        return this._hash;
    }

    get parent(): CalendarNode {
        return this._parent;
    }

    set name(value: string) {
        this._name = value;
    }

    set hash(value: string) {
        this._hash = value;
    }

    getChildrenHashes(): string[] {
        let children = this.children;
        let hashes = [];
        for (let c of children) {
            hashes.push(c.hash);
        }
        return hashes;
    }

    getChildByNum(num) : CalendarNode{
        return this.children[num];
    }

    getChildByName(name) : CalendarNode{
        for (let el of this.children) {
            if (el.name == name) {
                return el;
            }
        }
        return null;
    }

    indexOf(name) : number{
        return this.children.indexOf(name);
    }

    findNode(hash) : CalendarNode{
        for (let el of this.children) {
            if (el.hash == hash && this.category == 2) {
                return el;
            }
            let ret = null;
            if (this.category != 2) {
                ret = (el as InternalCalendar).findNode(hash);
            }
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

}