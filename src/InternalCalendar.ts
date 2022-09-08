import {LeafCalendar} from './LeafCalendar';
import {Category} from './Category';
import {CalendarNode} from './CalendarNode';

export class InternalCalendar implements CalendarNode{

    private category: Category;    //0: Open or Closed Subtree root, 1: year, 2: month
    private children: CalendarNode[];
    name: string;
    hash: string;
    parent: CalendarNode;


    constructor(name: string, category: number, parent: CalendarNode) {
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.children = [];
        this.hash = null;
    }

    public addChild(node: CalendarNode) {
        this.children.push(node);
        if (this.category == 2) {
            this.children.sort(function (a: LeafCalendar, b: LeafCalendar) {
                return a.timestamp - b.timestamp;
            });
        } else {
            this.children.sort(function (a: InternalCalendar, b: InternalCalenda) {
                return a.getName() - b.getName();
            });
        }
    }

    calculateHash() {
        merkleTools.resetTree();
        let list = [];
        for (let el of this.#children) {
            if (el.getHash() != null) {
                list.push(el.getHash());
            }
        }
        if (list.length != 0) {
            merkleTools.addLeaves(list);
            merkleTools.makeTree()
            this.#hash = merkleTools.getMerkleRoot().toString('hex');
        }
    }

    getName() {
        return this.#name;
    }

    getCategory() {
        return this.#category;
    }

    getParent() {
        return this.#parent;
    }

    getHash() {
        return this.#hash;
    }

    setHash(hash) {
        this.#hash = hash;
    }

    getChildren() {
        return this.#children;
    }

    getChildrenHashes() {
        let children = this.getChildren();
        const hashes = [];
        for (let c of children) {
            hashes.push(c.getHash());
        }
        return hashes;
    }

    getChildByNum(num) {
        return this.#children[num];
    }

    getChildByName(name) {
        for (let el of this.#children) {
            if (el.getName() == name) {
                return el;
            }
        }
        return null;
    }

    indexOf(name) {
        return this.#children.indexOf(name);
    }

    findNode(hash) {
        for (let el of this.#children) {
            if (el.getHash() == hash && this.#category == 2) {
                return el;
            }
            let ret = null;
            if (this.#category != 2) {
                ret = el.findNode(hash);
            }
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

}