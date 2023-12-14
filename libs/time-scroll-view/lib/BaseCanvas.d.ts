export type DrawFn<T> = (ctxt: CanvasRenderingContext2D, data: T) => void;
/**
 * @param width Pixel width of canvas element.
 * @param height Pixel height of canvas element.
 * @param vOffsetPx Optional; pixels to reposition this canvas relative to the top of the parent element.
 * @param hOffsetPx Optional; pixels to reposition this canvas relative to the top of its parent element.
 * @param draw A function mapping a CanvasRenderingContext2D and a generically-typed backing-data object to void;
 * this will be called every time the backing data changes. The function should draw the input data.
 * @param drawData The data backing this Canvas view.
 */
export interface BaseCanvasProps<T> {
    width: number;
    height: number;
    vOffsetPx?: number;
    hOffsetPx?: number;
    draw: DrawFn<T>;
    drawData: T;
}
/**
 * Creates a canvas object with a specified data type and draw function that draws that data type,
 * along with wiring to ensure the draw function is called every time the underlying data changes.
 * A graphical-element View in an MVC pattern.
 *
 * @param props Dimensions and positioning parameters, plus typed drawing data and drawing function.
 * @returns A Canvas element which automatically redraws when its content data changes.
 */
declare const BaseCanvas: <T>(props: BaseCanvasProps<T>) => import("react/jsx-runtime").JSX.Element;
export default BaseCanvas;
