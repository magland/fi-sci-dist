export declare const useTimeSelection: () => {
    startTimeSec: number | undefined;
    endTimeSec: number | undefined;
    visibleStartTimeSec: number | undefined;
    visibleEndTimeSec: number | undefined;
    currentTimeSec: number | undefined;
    reportTotalTimeRange: (startTimeSec: number, endTimeSec: number) => void;
    setVisibleTimeRange: (visibleStartTimeSec: number, visibleEndTimeSec: number) => void;
    setCurrentTime: (currentTimeSec: number) => void;
    setCurrentTimeFraction: (fraction: number) => void;
    zoomTimeSelection: (factor: number, anchorTimeSec?: number) => void;
    panTimeSelection: (deltaSec: number) => void;
    panTimeSelectionPct: (pct: number) => void;
};
