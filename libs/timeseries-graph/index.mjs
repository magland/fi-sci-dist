import { jsx as $ } from "react/jsx-runtime";
import { useMemo as d, useEffect as m, useState as y, useCallback as O } from "react";
import { useTimeSelection as Z } from "@fi-sci/context-time-selection";
import { useTimeScrollView as j, TimeScrollView as q } from "@fi-sci/time-scroll-view";
const z = `"use strict";
let canvas = undefined;
let opts = undefined;
let resolvedSeries = undefined;
let plotSeries = undefined;
// let annotation: TimeseriesAnnotationFileData | undefined = undefined
onmessage = function (evt) {
    if (evt.data.canvas) {
        canvas = evt.data.canvas;
        drawDebounced();
    }
    if (evt.data.opts) {
        opts = evt.data.opts;
        drawDebounced();
    }
    if (evt.data.resolvedSeries) {
        resolvedSeries = evt.data.resolvedSeries;
        drawDebounced();
    }
    // if (evt.data.annotation) {
    //     annotation = evt.data.annotation
    //     drawDebounced()
    // }
};
function debounce(f, msec) {
    let scheduled = false;
    return () => {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(() => {
            scheduled = false;
            f();
        }, msec);
    };
}
let drawCode = 0;
async function draw() {
    if (!canvas)
        return;
    if (!opts)
        return;
    if (!resolvedSeries)
        return;
    const { margins, canvasWidth, canvasHeight, visibleStartTimeSec, visibleEndTimeSec, minValue, maxValue } = opts;
    // this is important because main thread no longer has control of canvas (it seems)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext)
        return;
    drawCode += 1;
    const thisDrawCode = drawCode;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const pass of (plotSeries ? [1, 2] : [1])) {
        if (thisDrawCode !== drawCode)
            return;
        const timer = Date.now();
        if ((pass === 2) || (!plotSeries)) {
            plotSeries = computePlotSeries(resolvedSeries);
        }
        const coordToPixel = (p) => {
            return {
                x: margins.left + (p.x - visibleStartTimeSec) / (visibleEndTimeSec - visibleStartTimeSec) * (canvasWidth - margins.left - margins.right),
                y: canvasHeight - margins.bottom - (p.y - minValue) / (maxValue - minValue) * (canvasHeight - margins.top - margins.bottom)
            };
        };
        const pixelZero = coordToPixel({ x: 0, y: 0 }).y;
        const pixelData = plotSeries.map((s, i) => {
            return {
                dimensionIndex: i,
                dimensionLabel: \`\${i}\`,
                pixelTimes: s.times.map(t => coordToPixel({ x: t, y: 0 }).x),
                pixelValues: s.values.map(y => coordToPixel({ x: 0, y }).y),
                type: s.type,
                attributes: s.attributes
            };
        });
        const panelProps = {
            pixelZero: pixelZero,
            dimensions: pixelData
        };
        paintPanel(canvasContext, panelProps);
        // the wait time is equal to the render time
        const elapsed = Date.now() - timer;
        await sleepMsec(elapsed);
    }
    // if (annotation) {
    //     await drawAnnotation({
    //         canvasContext,
    //         canvasWidth,
    //         canvasHeight,
    //         visibleStartTimeSec,
    //         visibleEndTimeSec,
    //         margins,
    //         annotation
    //     })
    // }
}
const drawDebounced = debounce(draw, 10);
const paintLegend = (context) => {
    if (!opts)
        return;
    if (opts.hideLegend)
        return;
    if (!resolvedSeries)
        return;
    const { legendOpts, margins, canvasWidth } = opts;
    const seriesToInclude = resolvedSeries.filter(s => (s.title));
    if (seriesToInclude.length === 0)
        return;
    const { location } = legendOpts;
    const entryHeight = 18;
    const entryFontSize = 12;
    const symbolWidth = 50;
    const legendWidth = 200;
    const margin = 10;
    const legendHeight = 20 + seriesToInclude.length * entryHeight;
    const R = location === 'northwest' ? { x: margins.left + 20, y: margins.top + 20, w: legendWidth, h: legendHeight } :
        location === 'northeast' ? { x: canvasWidth - margins.right - legendWidth - 20, y: margins.top + 20, w: legendWidth, h: legendHeight } : undefined;
    if (!R)
        return; //unexpected
    context.fillStyle = 'white';
    context.strokeStyle = 'gray';
    context.lineWidth = 1.5;
    context.fillRect(R.x, R.y, R.w, R.h);
    context.strokeRect(R.x, R.y, R.w, R.h);
    seriesToInclude.forEach((s, i) => {
        const y0 = R.y + margin + i * entryHeight;
        const symbolRect = { x: R.x + margin, y: y0, w: symbolWidth, h: entryHeight };
        const titleRect = { x: R.x + margin + symbolWidth + margin, y: y0, w: legendWidth - margin - margin - symbolWidth - margin, h: entryHeight };
        const title = s.title || 'untitled';
        context.fillStyle = 'black';
        context.font = \`\${entryFontSize}px Arial\`;
        context.fillText(title, titleRect.x, titleRect.y + titleRect.h / 2 + entryFontSize / 2);
        if (s.type === 'line') {
            applyLineAttributes(context, s.attributes);
            context.beginPath();
            context.moveTo(symbolRect.x, symbolRect.y + symbolRect.h / 2);
            context.lineTo(symbolRect.x + symbolRect.w, symbolRect.y + symbolRect.h / 2);
            context.stroke();
            context.setLineDash([]);
        }
        else if (s.type === 'marker') {
            applyMarkerAttributes(context, s.attributes);
            const radius = entryHeight * 0.3;
            const shape = s.attributes['shape'] ?? 'circle';
            const center = { x: symbolRect.x + symbolRect.w / 2, y: symbolRect.y + symbolRect.h / 2 };
            if (shape === 'circle') {
                context.beginPath();
                context.ellipse(center.x, center.y, radius, radius, 0, 0, 2 * Math.PI);
                context.fill();
            }
            else if (shape === 'square') {
                context.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2);
            }
        }
    });
};
const paintPanel = (context, props) => {
    if (!opts)
        return;
    const { margins, canvasWidth, canvasHeight } = opts;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    context.beginPath();
    context.rect(margins.left, margins.top, canvasWidth - margins.left - margins.right, canvasHeight - margins.top - margins.bottom);
    context.clip();
    // don't display dashed zero line (Eric's request)
    // context.strokeStyle = 'black'
    // context.setLineDash([5, 15]);
    // context.lineWidth = 1
    // context.beginPath()
    // context.moveTo(0, props.pixelZero)
    // context.lineTo(panelWidth, props.pixelZero)
    // context.stroke()
    // context.setLineDash([]);
    // eslint-disable-next-line react/prop-types
    props.dimensions.forEach(dim => {
        if (dim.type === 'line') {
            applyLineAttributes(context, dim.attributes);
            context.beginPath();
            dim.pixelTimes.forEach((x, ii) => {
                const y = dim.pixelValues[ii];
                ii === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
            });
            context.stroke();
            context.setLineDash([]);
        }
        else if (dim.type === 'marker') {
            applyMarkerAttributes(context, dim.attributes);
            const radius = dim.attributes['radius'] ?? 2;
            const shape = dim.attributes['shape'] ?? 'circle';
            if (typeof radius !== 'number')
                throw Error('Unexpected type of radius');
            if (typeof shape !== 'string')
                throw Error('Unexpected type of shape');
            if (shape === 'circle') {
                dim.pixelTimes.forEach((t, ii) => {
                    context.beginPath();
                    context.ellipse(t, dim.pixelValues[ii], radius, radius, 0, 0, 2 * Math.PI);
                    context.fill();
                });
            }
            else if (shape === 'square') {
                dim.pixelTimes.forEach((t, ii) => {
                    context.fillRect(t - radius, dim.pixelValues[ii] - radius, radius * 2, radius * 2);
                });
            }
        }
    });
    paintLegend(context);
    context.restore();
};
const computePlotSeries = (resolvedSeries) => {
    const plotSeries = [];
    if (!opts)
        return plotSeries;
    const { visibleStartTimeSec, visibleEndTimeSec } = opts;
    if ((visibleStartTimeSec === undefined) || (visibleEndTimeSec === undefined)) {
        return plotSeries;
    }
    resolvedSeries.forEach(rs => {
        const tt = rs.t;
        const yy = rs.y;
        let filteredTimeIndices = tt.flatMap((t, ii) => (visibleStartTimeSec <= t) && (t <= visibleEndTimeSec) ? ii : []);
        // need to prepend an index before and append an index after so that lines get rendered properly
        if ((filteredTimeIndices[0] || 0) > 0) {
            filteredTimeIndices = [filteredTimeIndices[0] - 1, ...filteredTimeIndices];
        }
        if ((filteredTimeIndices[filteredTimeIndices.length - 1] || tt.length) < tt.length - 1) {
            filteredTimeIndices.push(filteredTimeIndices[filteredTimeIndices.length - 1] + 1);
        }
        ////////////////////////////////////////////////////////////////////////////////
        const filteredTimes = filteredTimeIndices.map(i => tt[i]);
        const filteredValues = filteredTimeIndices.map(index => yy[index]);
        plotSeries.push({
            type: rs.type,
            times: filteredTimes,
            values: filteredValues,
            attributes: rs.attributes
        });
    });
    return plotSeries;
};
const applyLineAttributes = (context, attributes) => {
    const strokeStyle = attributes['color'] ?? 'black';
    const lineWidth = attributes['width'] ?? 1.1; // 1.1 hack--but fixes the 'disappearing lines' issue
    const dash = attributes['dash'] ?? undefined;
    if (typeof strokeStyle === 'string') {
        context.strokeStyle = strokeStyle;
    }
    if (typeof lineWidth === 'number') {
        context.lineWidth = lineWidth;
    }
    if ((dash) && (typeof dash === 'object')) {
        context.setLineDash(dash);
    }
};
const applyMarkerAttributes = (context, attributes) => {
    const fillStyle = attributes['color'] ?? 'black';
    if (typeof fillStyle === 'string') {
        context.fillStyle = fillStyle;
    }
};
function sleepMsec(msec) {
    return new Promise((resolve) => {
        setTimeout(resolve, msec);
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN drawAnnotation
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// let drawAnnotationDrawCode = 0
// const drawAnnotation = async (o: {
//     canvasContext: CanvasRenderingContext2D
//     canvasWidth: number
//     canvasHeight: number
//     visibleStartTimeSec: number
//     visibleEndTimeSec: number
//     margins: {left: number, right: number, top: number, bottom: number}
//     annotation: TimeseriesAnnotationFileData
// }) => {
//     drawAnnotationDrawCode += 1
//     const thisDrawAnnotationDrawCode = drawAnnotationDrawCode
//     const {canvasContext, canvasWidth, canvasHeight, visibleStartTimeSec, visibleEndTimeSec, margins, annotation} = o
//     const {events, event_types} = annotation
//     const eventsFiltered = events.filter(e => (e.s <= visibleEndTimeSec) && (e.e >= visibleStartTimeSec))
//     const colors = [
//         [255, 0, 0],
//         [0, 255, 0],
//         [0, 0, 255],
//         [255, 255, 0],
//         [255, 0, 255],
//         [0, 255, 255],
//         [255, 128, 0],
//         [255, 0, 128],
//         [128, 255, 0],
//         [0, 255, 128],
//         [128, 0, 255],
//         [0, 128, 255]
//     ] as [number, number, number][]
//     const colorsForEventTypes: {[key: string]: [number, number, number]} = {}
//     for (const et of event_types) {
//         const color = colors[et.color_index % colors.length]
//         colorsForEventTypes[et.event_type] = color
//     }
//     let timer = Date.now()
//     for (const pass of ['rect', 'line']) {
//         for (const e of eventsFiltered) {
//             if (thisDrawAnnotationDrawCode !== drawAnnotationDrawCode) return
//             const color = colorsForEventTypes[e.t]
//             if (e.e > e.s) {
//                 if (pass !== 'rect') continue
//                 const R = {
//                     x: margins.left + (e.s - visibleStartTimeSec) / (visibleEndTimeSec - visibleStartTimeSec) * (canvasWidth - margins.left - margins.right),
//                     y: margins.top,
//                     w: (e.e - e.s) / (visibleEndTimeSec - visibleStartTimeSec) * (canvasWidth - margins.left - margins.right),
//                     h: canvasHeight - margins.top - margins.bottom
//                 }
//                 canvasContext.fillStyle = \`rgba(\${color[0]},\${color[1]},\${color[2]},0.3)\`
//                 canvasContext.fillRect(R.x, R.y, R.w, R.h)
//                 const elapsed = Date.now() - timer
//                 if (elapsed > 100) {
//                     await sleepMsec(elapsed)
//                     timer = Date.now()
//                 }
//             }
//             else {
//                 if (pass !== 'line') continue
//                 const pt1 = {
//                     x: margins.left + (e.s - visibleStartTimeSec) / (visibleEndTimeSec - visibleStartTimeSec) * (canvasWidth - margins.left - margins.right),
//                     y: margins.top
//                 }
//                 const pt2 = {
//                     x: pt1.x,
//                     y: canvasHeight - margins.bottom
//                 }
//                 canvasContext.strokeStyle = \`rgba(\${color[0]},\${color[1]},\${color[2]},1)\`
//                 canvasContext.beginPath()
//                 canvasContext.moveTo(pt1.x, pt1.y)
//                 canvasContext.lineTo(pt2.x, pt2.y)
//                 canvasContext.stroke()
//             }
//         }
//     }
//     function sleepMsec(msec: number) {
//         return new Promise((resolve) => {
//             setTimeout(resolve, msec)
//         })
//     }
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END drawAnnotation
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// export { }
`, N = ({ data: o, width: i, height: n }) => {
  const { visibleStartTimeSec: f, visibleEndTimeSec: h, reportTotalTimeRange: g, setVisibleTimeRange: b } = Z(), { datasets: S, series: T, legendOpts: w, timeOffset: x, yRange: r, gridlineOpts: I, hideToolbar: R } = o, s = d(() => T.map((e) => {
    const t = S.filter((F) => F.name === e.dataset)[0];
    if (t === void 0)
      throw Error(`Dataset not found in series: ${e.dataset}`);
    return {
      ...e,
      t: t.data[e.encoding.t],
      y: t.data[e.encoding.y]
    };
  }), [T, S]), { minTime: D, maxTime: C } = d(() => ({
    minTime: p(s.map((e) => p(e.t))),
    maxTime: u(s.map((e) => u(e.t)))
  }), [s]), { minValue: c, maxValue: l } = d(() => r ? { minValue: r[0], maxValue: r[1] } : {
    minValue: p(s.map((e) => p(e.y))),
    maxValue: u(s.map((e) => u(e.y)))
  }, [r, s]);
  m(() => {
    const e = D + (x || 0), t = C + (x || 0);
    g(e, t), b(e, t);
  }, [D, C, x, g, b]);
  const { canvasWidth: W, canvasHeight: E, margins: k } = j({ width: i, height: n, hideToolbar: R }), [H, P] = y(!1), [v, V] = y(), [a, A] = y(null);
  m(() => {
    if (!v)
      return;
    const e = new Worker(URL.createObjectURL(new Blob([z], { type: "text/javascript" })), { type: "module" }), t = v.transferControlToOffscreen();
    return e.postMessage({
      canvas: t
    }, [t]), A(e), () => {
      e.terminate();
    };
  }, [v]), m(() => {
    a && a.postMessage({
      resolvedSeries: s
    });
  }, [s, a]), m(() => {
    if (!a || f === void 0 || h === void 0)
      return;
    const e = {
      canvasWidth: W,
      canvasHeight: E,
      margins: k,
      visibleStartTimeSec: f,
      visibleEndTimeSec: h,
      hideLegend: H,
      legendOpts: w || { location: "northeast" },
      minValue: c,
      maxValue: l
    };
    a.postMessage({
      opts: e
    });
  }, [W, E, k, f, h, a, H, w, c, l]);
  const L = O((e) => {
    e.key === "l" && P((t) => !t);
  }, []), M = d(() => ({
    showTicks: !0,
    yMin: c,
    yMax: l
  }), [c, l]);
  return /* @__PURE__ */ $(
    q,
    {
      onCanvasElement: (e) => V(e),
      gridlineOpts: I,
      onKeyDown: L,
      width: i,
      height: n,
      yAxisInfo: M,
      hideToolbar: R
    }
  );
}, p = (o) => o.reduce((i, n) => i < n ? i : n, o[0] || 0), u = (o) => o.reduce((i, n) => i > n ? i : n, o[0] || 0);
export {
  N as TimeseriesGraphView
};
