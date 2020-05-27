"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fairyGrow_json_1 = __importDefault(require("../../data/fairyGrow.json"));
var base_1 = require("./base");
var fairyGrow = fairyGrow_json_1.default;
function getFairyStats(baseStats, growRatio, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.level, level = _c === void 0 ? 100 : _c, _d = _b.qualityLevel, qualityLevel = _d === void 0 ? 5 : _d;
    var stats = {};
    Object.entries(baseStats).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var _b = key, _c = fairyGrow[_b], statRatio = _c[0], levelRatio = _c[1], proportion = fairyGrow.proportion;
        var stat = (Math.ceil(statRatio * value / 100)
            + Math.ceil((level - 1) * levelRatio * value / 100 * growRatio / 100));
        stat = stat * proportion[qualityLevel - 1];
        stats[key] = stat;
    });
    return stats;
}
exports.getFairyStats = getFairyStats;
function getFairySkins(skins) {
    return skins.map(function (_a) {
        var id = _a.id, codename = _a.codename;
        return ({
            id: id,
            codename: codename,
            name: base_1.getSkinResource(base_1.SkinType.Fairy, 1, id),
            description: base_1.getSkinResource(base_1.SkinType.Fairy, 2, id),
        });
    });
}
exports.getFairySkins = getFairySkins;
function getFairyResource(resourceId, fairyId) {
    var padId = String(fairyId).padStart(7, '0');
    return "fairy-" + resourceId + padId;
}
exports.getFairyResource = getFairyResource;
