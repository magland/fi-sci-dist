import { ToolbarItem } from './ViewToolbar';
export type ZoomDirection = 'in' | 'out';
export type PanDirection = 'forward' | 'back';
interface TimeWidgetToolbarProps {
    zoomTimeSelection: (factor: number, anchorTimeSec?: number) => void;
    panTimeSelectionPct: (pct: number) => void;
}
export declare const DefaultToolbarWidth = 18;
declare const TimeWidgetToolbarEntries: (props: TimeWidgetToolbarProps) => ToolbarItem[];
export default TimeWidgetToolbarEntries;
