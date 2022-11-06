export class ProofTree {
  private _rootProof: any[];
  private _rootHash: string;
  private _yearProof: any[];
  private _yearHash: string;
  private _monthProof: any[];
  private _monthHash: string;

  constructor(
    rootProof: any[],
    rootHash: string,
    yearProof: any[],
    yearHash: string,
    monthProof: any[],
    monthHash: string,
  ) {
    this._rootProof = rootProof;
    this._rootHash = rootHash;
    this._yearProof = yearProof;
    this._yearHash = yearHash;
    this._monthProof = monthProof;
    this._monthHash = monthHash;
  }

  get rootProof(): any[] {
    return this._rootProof;
  }

  set rootProof(value: any[]) {
    this._rootProof = value;
  }

  get rootHash(): string {
    return this._rootHash;
  }

  set rootHash(value: string) {
    this._rootHash = value;
  }

  get yearProof(): any[] {
    return this._yearProof;
  }

  set yearProof(value: any[]) {
    this._yearProof = value;
  }

  get yearHash(): string {
    return this._yearHash;
  }

  set yearHash(value: string) {
    this._yearHash = value;
  }

  get monthProof(): any[] {
    return this._monthProof;
  }

  set monthProof(value: any[]) {
    this._monthProof = value;
  }

  get monthHash(): string {
    return this._monthHash;
  }

  set monthHash(value: string) {
    this._monthHash = value;
  }
}
