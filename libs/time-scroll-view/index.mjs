import { jsxs as j, jsx as h } from "react/jsx-runtime";
import yt, { useMemo as b, useState as W, useCallback as T, useRef as E, useEffect as ft } from "react";
import { Splitter as wt } from "@fi-sci/splitter";
import { useTimeSelection as Y } from "@fi-sci/context-time-selection";
import kt from "react-draggable";
import "mathjs";
import { FaSearchPlus as St, FaSearchMinus as Pt, FaArrowLeft as Mt, FaArrowRight as xt } from "react-icons/fa";
import { FormGroup as Lt, Switch as Ct } from "@mui/material";
import { SmallIconButton as _t } from "@fi-sci/misc";
const ut = 6, O = 3, Z = 15, $ = 20, Rt = ({ width: t, height: e, hideVisibleTimeRange: n }) => {
  const { currentTimeSec: o, setCurrentTime: i, startTimeSec: r, endTimeSec: a, visibleStartTimeSec: s, visibleEndTimeSec: l, setVisibleTimeRange: f } = Y(), d = b(() => (u) => u * t, [t]), m = b(() => (u) => u / t, [t]), { x0: S, x1: M, x2: F, y1: x, y2: p } = b(() => {
    const u = r ?? 0, g = a ?? 1;
    if (g <= u)
      return { x0: 0, x1: void 0, x2: void 0, y1: void 0, y2: void 0 };
    const H = o !== void 0 ? d((o - u) / (g - u)) : 0, w = s !== void 0 ? d((s - u) / (g - u)) : void 0, k = l !== void 0 ? d((l - u) / (g - u)) : void 0;
    let _ = w, R = k;
    if (w !== void 0 && k !== void 0 && k - w < Z) {
      const P = (w + k) / 2;
      _ = P - Z / 2, R = P + Z / 2;
    }
    return { x0: H, x1: w, x2: k, y1: _, y2: R };
  }, [r, a, o, s, l, d]), [y, C] = W(!1), B = T((u) => {
    if (y)
      return;
    const g = u.currentTarget.getBoundingClientRect(), H = { x: u.clientX - g.x, y: u.clientY - g.y }, w = m(H.x), k = r ?? 0, R = k + w * ((a ?? 1) - k);
    i(R);
    const P = s !== void 0 && l !== void 0 ? l - s : void 0, D = P !== void 0 ? Math.max(R - P / 2, k) : void 0, L = P !== void 0 && D !== void 0 ? D + P : void 0;
    D !== void 0 && L !== void 0 && f(D, L);
  }, [y, m, r, a, i, s, l, f]), [z, J] = W({ x: 0, y: 0 }), N = T((u, g) => {
    C(!0);
  }, []), v = T((u, g) => {
    const H = g.x, w = r ?? 0, k = a ?? 1, _ = s !== void 0 ? s : w, P = d((_ - w) / (k - w)) + H, D = m(P), L = w + D * (k - w), G = L + (l ?? 1) - (s ?? 0), U = o !== void 0 ? o - _ + L : void 0;
    U !== void 0 && L <= U && U <= G && i(U), f(L, G), J({ x: 0, y: 0 }), C(!1);
  }, [i, d, r, a, m, s, l, f, o]);
  return /* @__PURE__ */ j(
    "div",
    {
      style: { position: "absolute", left: 0, top: 0, width: t, height: e, backgroundColor: "white", userSelect: "none" },
      onMouseUp: B,
      children: [
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: 0, top: ut, width: t, height: e - ut * 2, backgroundColor: "lightgray" } }),
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: S - 1, top: 0, width: 3, height: e, backgroundColor: "red" } }),
        M !== void 0 && F !== void 0 && x !== void 0 && p !== void 0 && !n && /* @__PURE__ */ h(
          kt,
          {
            axis: "x",
            onDrag: (u, g) => N(u, g),
            onStop: (u, g) => v(u, g),
            position: z,
            children: /* @__PURE__ */ h("div", { style: { position: "absolute", left: x, top: O, width: p - x + 1, height: e - O * 2, backgroundColor: "black" }, children: /* @__PURE__ */ h("div", { style: { position: "absolute", left: M - x, top: 0, width: F - M + 1, height: e - O * 2, backgroundColor: "gray" } }) })
          }
        )
      ]
    }
  );
}, Dt = 23, Ft = 60, Xt = (t, e, n, o) => Array(Math.ceil((e - o) / n)).fill(0).map((i, r) => o + r * n).filter((i) => i > t), Ht = (t, e) => {
  let n = 0;
  const o = Math.trunc(Math.log10(e));
  if (Math.trunc(Math.log10(t)) !== o)
    return n;
  const i = Math.trunc(Math.log10(e - t));
  if (o <= i)
    return n;
  const r = i + 1, a = Math.pow(10, -r), s = Math.trunc(e * a).toString(), l = Math.trunc(t * a).toString();
  for (const [f, d] of [...s].entries()) {
    if (d !== l[f]) {
      n = n * Math.pow(10, f - r);
      break;
    }
    n = n * 10 + parseInt(d);
  }
  return n * Math.pow(10, r);
}, Ut = (t, e) => Math.floor(t * Math.pow(10, -(e + 1))) * Math.pow(10, e + 1), zt = (t, e, n) => {
  const o = t - e, i = Math.trunc(o * Math.pow(10, -n)), r = i % 10 === 0;
  return { label: Math.abs(n) > 3 ? `${(i / 10).toFixed(1)}e${n + 1}` : `${Math.round(i * Math.pow(10, n) * 1e9) / 1e9}`, isMajor: r, dataValue: t };
}, Vt = (t, e, n, o, i) => {
  const r = Xt(e, n, o, t).map((l) => Math.round(l * 1e9) / 1e9), a = Ht(e, n);
  return r.map((l) => zt(l, a, i));
}, ht = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks: [],
  datamin: 0,
  datamax: 0
}, $t = (t, e) => {
  const n = Math.floor(Math.log10(t / e)), o = Math.pow(10, n), i = [1, 2, 5, 10], a = i.map((s) => t / (o * s)).findIndex((s) => s < e);
  return a === 3 ? { step: 1, scale: n + 1 } : { step: i[a], scale: n };
}, Bt = (t) => {
  const { datamin: e, datamax: n, userSpecifiedZoom: o } = t;
  let { pixelHeight: i } = t;
  i <= 1 && (i = 1);
  const r = o ?? 1;
  return b(() => {
    if (e === void 0 || n === void 0 || e === n)
      return ht;
    const a = e / r, s = n / r, l = s - a, f = i / Ft, d = i / Dt, m = $t(l, d), S = m.step * Math.pow(10, m.scale);
    if (l / S < f)
      return console.warn("Error: Unable to compute valid y-axis step size. Suppressing display."), ht;
    const M = Ut(a, m.scale);
    return { ticks: Vt(M, a, s, S, m.scale), datamin: a, datamax: s };
  }, [n, e, r, i]);
}, Gt = 18, Kt = (t) => {
  const { zoomTimeSelection: e, panTimeSelectionPct: n } = t;
  return [
    {
      type: "button",
      title: "Time zoom in (+)",
      callback: () => e(1.3),
      icon: /* @__PURE__ */ h(St, {}),
      keyCode: 173
    },
    {
      type: "button",
      title: "Time zoom out (-)",
      callback: () => e(1 / 1.3),
      icon: /* @__PURE__ */ h(Pt, {}),
      keyCode: 61
    },
    {
      type: "button",
      title: "Shift time window back [left arrow]",
      callback: () => n(-0.3),
      icon: /* @__PURE__ */ h(Mt, {}),
      keyCode: 37
    },
    {
      type: "button",
      title: "Shift time window forward [right arrow]",
      callback: () => n(0.3),
      icon: /* @__PURE__ */ h(xt, {}),
      keyCode: 39
    }
  ];
};
const jt = (t) => /* @__PURE__ */ h("span", { title: t.title, children: /* @__PURE__ */ h(
  _t,
  {
    title: t.title,
    onClick: t.onClick,
    disabled: !!t.disabled,
    icon: t.icon
  },
  t.elementIndex
) }, t.elementIndex + "-span"), Wt = (t) => t.useHorizontalLayout ? /* @__PURE__ */ h("span", {}) : /* @__PURE__ */ h("hr", {}, t.elementIndex), Yt = (t) => {
  const e = Number.isFinite(t.content) ? t.content : 0, n = t.contentSigFigs || 0, o = Math.abs(e - Math.round(e)) * 10 ** (n + 1) < 1, i = Number.isFinite(t.content) ? o && !t.contentAlwaysShowDecimal ? Math.round(e) + "" : e.toFixed(t.contentSigFigs || 2) : t.content || "", r = t.useHorizontalLayout ? "span" : "div";
  return yt.createElement(
    r,
    {
      key: t.elementIndex,
      title: t.title,
      style: { textAlign: "center", fontWeight: "bold", cursor: "default" }
    },
    i
  );
}, Nt = (t) => {
  switch (t.subtype) {
    case "checkbox":
      return /* @__PURE__ */ h(Ot, { ...t });
    case "slider":
      return /* @__PURE__ */ h(Zt, { ...t });
    default:
      return /* @__PURE__ */ j("span", { children: [
        "ERROR: Bad toggle subtype ",
        t.subtype
      ] }, t.elementIndex);
  }
}, Ot = (t) => /* @__PURE__ */ h(
  "input",
  {
    type: "checkbox",
    checked: t.selected,
    onChange: t.onClick,
    title: t.title,
    disabled: t.disabled,
    style: { cursor: "pointer" }
  },
  t.elementIndex
), Zt = (t) => /* @__PURE__ */ h(Lt, { children: /* @__PURE__ */ h(
  Ct,
  {
    checked: t.selected,
    size: "small",
    style: { left: -3 },
    onChange: t.onClick,
    disabled: t.disabled,
    title: t.title
  }
) }, t.elementIndex), Et = (t) => {
  switch (t.type) {
    case "button":
      return /* @__PURE__ */ h(jt, { ...t });
    case "divider":
      return /* @__PURE__ */ h(Wt, { ...t });
    case "text":
      return /* @__PURE__ */ h(Yt, { ...t });
    case "toggle":
      return /* @__PURE__ */ h(Nt, { ...t });
    default:
      return /* @__PURE__ */ h("span", {}, t.elementIndex);
  }
}, qt = (t) => (t || []).map((e, n) => ({
  type: e.type || "button",
  subtype: e.subtype,
  title: e.title,
  onClick: e.callback,
  icon: e.icon || "",
  selected: e.selected,
  disabled: e.disabled,
  content: e.content,
  contentSigFigs: e.contentSigFigs,
  contentAlwaysShowDecimal: e.boolean,
  elementIndex: n
})), Jt = (t) => {
  const e = b(() => qt(t.customActions), [t.customActions]), n = b(
    () => e.map((r, a) => /* @__PURE__ */ h(Et, { ...r, useHorizontalLayout: t.useHorizontalLayout }, a)),
    [e, t.useHorizontalLayout]
  ), o = b(() => ({
    width: t.width,
    height: t.height - (t.top || 0),
    top: t.top ?? 0,
    paddingTop: t.topPadding ?? 0
  }), [t.width, t.height, t.top, t.topPadding]), i = t.useHorizontalLayout ? "HorizontalToolbar" : "VerticalToolbar";
  return /* @__PURE__ */ h("div", { className: i, style: { ...o }, children: n });
}, mt = { type: "divider" }, Qt = (t) => {
  const { aboveDefault: e, belowDefault: n } = t || {}, { zoomTimeSelection: o, panTimeSelectionPct: i } = Y();
  return b(() => {
    const a = e ? [...e, mt] : [], s = n ? [mt, ...n] : [], l = Kt({ zoomTimeSelection: o, panTimeSelectionPct: i });
    return [
      ...a,
      ...l,
      ...s
    ];
  }, [o, i, e, n]);
}, At = (t) => {
  t && (t._hasFocus = !0);
}, It = (t) => {
  t && (t._hasFocus = !1);
}, te = (t, e, n, o, i) => {
  const r = E(void 0), a = T(() => {
    r.current && (i ? window.cancelAnimationFrame(r.current) : window.clearTimeout(r.current), r.current = void 0);
  }, [r, i]), s = T((f) => {
    e(n, o), r.current = void 0;
  }, [r, n, e, o]);
  return { throttler: T((f) => {
    t(n, f) && !r.current && (r.current = i ? window.requestAnimationFrame(s) : window.setTimeout(s, i));
  }, [r, t, s, n, i]), cancelThrottled: a };
}, ee = (t, e) => {
  const { panStateRef: n } = t, { mouseX: o } = e;
  return !n.current.panning || n.current.pannedX === o ? !1 : (n.current.pannedX = o, !0);
}, ne = (t, e) => {
  const { panStateRef: n } = t, { secondsPerPixel: o, panTimeSelectionDeltaT: i } = e;
  if (n === void 0 || (n == null ? void 0 : n.current) === void 0)
    return;
  const r = (n.current.anchorX ?? 0) - (n.current.pannedX ?? 0);
  r !== 0 && (n.current.anchorX = n.current.pannedX, i && i(o * r));
}, oe = (t, e, n) => {
  const o = b(() => ({ secondsPerPixel: e, panTimeSelectionDeltaT: n }), [e, n]);
  return te(ee, ne, t, o, 50);
}, ie = (t, e, n) => {
  t.current.anchorX = e, t.current.panning = !1, t.current.pannedX = void 0, n();
}, re = (t, e) => {
  const n = e - (t.current.anchorX ?? e);
  Math.abs(n) > 5 && (t.current.panning = !0);
}, ae = (t, e) => {
  t.current = {}, e();
}, se = (t) => {
  var e;
  return ((e = t.current) == null ? void 0 : e.panning) ?? !1;
}, ce = (t, e, n) => {
  const o = E({}), i = b(() => ({ divElmt: t, panStateRef: o }), [t, o]), { throttler: r, cancelThrottled: a } = oe(i, e, n), s = T((m) => {
    ie(o, m, a);
  }, [o, a]), l = T((m) => re(o, m), [o]), f = T(() => ae(o, a), [o, a]), d = T(() => se(o), [o]);
  return {
    setPanUpdate: r,
    resetAnchor: s,
    startPan: l,
    clearPan: f,
    isPanning: d
  };
}, le = (t, e) => T((n) => {
  const o = n.clientX - n.currentTarget.getBoundingClientRect().x - t, i = Math.max(0, Math.min(1, o / e));
  return { mouseX: o, fraction: i };
}, [t, e]), de = (t, e, n) => T((i) => {
  if (t) {
    const { mouseX: r } = e(i);
    n(r);
  }
}, [t, e, n]), ue = (t, e) => T((o) => {
  t && (e(), It(t));
}, [t, e]), he = (t, e, n) => T((i) => {
  if (t) {
    const { fraction: r } = e(i);
    n(r, { event: i }), At(t);
  }
}, [e, n, t]), me = (t, e, n, o) => T((r) => {
  t && (e() || n(r), o());
}, [t, e, n, o]), ge = (t, e, n, o) => T((r) => {
  if (!t)
    return;
  const { mouseX: a } = e(r);
  n(a), o({ mouseX: a });
}, [t, e, n, o]), fe = (t, e, n, o) => {
  const { setCurrentTimeFraction: i, panTimeSelection: r } = Y(), a = le(t, e), s = b(() => n / e, [n, e]), { setPanUpdate: l, resetAnchor: f, startPan: d, clearPan: m, isPanning: S } = ce(o, s, r), M = he(o, a, i), F = de(o, a, f), x = me(o, S, M, m), p = ge(o, a, d, l), y = ue(o, m);
  return b(() => ({ handleMouseUp: x, handleMouseMove: p, handleMouseDown: F, handleMouseLeave: y }), [x, p, F, y]);
}, be = [
  {
    name: "1ms",
    secondsPerTick: 1e-3,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t % 1e3} ms`
  },
  {
    name: "10ms",
    secondsPerTick: 0.01,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t * 10 % 1e3} ms`
  },
  {
    name: "100ms",
    secondsPerTick: 0.1,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t * 100 % 1e3} ms`
  },
  {
    name: "1s",
    secondsPerTick: 1,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t % 60} s`
  },
  {
    name: "10s",
    secondsPerTick: 10,
    countPerLargerUnit: 6,
    scale_appropriate_label: (t) => `${t * 10 % 60} s`
  },
  {
    name: "1min",
    secondsPerTick: 60,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t % 60} min`
  },
  {
    name: "10min",
    secondsPerTick: 60 * 10,
    countPerLargerUnit: 6,
    scale_appropriate_label: (t) => `${t * 10 % 60} min`
  },
  {
    name: "1hr",
    secondsPerTick: 60 * 60,
    countPerLargerUnit: 6,
    scale_appropriate_label: (t) => `${t % 24} hr`
  },
  {
    name: "6hr",
    secondsPerTick: 60 * 60 * 6,
    countPerLargerUnit: 4,
    scale_appropriate_label: (t) => `${t * 6 % 24} hr`
  },
  {
    name: "1day",
    secondsPerTick: 60 * 60 * 24,
    countPerLargerUnit: 10,
    scale_appropriate_label: (t) => `${t} day`
  },
  {
    name: "10day",
    secondsPerTick: 60 * 60 * 24 * 10,
    countPerLargerUnit: 1e4,
    scale_appropriate_label: (t) => `${10 * t} day`
  }
], ve = (t, e, n, o) => b(() => {
  if (e === void 0 || n === void 0)
    return [];
  if (n <= e)
    return [];
  const i = [], r = t / (n - e);
  for (const a of be) {
    const s = r * a.secondsPerTick;
    if (s <= 50)
      continue;
    const l = Math.ceil(e / a.secondsPerTick), f = Math.floor(n / a.secondsPerTick), d = s > 200 || f - l < 5;
    for (let m = l; m <= f; m++) {
      if (m % a.countPerLargerUnit === 0)
        continue;
      const S = m * a.secondsPerTick;
      i.push({
        value: S,
        label: a.scale_appropriate_label(m),
        major: d,
        pixelXposition: o(S)
      });
    }
  }
  return i;
}, [e, n, o, t]), Te = {
  position: "absolute",
  left: 0,
  top: 0
}, pe = (t) => {
  if (!t || typeof t == "function")
    return;
  const e = t.current, n = e && e.getContext("2d");
  if (n)
    return n;
}, bt = (t) => {
  const { width: e, height: n, vOffsetPx: o, hOffsetPx: i, draw: r, drawData: a } = t, s = E(null);
  ft(() => {
    const m = pe(s);
    m && m.canvas && r(m, a);
  }, [r, s, a]);
  const d = { ...Te, ...o ? { top: o } : {}, ...i ? { left: i } : {} };
  return /* @__PURE__ */ h(
    "canvas",
    {
      ref: s,
      width: e,
      height: n,
      style: d
    }
  );
}, ye = (t, e) => {
  const { width: n, height: o, margins: i, timeTicks: r, gridlineOpts: a, yTickSet: s } = e;
  t.clearRect(0, 0, t.canvas.width, t.canvas.height);
  const l = o - i.bottom;
  we(t, r, l, i.top, { hideGridlines: a == null ? void 0 : a.hideX }), t.strokeStyle = "black", q(t, i.left, l, n - i.right, l), s && ke(t, s, l, i.left, n - i.right, i.top, { hideGridlines: a == null ? void 0 : a.hideY });
}, we = (t, e, n, o, i) => {
  if (!e || e.length === 0)
    return;
  const r = 2, a = n + 5;
  t.textAlign = "center", t.textBaseline = "top", e.forEach((s) => {
    t.strokeStyle = s.major ? "gray" : "lightgray";
    const l = i.hideGridlines ? n : o;
    q(t, s.pixelXposition, a, s.pixelXposition, l), t.fillStyle = s.major ? "black" : "gray", t.fillText(s.label, s.pixelXposition, a + r);
  });
}, ke = (t, e, n, o, i, r, a) => {
  const l = o - 5, f = l - 2, { ticks: d } = e;
  t.fillStyle = "black", t.textAlign = "right", t.textBaseline = "middle", d.forEach((m) => {
    if (!m.pixelValue)
      return;
    const S = m.pixelValue + r;
    t.strokeStyle = m.isMajor ? "gray" : "lightgray", t.fillStyle = m.isMajor ? "black" : "gray";
    const M = a.hideGridlines ? o : i;
    q(t, l, S, M, S), t.fillText(m.label, f, S);
  });
}, q = (t, e, n, o, i) => {
  t.beginPath(), t.moveTo(e, n), t.lineTo(o, i), t.stroke();
}, Se = {}, Pe = (t) => {
  const { width: e, height: n } = t, o = T((i) => {
    ye(i, t);
  }, [t]);
  return /* @__PURE__ */ h(
    bt,
    {
      width: e,
      height: n,
      draw: o,
      drawData: Se
    }
  );
}, Me = (t, e) => {
  const { margins: n, currentTimePixels: o, currentTimeIntervalPixels: i } = e;
  if (t.clearRect(0, 0, t.canvas.width, t.canvas.height), i !== void 0) {
    t.fillStyle = "rgba(255, 225, 225, 0.4)", t.strokeStyle = "rgba(150, 50, 50, 0.9)";
    const r = i[0], a = n.top, s = i[1] - i[0], l = t.canvas.height - n.bottom - n.top;
    t.fillRect(r, a, s, l), t.strokeRect(r, a, s, l);
  }
  o !== void 0 && i === void 0 && (t.strokeStyle = "red", t.beginPath(), t.moveTo(o, n.top), t.lineTo(o, t.canvas.height - n.bottom), t.stroke());
}, xe = (t) => {
  const { width: e, height: n, timeRange: o, currentTimePixels: i, currentTimeIntervalPixels: r, margins: a } = t, s = b(() => ({
    width: e,
    height: n,
    timeRange: o,
    currentTimePixels: i,
    currentTimeIntervalPixels: r,
    margins: a
  }), [e, n, o, i, r, a]);
  return /* @__PURE__ */ h(
    bt,
    {
      width: e,
      height: n,
      draw: Me,
      drawData: s
    }
  );
}, gt = {
  left: 45,
  right: 20,
  top: 20,
  bottom: 40
}, Le = ({ width: t, height: e, hideToolbar: n, leftMargin: o }) => {
  const i = b(() => ({
    ...gt,
    left: o || gt.left
  }), [o]), r = n ? 0 : Gt, a = t - r;
  return {
    margins: i,
    canvasWidth: a,
    canvasHeight: e,
    toolbarWidth: r
  };
}, Ve = ({ width: t, height: e, onCanvasElement: n, gridlineOpts: o, onKeyDown: i, onMouseDown: r, onMouseMove: a, onMouseOut: s, onMouseUp: l, hideToolbar: f, yAxisInfo: d, shiftZoom: m, additionalToolbarItems: S, showTimeSelectionBar: M, leftMargin: F }) => {
  const { currentTimeSec: x, visibleStartTimeSec: p, visibleEndTimeSec: y, zoomTimeSelection: C, panTimeSelectionPct: B } = Y(), z = b(() => [p, y], [p, y]), N = e - (M ? $ : 0), { margins: v, canvasWidth: u, canvasHeight: g, toolbarWidth: H } = Le({ width: t, height: N, hideToolbar: f, leftMargin: F }), w = b(() => p === void 0 || y === void 0 ? () => 0 : y <= p ? () => 0 : (c) => v.left + (c - p) / (y - p) * (u - v.left - v.right), [u, p, y, v]), k = b(() => p === void 0 || y === void 0 ? () => 0 : y <= p ? () => 0 : (c) => p + (c - v.left) / (u - v.left - v.right) * (y - p), [u, p, y, v]), _ = b(() => {
    const c = (d == null ? void 0 : d.yMin) || 0, X = (d == null ? void 0 : d.yMax) || 0;
    return X <= c ? () => 0 : (K) => g - v.bottom - (K - c) / (X - c) * (g - v.top - v.bottom);
  }, [d, g, v]), R = ve(u, p, y, w), P = Bt({ datamin: (d == null ? void 0 : d.yMin) || 0, datamax: (d == null ? void 0 : d.yMax) || 0, pixelHeight: g - v.left - v.right }), D = b(() => ({
    datamin: P.datamin,
    datamax: P.datamax,
    ticks: P.ticks.map((c) => ({ ...c, pixelValue: _(c.dataValue) }))
  }), [P, _]), L = b(() => /* @__PURE__ */ h(
    Pe,
    {
      width: u,
      height: g,
      timeRange: z,
      margins: v,
      timeTicks: R,
      yTickSet: d != null && d.showTicks ? D : void 0,
      gridlineOpts: o
    }
  ), [o, u, g, z, v, R, d == null ? void 0 : d.showTicks, D]), G = b(() => x !== void 0 ? w(x) : void 0, [x, w]), U = b(() => /* @__PURE__ */ h(
    xe,
    {
      width: u,
      height: g,
      timeRange: z,
      margins: v,
      currentTimePixels: G
    }
  ), [u, g, z, v, G]), [V, Q] = W(null);
  ft(() => {
    if (!V)
      return;
    const c = (X) => {
      V._hasFocus && X.preventDefault();
    };
    return V.addEventListener("wheel", c), () => {
      V.removeEventListener("wheel", c);
    };
  }, [V]);
  const vt = (y ?? 0) - (p ?? 0), { handleMouseDown: A, handleMouseUp: I, handleMouseLeave: tt, handleMouseMove: et } = fe(v.left, u - v.left - v.right, vt, V), [, nt] = W(void 0), ot = T((c) => {
    if (m && !c.shiftKey || c.deltaY === 0)
      return;
    const X = c.clientX - c.currentTarget.getBoundingClientRect().x, K = k(X), pt = -c.deltaY / 100;
    C(pt > 0 ? 1.1 : 1 / 1.1, K);
  }, [C, k, m]), it = T((c) => {
    c.key === "=" ? C(1.3) : c.key === "-" ? C(1 / 1.3) : c.key === "ArrowRight" ? B(0.3) : c.key === "ArrowLeft" && B(-0.3), i && i(c);
  }, [i, C, B]), rt = T((c) => {
    !c.shiftKey && !c.ctrlKey && !c.altKey ? A(c) : r && r(c);
  }, [A, r]), at = T((c) => {
    !c.shiftKey && !c.ctrlKey && !c.altKey ? I(c) : l && l(c);
  }, [I, l]), st = T((c) => {
    const X = c.clientX - c.currentTarget.getBoundingClientRect().x, K = k(X);
    nt(K), !c.shiftKey && !c.ctrlKey && !c.altKey && et(c), a && a(c);
  }, [et, a, k]), ct = T((c) => {
    nt(void 0), !c.shiftKey && !c.ctrlKey && !c.altKey && tt(c), s && s(c);
  }, [tt, s]), lt = b(() => /* @__PURE__ */ j(
    "div",
    {
      style: {
        position: "relative",
        overflow: "hidden",
        width: u,
        height: g
      },
      onWheel: ot,
      onMouseDown: rt,
      onMouseUp: at,
      onMouseMove: st,
      onMouseOut: ct,
      tabIndex: 0,
      onKeyDown: it,
      children: [
        L,
        /* @__PURE__ */ h(
          "canvas",
          {
            style: { position: "absolute", width: u, height: g },
            ref: n,
            width: u,
            height: g
          }
        ),
        U
      ]
    }
  ), [n, L, U, u, g, it, ot, rt, at, st, ct]), Tt = Qt({ belowDefault: S }), dt = M ? /* @__PURE__ */ j("div", { style: { position: "absolute", width: u, height: e }, children: [
    /* @__PURE__ */ h("div", { style: { position: "absolute", width: u, height: $ }, children: /* @__PURE__ */ h(Rt, { width: u, height: $ - 5 }) }),
    /* @__PURE__ */ h("div", { style: { position: "absolute", top: $, width: u, height: e - $ }, children: lt })
  ] }) : lt;
  return f ? /* @__PURE__ */ h("div", { ref: (c) => Q(c), style: { position: "absolute", width: t, height: e, background: "white" }, children: dt }) : /* @__PURE__ */ h(
    "div",
    {
      className: "TimeScrollView",
      ref: (c) => Q(c),
      style: { position: "relative", width: t, height: e, overflow: "hidden" },
      children: /* @__PURE__ */ j(
        wt,
        {
          width: t,
          height: e,
          initialPosition: H,
          adjustable: !1,
          children: [
            /* @__PURE__ */ h(
              Jt,
              {
                width: 0,
                height: 0,
                top: M ? $ : 0,
                customActions: Tt
              }
            ),
            dt
          ]
        }
      )
    }
  );
};
export {
  Ve as TimeScrollView,
  Le as useTimeScrollView
};
