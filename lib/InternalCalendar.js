"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalCalendar = void 0;
var MerkleTools_1 = require("./MerkleTools");
var InternalCalendar = /** @class */ (function () {
    function InternalCalendar(name, category, parent) {
        this._name = name;
        this._category = category;
        this._parent = parent;
        this._children = [];
        this._hash = '';
    }
    InternalCalendar.prototype.addChild = function (node) {
        this._children.push(node);
        if (this._category === 2) {
            this._children.sort(function (a, b) {
                return a.timestamp.getTime() - b.timestamp.getTime();
            });
        }
        else {
            this._children.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
    };
    InternalCalendar.prototype.calculateHash = function () {
        var list = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.hash != null) {
                list.push(el.hash);
            }
        }
        this._hash = MerkleTools_1.MerkleTools.calculateTree(list);
    };
    Object.defineProperty(InternalCalendar.prototype, "category", {
        get: function () {
            return this._category;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalCalendar.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalCalendar.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalCalendar.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalCalendar.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        set: function (value) {
            this._hash = value;
        },
        enumerable: false,
        configurable: true
    });
    InternalCalendar.prototype.getChildrenHashes = function () {
        var children = this.children;
        var hashes = [];
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var c = children_1[_i];
            hashes.push(c.hash);
        }
        return hashes;
    };
    InternalCalendar.prototype.getChildByNum = function (num) {
        return this.children[num];
    };
    InternalCalendar.prototype.getChildByName = function (name) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.name === name) {
                return el;
            }
        }
        return null;
    };
    InternalCalendar.prototype.indexOf = function (name) {
        return this.children.indexOf(name);
    };
    InternalCalendar.prototype.findNode = function (hash) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.hash === hash && this.category === 2) {
                return el;
            }
            var ret = null;
            if (this.category !== 2) {
                ret = el.findNode(hash);
            }
            if (ret != null) {
                return ret;
            }
        }
        return null;
    };
    return InternalCalendar;
}());
exports.InternalCalendar = InternalCalendar;
