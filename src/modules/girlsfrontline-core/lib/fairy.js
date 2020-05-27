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
var fairy_1 = require("./api/fairy");
var skill_1 = require("./api/skill");
var Fairy = (function () {
    function Fairy(fairyJson) {
        this._level = 100;
        this._qualityLevel = 5;
        this._skillLevel = 10;
        var fairyData = __assign({}, fairyJson);
        var id = fairyData.id, category = fairyData.category, stats = fairyData.stats, skill = fairyData.skill, grow = fairyData.grow, buildTime = fairyData.buildTime, codename = fairyData.codename, powerup = fairyData.powerup, retireExp = fairyData.retireExp, qualityExp = fairyData.qualityExp, skins = fairyData.skins;
        this.id = id;
        this.category = category;
        this._skill = skill;
        this._stats = stats;
        this.grow = grow;
        this.buildTime = buildTime;
        this.codename = codename;
        this.powerup = powerup;
        this.retireExp = retireExp;
        this.qualityExp = qualityExp;
        this.name = fairy_1.getFairyResource(1, id);
        this.introduce = fairy_1.getFairyResource(2, id);
        this.description = fairy_1.getFairyResource(3, id);
        this.skins = fairy_1.getFairySkins(skins);
    }
    Object.defineProperty(Fairy.prototype, "skill", {
        get: function () {
            return skill_1.getSkill(this._skill, { level: this._skillLevel });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fairy.prototype, "stats", {
        get: function () {
            return fairy_1.getFairyStats(this._stats, this.grow, {
                level: this._level,
                qualityLevel: this._qualityLevel,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fairy.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (level) {
            if (level < 1) {
                throw Error('`level` must be greater than 0');
            }
            this._level = level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fairy.prototype, "qualityLevel", {
        get: function () {
            return this._qualityLevel;
        },
        set: function (qualityLevel) {
            if (qualityLevel < 1) {
                throw Error('`qualityLevel` must be greater than 0');
            }
            if (qualityLevel > 5) {
                throw Error('`qualityLevel` must be less than 6');
            }
            this._qualityLevel = qualityLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fairy.prototype, "skillLevel", {
        get: function () {
            return this._skillLevel;
        },
        set: function (skillLevel) {
            if (skillLevel < 1) {
                throw Error('`skillLevel` must be greater than 0');
            }
            if (skillLevel > 10) {
                throw Error('`skillLevel` must be less than 11');
            }
            this._skillLevel = skillLevel;
        },
        enumerable: true,
        configurable: true
    });
    Fairy.prototype.toJSON = function () {
        return {
            id: this.id,
            category: this.category,
            skill: this._skill,
            stats: this._stats,
            grow: this.grow,
            buildTime: this.buildTime,
            codename: this.codename,
            powerup: this.powerup,
            retireExp: this.retireExp,
            qualityExp: this.qualityExp,
            skins: this.skins.map(function (_a) {
                var id = _a.id, codename = _a.codename;
                return ({ id: id, codename: codename });
            }),
        };
    };
    return Fairy;
}());
exports.default = Fairy;
