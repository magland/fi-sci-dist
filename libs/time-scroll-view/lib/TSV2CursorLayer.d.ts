export type TSVCursorLayerProps = {
    timeRange: [number, number];
    currentTimePixels?: number;
    currentTimeIntervalPixels?: [number, number];
    margins: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    width: number;
    height: number;
};
declare const TSV2CursorLayer: (props: TSVCursorLayerProps) => import("react/jsx-runtime").JSX.Element;
export default TSV2CursorLayer;
