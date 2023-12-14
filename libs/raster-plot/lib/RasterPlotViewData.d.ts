export type RPPlotData = {
    unitId: number | string;
    spikeTimesSec: number[];
};
export type RasterPlotViewData = {
    type: 'RasterPlot';
    startTimeSec: number;
    endTimeSec: number;
    plots: RPPlotData[];
    highlightIntervals?: any[];
    hideToolbar?: boolean;
};
export declare const isRasterPlotViewData: (x: any) => x is RasterPlotViewData;
