export type TimeTick = {
    value: number;
    label: string;
    major: boolean;
    pixelXposition: number;
};
export declare const useTimeTicks: (width: number, startTimeSec: number | undefined, endTimeSec: number | undefined, timeToPixel: (t: number) => number) => TimeTick[];
