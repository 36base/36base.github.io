"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkinType;
(function (SkinType) {
    SkinType[SkinType["Doll"] = 0] = "Doll";
    SkinType[SkinType["Fairy"] = 1] = "Fairy";
})(SkinType = exports.SkinType || (exports.SkinType = {}));
function getSkinResource(skinType, resourceId, skinId) {
    var padId = String(skinId).padStart(7, '0');
    var prefix = 'skin';
    if (skinType === SkinType.Fairy) {
        prefix = 'fairy_skin';
    }
    return prefix + "-" + resourceId + padId;
}
exports.getSkinResource = getSkinResource;
