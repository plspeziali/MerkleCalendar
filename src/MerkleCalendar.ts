import {InternalCalendar} from './InternalCalendar';
import {LeafCalendar} from './LeafCalendar';

export class MerkleCalendar {

    private closed: InternalCalendar;
    private open: InternalCalendar;

    constructor() {
        this.closed = new InternalCalendar("Closed", 0, null);
        this.open = new InternalCalendar("Open", 0, null);
    }

    public addRegistration(name, hash, year, month, day, hour, minute, second, closed, storageGroup) {
        let tree = this.open;
        if (closed) {
            tree = this.closed;
        }
        let monthNode = null;
        let yearNode = tree.getChildByName(year);
        if (yearNode != null) {
            monthNode = yearNode.getChildByName(month);
        }
        if (yearNode == null) {
            yearNode = new InternalCalendar(year, 1, tree);
            tree.addChild(yearNode);
        }
        if (monthNode == null) {
            monthNode = new InternalCalendar(month, 2, yearNode);
            yearNode.addChild(monthNode);
        }
        let leaf = this.createLeaf(name, year, month, day, hour, minute, second, hash, monthNode, storageGroup);
        monthNode.addChild(leaf);
        monthNode.calculateHash();
        yearNode.calculateHash();
        tree.calculateHash();
        return leaf;
    }

    public addRegistrationD(name, hash, date, closed, storageGroup) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDay();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return this.addRegistration(name, hash, year, month, day, hour, minute, second, closed, storageGroup);
    }

    public addRegistrationNC(name, hash, year, month, day, hour, minute, second, closed, mHash, yHash, storageGroup) {
        let tree = this.#open;
        if (closed) {
            tree = this.#closed;
        }
        let monthNode = null;
        let yearNode = tree.getChildByName(year);
        if (yearNode != null) {
            monthNode = yearNode.getChildByName(month);
        }
        if (yearNode == null) {
            yearNode = new InternalCalendar(year, 1, tree);
            tree.addChild(yearNode);
        }
        if (monthNode == null) {
            monthNode = new InternalCalendar(month, 2, yearNode);
            yearNode.addChild(monthNode);
        }
        let leaf = this.createLeaf(name, year, month, day, hour, minute, second, hash, monthNode, storageGroup);
        monthNode.addChild(leaf);
        monthNode.setHash(mHash);
        yearNode.setHash(yHash);
        return leaf;
    }

    public createLeaf(name, year, month, day, hour, minute, second, hash, monthNode, storageGroup) {
        let newHash = this.combineHash(year, month, day, hour, minute, second, hash);
        return new LeafCalendar(name, day, hour, minute, second, newHash, monthNode, storageGroup);
    }
}