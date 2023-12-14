import { FunctionComponent } from 'react';
import { TimeseriesGraphViewData } from './TimeseriesGraphViewData';
type Props = {
    data: TimeseriesGraphViewData;
    width: number;
    height: number;
};
declare const TimeseriesGraphView: FunctionComponent<Props>;
export default TimeseriesGraphView;
