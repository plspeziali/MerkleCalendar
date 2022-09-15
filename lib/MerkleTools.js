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
var MerkleTree = __importStar(require("../node_modules/merkle-tools/merkletools"));
var crypto = __importStar(require("crypto"));
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
