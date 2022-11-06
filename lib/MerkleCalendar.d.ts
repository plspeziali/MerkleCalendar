import { InternalCalendar } from './InternalCalendar';
import { LeafCalendar } from './LeafCalendar';
import { StorageGroup } from './StorageGroup';
import { CalendarNode } from './CalendarNode';
import { ProofTree } from './ProofTree';
export declare class MerkleCalendar {
    private closed;
    private open;
    constructor();
    addRegistration(name: string, hash: string, timestamp: Date, closed: boolean, storageGroup: StorageGroup, mHash: string, yHash: string): LeafCalendar;
    createLeaf(name: string, hash: string, timestamp: Date, closed: boolean, monthNode: InternalCalendar, storageGroup: StorageGroup): LeafCalendar;
    combineHash(timestamp: Date, hash: string): string;
    getBSPRoot(hash: string, oHash: string, cHash: string): string;
    calculateHash(list: string[]): string;
    calculateProof(leaf: string): object;
    loadTree(open: InternalCalendar, closed: InternalCalendar): void;
    getTree(): InternalCalendar[];
    getLeaves(): object[];
    getTrees(): object[];
    getOCRoots(): string[];
    getMCRoot(): string;
    getProof(leaf: LeafCalendar, root: string): object;
    generateProof(node: CalendarNode): object;
    checkProof(node: CalendarNode, proofTree: ProofTree): boolean;
}
