import { TimeSelection } from './TimeSelection';
export type TimeSelectionAction = {
    type: 'report_total_time_range';
    startTimeSec: number;
    endTimeSec: number;
} | {
    type: 'set_visible_time_range';
    visibleStartTimeSec: number;
    visibleEndTimeSec: number;
} | {
    type: 'set_current_time';
    currentTimeSec: number;
} | {
    type: 'set_current_time_fraction';
    fraction: number;
} | {
    type: 'pan_time_selection';
    deltaSec: number;
} | {
    type: 'zoom_time_selection';
    anchorTimeSec?: number;
    factor: number;
} | {
    type: 'pan_time_selection_pct';
    pct: number;
};
export declare const timeSelectionReducer: (state: TimeSelection, action: TimeSelectionAction) => TimeSelection;
