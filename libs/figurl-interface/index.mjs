var b = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
};
var g = (e, t, r) => (b(e, t, "read from private field"), r ? r.call(e) : t.get(e)), U = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, q = (e, t, r, s) => (b(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r);
import { validateObject as a, isEqualTo as l, optional as u, isString as i, isBoolean as $, isArrayOf as x, isNumber as D, isOneOf as O, isJSONObject as ee } from "@fi-sci/misc";
import te, { useState as C, useEffect as B, useMemo as G, useContext as re, useCallback as Q } from "react";
import { jsx as se } from "react/jsx-runtime";
const ne = (e) => a(e, {
  type: l("getFigureData")
}), k = (e) => a(e, {
  type: l("getFigureData"),
  figureData: () => !0
}), oe = (e) => a(e, {
  type: l("getFileData"),
  uri: u(i),
  responseType: u(i),
  startByte: u(D),
  endByte: u(D)
}), N = (e) => a(e, {
  type: l("getFileData"),
  fileData: u(() => !0),
  errorMessage: u(i)
}), ie = (e) => a(e, {
  type: l("getFileDataUrl"),
  uri: u(i)
}), z = (e) => a(e, {
  type: l("getFileDataUrl"),
  fileDataUrl: u(i),
  errorMessage: u(i)
}), ae = (e) => a(e, {
  type: l("storeFile"),
  fileData: i,
  uri: u(i),
  jotId: u(() => !0)
  // need to keep this in because one visualization still passes undefined for this value
}), J = (e) => a(e, {
  type: l("storeFile"),
  uri: u(i),
  error: u(i)
}), ue = (e) => a(e, {
  type: l("storeGithubFile"),
  fileData: i,
  uri: i
}), j = (e) => a(e, {
  type: l("storeGithubFile"),
  success: $,
  error: u(i)
}), le = (e) => a(e, {
  type: l("setUrlState"),
  state: ee
}), A = (e) => a(e, {
  type: l("setUrlState")
}), ce = (e) => a(e, {
  type: l("serviceQuery"),
  serviceName: i,
  query: () => !0,
  includeUserId: u($)
}), L = (e) => a(e, {
  type: l("serviceQuery"),
  result: u(() => !0),
  binaryPayload: u(() => !0),
  errorMessage: u(i)
}), de = (e) => a(e, {
  type: l("readDir"),
  uri: i
}), pe = (e) => a(e, {
  name: i,
  size: D,
  mtime: D
}), V = (e) => a(e, {
  name: u(i),
  files: x(pe),
  dirs: x(V)
}), W = (e) => a(e, {
  type: l("readDir"),
  dir: u(V),
  errorMessage: u(i)
}), ge = (e) => O([
  ne,
  oe,
  ie,
  ae,
  ue,
  le,
  ce,
  de
])(e), fe = (e) => O([
  k,
  N,
  z,
  J,
  j,
  A,
  L,
  W
])(e), ye = (e) => a(e, {
  type: l("figurlResponse"),
  requestId: i,
  response: fe
}), he = (e) => a(e, {
  type: l("setCurrentUser"),
  userId: u(i),
  googleIdToken: u(i)
}), we = (e) => a(e, {
  type: l("fileDownloadProgress"),
  uri: i,
  loaded: D,
  total: D
}), De = (e) => a(e, {
  type: l("messageToFrontend"),
  message: () => !0
}), Ue = (e) => a(e, {
  type: l("reportUrlStateChange"),
  state: () => !0
}), Ie = (e) => O([
  ye,
  he,
  we,
  De,
  Ue
])(e);
function Se(e) {
  const t = e.indexOf("?");
  if (t < 0)
    return {};
  const r = {}, s = e.slice(t + 1).split("&");
  for (let n = 0; n < s.length; n++) {
    const o = s[n].split("=");
    r[decodeURIComponent(o[0])] = decodeURIComponent(o[1] || "");
  }
  return r;
}
const Fe = Se(window.location.href), me = (e, { parentOrigin: t }) => {
  (Fe.useOpener === "1" ? window.opener : window.parent).postMessage(e, t);
};
function Re(e) {
  const t = e.indexOf("?");
  if (t < 0)
    return {};
  const r = {}, s = e.slice(t + 1).split("&");
  for (let n = 0; n < s.length; n++) {
    const o = s[n].split("=");
    r[decodeURIComponent(o[0])] = decodeURIComponent(o[1] || "");
  }
  return r;
}
const P = Re(window.location.href), v = {}, qe = (e) => {
  const t = e.requestId, r = e.response;
  t in v && (v[t].onResponse(r), delete v[t]);
};
let h;
const H = [];
window.addEventListener("message", (e) => {
  if (h)
    return;
  const t = e.data;
  t.type === "initializeFigure" && (h = {
    parentOrigin: t.parentOrigin,
    figureId: t.figureId,
    s: t.s
  }, H.forEach((r) => {
    r();
  }));
});
const ve = (e) => {
  h ? e() : H.push(e);
}, K = async () => new Promise((e, t) => {
  const r = P.figureId, s = P.parentOrigin, n = P.s || "";
  r !== void 0 && s !== void 0 ? e({ parentOrigin: s, figureId: r, s: n }) : ve(() => {
    if (!h)
      throw Error("unexpected");
    e({
      parentOrigin: h.parentOrigin,
      figureId: h.figureId,
      s: h.s
    });
  });
}), y = async (e) => {
  const { figureId: t, parentOrigin: r } = await K();
  return new Promise((s, n) => {
    const o = _(10);
    v[o] = {
      onResponse: (c) => {
        s(c);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (c) => {
        n(c);
      }
    }, me({
      type: "figurlRequest",
      figureId: t,
      requestId: o,
      request: e
    }, { parentOrigin: r });
  });
}, _ = (e) => {
  if (!e)
    throw Error("randomAlphaString: num_chars needs to be a positive integer.");
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let s = 0; s < e; s++)
    t += r.charAt(Math.floor(Math.random() * r.length));
  return t;
};
var f, S;
class Me {
  constructor() {
    U(this, f, {});
    U(this, S, {});
  }
  setUserInfo(t) {
    q(this, S, { ...t });
    for (const r in g(this, f))
      g(this, f)[r]();
  }
  get userInfo() {
    return g(this, S);
  }
  onChange(t) {
    const r = _(10);
    return g(this, f)[r] = t, () => {
      r in g(this, f) && delete g(this, f)[r];
    };
  }
}
f = new WeakMap(), S = new WeakMap();
const M = new Me(), Ce = (e) => {
  M.setUserInfo(e);
}, He = () => {
  const [e, t] = C({});
  return B(() => (t(M.userInfo), M.onChange(() => {
    t(M.userInfo);
  })), []), e;
}, Ee = (e) => a(e, {
  type: l("figurlRequest"),
  figureId: i,
  requestId: i,
  request: ge
}), Oe = (e) => a(e, {
  type: l("messageToBackend"),
  figureId: i,
  message: () => !0
}), Pe = (e) => O([Ee, Oe])(e), Te = async (e, t, r = {}) => {
  const s = {
    type: "getFileData",
    uri: e
  };
  r.responseType !== void 0 && (s.responseType = r.responseType), r.startByte !== void 0 && (s.startByte = r.startByte, s.endByte = r.endByte), X[e] = ({ loaded: o, total: d }) => {
    t({ loaded: o, total: d });
  };
  const n = await y(s);
  if (!N(n))
    throw Error("Invalid response to getFigureData");
  if (n.errorMessage)
    throw Error(`Error getting file data for ${e}: ${n.errorMessage}`);
  return n.fileData;
}, Ke = async (e) => {
  const r = await y({
    type: "getFileDataUrl",
    uri: e
  });
  if (!z(r))
    throw Error("Invalid response to getFigureUrlData");
  if (!r.fileDataUrl || r.errorMessage)
    throw Error(`Error getting file data for ${e}: ${r.errorMessage}`);
  return r.fileDataUrl;
}, _e = async (e, t = {}) => {
  const s = await y({
    type: "storeFile",
    fileData: e
  });
  if (!J(s))
    throw Error("Invalid response to storeFile");
  if (s.error)
    throw Error(`Error storing file data: ${s.error}`);
  if (s.uri === void 0)
    throw Error("Unexpected response.uri is undefined");
  return s.uri;
}, Xe = async (e) => {
  const t = {
    type: "storeGithubFile",
    fileData: e.fileData,
    uri: e.uri
  }, r = await y(t);
  if (!j(r))
    throw Error("Invalid response to storeFile");
  if (r.error)
    throw Error(`Error storing file data: ${r.error}`);
}, X = {}, Be = ({
  uri: e,
  loaded: t,
  total: r
}) => {
  const s = X[e];
  s && s({ loaded: t, total: r });
}, Ye = (e, t = {}) => {
  const [r, s] = C(void 0), [n, o] = C(void 0), { progress: d, reportProgress: c } = G(() => {
    let p = ({ loaded: R, total: je }) => {
    };
    return { progress: {
      onProgress: (R) => {
        p = R;
      }
    }, reportProgress: (R) => {
      p(R);
    } };
  }, []);
  return B(() => {
    o(void 0), s(void 0), Te(e, c, {
      startByte: t.startByte,
      endByte: t.endByte
    }).then((p) => {
      s(p);
    }).catch((p) => {
      o(p.message);
    });
  }, [e, c, t.startByte, t.endByte]), { fileData: r, progress: d, errorMessage: n };
};
function be(e) {
  const t = e.indexOf("?");
  if (t < 0)
    return {};
  const r = {}, s = e.slice(t + 1).split("&");
  for (let n = 0; n < s.length; n++) {
    const o = s[n].split("=");
    r[decodeURIComponent(o[0])] = decodeURIComponent(o[1] || "");
  }
  return r;
}
const xe = be(window.location.href), $e = JSON.parse(decodeURIComponent(xe.s || "{}"));
let T;
K().then((e) => {
  T = JSON.parse(e.s || "{}");
});
const I = () => T || $e, Y = te.createContext({}), Ge = (e) => {
}, Ze = () => {
  const e = re(Y), { urlState: t, setUrlState: r } = e, s = Q(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n) => {
      const o = { ...t || I() };
      let d = !1;
      for (const c in n) {
        const p = n[c], m = (t || I())[c];
        p === void 0 && m !== void 0 ? (delete o[c], d = !0) : (p !== void 0 && m === void 0 || E(p) !== E(m)) && (o[c] = p, d = !0);
      }
      d && r && r(o);
    },
    [t, r]
  );
  return {
    urlState: t || I(),
    setUrlState: r || Ge,
    updateUrlState: s,
    initialUrlState: I()
  };
};
var F, w;
class Qe {
  constructor() {
    U(this, F, {});
    U(this, w, []);
  }
  reportUrlStateChange(t) {
    E(t) !== E(g(this, F)) && (q(this, F, t), g(this, w).forEach((r) => r(t)));
  }
  onUrlStateChange(t) {
    return g(this, w).push(t), () => {
      q(this, w, g(this, w).filter((s) => s !== t));
    };
  }
}
F = new WeakMap(), w = new WeakMap();
const Z = new Qe(), ke = (e) => {
  Z.reportUrlStateChange(e);
}, et = (e) => {
  const [t, r] = C(I()), s = Q((o) => {
    (async () => {
      const c = await y({
        type: "setUrlState",
        state: o
      });
      if (!A(c))
        throw Error("Invalid response to setUrlState");
    })();
  }, []), n = G(() => ({ urlState: t, setUrlState: s }), [t, s]);
  return B(() => Z.onUrlStateChange((d) => {
    r(d);
  }), []), /* @__PURE__ */ se(Y.Provider, { value: n, children: e.children });
}, E = (e, t = void 0) => {
  const r = [];
  return JSON.stringify(e, function(s, n) {
    return r.push(s), n;
  }), r.sort(), JSON.stringify(e, r, t);
};
function Ne(e) {
  const t = e.indexOf("?");
  if (t < 0)
    return {};
  const r = {}, s = e.slice(t + 1).split("&");
  for (let n = 0; n < s.length; n++) {
    const o = s[n].split("=");
    r[decodeURIComponent(o[0])] = decodeURIComponent(o[1] || "");
  }
  return r;
}
const ze = Ne(window.location.href), tt = () => {
  window.addEventListener("message", (e) => {
    const t = e.data;
    if (t)
      if (Ie(t))
        t.type === "figurlResponse" ? qe(t) : t.type === "setCurrentUser" ? Ce({
          userId: t.userId,
          googleIdToken: t.googleIdToken
        }) : t.type === "fileDownloadProgress" ? Be({
          uri: t.uri,
          loaded: t.loaded,
          total: t.total
        }) : t.type === "reportUrlStateChange" && ke(t.state);
      else if (Pe(t)) {
        if (ze.parentOrigin) {
          console.warn("Got message to parent even though parentOrigin is defined");
          return;
        }
        if (t.type === "figurlRequest") {
          const r = t.request;
          if (r.type === "getFigureData") {
            const n = {
              type: "getFigureData",
              figureData: window.figurlData.figure
            }, o = {
              type: "figurlResponse",
              requestId: t.requestId,
              response: n
            };
            window.postMessage(o, "*");
          } else if (r.type === "getFileData") {
            const n = {
              type: "getFileData",
              fileData: window.figurlData.uri[r.uri]
            }, o = {
              type: "figurlResponse",
              requestId: t.requestId,
              response: n
            };
            window.postMessage(o, "*");
          }
        }
      } else
        console.warn("Unhandled message from parent", e);
  });
}, rt = async () => {
  const t = await y({
    type: "getFigureData"
  });
  if (!k(t))
    throw Error("Invalid response to getFigureData");
  return t.figureData;
}, st = async (e, t, r = {}) => {
  const s = {
    type: "serviceQuery",
    serviceName: e,
    query: t
  };
  r.includeUserId && (s.includeUserId = !0);
  const n = await y(s);
  if (!L(n))
    throw Error("Invalid response to serviceQuery");
  if (n.errorMessage)
    throw Error(`Error processing service query: ${n.errorMessage}`);
  return { result: n.result, binaryPayload: n.binaryPayload };
}, nt = async (e) => {
  const r = await y({
    type: "readDir",
    uri: e
  });
  if (!W(r))
    throw Error("Invalid response to readDir");
  if (r.errorMessage)
    throw Error(`Error reading dir for ${e}: ${r.errorMessage}`);
  if (!r.dir)
    throw Error("Unexpected, response.dir is undefined");
  return r.dir;
};
export {
  et as SetupUrlState,
  rt as getFigureData,
  Te as getFileData,
  Ke as getFileDataUrl,
  nt as readDir,
  st as serviceQuery,
  tt as startListeningToParent,
  _e as storeFileData,
  Xe as storeGithubFileData,
  Ye as useFileData,
  He as useSignedIn,
  Ze as useUrlState
};
