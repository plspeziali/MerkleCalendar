"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUnit = void 0;
var StorageUnit = /** @class */ (function () {
    function StorageUnit(hash, uuid) {
        this._hash = hash;
        this._uuid = uuid;
    }
    Object.defineProperty(StorageUnit.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        set: function (value) {
            this._hash = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StorageUnit.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        set: function (value) {
            this._uuid = value;
        },
        enumerable: false,
        configurable: true
    });
    return StorageUnit;
}());
exports.StorageUnit = StorageUnit;
