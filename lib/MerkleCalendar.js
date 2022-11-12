"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleCalendar = void 0;
var InternalCalendar_1 = require("./InternalCalendar");
var LeafCalendar_1 = require("./LeafCalendar");
var MerkleTools_1 = require("./MerkleTools");
var Category_1 = require("./Category");
var StorageGroup_1 = require("./StorageGroup");
var StorageUnit_1 = require("./StorageUnit");
var MerkleCalendar = /** @class */ (function () {
    function MerkleCalendar() {
        MerkleTools_1.MerkleTools.initMT();
        this.closed = new InternalCalendar_1.InternalCalendar('Closed', 0, null);
        this.open = new InternalCalendar_1.InternalCalendar('Open', 0, null);
    }
    MerkleCalendar.prototype.addRegistration = function (name, hash, timestamp, closed, storageGroup, mHash, yHash) {
        var year = timestamp.getFullYear();
        var month = timestamp.getMonth();
        var tree;
        if (closed) {
            tree = this.closed;
        }
        else {
            tree = this.open;
        }
        var monthNode = null;
        var yearNode = tree.getChildByName(year.toString());
        if (yearNode != null) {
            monthNode = yearNode.getChildByName(month.toString());
        }
        if (yearNode == null) {
            yearNode = new InternalCalendar_1.InternalCalendar(year.toString(), Category_1.Category.YEAR, tree);
            tree.addChild(yearNode);
        }
        if (monthNode == null) {
            monthNode = new InternalCalendar_1.InternalCalendar(month.toString(), Category_1.Category.MONTH, yearNode);
            yearNode.addChild(monthNode);
        }
        var leaf = this.createLeaf(name, hash, timestamp, closed, monthNode, storageGroup);
        monthNode.addChild(leaf);
        if (mHash && yHash) {
            monthNode.hash = mHash;
            yearNode.hash = yHash;
        }
        else {
            monthNode.calculateHash();
            yearNode.calculateHash();
        }
        tree.calculateHash();
        return leaf;
    };
    MerkleCalendar.prototype.createLeaf = function (name, hash, timestamp, closed, monthNode, storageGroup) {
        var newHash = this.combineHash(timestamp, hash);
        return new LeafCalendar_1.LeafCalendar(newHash, name, monthNode, timestamp, storageGroup);
    };
    MerkleCalendar.prototype.combineHash = function (timestamp, hash) {
        return MerkleTools_1.MerkleTools.concatHash([timestamp.getTime().toString(), hash]);
    };
    MerkleCalendar.prototype.getBSPRoot = function (hash, oHash, cHash) {
        var findC = this.closed.findNode(hash);
        var findO = this.open.findNode(hash);
        var closed = false;
        var node = null;
        if (findC != null) {
            node = findC;
            closed = true;
        }
        else if (findO != null) {
            node = findO;
        }
        if (node == null) {
            return null;
        }
        var monthNode = node.parent;
        var yearNode = node.parent.parent;
        var leafIndex = monthNode.indexOf(node);
        var leavesHash = [];
        for (var i = 0; i <= leafIndex; i++) {
            leavesHash.push(monthNode.getChildByNum(i).hash);
        }
        var newMonth = this.calculateHash(leavesHash);
        var monthIndex = yearNode.indexOf(monthNode);
        var monthsHash = [];
        for (var i = 0; i < monthIndex; i++) {
            monthsHash.push(yearNode.getChildByNum(i).hash);
        }
        monthsHash.push(newMonth);
        var newYear = this.calculateHash(monthsHash);
        var yearIndex = yearNode.indexOf(yearNode);
        var yearsHash = [];
        for (var i = 0; i < yearIndex; i++) {
            yearsHash.push(yearNode.getChildByNum(i).hash);
        }
        yearsHash.push(newYear);
        var newRoot = this.calculateHash(yearsHash);
        if (closed) {
            if (oHash != null) {
                return this.calculateHash([oHash, newRoot]);
            }
            else {
                return newRoot;
            }
        }
        else {
            if (cHash != null) {
                return this.calculateHash([newRoot, cHash]);
            }
            else {
                return newRoot;
            }
        }
    };
    MerkleCalendar.prototype.calculateHash = function (list) {
        return MerkleTools_1.MerkleTools.calculateTree(list);
    };
    MerkleCalendar.prototype.calculateProof = function (leaf) {
        return MerkleTools_1.MerkleTools.getProof(leaf);
    };
    MerkleCalendar.prototype.loadTree = function (open, closed) {
        this.open = open;
        this.closed = closed;
    };
    MerkleCalendar.prototype.getTree = function () {
        return [this.open, this.closed];
    };
    MerkleCalendar.prototype.getLeaves = function () {
        var leaf;
        var month;
        var year;
        var openA = [];
        var closedA = [];
        for (var _i = 0, _a = this.open.children; _i < _a.length; _i++) {
            year = _a[_i];
            year = year;
            for (var _b = 0, _c = year.children; _b < _c.length; _b++) {
                month = _c[_b];
                month = month;
                for (var _d = 0, _e = month.children; _d < _e.length; _d++) {
                    leaf = _e[_d];
                    leaf = leaf;
                    openA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup,
                    });
                }
            }
        }
        for (var _f = 0, _g = this.closed.children; _f < _g.length; _f++) {
            year = _g[_f];
            year = year;
            for (var _h = 0, _j = year.children; _h < _j.length; _h++) {
                month = _j[_h];
                month = month;
                for (var _k = 0, _l = month.children; _k < _l.length; _k++) {
                    leaf = _l[_k];
                    leaf = leaf;
                    closedA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: leaf.storageGroup,
                    });
                }
            }
        }
        return [openA, closedA];
    };
    MerkleCalendar.prototype.getTrees = function () {
        var leaf;
        var month;
        var year;
        var openT;
        var closedT;
        var openM;
        var closedM;
        var openA;
        var closedA;
        openT = [];
        for (var _i = 0, _a = this.open.children; _i < _a.length; _i++) {
            year = _a[_i];
            year = year;
            openM = [];
            for (var _b = 0, _c = year.children; _b < _c.length; _b++) {
                month = _c[_b];
                month = month;
                openA = [];
                for (var _d = 0, _e = month.children; _d < _e.length; _d++) {
                    leaf = _e[_d];
                    leaf = leaf;
                    var sg = this.serializeSG(leaf);
                    openA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: sg,
                    });
                }
                openM.push({
                    name: month.name,
                    hash: month.hash,
                    children: openA,
                });
            }
            openT.push({
                name: year.name,
                hash: year.hash,
                children: openM,
            });
        }
        closedT = [];
        for (var _f = 0, _g = this.closed.children; _f < _g.length; _f++) {
            year = _g[_f];
            year = year;
            closedM = [];
            for (var _h = 0, _j = year.children; _h < _j.length; _h++) {
                month = _j[_h];
                month = month;
                closedA = [];
                for (var _k = 0, _l = month.children; _k < _l.length; _k++) {
                    leaf = _l[_k];
                    leaf = leaf;
                    var sg = this.serializeSG(leaf);
                    closedA.push({
                        name: leaf.name,
                        timestamp: leaf.timestamp,
                        hash: leaf.hash,
                        storageGroup: sg,
                    });
                }
                closedM.push({
                    name: month.name,
                    hash: month.hash,
                    children: closedA,
                });
            }
            closedT.push({
                name: year.name,
                hash: year.hash,
                children: closedM,
            });
        }
        return [openT, closedT];
    };
    MerkleCalendar.prototype.getOCRoots = function () {
        var cHash = this.closed.hash;
        var oHash = this.open.hash;
        if (cHash == null) {
            if (oHash == null) {
                return [null, null];
            }
            return [oHash, null];
        }
        if (oHash == null) {
            return [null, cHash];
        }
        return [oHash, cHash];
    };
    MerkleCalendar.prototype.getMCRoot = function () {
        return MerkleTools_1.MerkleTools.concatHash(this.getOCRoots());
    };
    MerkleCalendar.prototype.getProof = function (leaf, root) {
        var proofTree = {};
        var proof = this.generateProof(leaf);
        var monthNode = leaf.parent;
        Object.assign(proofTree, { monthProof: proof });
        Object.assign(proofTree, { monthHash: monthNode.hash });
        proof = this.generateProof(monthNode);
        var yearNode = monthNode.parent;
        Object.assign(proofTree, { yearProof: proof });
        Object.assign(proofTree, { yearHash: yearNode.hash });
        proof = this.generateProof(yearNode);
        var rootNode = monthNode.parent;
        Object.assign(proofTree, { rootProof: proof });
        Object.assign(proofTree, { rootHash: rootNode.hash });
        Object.assign(proofTree, { BSPRoot: root });
        return proofTree;
    };
    MerkleCalendar.prototype.generateProof = function (node) {
        var parent = node.parent;
        var hashes = parent.getChildrenHashes();
        this.calculateHash(hashes);
        return this.calculateProof(node.hash);
    };
    MerkleCalendar.prototype.checkProof = function (node, proofTree) {
        var result = MerkleTools_1.MerkleTools.validateProof(proofTree.monthProof, node.hash, proofTree.monthHash);
        node = node.parent;
        result = result && MerkleTools_1.MerkleTools.validateProof(proofTree.yearProof, node.hash, proofTree.yearHash);
        node = node.parent;
        result = result && MerkleTools_1.MerkleTools.validateProof(proofTree.rootProof, node.hash, proofTree.rootHash);
        return result;
    };
    MerkleCalendar.prototype.serializeMC = function () {
        var _a;
        var openT;
        var closedT;
        _a = this.getTrees(), openT = _a[0], closedT = _a[1];
        var tree = {
            hash: MerkleTools_1.MerkleTools.concatHash([openT.hash, closedT.hash]),
            openRoot: openT,
            closedRoot: closedT
        };
        return JSON.stringify(tree);
    };
    MerkleCalendar.prototype.deserializeMC = function (json) {
        var tree = JSON.parse(json);
        for (var _i = 0, _a = tree.openT; _i < _a.length; _i++) {
            var y = _a[_i];
            for (var _b = 0, _c = y.children; _b < _c.length; _b++) {
                var m = _c[_b];
                for (var _d = 0, _e = m.children; _d < _e.length; _d++) {
                    var l = _e[_d];
                    var suList = [];
                    for (var _f = 0, _g = l.storageGroup.storageUnits; _f < _g.length; _f++) {
                        var su = _g[_f];
                        suList.push(new StorageUnit_1.StorageUnit(su.hash, su.uuid));
                    }
                    var sg = new StorageGroup_1.StorageGroup(l.storageGroup.hash, suList);
                    this.addRegistration(l.name, l.hash, l.timestamp, false, sg, m.hash, y.hash);
                }
            }
        }
        for (var _h = 0, _j = tree.closedT; _h < _j.length; _h++) {
            var y = _j[_h];
            for (var _k = 0, _l = y.children; _k < _l.length; _k++) {
                var m = _l[_k];
                for (var _m = 0, _o = m.children; _m < _o.length; _m++) {
                    var l = _o[_m];
                    var suList = [];
                    for (var _p = 0, _q = l.storageGroup.storageUnits; _p < _q.length; _p++) {
                        var su = _q[_p];
                        suList.push(new StorageUnit_1.StorageUnit(su.hash, su.uuid));
                    }
                    var sg = new StorageGroup_1.StorageGroup(l.storageGroup.hash, suList);
                    this.addRegistration(l.name, l.hash, l.timestamp, true, sg, m.hash, y.hash);
                }
            }
        }
    };
    MerkleCalendar.prototype.serializeSG = function (leaf) {
        var sg = leaf.storageGroup;
        var suList = [];
        for (var _i = 0, _a = sg.map; _i < _a.length; _i++) {
            var su = _a[_i];
            suList.push({
                hash: su.hash,
                uuid: su.uuid
            });
        }
        return {
            hash: leaf.storageGroup.hash,
            map: suList
        };
    };
    return MerkleCalendar;
}());
exports.MerkleCalendar = MerkleCalendar;
