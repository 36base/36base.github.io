import { IBaseStats, IPowerup } from './base';
export interface IEquipStatDetail {
    min: number;
    max: number;
    upgrade?: number;
}
export interface IEquipStats extends IBaseStats {
    [key: string]: IEquipStatDetail;
}
export interface IEquip {
    id: number;
    codename: string;
    rank: number;
    category: string;
    type: string;
    company: string;
    exclusiveRate: number;
    maxLevel: number;
    buildTime: number;
    stats: IEquipStats;
    powerup: IPowerup;
    fitGuns: number[];
}
