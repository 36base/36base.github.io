import { IFairy, IFairySkin, IPowerup, ISkill, IStats } from './interface';
export default class Fairy {
    readonly id: number;
    readonly category: string;
    readonly grow: number;
    readonly buildTime: number;
    readonly codename: string;
    readonly powerup: IPowerup;
    readonly retireExp: number;
    readonly qualityExp: number[];
    readonly name: string;
    readonly introduce: string;
    readonly description: string;
    readonly skins: IFairySkin[];
    private readonly _skill;
    readonly skill: ISkill;
    private readonly _stats;
    readonly stats: IStats;
    private _level;
    level: number;
    private _qualityLevel;
    qualityLevel: number;
    private _skillLevel;
    skillLevel: number;
    constructor(fairyJson: IFairy);
    toJSON(): IFairy;
}
