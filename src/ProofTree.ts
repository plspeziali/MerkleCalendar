export class ProofTree {
  private _rootProof: object;
  private _rootHash: string;
  private _yearProof: object;
  private _yearHash: string;
  private _monthProof: object;
  private _monthHash: string;

  constructor(
    rootProof: object,
    rootHash: string,
    yearProof: object,
    yearHash: string,
    monthProof: object,
    monthHash: string,
  ) {
    this._rootProof = rootProof;
    this._rootHash = rootHash;
    this._yearProof = yearProof;
    this._yearHash = yearHash;
    this._monthProof = monthProof;
    this._monthHash = monthHash;
  }

  get rootProof(): object {
    return this._rootProof;
  }

  set rootProof(value: object) {
    this._rootProof = value;
  }

  get rootHash(): string {
    return this._rootHash;
  }

  set rootHash(value: string) {
    this._rootHash = value;
  }

  get yearProof(): object {
    return this._yearProof;
  }

  set yearProof(value: object) {
    this._yearProof = value;
  }

  get yearHash(): string {
    return this._yearHash;
  }

  set yearHash(value: string) {
    this._yearHash = value;
  }

  get monthProof(): object {
    return this._monthProof;
  }

  set monthProof(value: object) {
    this._monthProof = value;
  }

  get monthHash(): string {
    return this._monthHash;
  }

  set monthHash(value: string) {
    this._monthHash = value;
  }
}
