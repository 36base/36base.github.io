"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var doll_1 = require("./api/doll");
var skill_1 = require("./api/skill");
var Doll = (function () {
    function Doll(dollJson) {
        this._level = 100;
        this._favor = 50;
        this._dummyLink = 5;
        this._skillLevel = 10;
        this._skillLevel2 = 10;
        var id = dollJson.id, rank = dollJson.rank, type = dollJson.type, buildTime = dollJson.buildTime, skins = dollJson.skins, stats = dollJson.stats, effect = dollJson.effect, grow = dollJson.grow, codename = dollJson.codename, skill1 = dollJson.skill1, skill2 = dollJson.skill2, mindupdate = dollJson.mindupdate, obtain = dollJson.obtain, equip1 = dollJson.equip1, equip2 = dollJson.equip2, equip3 = dollJson.equip3;
        if (id > 20000) {
            this._level = 120;
        }
        this.id = id;
        this.rank = rank;
        this.type = type;
        this.buildTime = buildTime;
        this._stats = stats;
        this._effect = effect;
        this.grow = grow;
        this.codename = codename;
        this._skill1 = skill1;
        this._skill2 = skill2;
        this.mindupdate = mindupdate;
        this.equip1 = equip1;
        this.equip2 = equip2;
        this.equip3 = equip3;
        this.name = doll_1.getDollResource(1, id);
        this.extra = doll_1.getDollResource(4, id);
        this.obtain = doll_1.getDollObtain(obtain);
        this.skins = doll_1.getDollSkins(skins);
    }
    Object.defineProperty(Doll.prototype, "stats", {
        get: function () {
            return doll_1.getDollStats(this.type, this._stats, this.grow, { level: this._level, favor: this._favor });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "effect", {
        get: function () {
            return doll_1.getDollEffect(this.type, this._dummyLink, this._effect);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "skill1", {
        get: function () {
            return skill_1.getSkill(this._skill1, { level: this._skillLevel });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "skill2", {
        get: function () {
            if (this._skill2) {
                return skill_1.getSkill(this._skill2, { level: this._skillLevel2 });
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "level", {
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
    Object.defineProperty(Doll.prototype, "favor", {
        get: function () {
            return this._favor;
        },
        set: function (favor) {
            if (favor < 0) {
                throw Error('`favor` must be greater than -1');
            }
            this._favor = favor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "dummyLink", {
        get: function () {
            return this._dummyLink;
        },
        set: function (dummyLink) {
            if (dummyLink < 1) {
                throw Error('`dummyLink` must be greater than 0');
            }
            this._dummyLink = dummyLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doll.prototype, "skillLevel", {
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
    Object.defineProperty(Doll.prototype, "skillLevel2", {
        get: function () {
            return this._skillLevel2;
        },
        set: function (skillLevel2) {
            if (skillLevel2 < 1) {
                throw Error('`skillLevel2` must be greater than 0');
            }
            if (skillLevel2 > 10) {
                throw Error('`skillLevel2` must be less than 11');
            }
            this._skillLevel2 = skillLevel2;
        },
        enumerable: true,
        configurable: true
    });
    Doll.isMod = function (id) {
        return id > 20000;
    };
    Doll.prototype.toJSON = function () {
        return {
            id: this.id,
            rank: this.rank,
            type: this.type,
            buildTime: this.buildTime,
            stats: this._stats,
            effect: this._effect,
            grow: this.grow,
            codename: this.codename,
            skill1: this._skill1,
            skill2: this._skill2,
            mindupdate: this.mindupdate,
            obtain: this.obtain.map(function (_a) {
                var id = _a.id;
                return id;
            }),
            skins: this.skins.map(function (_a) {
                var id = _a.id;
                return id;
            }),
            equip1: this.equip1,
            equip2: this.equip2,
            equip3: this.equip3,
        };
    };
    return Doll;
}());
exports.default = Doll;
