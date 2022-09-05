import {LeafCalendar} from './LeafCalendar';
import {Category} from './Category';

export class InternalCalendar {

    private name: string;
    private category: Category;    //0: Open or Closed Subtree root, 1: year, 2: month
    private parent: InternalCalendar;
    private children: InternalCalendar[];
    private hash: string;

    constructor(name: string, category: number, parent: InternalCalendar) {
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.children = [];
        this.hash = null;
    }

}