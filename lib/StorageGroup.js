"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageGroup = void 0;
var StorageGroup = /** @class */ (function () {
    function StorageGroup(hash, map) {
        this._hash = hash;
        this._map = map;
    }
    Object.defineProperty(StorageGroup.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        set: function (value) {
            this._hash = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StorageGroup.prototype, "map", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            this._map = value;
        },
        enumerable: false,
        configurable: true
    });
    StorageGroup.prototype.addToSG = function (o) {
        this._map.push(o);
    };
    return StorageGroup;
}());
exports.StorageGroup = StorageGroup;
