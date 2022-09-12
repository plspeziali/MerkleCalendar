import { LeafCalendar } from './LeafCalendar';
import { Category } from './Category';
import { CalendarNode } from './CalendarNode';
import { MerkleTools } from './MerkleTools';

export class InternalCalendar implements CalendarNode {
  private _category: Category;
  private _children: CalendarNode[];
  private _name: string;
  private _hash: string;
  private _parent: CalendarNode;

  constructor(name: string, category: number, parent: CalendarNode) {
    this._name = name;
    this._category = category;
    this._parent = parent;
    this._children = [];
    this._hash = '';
  }

  public addChild(node: CalendarNode) {
    this._children.push(node);
    if (this._category === 2) {
      this._children.sort(
        (a: CalendarNode, b: CalendarNode) =>
          (a as LeafCalendar).timestamp.getTime() - (b as LeafCalendar).timestamp.getTime(),
      );
    } else {
      this._children.sort((a: CalendarNode, b: CalendarNode) => a.name.localeCompare(b.name));
    }
  }

  public calculateHash() {
    const list = [];
    for (const el of this.children) {
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

  set name(value: string) {
    this._name = value;
  }

  get parent(): CalendarNode {
    return this._parent;
  }

  get hash(): string {
    return this._hash;
  }

  set hash(value: string) {
    this._hash = value;
  }

  getChildrenHashes(): string[] {
    const children = this.children;
    const hashes = [];
    for (const c of children) {
      hashes.push(c.hash);
    }
    return hashes;
  }

  getChildByNum(num: number): CalendarNode {
    return this.children[num];
  }

  getChildByName(name: string): CalendarNode {
    for (const el of this.children) {
      if (el.name === name) {
        return el;
      }
    }
    return null as any;
  }

  indexOf(name: CalendarNode): number {
    return this.children.indexOf(name);
  }

  findNode(hash: string): CalendarNode {
    for (const el of this.children) {
      if (el.hash === hash && this.category === 2) {
        return el;
      }
      let ret = null;
      if (this.category !== 2) {
        ret = (el as InternalCalendar).findNode(hash);
      }
      if (ret != null) {
        return ret;
      }
    }
    return null as any;
  }
}
