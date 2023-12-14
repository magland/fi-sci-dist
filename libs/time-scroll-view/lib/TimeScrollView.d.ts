import React, { FunctionComponent } from 'react';
import { ToolbarItem } from './ViewToolbar';
type Props = {
    width: number;
    height: number;
    onCanvasElement: (elmt: HTMLCanvasElement) => void;
    gridlineOpts?: {
        hideX: boolean;
        hideY: boolean;
    };
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
    onMouseMove?: (e: React.MouseEvent) => void;
    onMouseOut?: (e: React.MouseEvent) => void;
    hideToolbar?: boolean;
    shiftZoom?: boolean;
    yAxisInfo?: {
        showTicks: boolean;
        yMin?: number;
        yMax?: number;
    };
    additionalToolbarItems?: ToolbarItem[];
    showTimeSelectionBar?: boolean;
    leftMargin?: number;
};
export declare const useTimeScrollView: ({ width, height, hideToolbar, leftMargin }: {
    width: number;
    height: number;
    hideToolbar?: boolean | undefined;
    leftMargin?: number | undefined;
}) => {
    margins: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    canvasWidth: number;
    canvasHeight: number;
    toolbarWidth: number;
};
declare const TimeScrollView: FunctionComponent<Props>;
export default TimeScrollView;
