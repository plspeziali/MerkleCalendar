"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTools = void 0;
// @ts-ignore
var MerkleTree = require("../node_modules/merkle-tools/merkletools");
var crypto = require("crypto");
var MerkleTools = /** @class */ (function () {
    function MerkleTools() {
    }
    MerkleTools.initMT = function () {
        MerkleTools._tree = new MerkleTree({ hashType: 'sha256' });
    };
    Object.defineProperty(MerkleTools, "tree", {
        get: function () {
            return this._tree;
        },
        set: function (value) {
            this._tree = value;
        },
        enumerable: false,
        configurable: true
    });
    MerkleTools.concatHash = function (strings) {
        var longString = '';
        for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
            var s = strings_1[_i];
            longString += s;
        }
        return "".concat(crypto.createHash('sha256').update(longString).digest('hex'));
    };
    MerkleTools.calculateTree = function (list) {
        this._tree.resetTree();
        this._tree.addLeaves(list);
        this._tree.makeTree();
        return this._tree.getMerkleRoot().toString('hex');
    };
    MerkleTools.getProof = function (leaf) {
        for (var i = 0; i < this._tree.getLeafCount(); i++) {
            if (this._tree.getLeaf(i).toString('hex') === leaf) {
                return this._tree.getProof(i);
            }
        }
        return null;
    };
    MerkleTools.validateProof = function (proof, targetHash, merkleRoot) {
        return this._tree.validateProof(proof, targetHash, merkleRoot);
    };
    return MerkleTools;
}());
exports.MerkleTools = MerkleTools;
