import { jsx as R } from "react/jsx-runtime";
import { useState as C, useMemo as v, useEffect as z, useCallback as W } from "react";
const V = ({ width: e, height: o, electrodeLocations: s }) => {
  const [x, c] = C(void 0), n = v(() => {
    const { xmin: t, xmax: i, ymin: r, ymax: a } = H(s), y = i - t, m = a - r;
    return F(y, m, e, o) ? s.map((p) => ({ x: p.y, y: p.x })) : s;
  }, [s, e, o]), { xmin: l, xmax: P, ymin: u, ymax: g } = v(() => H(n), [n]), j = 30, { isotropicScale: f, xPixelOffset: h, yPixelOffset: E, markerPixelRadius: M } = v(() => {
    let t = 0;
    const i = P - l, r = g - u, a = J(n);
    for (const y of [1, 2]) {
      const m = t + 2, d = t + 2, p = t + 2, T = t + 2 + j, I = e - m - d, B = o - p - T, N = I / i, G = B / r, S = Math.min(N, G), U = m + (I - i * S) / 2, X = p + (B - r * S) / 2, Y = a * S;
      if (t = Math.max(1, Math.floor(Y / 2 * 0.8)), y === 2)
        return { isotropicScale: S, xPixelOffset: U, yPixelOffset: X, markerPixelRadius: t };
    }
    throw Error("Unexpected");
  }, [n, e, o, l, P, u, g]), k = v(() => (t, i) => {
    const r = h + (t - l) * f, a = E + (i - u) * f;
    return { xp: r, yp: a };
  }, [h, E, l, u, f]), O = v(() => (t, i) => {
    const r = l + (t - h) / f, a = u + (i - E) / f;
    return { x: r, y: a };
  }, [h, E, l, u, f]), [b, q] = C(void 0);
  z(() => {
    if (!b)
      return;
    const t = b.getContext("2d");
    if (!t)
      return;
    t.clearRect(0, 0, e, o), t.strokeStyle = "black", t.lineWidth = 1;
    for (let r = 0; r < n.length; r++) {
      const a = n[r], { xp: y, yp: m } = k(a.x, a.y);
      t.beginPath(), t.arc(y, m, M, 0, 2 * Math.PI), t.stroke(), r === x && (t.fillStyle = "rgba(0, 0, 0, 0.5)", t.fill());
    }
    function i() {
      if (!t)
        return;
      const { yp: r } = k(0, g), a = 100 * f, y = (e - a) / 2, m = y, d = y + a, p = r + M + 10, T = r + M + 10;
      t.beginPath(), t.moveTo(m, p), t.lineTo(d, T), t.stroke(), t.font = "12px sans-serif", t.textAlign = "center", t.textBaseline = "top", t.fillText("100 μm", (m + d) / 2, T + 5);
    }
    i();
  }, [b, e, o, n, M, x, f, k, g]);
  const A = W((t) => {
    const { x: i, y: r } = O(t.nativeEvent.offsetX, t.nativeEvent.offsetY), a = K(n, i, r, M / f / 0.8);
    c(a);
  }, [O, n, M, f]), D = W(() => {
    c(void 0);
  }, []);
  return /* @__PURE__ */ R(
    "div",
    {
      style: { position: "absolute", width: e, height: o },
      onMouseMove: A,
      onMouseLeave: D,
      children: /* @__PURE__ */ R(
        "canvas",
        {
          ref: (t) => t && q(t),
          width: e,
          height: o
        }
      )
    }
  );
}, H = (e) => {
  if (e.length === 0)
    return { xmin: 0, xmax: 0, ymin: 0, ymax: 0 };
  let o = e[0].x, s = e[0].x, x = e[0].y, c = e[0].y;
  for (const n of e)
    o = Math.min(o, n.x), s = Math.max(s, n.x), x = Math.min(x, n.y), c = Math.max(c, n.y);
  return { xmin: o, xmax: s, ymin: x, ymax: c };
}, F = (e, o, s, x) => {
  const c = Math.min(s / e, x / o);
  return Math.min(s / o, x / e) > c;
}, J = (e) => {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const x = e[s];
    let c = 1 / 0;
    for (let n = 0; n < e.length; n++) {
      if (s === n)
        continue;
      const l = e[n], P = Math.sqrt(Math.pow(x.x - l.x, 2) + Math.pow(x.y - l.y, 2));
      c = Math.min(c, P);
    }
    o.push(c);
  }
  return o.sort(), o[Math.floor(o.length / 2)];
}, K = (e, o, s, x) => {
  for (let c = 0; c < e.length; c++) {
    const n = e[c];
    if (Math.sqrt(Math.pow(n.x - o, 2) + Math.pow(n.y - s, 2)) <= x)
      return c;
  }
};
export {
  V as ElectrodeGeometryWidget
};
