import { IEquipStats } from '../interface';
export declare function getEquipStats(stats: IEquipStats, { level }?: {
    level?: number | undefined;
}): IEquipStats;
export declare function getEquipResource(resourceId: number, equipId: string | number): string;
