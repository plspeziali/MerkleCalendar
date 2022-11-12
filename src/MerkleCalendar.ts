import { InternalCalendar } from './InternalCalendar';
import { LeafCalendar } from './LeafCalendar';
import { MerkleTools } from './MerkleTools';
import { Category } from './Category';
import { StorageGroup } from './StorageGroup';
import { CalendarNode } from './CalendarNode';
import { ProofTree } from './ProofTree';
import { StorageUnit } from "./StorageUnit";

export class MerkleCalendar {
  private closed: InternalCalendar;
  private open: InternalCalendar;

  constructor() {
    MerkleTools.initMT();
    this.closed = new InternalCalendar('Closed', 0, null as any);
    this.open = new InternalCalendar('Open', 0, null as any);
  }

  public addRegistration(
    name: string,
    hash: string,
    timestamp: Date,
    closed: boolean,
    storageGroup: StorageGroup,
    mHash: string,
    yHash: string,
  ): LeafCalendar {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    let tree;
    if (closed) {
      tree = this.closed;
    } else {
      tree = this.open;
    }
    let monthNode = null;
    let yearNode = tree.getChildByName(year.toString());
    if (yearNode != null) {
      monthNode = (yearNode as InternalCalendar).getChildByName(month.toString());
    }
    if (yearNode == null) {
      yearNode = new InternalCalendar(year.toString(), Category.YEAR, tree);
      tree.addChild(yearNode);
    }
    if (monthNode == null) {
      monthNode = new InternalCalendar(month.toString(), Category.MONTH, yearNode);
      (yearNode as InternalCalendar).addChild(monthNode);
    }
    const leaf = this.createLeaf(name, hash, timestamp, closed, monthNode as InternalCalendar, storageGroup);
    (monthNode as InternalCalendar).addChild(leaf);
    if (mHash && yHash) {
      monthNode.hash = mHash;
      yearNode.hash = yHash;
    } else {
      (monthNode as InternalCalendar).calculateHash();
      (yearNode as InternalCalendar).calculateHash();
    }
    tree.calculateHash();
    return leaf;
  }

  public createLeaf(
    name: string,
    hash: string,
    timestamp: Date,
    closed: boolean,
    monthNode: InternalCalendar,
    storageGroup: StorageGroup,
  ) {
    const newHash = this.combineHash(timestamp, hash);
    return new LeafCalendar(newHash, name, monthNode, timestamp, storageGroup);
  }

  public combineHash(timestamp: Date, hash: string): string {
    return MerkleTools.concatHash([timestamp.getTime().toString(), hash]);
  }

  public getBSPRoot(hash: string, oHash: string, cHash: string) {
    const findC = this.closed.findNode(hash);
    const findO = this.open.findNode(hash);
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
    const monthNode = node.parent as InternalCalendar;
    const yearNode = node.parent.parent as InternalCalendar;
    const leafIndex = monthNode.indexOf(node);
    const leavesHash = [];
    for (let i = 0; i <= leafIndex; i++) {
      leavesHash.push(monthNode.getChildByNum(i).hash);
    }
    const newMonth = this.calculateHash(leavesHash);
    const monthIndex = yearNode.indexOf(monthNode);
    const monthsHash = [];
    for (let i = 0; i < monthIndex; i++) {
      monthsHash.push(yearNode.getChildByNum(i).hash);
    }
    monthsHash.push(newMonth);
    const newYear = this.calculateHash(monthsHash);
    const yearIndex = yearNode.indexOf(yearNode);
    const yearsHash = [];
    for (let i = 0; i < yearIndex; i++) {
      yearsHash.push(yearNode.getChildByNum(i).hash);
    }
    yearsHash.push(newYear);
    const newRoot = this.calculateHash(yearsHash);
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

  public calculateProof(leaf: string) {
    return MerkleTools.getProof(leaf);
  }

  public loadTree(open: InternalCalendar, closed: InternalCalendar) {
    this.open = open;
    this.closed = closed;
  }

  public getTree(): InternalCalendar[] {
    return [this.open, this.closed];
  }

  public getLeaves(): object[] {
    let leaf;
    let month;
    let year;
    const openA = [];
    const closedA = [];
    for (year of this.open.children) {
      year = year as InternalCalendar;
      for (month of year.children) {
        month = month as InternalCalendar;
        for (leaf of month.children) {
          leaf = leaf as LeafCalendar;
          openA.push({
            name: leaf.name,
            timestamp: leaf.timestamp,
            hash: leaf.hash,
            storageGroup: leaf.storageGroup,
          });
        }
      }
    }
    for (year of this.closed.children) {
      year = year as InternalCalendar;
      for (month of year.children) {
        month = month as InternalCalendar;
        for (leaf of month.children) {
          leaf = leaf as LeafCalendar;
          closedA.push({
            name: leaf.name,
            timestamp: leaf.timestamp,
            hash: leaf.hash,
            storageGroup: leaf.storageGroup,
          });
        }
      }
    }
    return [openA, closedA];
  }

  getTrees(): object[] {
    let leaf;
    let month;
    let year;
    let openT;
    let closedT;
    let openM;
    let closedM;
    let openA;
    let closedA;
    openT = [];
    for (year of this.open.children) {
      year = year as InternalCalendar;
      openM = [];
      for (month of year.children) {
        month = month as InternalCalendar;
        openA = [];
        for (leaf of month.children) {
          leaf = leaf as LeafCalendar;
          let sg = this.serializeSG((leaf as LeafCalendar));
          openA.push({
            name: leaf.name,
            timestamp: leaf.timestamp,
            hash: leaf.hash,
            storageGroup: sg,
          });
        }
        openM.push({
          name: month.name,
          hash: month.hash,
          children: openA,
        });
      }
      openT.push({
        name: year.name,
        hash: year.hash,
        children: openM,
      });
    }
    closedT = [];
    for (year of this.closed.children) {
      year = year as InternalCalendar;
      closedM = [];
      for (month of year.children) {
        month = month as InternalCalendar;
        closedA = [];
        for (leaf of month.children) {
          leaf = leaf as LeafCalendar;
          let sg = this.serializeSG((leaf as LeafCalendar));
          closedA.push({
            name: leaf.name,
            timestamp: leaf.timestamp,
            hash: leaf.hash,
            storageGroup: sg,
          });
        }
        closedM.push({
          name: month.name,
          hash: month.hash,
          children: closedA,
        });
      }
      closedT.push({
        name: year.name,
        hash: year.hash,
        children: closedM,
      });
    }
    return [openT, closedT];
  }

  getOCRoots(): string[] {
    const cHash = this.closed.hash;
    const oHash = this.open.hash;
    if (cHash == null) {
      if (oHash == null) {
        return [null as any, null as any];
      }
      return [oHash, null as any];
    }
    if (oHash == null) {
      return [null as any, cHash];
    }
    return [oHash, cHash];
  }

  getMCRoot(): string {
    return MerkleTools.concatHash(this.getOCRoots());
  }

  getProof(leaf: LeafCalendar, root: string): object {
    const proofTree = {};
    let proof = this.generateProof(leaf);
    const monthNode = leaf.parent;
    Object.assign(proofTree, { monthProof: proof });
    Object.assign(proofTree, { monthHash: monthNode.hash });

    proof = this.generateProof(monthNode);
    const yearNode = monthNode.parent;
    Object.assign(proofTree, { yearProof: proof });
    Object.assign(proofTree, { yearHash: yearNode.hash });

    proof = this.generateProof(yearNode);
    const rootNode = monthNode.parent;
    Object.assign(proofTree, { rootProof: proof });
    Object.assign(proofTree, { rootHash: rootNode.hash });
    Object.assign(proofTree, { BSPRoot: root });
    return proofTree;
  }

  generateProof(node: CalendarNode): object {
    const parent = node.parent as InternalCalendar;
    const hashes = parent.getChildrenHashes();
    this.calculateHash(hashes);
    return this.calculateProof(node.hash);
  }

  checkProof(node: CalendarNode, proofTree: ProofTree) {
    let result = MerkleTools.validateProof(proofTree.monthProof, node.hash, proofTree.monthHash);
    node = node.parent;
    result = result && MerkleTools.validateProof(proofTree.yearProof, node.hash, proofTree.yearHash);
    node = node.parent;
    result = result && MerkleTools.validateProof(proofTree.rootProof, node.hash, proofTree.rootHash);
    return result;
  }

  serializeMC(): string{
    let openT;
    let closedT;
    [openT, closedT] = this.getTrees();
    interface CalendarJSON {
      hash: string;
      openRoot: object;
      closedRoot: object
    }
    const tree: CalendarJSON = {
      hash: MerkleTools.concatHash([(openT as InternalCalendar).hash, (closedT as InternalCalendar).hash]),
      openRoot: openT,
      closedRoot: closedT
    };
    return JSON.stringify(tree);
  }

  deserializeMC(json: string){
    let tree = JSON.parse(json);
    for (let y of tree.openT) {
      for (let m of y.children) {
        for (let l of m.children) {
          const suList = []
          for (let su of l.storageGroup.storageUnits) {
            suList.push(new StorageUnit(su.hash, su.uuid))
          }
          let sg = new StorageGroup(l.storageGroup.hash, suList);
          this.addRegistration(l.name, l.hash, l.timestamp, false, sg, m.hash, y.hash);
        }
      }
    }
    for (let y of tree.closedT) {
      for (let m of y.children) {
        for (let l of m.children) {
          const suList = []
          for (let su of l.storageGroup.storageUnits) {
            suList.push(new StorageUnit(su.hash, su.uuid))
          }
          let sg = new StorageGroup(l.storageGroup.hash, suList);
          this.addRegistration(l.name, l.hash, l.timestamp, true, sg, m.hash, y.hash);
        }
      }
    }
  }

  serializeSG(leaf: LeafCalendar): Object{
    interface storageGroupJSON {
      hash: string;
      storageUnits: Object[];
    }
    const sg = leaf.storageGroup;
    const suList = []
    for (let su of sg.map) {
      suList.push({
        hash: su.hash,
        uuid: su.uuid
      })
    }
    return {
      hash: leaf.storageGroup.hash,
      map: suList
    }
  }
}
