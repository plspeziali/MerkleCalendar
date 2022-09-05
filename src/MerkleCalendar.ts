import {InternalCalendar} from './InternalCalendar';
import {LeafCalendar} from './LeafCalendar';

export class MerkleCalendar {

    private closed: InternalCalendar;
    private open: InternalCalendar;

    constructor() {
        this.closed = new InternalCalendar("Closed", 0, null);
        this.open = new InternalCalendar("Open", 0, null);
    }
}