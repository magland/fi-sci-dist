import { jsx as s, jsxs as v } from "react/jsx-runtime";
import { Close as W } from "@mui/icons-material";
import { Dialog as x, IconButton as y } from "@mui/material";
import { useState as g, useEffect as z, useCallback as m, useMemo as D } from "react";
function f() {
  const { innerWidth: e, innerHeight: t } = window;
  return {
    width: e,
    height: t
  };
}
const H = () => {
  const [e, t] = g(f());
  return z(() => {
    function i() {
      t(f());
    }
    return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, []), e;
}, j = ({ onClose: e, visible: t, children: i, padding: r, overflow: b }) => {
  const { width: h, height: u } = H(), d = Math.min(h, u), o = d < 400 ? 0 : d < 500 ? 10 : d < 600 ? 20 : d < 800 ? 30 : d < 1e3 ? 40 : 50, n = r !== void 0 ? r : 20, l = i, a = e ? 50 : 0, c = h - o * 2 - 10, w = u - o * 2 - 10, p = w - a;
  return /* @__PURE__ */ s(
    x,
    {
      fullScreen: !0,
      open: t,
      onClose: e,
      style: {
        zIndex: 9999,
        left: o,
        top: o,
        right: o,
        bottom: o,
        background: "white",
        position: "absolute",
        border: "2px solid #000"
      },
      children: /* @__PURE__ */ v("div", { style: { zIndex: 9999, position: "absolute", width: c, height: w, overflow: "hidden" }, children: [
        /* @__PURE__ */ s("div", { style: { position: "absolute", padding: 20 }, children: e && /* @__PURE__ */ s(y, { onClick: e, children: /* @__PURE__ */ s(W, {}) }) }),
        /* @__PURE__ */ s("div", { style: { position: "absolute", left: n, width: c - n * 2, top: a + n, height: p - n * 2, overflow: b || "auto" }, children: l && /* @__PURE__ */ s(l.type, { ...l.props, width: c - n * 2, height: p - n * 2 }) })
      ] })
    }
  );
}, B = () => {
  const [e, t] = g(!1), i = m(() => {
    t(!0);
  }, []), r = m(() => {
    t(!1);
  }, []);
  return D(() => ({
    visible: e,
    handleOpen: i,
    handleClose: r
  }), [e, i, r]);
};
export {
  j as default,
  B as useModalWindow
};
