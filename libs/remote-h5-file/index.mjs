var P = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var i = (s, t, e) => (P(s, t, "read from private field"), e ? e.call(s) : t.get(s)), w = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, R = (s, t, e, o) => (P(s, t, "write to private field"), o ? o.call(s, e) : t.set(s, e), e);
const N = (s) => {
  const t = `importScripts( "${s}" );`;
  return URL.createObjectURL(new Blob([t], { type: "text/javascript" }));
}, S = (s) => {
  const t = N(s);
  return new Worker(t);
};
var y, l, g;
class W {
  constructor() {
    w(this, y, void 0);
    w(this, l, void 0);
    w(this, g, void 0);
    R(this, l, []), R(this, g, void 0), this._processPendingRequests = () => {
      if (i(this, g) || i(this, l).length === 0)
        return;
      const t = i(this, l).shift();
      R(this, g, t);
      let e = !1;
      const o = (a) => {
        e || (e = !0, i(this, y).removeEventListener("message", r), t.onResolved(a), R(this, g, void 0), this._processPendingRequests());
      }, n = (a) => {
        e || (e = !0, i(this, y).removeEventListener("message", r), t.onRejected(a), R(this, g, void 0), this._processPendingRequests());
      }, r = (a) => {
        const c = a.data;
        c.type === "response" && c.requestId === t.requestId && (c.response.success ? o(c.response) : n(new Error(c.response.error)));
      };
      i(this, y).addEventListener("message", r), i(this, y).postMessage({
        type: "request",
        requestId: t.requestId,
        request: t.request
      }), setTimeout(() => {
        n(new Error("timeout"));
      }, 6e4 * 3);
    }, R(this, y, S("https://cdn.jsdelivr.net/gh/magland/remote-h5-worker@0.1.0/dist/RemoteH5Worker.js"));
  }
  get numRunningRequests() {
    return i(this, g) ? 1 : 0;
  }
  get numPendingRequests() {
    return i(this, l).length;
  }
  get numRequests() {
    return this.numRunningRequests + this.numPendingRequests;
  }
  async postRequest(t, e) {
    const o = Math.random().toString();
    return await new Promise((r, a) => {
      i(this, l).push({ requestId: o, request: t, onResolved: r, onRejected: a }), e.onCancel.push(() => {
        const c = i(this, l).findIndex((q) => q.requestId === o);
        c >= 0 && (i(this, l).splice(c, 1), a(new Error("canceled")));
      }), this._processPendingRequests();
    });
  }
}
y = new WeakMap(), l = new WeakMap(), g = new WeakMap();
const G = 1;
var v;
class j {
  constructor() {
    w(this, v, []);
    for (let t = 0; t < G; t++)
      i(this, v).push(new W());
  }
  async postRequest(t, e) {
    return await i(this, v).sort((n, r) => n.numRequests - r.numRequests)[0].postRequest(t, e);
  }
}
v = new WeakMap();
const L = new j(), D = async (s, t) => {
  k.numPendingRequests++;
  try {
    return await L.postRequest(s, t);
  } finally {
    k.numPendingRequests--;
  }
}, C = 1024 * 1024 * 4, I = 1024 * 100, k = {
  getGroupCount: 0,
  getDatasetCount: 0,
  getDatasetDataCount: 0,
  numPendingRequests: 0
};
var f, d;
class M {
  // null means in progress
  constructor(t, e) {
    w(this, f, {});
    // null means in progress
    w(this, d, {});
    this.url = t, this.metaUrl = e;
  }
  get dataIsRemote() {
    return !this.url.startsWith("http://localhost");
  }
  async getGroup(t) {
    const e = i(this, f)[t];
    if (e)
      return e.group;
    if (e === null) {
      for (; i(this, f)[t] === null; )
        await new Promise((a) => setTimeout(a, 100));
      const r = i(this, f)[t];
      if (r)
        return r.group;
      throw Error("Unexpected");
    }
    i(this, f)[t] = null;
    const o = { onCancel: [] };
    let n;
    try {
      n = await D({
        type: "getGroup",
        url: this.metaUrl || this.url,
        path: t,
        chunkSize: this.metaUrl ? C : I
      }, o);
    } catch {
      i(this, f)[t] = { success: !1 };
      return;
    }
    return i(this, f)[t] = n, k.getGroupCount++, n.group;
  }
  async getDataset(t) {
    const e = i(this, d)[t];
    if (e)
      return e.dataset;
    if (e === null) {
      for (; i(this, d)[t] === null; )
        await new Promise((a) => setTimeout(a, 100));
      const r = i(this, d)[t];
      if (r)
        return r.dataset;
      throw Error("Unexpected");
    }
    i(this, d)[t] = null;
    const o = { onCancel: [] };
    let n;
    try {
      n = await D({
        type: "getDataset",
        url: this.metaUrl || this.url,
        path: t,
        chunkSize: this.metaUrl ? C : I
      }, o);
    } catch {
      i(this, d)[t] = { success: !1 };
      return;
    }
    return i(this, d)[t] = n, k.getDatasetCount++, n.dataset;
  }
  async getDatasetData(t, e) {
    if (e.slice) {
      for (const p of e.slice)
        if (isNaN(p[0]) || isNaN(p[1]))
          throw console.warn("Invalid slice", t, e.slice), Error("Invalid slice");
    }
    const o = await this.getDataset(t);
    if (!o)
      return;
    let n = this.metaUrl || this.url;
    B(o.shape) > 100 && (n = this.url);
    const { slice: r, allowBigInt: a, canceler: c } = e, q = { onCancel: [] };
    let E;
    try {
      E = await D({
        type: "getDatasetData",
        url: n,
        path: t,
        slice: r,
        chunkSize: n === this.metaUrl ? C : I
      }, c || q);
    } catch {
      return;
    }
    const { data: F } = E;
    let u = F;
    if (!a) {
      if (u && u.constructor && u.constructor.name === "BigInt64Array") {
        const p = new Int32Array(u.length);
        for (let h = 0; h < u.length; h++)
          p[h] = Number(u[h]);
        u = p;
      }
      if (u && u.constructor && u.constructor.name === "BigUint64Array") {
        const p = new Uint32Array(u.length);
        for (let h = 0; h < u.length; h++)
          p[h] = Number(u[h]);
        u = p;
      }
    }
    return k.getDatasetDataCount++, u;
  }
}
f = new WeakMap(), d = new WeakMap();
var m;
class x {
  constructor(t) {
    w(this, m, void 0);
    R(this, m, t);
  }
  get dataIsRemote() {
    return i(this, m).some((t) => t.dataIsRemote);
  }
  async getGroup(t) {
    const e = [];
    for (const n of i(this, m)) {
      const r = await n.getGroup(t);
      r && e.push(r);
    }
    return console.log(`Got ${e.length} groups`, t), e.length === 0 ? void 0 : z(e);
  }
  async getDataset(t) {
    for (const e of i(this, m)) {
      const o = await e.getDataset(t);
      if (o)
        return o;
    }
  }
  async getDatasetData(t, e) {
    var n;
    let o = !1;
    (n = e.canceler) == null || n.onCancel.push(() => {
      o = !0;
    });
    for (const r of i(this, m)) {
      const a = await r.getDatasetData(t, e);
      if (a)
        return a;
      if (o)
        return;
    }
  }
  getFiles() {
    return i(this, m);
  }
}
m = new WeakMap();
const z = (s) => {
  if (s.length === 0)
    throw Error("Unexpected groups.length == 0");
  const t = {
    path: s[0].path,
    subgroups: [],
    datasets: [],
    attrs: {}
  }, e = [], o = [];
  for (const n of s) {
    for (const r of n.subgroups)
      e.includes(r.name) || e.push(r.name);
    for (const r of n.datasets)
      o.includes(r.name) || o.push(r.name);
  }
  for (const n of e) {
    const r = [];
    for (const a of s) {
      const c = a.subgroups.find((q) => q.name === n);
      c && r.push(c);
    }
    t.subgroups.push(A(r));
  }
  for (const n of o) {
    const r = [];
    for (const a of s) {
      const c = a.datasets.find((q) => q.name === n);
      c && r.push(c);
    }
    r.length > 0 && t.datasets.push(r[0]);
  }
  for (const n of s)
    for (const r in n.attrs)
      r in t.attrs || (t.attrs[r] = n.attrs[r]);
  return t;
}, A = (s) => {
  if (s.length === 0)
    throw Error("Unexpected subgroups.length == 0");
  const t = {
    name: s[0].name,
    path: s[0].path,
    attrs: {}
  };
  for (const e of s)
    for (const o in e.attrs)
      o in t.attrs || (t.attrs[o] = e.attrs[o]);
  return t;
}, U = {}, H = async (s, t) => {
  const e = s + "|" + t;
  return U[e] || (U[e] = new M(s, t)), U[e];
}, b = {}, _ = async (s, t) => {
  if (s.length === 0)
    throw Error("Length of urls must be > 0");
  if (t.length !== s.length)
    throw Error("Length of metaUrls must be equal to length of urls");
  if (s.length === 1)
    return await H(s[0], t[0]);
  const e = s.join("|") + "|||" + t.join("|");
  if (!b[e]) {
    const o = await Promise.all(s.map((n, r) => H(n, t[r])));
    b[e] = new x(o);
  }
  return b[e];
}, B = (s) => {
  let t = 1;
  for (let e = 0; e < s.length; e++)
    t *= s[e];
  return t;
};
export {
  x as MergedRemoteH5File,
  M as RemoteH5File,
  _ as getMergedRemoteH5File,
  H as getRemoteH5File,
  k as globalRemoteH5FileStats
};
