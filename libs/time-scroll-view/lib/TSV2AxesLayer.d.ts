import { FunctionComponent } from 'react';
import { TickSet } from './YAxisTicks';
import { TimeTick } from './timeTicks';
export type TSV2AxesLayerProps = {
    timeRange: [number, number];
    timeTicks: TimeTick[];
    margins: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    gridlineOpts?: {
        hideX: boolean;
        hideY: boolean;
    };
    yTickSet?: TickSet;
    width: number;
    height: number;
};
declare const TSV2AxesLayer: FunctionComponent<TSV2AxesLayerProps>;
export default TSV2AxesLayer;
