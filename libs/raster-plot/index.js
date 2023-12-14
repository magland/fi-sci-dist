"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const U=require("react/jsx-runtime"),A=require("@fi-sci/context-time-selection"),C=require("@fi-sci/time-scroll-view"),o=require("react"),E=require("@fi-sci/context-unit-selection"),e=require("@fi-sci/misc"),V=`"use strict";
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
`,B={hideX:!1,hideY:!0},N={showTicks:!1,yMin:void 0,yMax:void 0},L=({data:l,width:T,height:b})=>{const{startTimeSec:f,endTimeSec:v,plots:c,hideToolbar:M}=l,{reportTotalTimeRange:P,setVisibleTimeRange:S,visibleStartTimeSec:d,visibleEndTimeSec:m}=A.useTimeSelection();o.useEffect(()=>{P(f,v),S(f,v)},[f,v,P,S]);const[x,W]=o.useState(),[i,R]=o.useState(null),[y,w]=o.useState(void 0),{selectedUnitIds:D,unitIdSelectionDispatch:h}=E.useSelectedUnitIds(),O=o.useCallback(t=>{},[]);o.useEffect(()=>{if(!x)return;const t=new Worker(URL.createObjectURL(new Blob([V],{type:"text/javascript"}))),n=x.transferControlToOffscreen();return t.postMessage({canvas:n},[n]),R(t),()=>{t.terminate()}},[x]);const I=o.useMemo(()=>({plots:c.map(n=>({...n,color:E.getUnitColor(n.unitId)}))}),[c]);o.useEffect(()=>{i&&i.postMessage({plotData:I})},[I,i]);const{canvasWidth:k,canvasHeight:p,margins:a}=C.useTimeScrollView({width:T,height:b});o.useEffect(()=>{if(!i||d===void 0||m===void 0)return;const t={canvasWidth:k,canvasHeight:p,margins:a,visibleStartTimeSec:d,visibleEndTimeSec:m,hoveredUnitId:y,selectedUnitIds:[...D]};i.postMessage({opts:t})},[k,p,a,d,m,i,y,D]);const g=c.length,u=o.useCallback(t=>{const n=1-(t.y-a.top)/(p-a.top-a.bottom),s=Math.round(n*g-.5);if(0<=s&&s<g)return c[s].unitId},[p,c,a,g]),H=o.useCallback(t=>{const n=t.currentTarget.getBoundingClientRect(),s={x:t.clientX-n.x,y:t.clientY-n.y},r=u(s);t.shiftKey||t.ctrlKey?h({type:"TOGGLE_UNIT",targetUnit:r}):h({type:"UNIQUE_SELECT",targetUnit:r})},[u,h]),j=o.useCallback(t=>{const n=t.currentTarget.getBoundingClientRect(),s={x:t.clientX-n.x,y:t.clientY-n.y},r=u(s);r!==void 0&&w(r)},[u]),q=o.useCallback(t=>{w(void 0)},[]);return d===void 0?U.jsx("div",{children:"Loading..."}):U.jsx(C.TimeScrollView,{width:T,height:b,onCanvasElement:W,gridlineOpts:B,onKeyDown:O,onMouseDown:H,onMouseMove:j,onMouseOut:q,hideToolbar:M,yAxisInfo:N})},X=l=>e.validateObject(l,{unitId:e.isOneOf([e.isNumber,e.isString]),spikeTimesSec:e.isArrayOf(e.isNumber)}),Y=l=>e.validateObject(l,{type:e.isEqualTo("RasterPlot"),startTimeSec:e.isNumber,endTimeSec:e.isNumber,plots:e.isArrayOf(X),highlightIntervals:e.optional(e.isArrayOf(()=>!0)),hideToolbar:e.optional(e.isBoolean)});exports.RasterPlotView=L;exports.isRasterPlotViewData=Y;
