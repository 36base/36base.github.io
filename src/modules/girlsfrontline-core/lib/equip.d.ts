import { IEquip, IEquipStats, IPowerup } from './interface';
export default class Equip {
    readonly id: number;
    readonly codename: string;
    readonly rank: number;
    readonly category: string;
    readonly type: string;
    readonly company: string;
    readonly exclusiveRate: number;
    readonly maxLevel: number;
    readonly buildTime: number;
    readonly powerup: IPowerup;
    readonly fitGuns: number[];
    readonly name: string;
    readonly introduction: string;
    private readonly _stats;
    readonly stats: IEquipStats;
    private _level;
    level: number;
    constructor(equipJson: IEquip);
    toJSON(): IEquip;
}
