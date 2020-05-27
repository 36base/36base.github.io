import { ISkill, ISkillJson } from '../interface';
export declare enum SkillType {
    battle = 0,
    mission = 1
}
export declare function getSkill(skill: ISkillJson, { level }?: {
    level?: number | undefined;
}): ISkill;
export declare function getSkillResource(resourceId: number | string, skillId: string, level: number | string): string;
