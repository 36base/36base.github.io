import { IEffect, IObtain, ISkin, IStats } from '../interface';
export declare function getDollSkins(skins: number[]): ISkin[];
export declare function getDollObtain(obtain: number[]): IObtain[];
export declare function getFavorRatio(favor: number): 0 | 0.05 | -0.05 | 0.1 | 0.15;
export declare function getDollEffect(dollType: string, dummyLink: number, effect: IEffect): IEffect;
export declare function getDollStats(dollType: string, baseStats: IStats, growRatio: number, { level, dummyLink, favor, growth }?: {
    level?: number | undefined;
    dummyLink?: number | undefined;
    favor?: number | undefined;
    growth?: boolean | undefined;
}): IStats;
export declare function getDollResource(resourceId: number, dollId: string | number, { prefix }?: {
    prefix?: string | undefined;
}): string;
