export type Opts = {
    canvasWidth: number;
    canvasHeight: number;
    margins: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    visibleStartTimeSec: number;
    visibleEndTimeSec: number;
    minValue: number;
    maxValue: number;
    hideLegend: boolean;
    legendOpts: {
        location: 'northwest' | 'northeast';
    };
};
export type ResolvedSeries = {
    type: string;
    dataset: string;
    title?: string;
    encoding: {
        [key: string]: string;
    };
    attributes: {
        [key: string]: string | number | number[];
    };
    t: number[];
    y: number[];
};
export type TimeseriesAnnotationFileData = {
    type: 'TimeseriesAnnotation';
    events: {
        s: number;
        e: number;
        t: string;
        i: string;
    }[];
    event_types: {
        event_type: string;
        label: string;
        color_index: number;
    }[];
};
