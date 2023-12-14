import React from 'react';
export type PanState = {
    anchorX?: number;
    pannedX?: number;
    panning?: boolean;
};
export type PanStateRef = React.MutableRefObject<PanState>;
export type PanUpdateProperties = {
    mouseX: number;
};
type PanUpdateRefs = {
    divElmt: HTMLDivElement | null;
    panStateRef: PanStateRef;
};
type PanFn = (deltaT: number) => void;
export declare const useThrottledPan: (refs: PanUpdateRefs, secondsPerPixel: number, panTimeSelectionDeltaT: PanFn) => {
    throttler: (state: PanUpdateProperties) => void;
    cancelThrottled: () => void;
};
declare const useTimeScrollPan: (divElmt: HTMLDivElement | null, secondsPerPixel: number, panTimeSelectionDeltaT: PanFn) => {
    setPanUpdate: (state: PanUpdateProperties) => void;
    resetAnchor: (mouseX: number) => void;
    startPan: (mouseX: number) => void;
    clearPan: () => void;
    isPanning: () => boolean;
};
export default useTimeScrollPan;
