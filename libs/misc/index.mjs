import { jsx as i, jsxs as k } from "react/jsx-runtime";
import d, { useMemo as v, useState as w, useEffect as h } from "react";
const A = ({
  widths: e,
  height: n,
  spacing: r = 0,
  children: t
}) => {
  const o = e.reduce((a, u) => a + u, 0), l = d.Children.toArray(t).map((a) => a), s = v(() => {
    const a = [];
    let u = 0;
    for (const m of e)
      a.push(u), u += m + r;
    return a;
  }, [e, r]);
  return /* @__PURE__ */ i("div", {
    className: "HBoxLayout",
    style: { position: "relative", width: o, height: n },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: l.map((a, u) => a ? /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "absolute",
          overflow: "hidden",
          background: "white",
          left: s[u],
          top: 0,
          width: e[u],
          height: n
        },
        children: /* @__PURE__ */ i(a.type, { ...a.props, width: e[u], height: n })
      },
      u
    ) : /* @__PURE__ */ i("span", {}))
  });
}, N = ({
  children: e,
  onClick: n,
  color: r,
  disabled: t,
  href: o,
  target: l
}) => o ? /* @__PURE__ */ i("a", { href: o, target: l, style: { cursor: "pointer", color: r || "darkblue" }, children: e }) : t ? /* @__PURE__ */ i("span", { style: { color: "gray" }, children: e }) : (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  /* @__PURE__ */ i("a", { onClick: n, style: { cursor: "pointer", color: r || "darkblue" }, children: e })
);
const S = ({
  icon: e,
  onClick: n,
  title: r,
  label: t,
  disabled: o,
  fontSize: l
}) => {
  const s = ["SmallIconButton"];
  return o ? s.push("disabled") : s.push("enabled"), /* @__PURE__ */ k(
    "span",
    {
      className: s.join(" "),
      title: r,
      onClick: o ? void 0 : n,
      style: {
        cursor: "pointer",
        fontSize: (l || 18) * 0.8,
        whiteSpace: "nowrap"
      },
      children: [
        e && /* @__PURE__ */ i(
          e.type,
          {
            className: s.join(" "),
            ...e.props,
            style: { fontSize: l || 18, verticalAlign: "bottom" }
          }
        ),
        t && /* @__PURE__ */ i("span", { style: { marginLeft: 4, verticalAlign: "bottom" }, children: t })
      ]
    }
  );
};
function p() {
  const { innerWidth: e, innerHeight: n } = window;
  return {
    width: e,
    height: n
  };
}
const j = () => {
  const [e, n] = w(p());
  return h(() => {
    function r() {
      n(p());
    }
    return window.addEventListener("resize", r), () => window.removeEventListener("resize", r);
  }, []), e;
}, B = ({ width: e, heights: n, children: r }) => {
  const t = n.reduce((l, s) => l + s, 0), o = d.Children.toArray(r).map((l) => l);
  return /* @__PURE__ */ i("div", {
    className: "VBoxLayout",
    style: { position: "relative", width: e, height: t },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: o.map((l, s) => l ? /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "absolute",
          overflow: "hidden",
          background: "white",
          left: 0,
          top: n.slice(0, s).reduce((a, u) => a + u, 0),
          width: e,
          height: n[s]
        },
        children: /* @__PURE__ */ i(l.type, { ...l.props, width: e, height: n[s] })
      },
      s
    ) : /* @__PURE__ */ i("span", {}))
  });
}, L = (e) => e !== null && typeof e == "string", y = (e) => e !== null && typeof e == "function", $ = (e) => e !== null && typeof e == "number", z = (e) => e === null, H = (e) => e !== null && typeof e == "boolean", W = (e) => (n) => {
  for (let r of e)
    if (r(n))
      return !0;
  return !1;
}, D = (e) => {
  if (y(e)) {
    const n = e;
    return (r) => r === void 0 || n(r);
  } else
    return (n) => n === void 0 || b(n, e);
}, E = (e) => (n) => n === e, P = (e) => (n) => {
  if (n !== null && Array.isArray(n)) {
    for (let r of n)
      if (!e(r))
        return !1;
    return !0;
  } else
    return !1;
}, c = (e) => e !== null && typeof e == "object", V = (e, n) => (r) => {
  if (c(r)) {
    for (let t in r)
      if (!e(t) || !n(r[t]))
        return !1;
    return !0;
  } else
    return !1;
}, C = (e) => c(e) ? f(e) : !1, I = (e) => f(e), f = (e) => {
  if (typeof e == "string" || typeof e == "number")
    return !0;
  if (!c(e))
    return !1;
  const n = (t) => Object.prototype.toString.call(t) === "[object Object]", r = (t) => t === null || typeof t > "u" || typeof t == "string" || typeof t == "boolean" || typeof t == "number" || Array.isArray(t) || n(t);
  if (!r(e))
    return !1;
  for (let t in e)
    if (e.hasOwnProperty(t) && (!r(e[t]) || e[t] !== null && typeof e[t] == "object" && !f(e[t])))
      return !1;
  return !0;
}, b = (e, n, r) => {
  const t = r || {};
  if (!e)
    return t.callback && t.callback("x is undefined/null."), !1;
  if (typeof e != "object")
    return t.callback && t.callback("x is not an Object."), !1;
  for (let o in e)
    if (!(o in n) && !t.allowAdditionalFields)
      return t.callback && t.callback(`Key not in spec: ${o}`), !1;
  for (let o in n) {
    const l = n[o];
    if (y(l)) {
      if (!l(e[o]))
        return t.callback && t.callback(`Problem validating: ${o} (${e[o]})`), !1;
    } else {
      if (!(o in e))
        return t.callback && t.callback(`Key not in x: ${o}`), !1;
      if (!b(e[o], l, {
        callback: t.callback
      }))
        return t.callback && t.callback(`Value of key > ${o} < itself failed validation.`), !1;
    }
  }
  return !0;
};
export {
  A as HBoxLayout,
  N as Hyperlink,
  S as SmallIconButton,
  B as VBoxLayout,
  P as isArrayOf,
  H as isBoolean,
  E as isEqualTo,
  y as isFunction,
  C as isJSONObject,
  f as isJSONSerializable,
  I as isJSONValue,
  z as isNull,
  $ as isNumber,
  c as isObject,
  V as isObjectOf,
  W as isOneOf,
  L as isString,
  D as optional,
  j as useWindowDimensions,
  b as validateObject
};
