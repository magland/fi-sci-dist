import { jsx as l, jsxs as E } from "react/jsx-runtime";
import { useState as F, useEffect as M } from "react";
import N from "react-draggable";
const L = 10, X = 4, Y = 2, _ = N, U = (h) => {
  const {
    width: t,
    height: e,
    initialPosition: k,
    onChange: m,
    adjustable: g = !0,
    positionFromRight: b = !1,
    direction: o = "horizontal",
    hideSecondChild: x
  } = h, s = o === "horizontal" ? t : e, [p, y] = F(k);
  if (M(() => {
    p > s - 4 ? y(s - 4) : p < 4 && s > 20 && y(4);
  }, [p, t, s]), !h.children)
    throw Error("Unexpected: no props.children");
  let n, d;
  if (!Array.isArray(h.children))
    n = h.children, d = null;
  else {
    const z = h.children.filter((a) => a !== void 0);
    n = z[0] || null, d = z[1] || null;
  }
  if (n || (n = d, d = null), !n)
    throw Error("Splitter must have at least one child.");
  if (!d)
    return /* @__PURE__ */ l(n.type, { ...n.props, width: t, height: e });
  let f = b ? s - p : p;
  x && (f = s);
  const i = g ? h.gripThickness ?? L : 0, u = g ? h.gripInnerThickness ?? X : 0, r = g ? h.gripMargin ?? Y : 0, c = f - i / 2 - r, w = s - c - i - 2 * r, S = {
    top: 0,
    left: 0,
    width: t,
    height: e,
    overflow: "hidden"
  }, I = {
    left: 0,
    top: 0,
    width: o === "horizontal" ? c : t,
    height: o === "horizontal" ? e : c,
    zIndex: 0,
    overflowY: o === "horizontal" ? "auto" : "hidden",
    overflowX: o === "horizontal" ? "hidden" : "auto"
  }, P = {
    left: o === "horizontal" ? c + i + 2 * r : 0,
    top: o === "horizontal" ? 0 : c + i + 2 * r,
    width: o === "horizontal" ? w : t,
    height: o === "horizontal" ? e : w,
    zIndex: 0,
    overflowY: o === "horizontal" ? "auto" : "hidden",
    overflowX: o === "horizontal" ? "hidden" : "auto"
  }, T = {
    left: 0,
    top: 0,
    width: o === "horizontal" ? i + 2 * r : t,
    height: o === "horizontal" ? e : i + 2 * r,
    backgroundColor: "transparent",
    cursor: o === "horizontal" ? "col-resize" : "row-resize",
    zIndex: 9998
  }, C = {
    left: o === "horizontal" ? r : 0,
    top: o === "horizontal" ? 0 : r,
    width: o === "horizontal" ? i : t,
    height: o === "horizontal" ? e : i,
    background: "rgb(230, 230, 230)",
    cursor: o === "horizontal" ? "col-resize" : "row-resize"
  }, D = {
    top: o === "horizontal" ? 0 : (i - u) / 2,
    left: o === "horizontal" ? (i - u) / 2 : 0,
    width: o === "horizontal" ? u : t,
    height: o === "horizontal" ? e : u,
    background: "gray",
    cursor: o === "horizontal" ? "col-resize" : "row-resize"
  }, j = (z, a) => {
  }, A = (z, a) => {
    const v = o === "horizontal" ? a.x : a.y;
    if (v === f)
      return;
    const G = b ? s - v : v;
    y(G), m && m(G);
  };
  return /* @__PURE__ */ E("div", { className: "splitter", style: { ...S, position: "relative", overflow: "hidden" }, children: [
    /* @__PURE__ */ l("div", { style: { ...I, position: "absolute", overflow: "hidden" }, className: "SplitterChild", children: /* @__PURE__ */ l(
      n.type,
      {
        ...n.props,
        width: o === "horizontal" ? c : t,
        height: o === "horizontal" ? e : c
      }
    ) }, "child1"),
    g && !x && /* @__PURE__ */ l(
      _,
      {
        position: {
          x: o === "horizontal" ? f - i / 2 - r : 0,
          y: o === "horizontal" ? 0 : f - i / 2 - r
        },
        axis: o === "horizontal" ? "x" : "y",
        onDrag: (z, a) => j(),
        onStop: (z, a) => A(z, a),
        children: /* @__PURE__ */ l("div", { style: { ...T, position: "absolute" }, children: /* @__PURE__ */ l("div", { style: { ...C, position: "absolute" }, children: /* @__PURE__ */ l("div", { style: { ...D, position: "absolute" } }) }) })
      },
      "drag"
    ),
    /* @__PURE__ */ l("div", { style: { ...P, position: "absolute", overflow: "hidden" }, className: "SplitterChild", children: /* @__PURE__ */ l(
      d.type,
      {
        ...d.props,
        width: o === "horizontal" ? w : t,
        height: o === "horizontal" ? e : w
      }
    ) }, "child2")
  ] });
};
export {
  U as Splitter
};
