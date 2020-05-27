"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var equip_1 = require("./api/equip");
var Equip = (function () {
    function Equip(equipJson) {
        var equipData = __assign({}, equipJson);
        var id = equipData.id, codename = equipData.codename, rank = equipData.rank, category = equipData.category, type = equipData.type, company = equipData.company, exclusiveRate = equipData.exclusiveRate, maxLevel = equipData.maxLevel, buildTime = equipData.buildTime, stats = equipData.stats, powerup = equipData.powerup, fitGuns = equipData.fitGuns;
        this.id = id;
        this.codename = codename;
        this.rank = rank;
        this.category = category;
        this.type = type;
        this.company = company;
        this.exclusiveRate = exclusiveRate;
        this.buildTime = buildTime;
        this.powerup = powerup;
        this.fitGuns = fitGuns;
        this.maxLevel = maxLevel;
        this._level = maxLevel;
        this._stats = stats;
        this.name = equip_1.getEquipResource(1, id);
        this.introduction = equip_1.getEquipResource(3, id);
    }
    Object.defineProperty(Equip.prototype, "stats", {
        get: function () {
            return equip_1.getEquipStats(this._stats, { level: this._level });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Equip.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (level) {
            if (level < 0) {
                throw Error('`level` must be greater than -1');
            }
            if (level > this.maxLevel) {
                throw Error("`level` must be less than " + (this.maxLevel + 1));
            }
            this._level = level;
        },
        enumerable: true,
        configurable: true
    });
    Equip.prototype.toJSON = function () {
        return {
            id: this.id,
            codename: this.codename,
            rank: this.rank,
            category: this.category,
            type: this.type,
            company: this.company,
            exclusiveRate: this.exclusiveRate,
            buildTime: this.buildTime,
            powerup: this.powerup,
            fitGuns: this.fitGuns,
            maxLevel: this.maxLevel,
            stats: this._stats,
        };
    };
    return Equip;
}());
exports.default = Equip;
