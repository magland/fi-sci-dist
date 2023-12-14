import React from 'react';
declare const useTimeScrollEventHandlers: (leftMargin: number, panelWidth: number, panelWidthSeconds: number, divElmt: HTMLDivElement | null) => {
    handleMouseUp: (e: React.MouseEvent) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseLeave: (e: React.MouseEvent) => void;
};
export default useTimeScrollEventHandlers;
