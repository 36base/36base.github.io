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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dollAttribute_json_1 = __importDefault(require("../../data/dollAttribute.json"));
var dollGrow_json_1 = __importDefault(require("../../data/dollGrow.json"));
var base_1 = require("./base");
function getDollSkins(skins) {
    return skins.map(function (skinId) {
        var name = base_1.getSkinResource(base_1.SkinType.Doll, 1, skinId);
        return {
            id: skinId,
            name: name,
        };
    });
}
exports.getDollSkins = getDollSkins;
function getDollObtain(obtain) {
    return obtain.map(function (id) {
        var description = getDollResource(1, id, { prefix: 'gun_obtain' });
        return {
            id: id,
            description: description,
        };
    });
}
exports.getDollObtain = getDollObtain;
function getFavorRatio(favor) {
    if (favor < 10) {
        return -0.05;
    }
    if (favor < 90) {
        return 0;
    }
    if (favor < 140) {
        return 0.05;
    }
    if (favor < 190) {
        return 0.1;
    }
    return 0.15;
}
exports.getFavorRatio = getFavorRatio;
function getDollEffect(dollType, dummyLink, effect) {
    if (dollType === 'hg') {
        var gridEffect_1 = __assign({}, effect.gridEffect);
        Object.entries(gridEffect_1).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            gridEffect_1[key] = Math.floor(Number(value) * (1 + (0.25 * (dummyLink - 1))));
        });
        return __assign({}, effect, { gridEffect: __assign({}, gridEffect_1) });
    }
    return effect;
}
exports.getDollEffect = getDollEffect;
function getDollStats(dollType, baseStats, growRatio, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.level, level = _c === void 0 ? 100 : _c, _d = _b.dummyLink, dummyLink = _d === void 0 ? 5 : _d, _e = _b.favor, favor = _e === void 0 ? 50 : _e, _f = _b.growth, growth = _f === void 0 ? true : _f;
    var _g = dollType, attributeData = dollAttribute_json_1.default[_g];
    var _h = dollGrow_json_1.default, normal = _h.normal, after100 = _h.after100;
    var basicStats = normal.basic;
    var growStats = normal.grow;
    if (level > 100) {
        basicStats = __assign({}, basicStats, after100.basic);
        growStats = __assign({}, growStats, after100.grow);
    }
    var stats = __assign({}, baseStats);
    Object.entries(attributeData).forEach(function (_a) {
        var key = _a[0], attr = _a[1];
        var attribute = attr;
        var stat = stats[key] || 0;
        var _b = key, basicData = basicStats[_b];
        var _c = key, growData = growStats[_c];
        var newStat = basicData.length > 1
            ? Math.ceil((basicData[0] + ((level - 1) * basicData[1])) * attribute * stat / 100)
            : Math.ceil(basicData[0] * attribute * stat / 100);
        newStat += growth === true && growData
            ? Math.ceil((growData[1] + ((level - 1) * growData[0])) * attribute * stat * growRatio / 100 / 100)
            : 0;
        newStat += key === 'pow' || key === 'hit' || key === 'dodge'
            ? Math.sign(getFavorRatio(favor)) * Math.ceil(Math.abs(newStat * getFavorRatio(favor)))
            : 0;
        newStat = key === 'hp'
            ? newStat * dummyLink
            : newStat;
        stats[key] = newStat;
    });
    return stats;
}
exports.getDollStats = getDollStats;
function getDollResource(resourceId, dollId, _a) {
    var _b = (_a === void 0 ? {} : _a).prefix, prefix = _b === void 0 ? 'gun' : _b;
    var padId = String(dollId).padStart(7, '0');
    return prefix + "-" + resourceId + padId;
}
exports.getDollResource = getDollResource;
