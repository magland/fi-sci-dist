import { Matrix } from 'mathjs';
type YAxisProps = {
    datamin?: number;
    datamax?: number;
    userSpecifiedZoom?: number;
    pixelHeight: number;
};
export type Step = {
    label: string;
    dataValue: number;
    pixelValue?: number;
    isMajor: boolean;
};
export type TickSet = {
    ticks: Step[];
    datamax: number;
    datamin: number;
};
declare const useYAxisTicks: (props: YAxisProps) => {
    ticks: Step[];
    datamin: number;
    datamax: number;
};
/**
 * Returns a set of labeled y-axis ticks/grid line locations, projected into the pixel drawing space.
 * @param ticks The set of vertical/data-axis tick marks to draw.
 * @param transform Output of pointProjection.use2dScalingMatrix(); a transform matrix mapping the native
 * unit space into the two-dimensional pixel space. (The x portion will be ignored, though.)
 * @returns Structured set of y-axis ticks ready for painting on the canvas.
 */
export declare const useProjectedYAxisTicks: (ticks: TickSet, transform: Matrix) => {
    ticks: {
        pixelValue: number;
        label: string;
        dataValue: number;
        isMajor: boolean;
    }[];
    datamax: number;
    datamin: number;
};
export { useYAxisTicks };
