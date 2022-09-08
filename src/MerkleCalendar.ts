import {InternalCalendar} from './InternalCalendar';
import {LeafCalendar} from './LeafCalendar';
import {MerkleTools} from "./MerkleTools";
import {Category} from "./Category";
import {StorageGroup} from "./StorageGroup";
import {CalendarNode} from "./CalendarNode";

export class MerkleCalendar {

    private closed: InternalCalendar;
    private open: InternalCalendar;

    constructor() {
        MerkleTools.initMT();
        this.closed = new InternalCalendar("Closed", 0, null);
        this.open = new InternalCalendar("Open", 0, null);
    }

    public addRegistration(name: string, hash: string, timestamp: Date, closed: boolean, storageGroup: StorageGroup, mHash: string, yHash: string): LeafCalendar {
        let year = timestamp.getFullYear();
        let month = timestamp.getMonth();
        let tree;
        if (closed) {
            tree = this.closed;
        } else {
            tree = this.open;
        }
        let monthNode = null;
        let yearNode = tree.getChildByName(year);
        if (yearNode != null) {
            monthNode = (yearNode as InternalCalendar).getChildByName(month);
        }
        if (yearNode == null) {
            yearNode = new InternalCalendar(year.toString(), Category.YEAR, tree);
            tree.addChild(yearNode);
        }
        if (monthNode == null) {
            monthNode = new InternalCalendar(month.toString(), Category.MONTH, yearNode);
            (yearNode as InternalCalendar).addChild(monthNode);
        }
        let leaf = this.createLeaf(name, hash, timestamp, closed, monthNode, storageGroup);
        monthNode.addChild(leaf);
        if(mHash && yHash){
            monthNode.hash = mHash;
            yearNode.hash = yHash;
        } else {
            monthNode.calculateHash();
            yearNode.calculateHash();
        }
        tree.calculateHash();
        return leaf;
    }

    public createLeaf(name: string, hash: string, timestamp: Date, closed: boolean, monthNode: InternalCalendar, storageGroup: StorageGroup) {
        let newHash = this.combineHash(timestamp, hash);
        return new LeafCalendar(newHash, name, monthNode, timestamp, storageGroup);
    }

    public combineHash(timestamp: Date, hash: string): string {
        return MerkleTools.concatHash([(timestamp.getTime()).toString(), hash]);
    }

    public getBSPRoot(hash, oHash, cHash) {
        let findC = this.closed.findNode(hash);
        let findO = this.open.findNode(hash);
        let closed = false;
        let node = null;
        if (findC != null) {
            node = findC;
            closed = true;
        } else if (findO != null) {
            node = findO;
        }
        if (node == null) {
            return null;
        }
        let monthNode = node.parent;
        let yearNode = node.parent.parent;
        let leafIndex = monthNode.indexOf(node);
        let leavesHash = [];
        for (let i = 0; i <= leafIndex; i++) {
            leavesHash.push(monthNode.getChildByNum(i).hash);
        }
        let newMonth = this.calculateHash(leavesHash);
        let monthIndex = yearNode.indexOf(monthNode);
        let monthsHash = [];
        for (let i = 0; i < monthIndex; i++) {
            monthsHash.push(yearNode.getChildByNum(i).hash);
        }
        monthsHash.push(newMonth);
        let newYear = this.calculateHash(monthsHash);
        let yearIndex = yearNode.indexOf(yearNode);
        let yearsHash = [];
        for (let i = 0; i < yearIndex; i++) {
            yearsHash.push(yearNode.getChildByNum(i).hash);
        }
        yearsHash.push(newYear);
        let newRoot = this.calculateHash(yearsHash);
        if (closed) {
            if (oHash != null) {
                return this.calculateHash([oHash, newRoot]);
            } else {
                return newRoot;
            }
        } else {
            if (cHash != null) {
                return this.calculateHash([newRoot, cHash]);
            } else {
                return newRoot;
            }
        }
    }

    public calculateHash(list: string[]) {
        return MerkleTools.calculateTree(list);
    }

    public calculateProof(leaf: CalendarNode) {
        return MerkleTools.getProof(leaf);
    }

    public loadTree(open: InternalCalendar, closed: InternalCalendar) {
        this.open = open;
        this.closed = closed;
    }

    public getTree(): InternalCalendar[] {
        return [this.open, this.closed];
    }

    public getLeaves() : Object[]{
        let leaf;
        let month;
        let year;
        const openA = [];
        const closedA = [];
        for (year of this.open.children) {
            for (month of year.children) {
                for (leaf of month.children) {
                    openA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup
                    });
                }
            }
        }
        for (year of this.closed.children) {
            for (month of year.children) {
                for (leaf of month.getChildren()) {
                    closedA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup
                    });
                }
            }
        }
        return [openA, closedA]
    }

    getTrees(): Object[] {
        let leaf;
        let month;
        let year;
        let openT, closedT, openM, closedM, openA, closedA;
        openT = [];
        for (year of this.open.children) {
            openM = [];
            for (month of year.children) {
                openA = [];
                for (leaf of month.children) {
                    openA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup
                    });
                }
                openM.push({
                    name: month.name,
                    hash: month.hash,
                    children: openA
                });
            }
            openT.push({
                name: year.name,
                hash: year.hash,
                children: openM
            });
        }
        closedT = [];
        for (year of this.closed.children) {
            closedM = [];
            for (month of year.children) {
                closedA = [];
                for (leaf of month.children) {
                    closedA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup
                    });
                }
                closedM.push({
                    name: month.name,
                    hash: month.hash,
                    children: closedA
                });
            }
            closedT.push({
                name: year.name,
                hash: year.hash,
                children: closedM
            });
        }
        return [openT, closedT]
    }

    getOCRoots(): string[] {
        const cHash = this.closed.hash;
        const oHash = this.open.hash;
        if (cHash == null) {
            if (oHash == null) {
                return [null, null];
            }
            return [oHash, null];
        }
        if (oHash == null) {
            return [null, cHash];
        }
        return [oHash, cHash];
    }

    getMCRoot(): string{
        return MerkleTools.concatHash(this.getOCRoots());
    }

    getProof(leaf, root): Object {
        const proofTree = {};
        let proof = this.generateProof(leaf);
        const monthNode = leaf.parent;
        Object.assign(proofTree, {monthProof: proof});
        Object.assign(proofTree, {monthHash: monthNode.getHash()});

        proof = this.generateProof(monthNode);
        const yearNode = monthNode.parent;
        Object.assign(proofTree, {yearProof: proof});
        Object.assign(proofTree, {yearHash: yearNode.getHash()});

        proof = this.generateProof(yearNode);
        const rootNode = monthNode.parent;
        Object.assign(proofTree, {rootProof: proof});
        Object.assign(proofTree, {rootHash: rootNode.getHash()});
        Object.assign(proofTree, {BSPRoot: root});
        return proofTree;
    }

    generateProof(node): Object {
        const parent = node.getParent();
        const hashes = parent.getChildrenHashes();
        this.calculateHash(hashes);
        return this.calculateProof(node.getHash());
    }

    checkProof(node, proofTree) {
        let result = MerkleTools.validateProof(proofTree.monthProof, node.getHash(), proofTree.monthHash);
        node = node.getParent();
        result = result && MerkleTools.validateProof(proofTree.yearProof, node.getHash(), proofTree.yearHash);
        node = node.getParent();
        result = result && MerkleTools.validateProof(proofTree.rootProof, node.getHash(), proofTree.rootHash);
        return result;
    }
}