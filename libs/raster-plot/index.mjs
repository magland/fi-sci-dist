import { jsx as M } from "react/jsx-runtime";
import { useTimeSelection as Y } from "@fi-sci/context-time-selection";
import { useTimeScrollView as j, TimeScrollView as K } from "@fi-sci/time-scroll-view";
import { useEffect as u, useState as P, useCallback as c, useMemo as F } from "react";
import { useSelectedUnitIds as N, getUnitColor as q } from "@fi-sci/context-unit-selection";
import { validateObject as R, isEqualTo as G, isNumber as m, isArrayOf as b, optional as W, isBoolean as _, isOneOf as $, isString as Q } from "@fi-sci/misc";
const z = `"use strict";
let canvas = undefined;
let opts = undefined;
let plotData = undefined;
let plotDataFiltered = undefined;
onmessage = function (evt) {
    if (evt.data.canvas) {
        canvas = evt.data.canvas;
        drawDebounced();
    }
    if (evt.data.opts) {
        opts = evt.data.opts;
        drawDebounced();
    }
    if (evt.data.plotData) {
        plotData = evt.data.plotData;
        drawDebounced();
    }
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
    if (!plotData)
        return;
    const { margins, canvasWidth, canvasHeight, visibleStartTimeSec, visibleEndTimeSec, hoveredUnitId, selectedUnitIds } = opts;
    // this is important because main thread no longer has control of canvas (it seems)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext)
        return;
    drawCode += 1;
    const thisDrawCode = drawCode;
    const numUnits = plotData.plots.length;
    const unitIndexToY = (unitIndex) => (canvasHeight - margins.bottom - ((unitIndex + 0.5) - 0) / (numUnits - 0) * (canvasHeight - margins.top - margins.bottom));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const pass of (plotData ? [1, 2] : [1])) {
        if (thisDrawCode !== drawCode)
            return;
        const timer = Date.now();
        if ((pass === 2) || (!plotDataFiltered)) {
            plotDataFiltered = filterPlotData(plotData);
        }
        const tToX = (t) => (margins.left + (t - visibleStartTimeSec) / (visibleEndTimeSec - visibleStartTimeSec) * (canvasWidth - margins.left - margins.right));
        const pixelPlots = plotData.plots.map((plot, i) => {
            return {
                y: unitIndexToY(i),
                x: plot.spikeTimesSec.map(t => (tToX(t))),
                unitId: plot.unitId,
                color: plot.color,
                hovered: plot.unitId === hoveredUnitId,
                selected: selectedUnitIds.includes(plot.unitId)
            };
        });
        paintPanel(canvasContext, pixelPlots);
        // the wait time is equal to the render time
        const elapsed = Date.now() - timer;
        await sleepMsec(elapsed);
    }
}
const drawDebounced = debounce(draw, 10);
const paintPanel = (context, pixelPlots) => {
    if (!opts)
        return;
    const { margins, canvasWidth, canvasHeight } = opts;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const pixelsPerUnit = canvasHeight / pixelPlots.length;
    // do this before clipping
    for (const pass of [1, 2, 3]) {
        pixelPlots.forEach(pPlot => {
            if (((pass === 1) && (pixelsPerUnit >= 10)) || ((pass === 2) && (pPlot.selected)) || ((pass === 3) && (pPlot.hovered))) {
                context.fillStyle = pass === 1 ? pPlot.color : pass === 2 ? 'black' : pPlot.color;
                context.textAlign = 'right';
                context.textBaseline = 'middle';
                context.font = \`\${pass > 1 ? 'bold ' : ''}12px Arial\`;
                context.fillText(pPlot.unitId + '', margins.left - 4, pPlot.y);
                if ((pass === 3) || ((pass === 2) && pPlot.hovered)) {
                    context.textAlign = 'left';
                    context.textBaseline = 'middle';
                    context.font = \`\${pass > 1 ? 'bold ' : ''}12px Arial\`;
                    context.fillText(pPlot.unitId + '', canvasWidth - margins.right + 4, pPlot.y);
                }
            }
        });
    }
    context.save();
    context.beginPath();
    context.rect(margins.left, margins.top, canvasWidth - margins.left - margins.right, canvasHeight - margins.top - margins.bottom);
    context.clip();
    for (const pass of [1, 2]) {
        pixelPlots.forEach(pPlot => {
            if ((pass === 2) && (pPlot.hovered)) {
                context.strokeStyle = 'yellow';
                context.lineWidth = 3;
                context.beginPath();
                context.moveTo(0, pPlot.y);
                context.lineTo(canvasWidth, pPlot.y);
                context.stroke();
                context.strokeStyle = 'gray';
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(0, pPlot.y);
                context.lineTo(canvasWidth, pPlot.y);
                context.stroke();
            }
            if ((pass === 1) && (pPlot.selected)) {
                context.strokeStyle = 'lightblue';
                context.lineWidth = 3;
                context.beginPath();
                context.moveTo(0, pPlot.y);
                context.lineTo(canvasWidth, pPlot.y);
                context.stroke();
            }
        });
    }
    pixelPlots.forEach(pPlot => {
        context.strokeStyle = pPlot.color;
        context.lineWidth = 3;
        context.beginPath();
        pPlot.x.forEach(x => {
            context.moveTo(x - 2, pPlot.y);
            context.lineTo(x + 2, pPlot.y);
        });
        context.stroke();
    });
    context.restore();
};
const filterPlotData = (plotData) => {
    if (!opts)
        return undefined;
    const { visibleStartTimeSec, visibleEndTimeSec } = opts;
    if ((visibleStartTimeSec === undefined) || (visibleEndTimeSec === undefined)) {
        return undefined;
    }
    const newPlots = plotData.plots.map(plot => ({
        ...plot,
        spikeTimesSec: plot.spikeTimesSec.filter(t => (visibleStartTimeSec <= t) && (t <= visibleEndTimeSec))
    }));
    return {
        ...plotData,
        plots: newPlots
    };
};
function sleepMsec(msec) {
    return new Promise((resolve) => {
        setTimeout(resolve, msec);
    });
}
`, J = {
  hideX: !1,
  hideY: !0
}, Z = {
  showTicks: !1,
  yMin: void 0,
  yMax: void 0
}, lt = ({ data: i, width: S, height: y }) => {
  const { startTimeSec: f, endTimeSec: v, plots: a, hideToolbar: H } = i, { reportTotalTimeRange: w, setVisibleTimeRange: D, visibleStartTimeSec: r, visibleEndTimeSec: x } = Y();
  u(() => {
    w(f, v), D(f, v);
  }, [f, v, w, D]);
  const [h, O] = P(), [n, A] = P(null), [I, U] = P(void 0), { selectedUnitIds: k, unitIdSelectionDispatch: g } = N(), B = c((t) => {
  }, []);
  u(() => {
    if (!h)
      return;
    const t = new Worker(URL.createObjectURL(new Blob([z], { type: "text/javascript" }))), e = h.transferControlToOffscreen();
    return t.postMessage(
      {
        canvas: e
      },
      [e]
    ), A(t), () => {
      t.terminate();
    };
  }, [h]);
  const C = F(() => ({
    plots: a.map((e) => ({
      ...e,
      color: q(e.unitId)
    }))
  }), [a]);
  u(() => {
    n && n.postMessage({
      plotData: C
    });
  }, [C, n]);
  const { canvasWidth: E, canvasHeight: d, margins: s } = j({
    width: S,
    height: y
  });
  u(() => {
    if (!n || r === void 0 || x === void 0)
      return;
    const t = {
      canvasWidth: E,
      canvasHeight: d,
      margins: s,
      visibleStartTimeSec: r,
      visibleEndTimeSec: x,
      hoveredUnitId: I,
      selectedUnitIds: [...k]
    };
    n.postMessage({
      opts: t
    });
  }, [
    E,
    d,
    s,
    r,
    x,
    n,
    I,
    k
  ]);
  const T = a.length, p = c(
    (t) => {
      const e = 1 - (t.y - s.top) / (d - s.top - s.bottom), o = Math.round(e * T - 0.5);
      if (0 <= o && o < T)
        return a[o].unitId;
    },
    [d, a, s, T]
  ), V = c(
    (t) => {
      const e = t.currentTarget.getBoundingClientRect(), o = {
        x: t.clientX - e.x,
        y: t.clientY - e.y
      }, l = p(o);
      t.shiftKey || t.ctrlKey ? g({ type: "TOGGLE_UNIT", targetUnit: l }) : g({ type: "UNIQUE_SELECT", targetUnit: l });
    },
    [p, g]
  ), L = c(
    (t) => {
      const e = t.currentTarget.getBoundingClientRect(), o = {
        x: t.clientX - e.x,
        y: t.clientY - e.y
      }, l = p(o);
      l !== void 0 && U(l);
    },
    [p]
  ), X = c((t) => {
    U(void 0);
  }, []);
  return r === void 0 ? /* @__PURE__ */ M("div", { children: "Loading..." }) : /* @__PURE__ */ M(
    K,
    {
      width: S,
      height: y,
      onCanvasElement: O,
      gridlineOpts: J,
      onKeyDown: B,
      onMouseDown: V,
      onMouseMove: L,
      onMouseOut: X,
      hideToolbar: H,
      yAxisInfo: Z
    }
  );
}, tt = (i) => R(i, {
  unitId: $([m, Q]),
  spikeTimesSec: b(m)
}), ct = (i) => R(i, {
  type: G("RasterPlot"),
  startTimeSec: m,
  endTimeSec: m,
  plots: b(tt),
  // highlightIntervals: optional(isArrayOf(isHighlightIntervalSet)),
  highlightIntervals: W(b(() => !0)),
  // disable for now
  hideToolbar: W(_)
});
export {
  lt as RasterPlotView,
  ct as isRasterPlotViewData
};
