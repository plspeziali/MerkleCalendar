"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafCalendar = void 0;
var LeafCalendar = /** @class */ (function () {
    function LeafCalendar(hash, name, parent, timestamp, storageGroup) {
        this._hash = hash;
        this._name = name;
        this._parent = parent;
        this._timestamp = timestamp;
        this._storageGroup = storageGroup;
    }
    Object.defineProperty(LeafCalendar.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        set: function (value) {
            this._hash = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeafCalendar.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeafCalendar.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeafCalendar.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        set: function (value) {
            this._timestamp = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeafCalendar.prototype, "storageGroup", {
        get: function () {
            return this._storageGroup;
        },
        set: function (value) {
            this._storageGroup = value;
        },
        enumerable: false,
        configurable: true
    });
    return LeafCalendar;
}());
exports.LeafCalendar = LeafCalendar;
