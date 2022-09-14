"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofTree = void 0;
var ProofTree = /** @class */ (function () {
    function ProofTree(rootProof, rootHash, yearProof, yearHash, monthProof, monthHash) {
        this._rootProof = rootProof;
        this._rootHash = rootHash;
        this._yearProof = yearProof;
        this._yearHash = yearHash;
        this._monthProof = monthProof;
        this._monthHash = monthHash;
    }
    Object.defineProperty(ProofTree.prototype, "rootProof", {
        get: function () {
            return this._rootProof;
        },
        set: function (value) {
            this._rootProof = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProofTree.prototype, "rootHash", {
        get: function () {
            return this._rootHash;
        },
        set: function (value) {
            this._rootHash = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProofTree.prototype, "yearProof", {
        get: function () {
            return this._yearProof;
        },
        set: function (value) {
            this._yearProof = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProofTree.prototype, "yearHash", {
        get: function () {
            return this._yearHash;
        },
        set: function (value) {
            this._yearHash = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProofTree.prototype, "monthProof", {
        get: function () {
            return this._monthProof;
        },
        set: function (value) {
            this._monthProof = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProofTree.prototype, "monthHash", {
        get: function () {
            return this._monthHash;
        },
        set: function (value) {
            this._monthHash = value;
        },
        enumerable: false,
        configurable: true
    });
    return ProofTree;
}());
exports.ProofTree = ProofTree;
