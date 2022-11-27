"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTools = void 0;
// @ts-ignore
var merkletreejs_1 = require("merkletreejs");
var crypto = __importStar(require("crypto"));
var MerkleTools = /** @class */ (function () {
    function MerkleTools() {
    }
    MerkleTools.initMT = function () {
        MerkleTools._tree = new merkletreejs_1.MerkleTree([], { hashType: 'sha256' });
    };
    MerkleTools.concatHash = function (strings) {
        var longString = '';
        for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
            var s = strings_1[_i];
            longString += s;
        }
        return "".concat(crypto.createHash('sha256').update(longString).digest('hex'));
    };
    MerkleTools.calculateTree = function (list) {
        var _this = this;
        this._tree.resetTree();
        var leaves = list.map(function (value) { return _this._tree.bufferify(value); });
        this._tree.addLeaves(leaves);
        var root = this._tree.getRoot();
        return this._tree.bufferToHex(root, false);
    };
    MerkleTools.getProof = function (leaf) {
        for (var i = 0; i < this._tree.getLeafCount(); i++) {
            if (this._tree.getLeaf(i).toString('hex') === leaf) {
                return this._tree.getProof;
            }
        }
        return null;
    };
    MerkleTools.validateProof = function (proof, targetHash, merkleRoot) {
        return this._tree.verify(proof, targetHash, merkleRoot);
    };
    return MerkleTools;
}());
exports.MerkleTools = MerkleTools;
