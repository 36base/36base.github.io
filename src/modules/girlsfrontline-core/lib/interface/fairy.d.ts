import { IPowerup, ISkillJson, IStats } from './base';
import { ISkin } from './doll';
export interface IFairyGrow {
    [key: string]: number[];
    armor: [number, number];
    criticalHarmRate: [number, number];
    dodge: [number, number];
    hit: [number, number];
    pow: [number, number];
    proportion: [number, number, number, number, number];
}
export interface IFairySkinJson {
    id: number;
    codename: string;
}
export interface IFairySkin extends ISkin {
    codename: string;
}
export interface IFairy {
    id: number;
    category: string;
    stats: IStats;
    skill: ISkillJson;
    grow: number;
    buildTime: number;
    codename: string;
    powerup: IPowerup;
    retireExp: number;
    qualityExp: number[];
    skins: IFairySkinJson[];
}
