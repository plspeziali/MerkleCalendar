import { StorageUnit } from './StorageUnit';

export class StorageGroup {
  private _hash: string;
  private _map: StorageUnit[];

  constructor(hash: string, map: StorageUnit[]) {
    this._hash = hash;
    this._map = map;
  }

  get hash(): string {
    return this._hash;
  }

  set hash(value: string) {
    this._hash = value;
  }

  get map(): StorageUnit[] {
    return this._map;
  }

  set map(value: StorageUnit[]) {
    this._map = value;
  }

  public addToSG(o: StorageUnit) {
    this._map.push(o);
  }
}
