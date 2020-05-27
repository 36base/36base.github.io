import { IFairySkin, IFairySkinJson, IStats } from '../interface';
export declare function getFairyStats(baseStats: IStats, growRatio: number, { level, qualityLevel }?: {
    level?: number | undefined;
    qualityLevel?: number | undefined;
}): IStats;
export declare function getFairySkins(skins: IFairySkinJson[]): IFairySkin[];
export declare function getFairyResource(resourceId: number, fairyId: string | number): string;
