"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEquipStats(stats, _a) {
    var _b = (_a === void 0 ? {} : _a).level, level = _b === void 0 ? 0 : _b;
    var calc = function (stat, upgrade) { return Math.floor(stat * (10000 + level * upgrade) / 10000); };
    var newStats = {};
    Object.entries(stats).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var min = value.min, max = value.max, _b = value.upgrade, upgrade = _b === void 0 ? 0 : _b;
        newStats[key] = {
            min: calc(min, upgrade),
            max: calc(max, upgrade),
        };
    });
    return newStats;
}
exports.getEquipStats = getEquipStats;
function getEquipResource(resourceId, equipId) {
    var padId = String(equipId).padStart(7, '0');
    return "equip-" + resourceId + padId;
}
exports.getEquipResource = getEquipResource;
