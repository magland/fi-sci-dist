export type LegendOpts = {
    location: 'northwest' | 'northeast';
};
export type GridlineOpts = {
    hideX: boolean;
    hideY: boolean;
};
export type Dataset = {
    name: string;
    data: {
        [key: string]: number[];
    };
};
export type Series = {
    type: string;
    dataset: string;
    title?: string;
    encoding: {
        [key: string]: string;
    };
    attributes: {
        [key: string]: string | number | number[];
    };
};
export type TimeseriesGraphViewData = {
    type: 'TimeseriesGraph';
    datasets: Dataset[];
    series: Series[];
    timeOffset?: number;
    legendOpts?: LegendOpts;
    yRange?: [number, number];
    gridlineOpts?: GridlineOpts;
    hideToolbar?: boolean;
};
