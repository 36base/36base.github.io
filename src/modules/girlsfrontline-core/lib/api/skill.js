"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkillType;
(function (SkillType) {
    SkillType[SkillType["battle"] = 0] = "battle";
    SkillType[SkillType["mission"] = 1] = "mission";
})(SkillType = exports.SkillType || (exports.SkillType = {}));
function getSkill(skill, _a) {
    var _b = (_a === void 0 ? {} : _a).level, level = _b === void 0 ? 10 : _b;
    var id = skill.id, codename = skill.codename, cooldownType = skill.cooldownType, initialCooldown = skill.initialCooldown, dataPool = skill.dataPool, consumption = skill.consumption;
    var name = getSkillResource(1, id, level);
    var description = getSkillResource(2, id, level);
    var detail = getSkillResource(3, id, level);
    var cooldown = (dataPool.find(function (_a) {
        var poolLevel = _a.level;
        return poolLevel === level;
    }) || { cooldown: 0 }).cooldown;
    return {
        id: id,
        codename: codename,
        name: name,
        description: description,
        cooldownType: cooldownType,
        initialCooldown: initialCooldown,
        cooldown: cooldown,
        detail: detail,
        consumption: consumption,
    };
}
exports.getSkill = getSkill;
function getSkillResource(resourceId, skillId, level) {
    var padLevel = String(level).padStart(2, '0');
    var key = skillId.startsWith('*')
        ? "mission_skill_config-" + resourceId + skillId.substr(1).padStart(5, '0') + padLevel
        : "battle_skill_config-" + resourceId + skillId.padStart(6, '0') + padLevel;
    return key;
}
exports.getSkillResource = getSkillResource;
