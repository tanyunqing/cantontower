var databankUid = 0;
var siteYoyiUid = 'cA3Tk0XRrO72umqSt2YJ6';
var siteYoyiUfc = '1471923578';
(function() {
    var g = void 0,
    h = true,
    i = null,
    j = false,
    ba = encodeURIComponent,
    ca = decodeURIComponent,
    l = Math;
    function da(a, b) {
        return a.name = b
    }

    var m = "push",
    ea = "slice",
    fa = "replace",
    ga = "load",
    n = "charAt",
    ha = "value",
    o = "indexOf",
    ia = "match",
    q = "name",
    ja = "host",
    t = "toString",
    u = "length",
    v = "prototype",
    w = "split",
    ka = "stopPropagation",
    la = "scope",
    x = "location",
    y = "getString",
    z = "substring",
    na = "navigator",
    A = "join",
    C = "toLowerCase",
    D;
    function oa(a, b) {
        switch (b) {
        case 0:
            return "" + a;
        case 1:
            return a * 1;
        case 2:
            return !! a;
        case 3:
            return a * 1E3
        }
        return a
    }
    function E(a) {
        return g == a || "-" == a || "" == a
    }
    function pa(a) {
        if (!a || "" == a) return "";
        for (; a && " \n\r\t" [o](a[n](0)) > -1;) a = a[z](1);
        for (; a && " \n\r\t" [o](a[n](a[u] - 1)) > -1;) a = a[z](0, a[u] - 1);
        return a
    }
    function qa(a) {
        var b = 1,
        c = 0,
        d;
        if (!E(a)) {
            b = 0;
            for (d = a[u] - 1; d >= 0; d--) c = a.charCodeAt(d),
            b = (b << 6 & 268435455) + c + (c << 14),
            c = b & 266338304,
            b = c != 0 ? b ^ c >> 21 : b
        }
        return b
    }
    function ra() {
        return l.round(l.random() * 2147483647)
    }
    function sa() {}
    function F(a, b) {
        return ba instanceof Function ? b ? encodeURI(a) : ba(a) : (G(68), escape(a))
    }
    function H(a) {
        a = a[w]("+")[A](" ");
        if (ca instanceof Function) try {
            return ca(a)
        } catch(b) {
            G(17)
        } else G(68);
        return unescape(a)
    }
    var ta = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
    },
    ua = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, !!d) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    function I(a) {
        return a && a[u] > 0 ? a[0] : ""
    }
    function va(a) {
        var b = a ? a[u] : 0;
        return b > 0 ? a[b - 1] : ""
    }

    var wa = function() {
        this.prefix = "ga.";
        this.F = {}
    };
    wa[v].set = function(a, b) {
        this.F[this.prefix + a] = b
    };
    wa[v].get = function(a) {
        return this.F[this.prefix + a]
    };
    wa[v].contains = function(a) {
        return this.get(a) !== g
    };

    function xa(a) {
        a[o]("www.") == 0 && (a = a[z](4));
        return a[C]()
    }
    function ya(a, b) {
        var c, d = {
            url: a,
            protocol: "http",
            host: "",
            path: "",
            c: new wa,
            anchor: ""
        };
        if (!a) return d;
        c = a[o]("://");
        if (c >= 0) d.protocol = a[z](0, c),
        a = a[z](c + 3);
        c = a.search("/|\\?|#");
        if (c >= 0) d.host = a[z](0, c)[C](),
        a = a[z](c);
        else return d.host = a[C](),
        d;
        c = a[o]("#");
        if (c >= 0) d.anchor = a[z](c + 1),
        a = a[z](0, c);
        c = a[o]("?");
        c >= 0 && (za(d.c, a[z](c + 1)), a = a[z](0, c));
        d.anchor && b && za(d.c, d.anchor);
        a && a[n](0) == "/" && (a = a[z](1));
        d.path = a;
        return d
    }
    function za(a, b) {
        function c(b, c) {
            a.contains(b) || a.set(b, []);
            a.get(b)[m](c)
        }
        for (var d = pa(b)[w]("&"), e = 0; e < d[u]; e++) if (d[e]) {
            var f = d[e][o]("=");
            f < 0 ? c(d[e], "1") : c(d[e][z](0, f), d[e][z](f + 1))
        }
    }
    /* *
     * 原有数据对数据进行了调整， 本次对数据修改不过滤。
     * */
    function Aa(a, b) {
        if (E(a)) return "-";
        if ("[" == a[n](0) && "]" == a[n](a[u] - 1)) return "-";
        var c = J.domain;
        c += b && b != "/" ? b: "";
        return a[o](c) == (a[o]("http://") == 0 ? 7 : a[o]("https://") == 0 ? 8 : 0) ? "0": a
    };
    function Ba(a, b, c) {
        l.random() * 100 >= 1 || (a = ["utmt=error", "type=" + a, "utmwv=1.0.0", "utmn=" + ra(), "utmsp=1"], b && a[m]("api=" + b), c && a[m]("msg=" + F(c[z](0, 100))), K.p && a[m]("aip=1"), Ca(a[A]("&")))
    };
    var Da = 0;
    function L(a) {
        return (a ? "_": "") + Da++
    }
    var Ea = L(),
    Fa = L(),
    Ga = L(),
    Ha = L(),
    Ia = L(),
    M = L(),
    N = L(),
    Ja = L(),
    Ka = L(),
    La = L(),
    Ma = L(),
    Na = L(),
    Oa = L(),
    Pa = L(),
    Qa = L(),
    Ra = L(),
    Sa = L(),
    Ta = L(),
    Ua = L(),
    Va = L(),
    Wa = L(),
    Xa = L(),
    Ya = L(),
    Za = L(),
    $a = L(),
    ab = L(),
    bb = L(),
    cb = L(),
    db = L(),
    eb = L(),
    fb = L(),
    gb = L(),
    hb = L(),
    ib = L(),
    jb = L(),
    O = L(h),
    kb = L(),
    lb = L(),
    mb = L(),
    nb = L(),
    ob = L(),
    pb = L(),
    qb = L(),
    rb = L(),
    sb = L(),
    tb = L(),
    P = L(h),
    ub = L(h),
    vb = L(h),
    wb = L(h),
    yb = L(h),
    zb = L(h),
    Ab = L(h),
    Bb = L(h),
    Cb = L(h),
    Db = L(h),
    Eb = L(h),
    Q = L(h),
    Fb = L(h),
    Gb = L(h),
    Hb = L(h),
    Ib = L(h),
    Jb = L(h),
    Kb = L(h),
    Lb = L(h),
    Mb = L(h),
    Nb = L(h),
    Ob = L(h),
    Pb = L(h),
    Qb = L(h),
    Rb = L(h),
    Sb = L(),
    Tb = L();
    L();
    var Ub = L(),
    Vb = L(),
    Wb = L(),
    Xb = L(),
    Yb = L(),
    Zb = L(),
    bc = L(),
    cc = L(),
    dc = L();
    L();
    var ec = L(),
    fc = L();
    var _setUser = L();
    var urlV = L();
    var gc = function() {
        function a(a, c, d) {
            R(S[v], a, c, d)
        }
        T("_getName", Ga, 58);
        T("_getAccount", Ea, 64);
        T("_visitCode", P, 54);
        T("_getClientInfo", Pa, 53, 1);
        T("_getDetectTitle", Sa, 56, 1);
        T("_getDetectFlash", Qa, 65, 1);
        T("_getLocalGifPath", bb, 57);
        T("_getServiceMode", cb, 59);
        T("_getUrlValue",urlV , 111);

        U("_setClientInfo", Pa, 66, 2);
        U("_setAccount", Ea, 3);
        U("_setNamespace", Fa, 48);
        U("_setAllowLinker", Ma, 11, 2);
        U("_setDetectFlash", Qa, 61, 2);
        U("_setDetectTitle", Sa, 62, 2);
        U("_setLocalGifPath", bb, 46, 0);
        U("_setLocalServerMode", cb, 92, g, 0);
        U("_setRemoteServerMode", cb, 63, g, 1);
        U("_setLocalRemoteServerMode", cb, 47, g, 2);
        U("_setSampleRate", ab, 45, 1);
        U("_setCampaignTrack", Ra, 36, 2);
        U("_setAllowAnchor", Na, 7, 2);
        U("_setCampNameKey", Ua, 41);
        U("_setCampContentKey", Za, 38);
        U("_setCampIdKey", Ta, 39);
        U("_setCampMediumKey", Xa, 40);
        U("_setCampNOKey", $a, 42);
        U("_setCampSourceKey", Wa, 43);
        U("_setCampTermKey", Ya, 44);
        U("_setCampCIdKey", Va, 37);
        U("_setCookiePath", N, 9, 0);
        U("_setMaxCustomVariables", db, 0, 1);
        U("_setVisitorCookieTimeout", Ja, 28, 1);
        U("_setSessionCookieTimeout", Ka, 26, 1);
        U("_setCampaignCookieTimeout", La, 29, 1);
        U("_setReferrerOverride", mb, 49);
        U("_setUrlValue",urlV , 110);
        a("_trackPageview", S[v].ka, 1);
        a("_trackEvent", S[v].u, 4);
        a("_trackSocial", S[v].la, 104);
        a("_trackPageLoadTime", S[v].ja, 100);
        a("_trackTrans", S[v].ma, 18);
        a("_sendXEvent", S[v].t, 78);
        a("_createEventTracker", S[v].S, 74);
        a("_getVersion", S[v].X, 60);
        a("_setDomainName", S[v].s, 6);
        a("_setAllowHash", S[v].ba, 8);
        a("_getLinkerUrl", S[v].W, 52);
        a("_link", S[v].link, 101);
        a("_linkByPost", S[v].aa, 102);
        a("_setTrans", S[v].ea, 20);
        a("_addTrans", S[v].L, 21);
        a("_addItem", S[v].J, 19);
        a("_setTransactionDelim", S[v].fa, 82);
        a("_setCustomVar", S[v].ca, 10);
        a("_deleteCustomVar", S[v].U, 35);
        a("_getVisitorCustomVar", S[v].Y, 50);
        a("_setXKey", S[v].ha, 83);
        a("_setXValue", S[v].ia, 84);
        a("_getXKey", S[v].Z, 76);
        a("_getXValue", S[v].$, 77);
        a("_clearXKey", S[v].P, 72);
        a("_clearXValue", S[v].Q, 73);
        a("_createXObj", S[v].T, 75);
        a("_addIgnoredOrganic", S[v].H, 15);
        a("_clearIgnoredOrganic", S[v].M, 97);
        a("_addIgnoredRef", S[v].I, 31);
        a("_clearIgnoredRef", S[v].N, 32);
        a("_addOrganic", S[v].K, 14);
        a("_clearOrganic", S[v].O, 70);
        a("_cookiePathCopy", S[v].R, 30);
        a("_get", S[v].V, 106);
        a("_set", S[v].da, 107);
        a("_addEventListener", S[v].addEventListener, 108);
        a("_removeEventListener", S[v].removeEventListener, 109);

        a("_initData", S[v].l, 2);
        a("_setVar", S[v].ga, 22);
        U("_setSessionTimeout", Ka, 27, 3);
        U("_setCookieTimeout", La, 25, 3);
        U("_setCookiePersistence", Ja, 24, 1);
        a("_setAutoTrackOutbound", sa, 79);
        a("_setTrackOutboundSubdomains", sa, 81);
        a("_setHrefExamineLimit", sa, 80);

    },
    R = function(a, b, c, d) {
        a[b] = function() {
            try {
                return G(d),
                c.apply(this, arguments)
            } catch(a) {
                throw Ba("exc", b, a && a[q]),
                a;
            }
        }
    },
    T = function(a, b, c, d) {
        S[v][a] = function() {
            try {
                return G(c),
                oa(this.a.get(b), d)
            } catch(e) {
                throw Ba("exc", a, e && e[q]),
                e;
            }
        }
    },
    U = function(a, b, c, d, e) {
        S[v][a] = function(f) {
            try {
                G(c),
                e == g ? this.a.set(b, oa(f, d)) : this.a.set(b, e)
            } catch(k) {
                throw Ba("exc", a, k && k[q]),
                k;
            }
        }
    },
    hc = function(a, b) {
        return {
            type: b,
            target: a,
            stopPropagation: function() {
                throw "aborted";
            }
        }
    };
    var ic = function(a, b) {
        return b !== "/" ? j: (a[o]("log.yoyi.") == 0 || a[o](".yoyi.") == 0 || a[o]("yoyi.") == 0) && !(a[o]("yoyi.com.cn") > -1) ? h: j
    },
    jc = function(a) {
        var b = a.get(Ia),
        c = a[y](N, "/");
        ic(b, c) && a[ka]()
    };
    var nc = function() {
        var a = {},
        b = {},
        c = new kc;
        this.g = function(a, b) {
            c.add(a, b)
        };
        var d = new kc;
        this.d = function(a, b) {
            d.add(a, b)
        };
        var e = j,
        f = j,
        k = h;
        this.G = function() {
            e = h
        };
        this.f = function(a) {
            /* 调整顺序，this[ga]在set之后执行 */
            this.set(Sb, a, h);
            this[ga]();
            e = j;
            d.execute(this);
            e = h;
            b = {};
            this.i()
        };
        this.load = function() {
            e && (e = j, this.na(), lc(this), f || (f = h, c.execute(this), mc(this), lc(this)), e = h)
        };
        this.i = function() {
            if (e) if (f) e = j,
            mc(this),
            e = h;
            else this[ga]()
        };
        this.get = function(c) {
            c && c[n](0) == "_" && this[ga]();
            return b[c] !== g ? b[c] : a[c]
        };
        this.set = function(c, d, e) {
            c && c[n](0) == "_" && this[ga]();
            e ? b[c] = d: a[c] = d;
            c && c[n](0) == "_" && this.i()
        };
        this.m = function(b) {
            a[b] = this.b(b, 0) + 1
        };
        this.b = function(a, b) {
            var c = this.get(a);
            return c == g || c === "" ? b: c * 1
        };
        this.getString = function(a, b) {
            var c = this.get(a);
            return c == g ? b: c + ""
        };
        this.na = function() {
            if (k) {
                var b = this[y](Ia, ""),
                c = this[y](N, "/");
                ic(b, c) || (a[M] = a[Oa] && b != "" ? qa(b) : 1, k = j)
            }
        }
    };
    nc[v].stopPropagation = function() {
        throw "aborted";
    };
    function oc(a, b) {
        for (var b = b || [], c = 0; c < b[u]; c++) {
            var d = b[c];
            if ("" + a == d || d[o](a + ".") == 0) return d
        }
        return "-"
    }
    var qc = function(a, b, c) {
        c = c ? "": a[y](M, "1");
        b = b[w](".");
        if (b[u] !== 6 || pc(b[0], c)) return j;
        var c = b[1] * 1,
        d = b[2] * 1,
        e = b[3] * 1,
        f = b[4] * 1,
        b = b[5] * 1;
        if (! (c >= 0 && d > 0 && e > 0 && f > 0 && b >= 0)) return G(110),
        j;
        a.set(P, c);
        a.set(yb, d);
        a.set(zb, e);
        a.set(Ab, f);
        a.set(Bb, b);
        return h
    },
    rc = function(a) {
        var b = a.get(P),
        c = a.get(yb),
        d = a.get(zb),
        e = a.get(Ab),
        f = a.b(Bb, 1);
        b == g ? G(113) : b == NaN && G(114);
        b >= 0 && c > 0 && d > 0 && e > 0 && f >= 0 || G(115);
        return [a.b(M, 1), b != g ? b: "-", c || "-", d || "-", e || "-", f][A](".")
    },
    sc = function(a) {
        return [a.b(M, 1), a.b(Eb, 0), a.b(Q, 1), a.b(Fb, 0)][A](".")
    },
    tc = function(a, b, c) {
        var c = c ? "": a[y](M, "1"),
        d = b[w](".");
        if (d[u] !== 4 || pc(d[0], c)) d = i;
        a.set(Eb, d ? d[1] * 1 : 0);
        a.set(Q, d ? d[2] * 1 : 10);
        a.set(Fb, d ? d[3] * 1 : a.get(Ha));
        return d != i || !pc(b, c)
    },
    uc = function(a, b) {
        var c = F(a[y](vb, "")),
        d = [],
        e = a.get(O);
        if (!b && e) {
            for (var f = 0; f < e[u]; f++) {
                var k = e[f];
                k && k[la] == 1 && d[m](f + "=" + F(k[q]) + "=" + F(k[ha]) + "=1")
            }
            d[u] > 0 && (c += "|" + d[A](","))
        }
        return c ? a.b(M, 1) + "." + c: i
    },
    vc = function(a, b, c) {
        c = c ? "": a[y](M, "1");
        b = b[w](".");
        if (b[u] < 2 || pc(b[0], c)) return j;
        b = b[ea](1)[A](".")[w]("|");
        b[u] > 0 && a.set(vb, H(b[0]));
        if (b[u] <= 1) return h;
        for (var c = b[1][w](b[1][o](",") == -1 ? "^": ","), d = 0; d < c[u]; d++) {
            var e = c[d][w]("=");
            if (e[u] == 4) {
                var f = {};
                da(f, H(e[1]));
                f.value = H(e[2]);
                f.scope = 1;
                a.get(O)[e[0]] = f
            }
        }
        b[1][o]("^") >= 0 && G(125);
        return h
    },
    xc = function(a, b) {
        var c = wc(a, b);
        return c ? [a.b(M, 1), a.b(Gb, 0), a.b(Hb, 1), a.b(Ib, 1), c][A](".") : ""
    },
    wc = function(a) {
        function b(b, e) {
            if (!E(a.get(b))) {
                var f = a[y](b, ""),
                f = f[w](" ")[A]("%20"),
                f = f[w]("+")[A]("%20");
                c[m](e + "=" + f)
            }
        }
        var c = [];
        b(Kb, "utmcid");
        b(Ob, "utmcsr");
        b(Mb, "utmgclid");
        b(Nb, "utmdclid");
        b(Lb, "utmccn");
        b(Pb, "utmcmd");
        b(Qb, "utmctr");
        b(Rb, "utmcct");
        return c[A]("|")
    },
    zc = function(a, b, c) {
        c = c ? "": a[y](M, "1");
        b = b[w](".");
        if (b[u] < 5 || pc(b[0], c)) return a.set(Gb, g),
        a.set(Hb, g),
        a.set(Ib, g),
        a.set(Kb, g),
        a.set(Lb, g),
        a.set(Ob, g),
        a.set(Pb, g),
        a.set(Qb, g),
        a.set(Rb, g),
        a.set(Mb, g),
        a.set(Nb, g),
        j;
        a.set(Gb, b[1] * 1);
        a.set(Hb, b[2] * 1);
        a.set(Ib, b[3] * 1);
        yc(a, b[ea](4)[A]("."));
        return h
    },
    yc = function(a, b) {
        function c(a) {
            return (a = b[ia](a + "=(.*?)(?:\\|utm|$)")) && a[u] == 2 ? a[1] : g
        }
        function d(b, c) {
            c && (c = e ? H(c) : c[w]("%20")[A](" "), a.set(b, c))
        }
        b[o]("=") == -1 && (b = H(b));
        var e = c("utmcvr") == "2";
        d(Kb, c("utmcid"));
        d(Lb, c("utmccn"));
        d(Ob, c("utmcsr"));
        d(Pb, c("utmcmd"));
        d(Qb, c("utmctr"));
        d(Rb, c("utmcct"));
        d(Mb, c("utmgclid"));
        d(Nb, c("utmdclid"))
    },
    pc = function(a, b) {
        return b ? a != b: !/^\d+$/.test(a)
    };
    var kc = function() {
        this.r = []
    };
    kc[v].add = function(a, b) {
        this.r[m]({
            name: a,
            xa: b
        })
    };
    kc[v].execute = function(a) {
        try {
            for (var b = 0; b < this.r[u]; b++) this.r[b].xa.call(V, a)
        } catch(c) {}
    };
    function Ac(a) {
        a.get(ab) != 100 && a.get(P) % 1E4 >= a.get(ab) * 100 && a[ka]()
    }
    function Bc(a) {
        Cc() && a[ka]()
    }
    function Dc(a) {
        J[x].protocol == "file:" && a[ka]()
    }
    function Ec(a) {
        a.get(lb) || a.set(lb, J.title, h);
        a.get(kb) || a.set(kb, J[x].pathname + J[x].search, h)
    };
    var Fc = new
    function() {
        var a = [];
        this.set = function(b) {
            a[b] = h
        };
        this.ya = function() {
            for (var b = [], c = 0; c < a[u]; c++) a[c] && (b[l.floor(c / 6)] ^= 1 << c % 6);
            for (c = 0; c < b[u]; c++) b[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" [n](b[c] || 0);
            return b[A]("") + "~"
        }
    };
    function G(a) {
        Fc.set(a)
    };
    var V = window,
    J = document,
    Cc = function() {
        var a = V._gaUserPrefs;
        return a && a.ioo && a.ioo()
    },
    Gc = function(a, b) {
        setTimeout(a, b)
    },
    /* *
     * 读取cookie信息
     * @param string a cookie名称
     *
     *  */
    W = function(a) {
        for (var b = [], c = J.cookie[w](";"), a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), d = 0; d < c[u]; d++) {
            var e = c[d][ia](a);
            e && b[m](e[1])
        }
        return b
    },

    /* *
     *  用户设置cooke
     * @param string  a  cookie 名
     * @param string b cookie 数值
     * @param string c cooke 作用路径 /
     * @param string d cooke 作用域
     * @param string e cooke 有效时间 秒
      */
    X = function(a, b, c, d, e) {
        var f;
        f = Cc() ? j: ic(d, c) ? j: h;
        if (f) {
            if (b && V[na].userAgent[o]("Firefox") >= 0) {
                b = b[fa](/\n|\r/g, " ");
                f = 0;
                for (var k = b[u]; f < k; ++f) {
                    var p = b.charCodeAt(f) & 255;
                    if (p == 10 || p == 13) b = b[z](0, f) + "?" + b[z](f + 1)
                }
            }
            b && b[u] > 2E3 && (b = b[z](0, 2E3), G(69));
            a = a + "=" + b + "; path=" + c + "; ";
            e && (a += "expires=" + (new Date((new Date).getTime() + e)).toGMTString() + "; ");
            d && (a += "domain=" + d + ";");
            J.cookie = a
        }
    };
    var Hc, Ic, Jc = function() {
        if (!Hc) {
            var a = {},
            b = V[na],
            c = V.screen;
            a.D = c ? c.width + "x" + c.height: "-";
            a.C = c ? c.colorDepth + "-bit": "-";
            a.language = (b && (b.language || b.browserLanguage) || "-")[C]();
            a.javaEnabled = b && b.javaEnabled() ? 1 : 0;
            a.characterSet = J.characterSet || J.charset || "-";
            Hc = a
        }
    },
    Kc = function() {
        Jc();
        for (var a = Hc,
        b = V[na], a = b.appName + b.version + a.language + b.platform + b.userAgent + a.javaEnabled + a.D + a.C + (J.cookie ? J.cookie: "") + (J.referrer ? J.referrer: ""), b = a[u], c = V.history[u]; c > 0;) a += c--^b++;
        return qa(a)
    },
    Lc = function(a) {
        Jc();
        var b = Hc;
        a.set(ob, b.D);
        a.set(pb, b.C);
        a.set(sb, b.language);
        a.set(tb, b.characterSet);
        a.set(qb, b.javaEnabled);
        if (a.get(Pa) && a.get(Qa)) {
            if (! (b = Ic)) {
                var c, d, e;
                d = "ShockwaveFlash";
                if ((b = (b = V[na]) ? b.plugins: g) && b[u] > 0) for (c = 0; c < b[u] && !e; c++) d = b[c],
                d[q][o]("Shockwave Flash") > -1 && (e = d.description[w]("Shockwave Flash ")[1]);
                else {
                    d = d + "." + d;
                    try {
                        c = new ActiveXObject(d + ".7"),
                        e = c.GetVariable("$version")
                    } catch(f) {}
                    if (!e) try {
                        c = new ActiveXObject(d + ".6"),
                        e = "WIN 6,0,21,0",
                        c.AllowScriptAccess = "always",
                        e = c.GetVariable("$version")
                    } catch(k) {}
                    if (!e) try {
                        c = new ActiveXObject(d),
                        e = c.GetVariable("$version")
                    } catch(p) {}
                    e && (e = e[w](" ")[1][w](","), e = e[0] + "." + e[1] + " r" + e[2])
                }
                b = e ? e: "-"
            }
            Ic = b;
            a.set(rb, Ic)
        } else a.set(rb, "-")
    };
    var Y = function() {
        R(Y[v], "push", Y[v][m], 5);
        R(Y[v], "_createAsyncTracker", Y[v].va, 33);
        R(Y[v], "_getAsyncTracker", Y[v].wa, 34);
        this.q = 0
    };
    Y[v].va = function(a, b) {
        return K.k(a, b || "")
    };
    Y[v].wa = function(a) {
        return K.o(a)
    };
    Y[v].push = function(a) {
        this.q > 0 && G(105);
        this.q++;
        for (var b = arguments,
        c = 0,
        d = 0; d < b[u]; d++) try {
            if (typeof b[d] === "function") b[d]();
            else {
                var e = "",
                f = b[d][0],
                k = f.lastIndexOf(".");
                k > 0 && (e = f[z](0, k), f = f[z](k + 1));
                var p = e == "_ydspq" ? K: e == "_ydspq" ? Mc: K.o(e);
                p[f].apply(p, b[d][ea](1))
            }
        } catch(r) {
            c++
        }
        this.q--;
        return c
    };
    var Pc = function() {
        function a(a, b, c, d) {
            g == f[a] && (f[a] = {});
            g == f[a][b] && (f[a][b] = []);
            f[a][b][c] = d
        }
        function b(a, b, c) {
            if (g != f[a] && g != f[a][b]) return f[a][b][c]
        }
        function c(a, b) {
            if (g != f[a] && g != f[a][b]) {
                f[a][b] = g;
                var c = h,
                d;
                for (d = 0; d < k[u]; d++) if (g != f[a][k[d]]) {
                    c = j;
                    break
                }
                c && (f[a] = g)
            }
        }
        function d(a) {
            var b = "",
            c = j,
            d, e;
            for (d = 0; d < k[u]; d++) if (e = a[k[d]], g != e) {
                c && (b += k[d]);
                for (var c = [], f = g, $ = g, $ = 0; $ < e[u]; $++) if (g != e[$]) {
                    f = "";
                    $ != aa && g == e[$ - 1] && (f += $[t]() + ma);
                    for (var Qc = e[$], Rc = "", xb = g, $b = g, ac = g, xb = 0; xb < Qc[u]; xb++) $b = Qc[n](xb),
                    ac = B[$b],
                    Rc += g != ac ? ac: $b;
                    f += Rc;
                    c[m](f)
                }
                b += p + c[A](s) + r;
                c = j
            } else c = h;
            return b
        }
        var e = this,
        f = [],
        k = ["k", "v"],
        p = "(",
        r = ")",
        s = "*",
        ma = "!",
        B = {
            "'": "'0"
        };
        B[r] = "'1";
        B[s] = "'2";
        B[ma] = "'3";
        var aa = 1;
        e.qa = function(a) {
            return g != f[a]
        };
        e.n = function() {
            for (var a = "",
            b = 0; b < f[u]; b++) g != f[b] && (a += b[t]() + d(f[b]));
            return a
        };
        e.pa = function(a) {
            if (a == g) return e.n();
            for (var b = a.n(), c = 0; c < f[u]; c++) g != f[c] && !a.qa(c) && (b += c[t]() + d(f[c]));
            return b
        };
        e.e = function(b, c, d) {
            if (!Nc(d)) return j;
            a(b, "k", c, d);
            return h
        };
        e.j = function(b, c, d) {
            if (!Oc(d)) return j;
            a(b, "v", c, d[t]());
            return h
        };
        e.getKey = function(a, c) {
            return b(a, "k", c)
        };
        e.z = function(a, c) {
            return b(a, "v", c)
        };
        e.v = function(a) {
            c(a, "k")
        };
        e.w = function(a) {
            c(a, "v")
        };
        R(e, "_setKey", e.e, 89);
        R(e, "_setValue", e.j, 90);
        R(e, "_getKey", e.getKey, 87);
        R(e, "_getValue", e.z, 88);
        R(e, "_clearKey", e.v, 85);
        R(e, "_clearValue", e.w, 86)
    };
    function Nc(a) {
        return typeof a == "string"
    }
    function Oc(a) {
        return typeof a != "number" && (g == Number || !(a instanceof Number)) || l.round(a) != a || a == NaN || a == Infinity ? j: h
    };
    var Sc = function(a) {
        var b = V.yGlobal;
        a && !b && (V.yGlobal = b = {});
        return b
    },
    Tc = function() {
        var a = Sc(h).hid;
        if (a == i) a = ra(),
        Sc(h).hid = a;
        return a
    },
    Uc = function(a) {
        a.set(nb, Tc());
        var b = Sc();
        if (b && b.dh == a.get(M)) {
            var c = b.sid;
            c && (c == "0" && G(112), a.set(Ab, c), a.get(ub) && a.set(zb, c));
            b = b.vid;
            a.get(ub) && b && (b = b[w]("."), b[1] * 1 || G(112), a.set(P, b[0] * 1), a.set(yb, b[1] * 1))
        }
    };
    var Vc, Wc = function(a, b, c) {
        var d = a[y](Ia, ""),
        e = a[y](N, "/"),
        a = a.b(Ja, 0);
        X(b, c, e, d, a)
    },
    //cookie 保存cookie
    mc = function(a) {
        //有效域名
        var b = a[y](Ia, "");
        a.b(M, 1);
        //有效路径
        var c = a[y](N, "/");
        //设置初始量
        X("__dsputma", rc(a), c, b, a.get(Ja));
        X("__dsputmb", sc(a), c, b, a.get(Ka));
        X("__dsputmc", "" + a.b(M, 1), c, b);
        var refad = undefined;

        var ptype = "" + (a.get(Sb) || "");
        /*  仅处理标准页面  */
        if(ptype=='page' )
        {
            if(W("__dspuad"))
            {
                var yatuad = String(W("__dspuad")).split("_");
            }
            else
            {
                var yatuad = [0,0,0,0,0,0,0];
            }
            /*  调整访次与pv数据  */
            if(yatuad[4]!=a.b(Bb,1))
            {
                yatuad[4] = a.b(Bb,1)
                yatuad[5]=0;
                yatuad[6]=0;
            }

            /*  新广告进入时  */
            if(/^[0-9]+\,[0-9]+\,[0-9]+\,* */.test(refad))
            {
                var nad = refad.split("\,");
                if(nad[0]!=yatuad[0] )
                {
                    yatuad[0]=nad[0];
                    yatuad[5]=0;
                    yatuad[6]=1;
                }
                yatuad[1]=nad[1];
                yatuad[2]=nad[2];
                yatuad[3]=nad[3];
            }

            yatuad[5]++;
            X("__dspuad",""+yatuad.join("_"),c,b,15552000000);
            var setUidFlag = '1';
            var yoyiDomain = '.yoyi.com.cn';
            //如果获取不到yoyi域下用户uid
            if(setUidFlag==0){
                //获取第一方cookie 
                if(W("YOYI_AMP_UID")!=''){
                    siteYoyiUid = W("YOYI_AMP_UID");
		    siteYoyiUfc = W("YOYI_AMP_UFC");
                } else {//第一方cookie不存在，设置第一方cookie
                    X("YOYI_AMP_UID",""+siteYoyiUid,c,b,62208000000);
                    X("YOYI_AMP_UFC",""+siteYoyiUfc,c,b,62208000000);
                }
                //yoyi域下用户cookie不存在，设置yoyi域下cookie
                X("AMP_UID",""+siteYoyiUid,c,yoyiDomain,62208000000);
                X("AMP_UFC",""+siteYoyiUfc,c,yoyiDomain,62208000000);
            } else {
                //yoyi域下cookie存在，设置yoyi域下的用户cookie到第一方
                if(W("YOYI_AMP_UID")!=siteYoyiUid){//第一方cookie不等于yoyi域下cookie,把第一方cookie修改为或设置为yoyi域下cookie
                    X("YOYI_AMP_UID",""+siteYoyiUid,c,b,62208000000);
                    X("YOYI_AMP_UFC",""+siteYoyiUfc,c,b,62208000000);
                }
            }
        }
        var d = xc(a, h);
        d ? X("__dsputmz", d, c, b, a.get(La)) : X("__dsputmz", "", c, b, -1); (d = uc(a, j)) ? X("__dsputmv", d, c, b, a.get(Ja)) : X("__dsputmv", "", c, b, -1)

    },
    lc = function(a) {
        var b = a.b(M, 1);
        if (!qc(a, oc(b, W("__dsputma")))) return a.set(wb, h),
        j;
        var c = !tc(a, oc(b, W("__dsputmb")));
        a.set(Db, c);
        zc(a, oc(b, W("__dsputmz")));
        vc(a, oc(b, W("__dsputmv")));
        Vc = !c;
        return h
    },
    Xc = function(a) { ! Vc && !(W("__dsputmb")[u] > 0) && (X("__dsputmd", "1", a[y](N, "/"), a[y](Ia, ""), 1E4), W("__dsputmd")[u] == 0 && a[ka]())
    };
    var $c = function(a) {
        a.get(P) == g ? Yc(a) : a.get(wb) && !a.get(ec) ? Yc(a) : a.get(Db) && Zc(a)
    },
    ad = function(a) {
        a.get(Jb) && !a.get(Cb) && (Zc(a), a.set(Hb, a.get(Bb)))
    },
    Yc = function(a) {
        var b = a.get(Ha);
        a.set(ub, h);
        a.set(P, ra() ^ Kc(a) & 2147483647);
        a.set(vb, "");
        a.set(yb, b);
        a.set(zb, b);
        a.set(Ab, b);
        a.set(Bb, 1);
        a.set(Cb, h);
        a.set(Eb, 0);
        a.set(Q, 10);
        a.set(Fb, b);
        a.set(O, []);
        a.set(wb, j);
        a.set(Db, j)
    },
    Zc = function(a) {
        a.set(zb, a.get(Ab));
        a.set(Ab, a.get(Ha));
        a.m(Bb);
        a.set(Cb, h);
        a.set(Eb, 0);
        a.set(Q, 10);
        a.set(Fb, a.get(Ha));
        a.set(Db, j)
    };
    var bd = "daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,google:q,yahoo:p,yahoo:q,msn:q,bing:q,aol:query,aol:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),
    hd = function(a) {
        if (a.get(Ra) && !a.get(ec)) {
            for (var b = !E(a.get(Kb)) || !E(a.get(Ob)) || !E(a.get(Mb)) || !E(a.get(Nb)), c = {},
            d = 0; d < cd[u]; d++) {
                var e = cd[d];
                c[e] = a.get(e)
            }
            d = ya(J[x].href, a.get(Na));
            if (! (va(d.c.get(a.get($a))) == "1" && b) && (!dd(a, d) && !ed(a) && !b && a.get(Cb) && a.get(Cb) && fd(a, g, "(direct)", g, g, "(direct)", "(none)", g, g), a.set(Jb, gd(a, c)), b = a.get(Ob) == "(direct)" && a.get(Lb) == "(direct)" && a.get(Pb) == "(none)", a.get(Jb) || a.get(Cb) && !b)) a.set(Gb, a.get(Ha)),
            a.set(Hb, a.get(Bb)),
            a.m(Ib)
        }
    },
    dd = function(a, b) {
        function c(c, d) {
            var d = d || "-",
            e = va(b.c.get(a.get(c)));
            return e && e != "-" ? H(e) : d
        }
        var d = va(b.c.get(a.get(Ta))) || "-",
        e = va(b.c.get(a.get(Wa))) || "-",
        f = va(b.c.get(a.get(Va))) || "-",
        k = va(b.c.get("dclid")) || "-",
        p = c(Ua, "(not set)"),
        r = c(Xa, "(not set)"),
        s = c(Ya),
        ma = c(Za);
        if (E(d) && E(f) && E(k) && E(e)) return j;
        if (E(s)) {
            var B = Aa(a.get(mb), a.get(N)),
            B = ya(B, h); (B = id(a, B)) && !E(B[1] && !B[2]) && (s = B[1])
        }
        fd(a, d, e, f, k, p, r, s, ma);
        return h
    },
    ed = function(a) {
        var b = Aa(a.get(mb), a.get(N)),
        c = ya(b, h);
        if (! (b != g && b != i && b != "" && b != "0" && b != "-" && b[o]("://") >= 0) || c && c[ja][o]("google") > -1 && c.c.contains("q") && c.path == "cse") return j;
        if ((b = id(a, c)) && !b[2]) return fd(a, g, b[0], g, g, "(organic)", "organic", b[1], g),
        h;
        else if (b) return j;
        if (a.get(Cb)) a: {
            for (var b = a.get(gb), d = xa(c[ja]), e = 0; e < b[u]; ++e) if (d[o](b[e]) > -1) {
                a = j;
                break a
            }
            fd(a, g, d, g, g, "(referral)", "referral", g, "/" + c.path);
            a = h
        } else a = j;
        return a
    },
    id = function(a, b) {
        for (var c = a.get(eb), d = 0; d < c[u]; ++d) {
            var e = c[d][w](":");
            if (b[ja][o](e[0][C]()) > -1) {
                var f = I(b.c.get(e[1]));
                if (f && (!e[3] || b.url[o](e[3]) > -1)) {
                    a: {
                        for (var c = f,
                        d = a.get(fb), c = H(c)[C](), k = 0; k < d[u]; ++k) if (c == d[k]) {
                            c = h;
                            break a
                        }
                        c = j
                    }
                    return [e[2] || e[0], f, c]
                }
            }
        }
        return i
    },
    fd = function(a, b, c, d, e, f, k, p, r) {
        a.set(Kb, b);
        a.set(Ob, c);
        a.set(Mb, d);
        a.set(Nb, e);
        a.set(Lb, f);
        a.set(Pb, k);
        a.set(Qb, p);
        a.set(Rb, r)
    },
    cd = [Lb, Kb, Mb, Nb, Ob, Pb, Qb, Rb],
    gd = function(a, b) {
        function c(a) {
            a = ("" + a)[w]("+")[A]("%20");
            return a = a[w](" ")[A]("%20")
        }
        function d(c) {
            var d = "" + (a.get(c) || ""),
            c = "" + (b[c] || "");
            return d[u] > 0 && d == c
        }
        if (d(Mb) || d(Nb)) return G(131),
        j;
        for (var e = 0; e < cd[u]; e++) {
            var f = cd[e],
            k = b[f] || "-",
            f = a.get(f) || "-";
            if (c(k) != c(f)) return h
        }
        return j
    };
    var kd = function(a) {
        jd(a, J[x].href) ? (a.set(ec, h), G(12)) : a.set(ec, j)
    },
    jd = function(a, b) {
        if (!a.get(Ma)) return j;
        var c = ya(b, a.get(Na)),
        d = I(c.c.get("__dsputma")),
        e = I(c.c.get("__dsputmb")),
        f = I(c.c.get("__dsputmc")),
        k = I(c.c.get("__dsputmx")),
        p = I(c.c.get("__dsputmz")),
        r = I(c.c.get("__dsputmv")),
        c = I(c.c.get("__dsputmk"));
        if (qa("" + d + e + f + k + p + r) != c) {
            d = H(d);
            e = H(e);
            f = H(f);
            k = H(k);
            a: {
                for (var f = d + e + f + k,
                s = 0; s < 3; s++) {
                    for (var ma = 0; ma < 3; ma++) {
                        if (c == qa(f + p + r)) {
                            G(127);
                            c = [p, r];
                            break a
                        }
                        var B = p[fa](/ /g, "%20"),
                        aa = r[fa](/ /g, "%20");
                        if (c == qa(f + B + aa)) {
                            G(128);
                            c = [B, aa];
                            break a
                        }
                        B = B[fa](/\+/g, "%20");
                        aa = aa[fa](/\+/g, "%20");
                        if (c == qa(f + B + aa)) {
                            G(129);
                            c = [B, aa];
                            break a
                        }
                        p = H(p)
                    }
                    r = H(r)
                }
                c = g
            }
            if (!c) return j;
            p = c[0];
            r = c[1]
        }
        if (!qc(a, d, h)) return j;
        tc(a, e, h);
        zc(a, p, h);
        vc(a, r, h);
        ld(a, k, h);
        return h
    },
    nd = function(a, b, c) {
        var d;
        d = rc(a) || "-";
        var e = sc(a) || "-",
        f = "" + a.b(M, 1) || "-",
        k = md(a) || "-",
        p = xc(a, j) || "-",
        a = uc(a, j) || "-",
        r = qa("" + d + e + f + k + p + a),
        s = [];
        s[m]("__dsputma=" + d);
        s[m]("__dsputmb=" + e);
        s[m]("__dsputmc=" + f);
        s[m]("__dsputmx=" + k);
        s[m]("__dsputmz=" + p);
        s[m]("__dsputmv=" + a);
        s[m]("__dsputmk=" + r);
        d = s[A]("&");
        if (!d) return b;
        e = b[o]("#");
        return c ? e < 0 ? b + "#" + d: b + "&" + d: (c = "", f = b[o]("?"), e > 0 && (c = b[z](e), b = b[z](0, e)), f < 0 ? b + "?" + d + c: b + "&" + d + c)
    };
    var od = "|",
    qd = function(a, b, c, d, e, f, k, p, r) {
        var s = pd(a, b);
        s || (s = {},
        a.get(hb)[m](s));
        s.id_ = b;
        s.affiliation_ = c;
        s.total_ = d;
        s.tax_ = e;
        s.shipping_ = f;
        s.city_ = k;
        s.state_ = p;
        s.country_ = r;
        s.items_ = s.items_ || [];
        return s
    },
    rd = function(a, b, c, d, e, f, k) {
        var a = pd(a, b) || qd(a, b, "", 0, 0, 0, "", "", ""),
        p;
        a: {
            if (a && a.items_) {
                p = a.items_;
                for (var r = 0; r < p[u]; r++) if (p[r].sku_ == c) {
                    p = p[r];
                    break a
                }
            }
            p = i
        }
        r = p || {};
        r.transId_ = b;
        r.sku_ = c;
        r.name_ = d;
        r.category_ = e;
        r.price_ = f;
        r.quantity_ = k;
        p || a.items_[m](r);
        return r
    },
    pd = function(a, b) {
        for (var c = a.get(hb), d = 0; d < c[u]; d++) if (c[d].id_ == b) return c[d];
        return i
    };
    var sd, td = function(a) {
        var f;
        var e;
        if (!sd) {
            var b;
            b = J[x].hash;
            var c = V[q],
            d = /^#?gaso=([^&]*)/;
            if (f = (e = (b = b && b[ia](d) || c && c[ia](d)) ? b[1] : I(W("GASO")), b = e) && b[ia](/^(?:\|([-0-9a-z.]{1,40})\|)?([-.\w]{10,1200})$/i), c = f) if (Wc(a, "GASO", "" + b), K._gasoDomain = a.get(Ia), K._gasoCPath = a.get(N), b = "https://" + ((c[1] || "www") + ".google.com") + "/analytics/reporting/overlay_js?gaso=" + c[2] + "&" + ra()) a = J.createElement("script"),
            a.type = "text/javascript",
            a.async = h,
            a.src = b,
            a.id = "_gasojs",
            a.onload = g,
            b = J.getElementsByTagName("script")[0],
            b.parentNode.insertBefore(a, b);
            sd = h
        }
    };
    var ld = function(a, b, c) {
        c && (b = H(b));
        c = a.b(M, 1);
        b = b[w]("."); ! (b[u] < 2) && /^\d+$/.test(b[0]) && (b[0] = "" + c, Wc(a, "__dsputmx", b[A](".")))
    },
    md = function(a, b) {
        var c = oc(a.get(M), W("__dsputmx"));
        c == "-" && (c = "");
        return b ? F(c) : c
    };
    var xd = function(a, b) {
        if (a.b(P, 0) % 100 >= a.b(dc, 0)) return j;
        var c = ud();
        c == g && (c = vd());
        if (c == g || c == Infinity || isNaN(c)) return j;
        c > 0 ? b(wd(c)) : ta(V, "load",
        function() {
            xd(a, b)
        },
        j);
        return h
    },
    wd = function(a) {
        var b = new Pc,
        c = l.min(l.floor(a / 100), 5E3);
        b.e(14, 1, c > 0 ? c + "00": "0");
        b.j(14, 1, a);
        return b
    },
    ud = function() {
        var a = V.performance || V.webkitPerformance;
        return (a = a && a.timing) && a.loadEventStart - a.fetchStart
    },
    vd = function() {
        if (V.top == V) {
            var a = V.external,
            b = a && a.onloadT;
            a && !a.isValidLoadTime && (b = g);
            b > 2147483648 && (b = g);
            b > 0 && a.setPageReadyTime();
            return b
        }
    };
    var S = function(a, b, c) {
        function d(a) {
            return function(b) {
                if ((b = b.get(fc)[a]) && b[u]) for (var c = hc(e, a), d = 0; d < b[u]; d++) b[d].call(e, c)
            }
        }

        var e = this;
        this.a = new nc;
        this.get = function(a) {
            return this.a.get(a)
        };
        this.set = function(a, b, c) {
            this.a.set(a, b, c)
        };
        this.set(Ea, b || "UY-XXXXX-X");
        this.set(Ga, a || "");
        this.set(Fa, c || "");
        this.set(Ha, l.round((new Date).getTime() / 1E3));
        this.set(N, "/");
        this.set(Ja, 63072E6);
        this.set(La, 15768E6);
        this.set(Ka, 18E5);
        this.set(Ma, j);
        this.set(db, 50);
        this.set(Na, j);
        this.set(Oa, h);
        this.set(Pa, h);
        this.set(Qa, h);
        this.set(Ra, h);
        this.set(Sa, h);
        this.set(Ua, "utm_campaign");
        this.set(Ta, "utm_id");
        this.set(Va, "gclid");
        this.set(Wa, "utm_source");
        this.set(Xa, "utm_medium");
        this.set(Ya, "utm_term");
        this.set(Za, "utm_content");
        this.set($a, "utm_nooverride");
        this.set(ab, 100);
        this.set(dc, 10);
        this.set(bb, "/__utm.gif");
        this.set(cb, 1);
        this.set(hb, []);
        this.set(O, []);
        this.set(eb, bd);
        this.set(fb, []);
        this.set(gb, []);
        this.s("auto");
        this.set(mb, J.referrer);
        this.set(fc, {
            hit: [],
            load: []
        });
        this.a.g("0", kd);
        this.a.g("1", $c);
        this.a.g("2", hd);
        this.a.g("3", ad);
        this.a.g("4", d("load"));
        this.a.g("5", td);
        this.a.d("A", Bc);
        this.a.d("B", Dc);
        this.a.d("C", $c);
        this.a.d("D", Ac);
        this.a.d("E", jc);
        this.a.d("F", yd);
        this.a.d("G", Xc);
        this.a.d("H", Ec);
        this.a.d("I", Lc);
        this.a.d("J", Uc);
        this.a.d("K", d("hit"));
        this.a.d("L", zd);
        this.a.d("M", Ad);
        this.get(Ha) === 0 && G(111);
        this.a.G()
    };
    D = S[v];
    D.h = function() {
        var a = this.get(ib);
        a || (a = new Pc, this.set(ib, a));
        return a
    };
    D.oa = function(a) {
        for (var b in a) {
            var c = a[b];
            a.hasOwnProperty(b) && typeof c != "function" && this.set(b, c, h)
        }
    };
    D.ka = function(a) {
        a && a != g && (a.constructor + "")[o]("String") > -1 ? (G(13), this.set(kb, a, h)) : typeof a === "object" && a !== i && this.oa(a);
        this.a.f("page");
    };
    D.u = function(a, b, c, d, e) {
        if (a == "" || !Nc(a) || b == "" || !Nc(b)) return j;
        if (c != g && !Nc(c)) return j;
        if (d != g && !Oc(d)) return j;
        this.set(Vb, a, h);
        this.set(Wb, b, h);
        this.set(Xb, c, h);
        this.set(Yb, d, h);
        this.set(Ub, !!e, h);
        this.a.f("event");
        return h
    };
    D.la = function(a, b, c, d) {
        if (!a || !b) return j;
        this.set(Zb, a, h);
        this.set(bc, b, h);
        this.set(cc, c || J[x].href, h);
        d && this.set(kb, d, h);
        this.a.f("social");
        return h
    };
    D.ja = function() {
        var a = this;
        return xd(this.a,
        function(b) {
            a.t(b)
        })
    };
    D.ma = function() {
        this.a.f("trans")
    };
    D.t = function(a) {
        this.set(jb, a, h);
        this.a.f("event")
    };
    D.S = function(a) {
        this.l();
        var b = this;
        return {
            _trackEvent: function(c, d, e) {
                G(91);
                b.u(a, c, d, e)
            }
        }
    };
    D.V = function(a) {
        return this.get(a)
    };
    D.da = function(a, b) {
        if (a) if (a != g && (a.constructor + "")[o]("String") > -1) this.set(a, b);
        else if (typeof a == "object") for (var c in a) a.hasOwnProperty(c) && this.set(c, a[c])
    };
    D.addEventListener = function(a, b) {
        var c = this.get(fc)[a];
        c && c[m](b)
    };
    D.removeEventListener = function(a, b) {
        for (var c = this.get(fc)[a], d = 0; c && d < c[u]; d++) if (c[d] == b) {
            c.splice(d, 1);
            break
        }
    };
    D.X = function() {
        return "1.0.0"
    };
    D.s = function(a) {
        this.get(Oa);
        a = a == "auto" ? xa(J.domain) : !a || a == "-" || a == "none" ? "": a[C]();
        this.set(Ia, a)
    };
    D.ba = function(a) {
        this.set(Oa, !!a)
    };
    D.W = function(a, b) {
        return nd(this.a, a, b)
    };
    D.link = function(a, b) {
        if (this.a.get(Ma) && a) {
            var c = nd(this.a, a, b);
            J[x].href = c
        }
    };
    D.aa = function(a, b) {
        this.a.get(Ma) && a && a.action && (a.action = nd(this.a, a.action, b))
    };
    D.ea = function() {
        this.l();
        var a = this.a,
        b = J.getElementById ? J.getElementById("utmtrans") : J.utmform && J.utmform.utmtrans ? J.utmform.utmtrans: i;
        if (b && b[ha]) {
            a.set(hb, []);
            for (var b = b[ha][w]("UTM:"), c = 0; c < b[u]; c++) {
                b[c] = pa(b[c]);
                for (var d = b[c][w](od), e = 0; e < d[u]; e++) d[e] = pa(d[e]);
                "T" == d[0] ? qd(a, d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]) : "I" == d[0] && rd(a, d[1], d[2], d[3], d[4], d[5], d[6])
            }
        }
    };
    D.L = function(a, b, c, d, e, f, k, p) {
        return qd(this.a, a, b, c, d, e, f, k, p)
    };
    D.J = function(a, b, c, d, e, f) {
        return rd(this.a, a, b, c, d, e, f)
    };
    D.fa = function(a) {
        od = a || "|"
    };
    D.ca = function(a, b, c, d) {
        var e = this.a;
        if (a <= 0 || a > e.get(db)) a = j;
        else if (!b || !c || F(b)[u] + F(c)[u] > 64) a = j;
        else {
            d != 1 && d != 2 && (d = 3);
            var f = {};
            da(f, b);
            f.value = c;
            f.scope = d;
            e.get(O)[a] = f;
            a = h
        }
        a && this.a.i();
        return a
    };
    D.U = function(a) {
        this.a.get(O)[a] = g;
        this.a.i()
    };
    D.Y = function(a) {
        return (a = this.a.get(O)[a]) && a[la] == 1 ? a[ha] : g
    };
    D.ha = function(a, b, c) {
        this.h().e(a, b, c)
    };
    D.ia = function(a, b, c) {
        this.h().j(a, b, c)
    };
    D.Z = function(a, b) {
        return this.h().getKey(a, b)
    };
    D.$ = function(a, b) {
        return this.h().z(a, b)
    };
    D.P = function(a) {
        this.h().v(a)
    };
    D.Q = function(a) {
        this.h().w(a)
    };
    D.T = function() {
        return new Pc
    };
    D.H = function(a) {
        a && this.get(fb)[m](a[C]())
    };
    D.M = function() {
        this.set(fb, [])
    };
    D.I = function(a) {
        a && this.get(gb)[m](a[C]())
    };
    D.N = function() {
        this.set(gb, [])
    };
    D.K = function(a, b, c, d, e) {
        if (a && b) {
            a = [a, b[C]()][A](":");
            if (d || e) a = [a, d, e][A](":");
            d = this.get(eb);
            d.splice(c ? 0 : d[u], 0, a)
        }
    };
    D.O = function() {
        this.set(eb, [])
    };
    D.R = function(a) {
        this.a[ga]();
        var b = this.get(N),
        c = md(this.a);
        this.set(N, a);
        this.a.i();
        ld(this.a, c);
        this.set(N, b)
    };
    D.l = function() {
        this.a[ga]()
    };
    D.ga = function(a) {
        a && a != "" && (this.set(vb, a), this.a.f("var"))
    };
    var yd = function(a) {
        a.get(Sb) !== "trans" && a.b(Eb, 0) >= 500 && a[ka]();
        if (a.get(Sb) === "event") {
            var b = (new Date).getTime(),
            c = a.b(Fb, 0),
            d = a.b(Ab, 0),
            c = l.floor(0.2 * ((b - (c != d ? c: c * 1E3)) / 1E3));
            c > 0 && (a.set(Fb, b), a.set(Q, l.min(10, a.b(Q, 0) + c)));
            a.b(Q, 0) <= 0 && a[ka]()
        }
    },
    Ad = function(a) {
        a.get(Sb) === "event" && a.set(Q, l.max(0, a.b(Q, 10) - 1))
    };
    var Bd = function() {
        var a = [];
        this.add = function(b, c, d) {
            d && (c = F("" + c));
            a[m](b + "=" + c)
        };
        this.toString = function() {
            return a[A]("&")
        }
    },
    Cd = function(a, b) { (b || a.get(cb) != 2) && a.m(Eb)
    },
    Dd = function(a, b) {
        b.add("utmwv", "1.0.0");
        b.add("utms", a.get(Eb));
        b.add("utmn", ra());
        var c = J[x].hostname;
        E(c) || b.add("utmhn", c, h);
        c = a.get(ab);
        c != 100 && b.add("utmsp", c, h)
    },
    Fd = function(a, b) {
        b.add("utmac", a.get(Ea));
        databankUid = a.get(Ea);
        a.get(Ub) && b.add("utmni", 1);
        Ed(a, b);
        K.p && b.add("aip", 1);
        b.add("utmu", Fc.ya())
    },
    Ed = function(a, b) {
        function c(a, b) {
            b && d[m](a + "=" + b + ";")
        }
        var d = [];
        c("__dsputma", rc(a));
        c("__dsputmz", xc(a, j));
        c("__dsputmv", uc(a, h));
        c("__dsputmx", md(a));
        b.add("utmcc", d[A]("+"), h)
    },
    /* *
     * 可以修改这里追加URL数据
     * @param Object a  存储对象 S , 可以通过S.get(变量)货物数据
     * @param Object b  生成的目标URL所需的容器 ， b.add() 可以向url添加传参
      */
    Gd = function(a, b) {
        if(W("__dspuad")!=''){
            b.add("yuad",W("__dspuad"));
        }
        /* 增加url价值处理 */
        var truckType = "" + (a.get(Sb) || "");
        var urlValue = "" + (a.get(urlV) || "");
        if(truckType=='page' && urlValue!='')
        {
            b.add("urlv",urlValue);
        }
        try{
            if(typeof(J.referrer)=='string' )
            {
                b.add("yumr",F(J.referrer));
            }
        }catch(e)
        {

        }
        b.add('yuht',F(document.location.protocol));
        a.get(Pa) && (b.add("utmcs", a.get(tb), h), b.add("utmsr", a.get(ob)), b.add("utmsc", a.get(pb)), b.add("utmul", a.get(sb)), b.add("utmje", a.get(qb)), b.add("utmfl", a.get(rb), h))
    },
    Hd = function(a, b) {
        a.get(Sa) && a.get(lb) && b.add("utmdt", a.get(lb), h);
        b.add("utmhid", a.get(nb));
        b.add("utmr", Aa(a.get(mb), a.get(N)), h);
        b.add("utmp", F(a.get(kb), h), h)
    },
    Id = function(a, b) {
        for (var c = a.get(ib), d = a.get(jb), e = a.get(O) || [], f = 0; f < e[u]; f++) {
            var k = e[f];
            k && (c || (c = new Pc), c.e(8, f, k[q]), c.e(9, f, k[ha]), k[la] != 3 && c.e(11, f, "" + k[la]))
        } ! E(a.get(Vb)) && !E(a.get(Wb)) && (c || (c = new Pc), c.e(5, 1, a.get(Vb)), c.e(5, 2, a.get(Wb)), e = a.get(Xb), e != g && c.e(5, 3, e), e = a.get(Yb), e != g && c.j(5, 1, e));
        c ? b.add("utme", c.pa(d), h) : d && b.add("utme", d.n(), h)
    },
    /* 商品订单数据处理 */
    Jd = function(a, b, c) {
        var d = new Bd;
        Cd(a, c);
        Dd(a, d);
        if(W("__dspuad")!=''){
            d.add("yuad",W("__dspuad"));
        }
        d.add("utmt", "tran");
        d.add("utmtid", b.id_, h);
        d.add("utmtst", b.affiliation_, h);
        d.add("utmtto", b.total_, h);
        d.add("utmttx", b.tax_, h);
        d.add("utmtsp", b.shipping_, h);
        d.add("utmtci", b.city_, h);
        d.add("utmtrg", b.state_, h);
        d.add("utmtco", b.country_, h); ! c && Fd(a, d);
        return d[t]()
    },
    /** 订单物品 **/
    Kd = function(a, b, c) {
        var d = new Bd;
        Cd(a, c);
        Dd(a, d);
        d.add("utmt", "item");
        if(W("__dspuad")!=''){
            d.add("yuad",W("__dspuad"));
        }
        d.add("utmtid", b.transId_, h);
        d.add("utmipc", b.sku_, h);
        d.add("utmipn", b.name_, h);
        d.add("utmiva", b.category_, h);
        d.add("utmipr", b.price_, h);
        d.add("utmiqt", b.quantity_, h); ! c && Fd(a, d);
        return d[t]()
    },
    Ld = function(a, b) {
        var c = a.get(Sb);
        if (c == "page") c = new Bd,
        Cd(a, b),
        Dd(a, c),
        Id(a, c),
        Gd(a, c),
        Hd(a, c),
        b || Fd(a, c),
        c = [c[t]()];
        else if (c == "event") c = new Bd,
        Cd(a, b),
        Dd(a, c),
        c.add("utmt", "event"),
        Id(a, c),
        Gd(a, c),
        Hd(a, c),
        !b && Fd(a, c),
        c = [c[t]()];
        else if (c == "var") c = new Bd,
        Cd(a, b),
        Dd(a, c),
        c.add("utmt", "var"),
        !b && Fd(a, c),
        c = [c[t]()];
        else if (c == "trans") for (var c = [], d = a.get(hb), e = 0; e < d[u]; ++e) {
            c[m](Jd(a, d[e], b));
            for (var f = d[e].items_, k = 0; k < f[u]; ++k) c[m](Kd(a, f[k], b))
        } else c == "social" ? b ? c = [] : (c = new Bd, Cd(a, b), Dd(a, c), c.add("utmt", "social"), c.add("utmsn", a.get(Zb), h), c.add("utmsa", a.get(bc), h), c.add("utmsid", a.get(cc), h), Id(a, c), Gd(a, c), Hd(a, c), Fd(a, c), c = [c[t]()]) : c = [];

        return c
    },
    zd = function(a) {
        var b, c = a.get(Tb),
        d = a.get(cb);
        if (d == 0 || d == 2) {
            var e = a.get(bb) + "?";
            b = Ld(a, h);
            for (var f = 0,
            k = b[u]; f < k; f++) Ca(b[f], d != 2 && f == k - 1 && c, e, h)
        }
        if (d == 1 || d == 2) {
            b = Ld(a);
            f = 0;
            for (k = b[u]; f < k; f++) try {
                Ca(b[f], f == k - 1 && c)
            } catch(p) {
                p && Ba(p[q], g, p.message)
            }
        }
    };

    var Md = "https:" == J[x].protocol ? "https://databank.air.yoyi.com.cn": "http://databank.air.yoyi.com.cn",
    Nd = function(a) {
        da(this, "len");
        this.message = a + "-8192"
    },
    Od = function(a) {
        da(this, "ff2post");
        this.message = a + "-2036"
    },
    Ca = function(a, b, c, d) {
        b = b || sa;
        Pd(a, b, c);
        /* 这里有判断是执行pd js直接抛出，还是QD/Rd */
        /*if (d || a[u] <= 2036) Pd(a, b, c);
        else if (a[u] <= 8192) {
            if (V[na].userAgent[o]("Firefox") >= 0 && ![].reduce) throw new Od(a[u]);
            Qd(a, b) || Rd(a, b)
        } else throw new Nd(a[u]);*/
    },
    /*  正常传输  */
    Pd = function(a, b, c) {
        var c = c || Md + "/__utm.gif?ampuid="+siteYoyiUid+"&"+"ampufc="+siteYoyiUfc+"&",
        d = new Image(1, 1);
        d.src = c + a;
        d.onload = function() {
            d.onload = i;
            b()
        }
    },
    Qd = function(a, b) {
        var c, d = Md + "/__utm.gif?ampuid="+siteYoyiUid+"&"+"ampufc="+siteYoyiUfc,
        e = V.XDomainRequest;
        if (e) c = new e,
        c.open("POST", d);
        else if (e = V.XMLHttpRequest) e = new e,
        "withCredentials" in e && (c = e, c.open("POST", d, h), c.setRequestHeader("Content-Type", "text/plain"));
        if (c) return c.onreadystatechange = function() {
            c.readyState == 4 && (b(), c = i)
        },
        c.send(a),
        h
    },
    /* iframe */
    Rd = function(a, b) {
        if (J.body) {
            a = ba(a);
            try {
                var c = J.createElement('<iframe name="' + a + '"></iframe>')
            } catch(d) {
                c = J.createElement("iframe"),
                da(c, a)
            }
            c.height = "0";
            c.width = "0";
            c.style.display = "none";
            c.style.visibility = "hidden";
            var e = J[x],
            e = Md + "/u/post_iframe.html#" + ba(e.protocol + "//" + e[ja] + "/favicon.ico"),
            f = function() {
                c.src = "";
                c.parentNode && c.parentNode.removeChild(c)
            };
            ta(V, "beforeunload", f);
            var k = j,
            p = 0,
            r = function() {
                if (!k) {
                    try {
                        if (p > 9 || c.contentWindow[x][ja] == J[x][ja]) {
                            k = h;
                            f();
                            ua(V, "beforeunload", f);
                            b();
                            return
                        }
                    } catch(a) {}
                    p++;
                    setTimeout(r, 200)
                }
            };
            ta(c, "load", r);
            J.body.appendChild(c);
            c.src = e
        } else Gc(function() {
            Rd(a, b)
        },
        100)
    };

    var Z = function() {
        this.p = j;
        this.A = {};
        this.B = [];
        this.ra = 0;
        this._gasoCPath = this._gasoDomain = g;
        R(Z[v], "_createTracker", Z[v].k, 55);
        R(Z[v], "_getTracker", Z[v].ta, 0);
        R(Z[v], "_getTrackerByName", Z[v].o, 51);
        R(Z[v], "_getTrackers", Z[v].ua, 130);
        R(Z[v], "_anonymizeIp", Z[v].sa, 16);
        gc()
    };
    D = Z[v];
    D.ta = function(a, b) {
        return this.k(a, g, b)
    };
    D.k = function(a, b, c) {
        b && G(23);
        c && G(67);
        b == g && (b = "~" + K.ra++);
        a = new S(b, a, c);
        K.A[b] = a;
        K.B[m](a);
        return a
    };
    D.o = function(a) {
        a = a || "";
        return K.A[a] || K.k(g, a)
    };
    D.ua = function() {
        return K.B[ea](0)
    };
    D.sa = function() {
        this.p = h
    };
    var Sd = function(a) {
        if (J.webkitVisibilityState == "prerender") return j;
        a();
        return h
    };
    var K = new Z;
    var Td = V._ygat;
    Td && typeof Td._getTracker == "function" ? K = Td: V._ygat = K;
    var Mc = new Y; (function(a) {
        if (!Sd(a)) {
            G(123);
            var b = j,
            c = function() { ! b && Sd(a) && (G(124), b = h, ua(J, "webkitvisibilitychange", c))
            };
            ta(J, "webkitvisibilitychange", c)
        }
    })(function() {
        var a = V._ydspq,
        b = j;
           /* a && typeof a['push'] == function && */
        if (a && typeof a[m] == "function" && (b = Object[v][t].call(Object(a)) == "[object Array]", !b)) {
            Mc = a;
            return
        }
        V._ydspq = Mc;
        b && Mc[m].apply(Mc, a)
    });
    setTimeout('match()',100);
})();
function match(){
    var noCookieMatching = [];/*不做cookiematching的客户ID*/
    var matchingFlag = true;
    if(noCookieMatching.length != 0 && containsYoyiDatabank(noCookieMatching, databankUid)==true){
        matchingFlag = false;
    }
    if(document.location.protocol == 'https:'){
        matchingFlag = false;
    }
    if(matchingFlag==true){
                var yda_matching_other   = document.createElement('script');
                    yda_matching_other.type  = 'text/javascript';
                    yda_matching_other.async = true;
                    yda_matching_other.src   = 'http://d.yoyi.tv/dsp/others-databank.js';

                var s_other = document.getElementsByTagName('script')[0];
                s_other.parentNode.insertBefore(yda_matching_other, s_other);
    }
}
function containsYoyiDatabank(a, obj) {
    for (var i = 0; i < a.length; i++) {
         if (a[i] === obj) {
             return true;
          }
     }

     return false;
}
