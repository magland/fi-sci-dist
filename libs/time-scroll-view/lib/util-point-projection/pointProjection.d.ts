import { Matrix } from 'mathjs';
export type Margins = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export type PartialMargins = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};
export type ScalingProps = {
    totalPixelWidth: number;
    totalPixelHeight: number;
    pixelMargins?: PartialMargins;
    dataXMin?: number;
    dataXMax?: number;
    dataYMin?: number;
    dataYMax?: number;
    yScaleFactor?: number;
    xScaleFactor?: number;
    positiveYGrowsDownward?: boolean;
    preserveAspectRatio?: boolean;
};
export type Dims = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};
/**
 * Convenience method to convert a 1d data series from native units into pixel space, using a transform
 * provided by use1dScalingMatrix.
 *
 * @param data The one-dimensional data series to project into pixel space, as a 1d array of numbers.
 * @param transform The 1d scaling matrix produced from use1dScalingMatrix.
 * @returns The equivalent data series in pixel space.
 */
export declare const convert1dDataSeries: (data: number[], transform: Matrix) => number[];
/**
 * Gets the per-unit scale factor from a 1d data series scaling matrix.
 * @param transform The one-dimensional scaling matrix, as from use1dScalingMatrix.
 * @returns The number of pixels represented by one native unit.
 */
export declare const getScaleFrom1dScalingMatrix: (transform: Matrix) => number;
/**
 * For a given data series, computes a 1 x 2 matrix (vector) which can left-multiply an augmented vector
 * of the data series to map it into pixel space.
 * This is appropriate for use with x-axis/horizontal-only data (e.g. times in a time series)--it does not offer the
 * ability to invert the axis, as is needed for y-axis data (since the browser maps y-0 to the top of the container and
 * y-values increase as you move down, rather than up, the screen).
 *
 * This transform matrix is consumed by convert1dDataSeries as:
 *
 * const data = [5, 10, 20]
 * const transform = use1dScalingMatrix(pixelWidth: 500, dataStart: 0, dataEnd: 50, extraPixelOffset: 10)
 * const pixelData = useConverted1dDataSeres(data, transform)
 * // pixelData = [60, 110, 210], since we mapped a 50-unit range into a 500-pixel space with a 10-pixel offset.
 *
 * @param pixelWidth Width of the target space in pixels. (This is the width of the drawing space only--if the total window
 * is 700 pixels but you want a 100-pixel margin on either side, you would use 500 for this value and 100 for the extraPixelOffset.)
 * @param dataStart Value, in native units, of the first data point to be projected into pixel space.
 * @param dataLength Length, in native units, of the range of data points to be projected into pixel space. The range of the
 * data is assumed to be continuous.
 * @param extraPixelOffset The width of any margin between the left side of the space ('pixel zero') and the start of the
 * space the data series should be projected into.
 * @returns A 1 x 2 vector which projects data into pixel space, usable directly or by useConverted1dDataSeries and useSpansToStartWidthForm.
 */
export declare const use1dScalingMatrix: (pixelWidth: number, dataStart: number | undefined, dataEnd: number | undefined, extraPixelOffset?: number) => Matrix;
/**
 * Hook to convert [TODO: MEMOIZED] 1-d intervals, represented as start and stop intervals in a native unit, into
 * corresponding starts and widths in pixel space. This is particularly useful for graphics applications like
 * drawing rectangles, since the canvas rect() function takes (x, y, w, h). If you actually want start and end
 * points in pixelspace, you're better off using one of the useConvertedDataSeries methods.
 * @param scalingMatrix A 1d scaling matrix (as from use1dScalingMatrix) appropriate to the data and window.
 * @param data List of lists of numbers representing the start and end points of intervals in the native data units. May
 * be written either as two series, i.e. [ [start_0, start_1, start_2, ...], [end_0, end_1, end_2, ...]] or
 * in pairs, as [ [start_0, end_0], [start_1, end_1], [start_2, end_2], ... ]
 * @param dataInPairs Should be set to true if `data` is represented as a list of pairs of numbers, so that they can
 * be transposed appropriately.
 * @returns Conversion of the original data series into pixel space, with each interval represented as its start
 * pixel and pixel width (instead of start and stop). (This is usually what you want for drawing rectangles.) If
 * the data were passed as two series, the return value is [[...starts...], [...ends...]]; if the original data
 * were passed as pairs, the return value will also be in pairs, as [[start_0, width_0], [start_1, width_1], ...].
 */
export declare const usePointWidthsFromIntervals: (scalingMatrix: Matrix, data: number[][], dataInPairs?: boolean) => number[][];
/**
 * For a given data range in 2 dimensions, computes a (memoized) 2 x 3 matrix which can left-multiply
 * an augmented data vector to map the data points into pixel space.
 * This is appropriate for use with 2D data (in x and y).
 * Graphics convention places y=0 at the top of the window with increasing y values moving lower in
 * the drawing space. This is probably not what you want, so by default the transformation matrix
 * corrects for the inversion.
 *
 * It is probably easiest not to adjust the `totalPixelWidth` and `totalPixelHeight` parameters, but
 * rather to let the `pixelMargins` parameter take care of this. The code assumes they run from 0
 * to the full range of the visible window.
 * However, if you have already computed a specific pixel space, you can submit that, just be aware
 * that there may be odd behavior in applying user scaling and in preserving aspect ratio.
 * In any event, be aware that user scaling options may result in drawing in the margins.
 *
 * The transform matrix returned by this function can be consumed by useConverted2dDataSeries as:
 *
 * const data = [[1, 3, 5], [1, 9, 25]]
 * const scalingMatrixProps = {
 *   totalPixelWidth: 250,
 *   totalPixelHeight: 250,
 *   pixelMargins: { top: 20, bottom: 30, left: 25, right: 25 },
 *   dataXMin: 0,
 *   dataXMax: 10,
 *   dataYMin: 0,
 *   dataYMax: 50
 * }
 * const transform = use2dScalingMatrix(scalingMatrixProps)
 * const pixelData = convert2dDataSeries(data, transform)
 * // pixelData = [[45, 85, 125], [216, 184, 120]]
 *
 * @param props A `ScalingProps` containing the total pixel dimensions, pixel margins, data dimensions,
 * user-defined scaling factors in x and y directions, and options to preserve the aspect ratio of the
 * data and to accept the graphics-system default of setting y=0 at the top of the window.
 * @returns A 2d scaling matrix which maps native data points into a desired drawing space.
 */
export declare const use2dScalingMatrix: (props: ScalingProps) => Matrix;
/**
 * This function returns the pixel value on the y axis corresponding to the 0 of a rendered plot (accounting for margins
 * if they were used in creating the input transform matrix).
 * This value is often needed for drawing baselines and axes in plots, and the function decreases the chance of error
 * when dealing with the reversed y-axis conventions between computer graphics and usual plotting practice.
 * @param transformMatrix2d A matrix (as generated by use2dScalingMatrix) which projects native data points into
 * pixels.
 * @returns The scalar pixel value, within the window, corresponding to 0 in the native unit space.
 */
export declare const getYAxisPixelZero: (transformMatrix2d: Matrix) => number;
/**
 * Function to project a data series of 2-d points into a pixel drawing space.
 * @param transform Transformation matrix from use2dScalingMatrix.
 * @param data The two-dimensional data series to project into the pixel space. May be represented as
 * an x-series and a y-series ([[x_0, x_1, ...], [y_0, y_1, ...]]) or as a list of paired points
 * ([[x_0, y_0], [x_1, y_1], [x_2, y_2], ...]).
 * @param dataAsPairs Must be set to true if the `data` value is passed as a list of paired points.
 * @returns The pixel values corresponding to the given data points. The return value will match the
 * structure of the input value: if the original data were passed as two series, the return value will
 * be two series; if the original data were a list of [x, y] pairs, then a list of pairs will be returned.
 */
export declare const convert2dDataSeries: (transform: Matrix, data: number[][], dataAsPairs?: boolean) => number[][];
/**
 * Converts distances in the data's native units into the corresponding distance in pixels. Input distances and
 * output distances are to be broken into x and y components. (This is intended for converting rectangles and
 * other spans, not for computing a distance metric.)
 * @param xDistance The distance between the x-values of two points in the data's native units.
 * @param yDistance The distance between the y-values of two points in the data's native units.
 * @param transform 2d scaling matrix as provided by use2dScalingMatrix.
 * @returns The corresponding x- and y-distances in pixels.
 */
export declare const convertBaseDistanceToPixelDistance: (xDistance: number, yDistance: number, transform: Matrix) => {
    xDistance: number;
    yDistance: number;
};
