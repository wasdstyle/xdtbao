/*!
 * zeroclipboard
 * The Zero Clipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie, and a JavaScript interface.
 * Copyright 2012 Jon Rohan, James M. Greene, .
 * Released under the MIT license
 * http://jonrohan.github.com/ZeroClipboard/
 * v1.1.7
 */
(function() {
    "use strict";
    var a = function(a, b) {
        var c = a.style[b];
        a.currentStyle ? c = a.currentStyle[b] : window.getComputedStyle && (c = document.defaultView.getComputedStyle(a, null).getPropertyValue(b));
        if (c == "auto" && b == "cursor") {
            var d = ["a"];
            for (var e = 0; e < d.length; e++) if (a.tagName.toLowerCase() == d[e]) return "pointer"
        }
        return c
    },
    b = function(a) {
        if (!l.prototype._singleton) return;
        a || (a = window.event);
        var b;
        this !== window ? b = this: a.target ? b = a.target: a.srcElement && (b = a.srcElement),
        l.prototype._singleton.setCurrent(b)
    },
    c = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    },
    d = function(a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
    },
    e = function(a, b) {
        if (a.addClass) return a.addClass(b),
        a;
        if (b && typeof b == "string") {
            var c = (b || "").split(/\s+/);
            if (a.nodeType === 1) if (!a.className) a.className = b;
            else {
                var d = " " + a.className + " ",
                e = a.className;
                for (var f = 0,
                g = c.length; f < g; f++) d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                a.className = e.replace(/^\s+|\s+$/g, "")
            }
        }
        return a
    },
    f = function(a, b) {
        if (a.removeClass) return a.removeClass(b),
        a;
        if (b && typeof b == "string" || b === undefined) {
            var c = (b || "").split(/\s+/);
            if (a.nodeType === 1 && a.className) if (b) {
                var d = (" " + a.className + " ").replace(/[\n\t]/g, " ");
                for (var e = 0,
                f = c.length; e < f; e++) d = d.replace(" " + c[e] + " ", " ");
                a.className = d.replace(/^\s+|\s+$/g, "")
            } else a.className = ""
        }
        return a
    },
    g = function(b) {
        var c = {
            left: 0,
            top: 0,
            width: b.width || b.offsetWidth || 0,
            height: b.height || b.offsetHeight || 0,
            zIndex: 9999
        },
        d = a(b, "zIndex");
        d && d != "auto" && (c.zIndex = parseInt(d, 10));
        while (b) {
            var e = parseInt(a(b, "borderLeftWidth"), 10),
            f = parseInt(a(b, "borderTopWidth"), 10);
            c.left += isNaN(b.offsetLeft) ? 0 : b.offsetLeft,
            c.left += isNaN(e) ? 0 : e,
            c.top += isNaN(b.offsetTop) ? 0 : b.offsetTop,
            c.top += isNaN(f) ? 0 : f,
            b = b.offsetParent
        }
        return c
    },
    h = function(a) {
        var b = l.prototype._singleton;
        return b.options.useNoCache ? (a.indexOf("?") >= 0 ? "&nocache=": "?nocache=") + (new Date).getTime() : ""
    },
    i = function(a) {
        var b = [];
        return a.trustedDomains && (typeof a.trustedDomains == "string" ? b.push("trustedDomain=" + a.trustedDomains) : b.push("trustedDomain=" + a.trustedDomains.join(","))),
        b.join("&")
    },
    j = function(a, b) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0,
        d = b.length; c < d; c++) if (b[c] === a) return c;
        return - 1
    },
    k = function(a) {
        if (typeof a == "string") throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return a.length ? a: [a]
    },
    l = function(a, b) {
        a && (l.prototype._singleton || this).glue(a);
        if (l.prototype._singleton) return l.prototype._singleton;
        l.prototype._singleton = this,
        this.options = {};
        for (var c in o) this.options[c] = o[c];
        for (var d in b) this.options[d] = b[d];
        this.handlers = {},
        l.detectFlashSupport() && p()
    },
    m,
    n = [];
    l.prototype.setCurrent = function(b) {
        m = b,
        this.reposition(),
        b.getAttribute("title") && this.setTitle(b.getAttribute("title")),
        this.setHandCursor(a(b, "cursor") == "pointer")
    },
    l.prototype.setText = function(a) {
        a && a !== "" && (this.options.text = a, this.ready() && this.flashBridge.setText(a))
    },
    l.prototype.setTitle = function(a) {
        a && a !== "" && this.htmlBridge.setAttribute("title", a)
    },
    l.prototype.setSize = function(a, b) {
        this.ready() && this.flashBridge.setSize(a, b)
    },
    l.prototype.setHandCursor = function(a) {
        this.ready() && this.flashBridge.setHandCursor(a)
    },
    l.version = "1.1.7";
    var o = {
        moviePath: "ZeroClipboard.swf",
        trustedDomains: null,
        text: null,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        allowScriptAccess: "sameDomain",
        useNoCache: !0
    };
    l.setDefaults = function(a) {
        for (var b in a) o[b] = a[b]
    },
    l.destroy = function() {
        l.prototype._singleton.unglue(n);
        var a = l.prototype._singleton.htmlBridge;
        a.parentNode.removeChild(a),
        delete l.prototype._singleton
    },
    l.detectFlashSupport = function() {
        var a = !1;
        if (typeof ActiveXObject == "function") try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = !0)
        } catch(b) {}
        return ! a && navigator.mimeTypes["application/x-shockwave-flash"] && (a = !0),
        a
    };
    var p = function() {
        var a = l.prototype._singleton,
        b = document.getElementById("global-zeroclipboard-html-bridge");
        if (!b) {
            var c = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + a.options.moviePath + h(a.options.moviePath) + '"/>         <param name="allowScriptAccess" value="' + a.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + i(a.options) + '"/>         <embed src="' + a.options.moviePath + h(a.options.moviePath) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + i(a.options) + '"           scale="exactfit">         </embed>       </object>';
            b = document.createElement("div"),
            b.id = "global-zeroclipboard-html-bridge",
            b.setAttribute("class", "global-zeroclipboard-container"),
            b.setAttribute("data-clipboard-ready", !1),
            b.style.position = "absolute",
            b.style.left = "-9999px",
            b.style.top = "-9999px",
            b.style.width = "15px",
            b.style.height = "15px",
            b.style.zIndex = "9999",
            b.innerHTML = c,
            document.body.appendChild(b)
        }
        a.htmlBridge = b,
        a.flashBridge = document["global-zeroclipboard-flash-bridge"] || b.children[0].lastElementChild
    };
    l.prototype.resetBridge = function() {
        this.htmlBridge.style.left = "-9999px",
        this.htmlBridge.style.top = "-9999px",
        this.htmlBridge.removeAttribute("title"),
        this.htmlBridge.removeAttribute("data-clipboard-text"),
        f(m, this.options.activeClass),
        m = null,
        this.options.text = null
    },
    l.prototype.ready = function() {
        var a = this.htmlBridge.getAttribute("data-clipboard-ready");
        return a === "true" || a === !0
    },
    l.prototype.reposition = function() {
        if (!m) return ! 1;
        var a = g(m);
        this.htmlBridge.style.top = a.top + "px",
        this.htmlBridge.style.left = a.left + "px",
        this.htmlBridge.style.width = a.width + "px",
        this.htmlBridge.style.height = a.height + "px",
        this.htmlBridge.style.zIndex = a.zIndex + 1,
        this.setSize(a.width, a.height)
    },
    l.dispatch = function(a, b) {
        l.prototype._singleton.receiveEvent(a, b)
    },
    l.prototype.on = function(a, b) {
        var c = a.toString().split(/\s/g);
        for (var d = 0; d < c.length; d++) a = c[d].toLowerCase().replace(/^on/, ""),
        this.handlers[a] || (this.handlers[a] = b);
        this.handlers.noflash && !l.detectFlashSupport() && this.receiveEvent("onNoFlash", null)
    },
    l.prototype.addEventListener = l.prototype.on,
    l.prototype.off = function(a, b) {
        var c = a.toString().split(/\s/g);
        for (var d = 0; d < c.length; d++) {
            a = c[d].toLowerCase().replace(/^on/, "");
            for (var e in this.handlers) e === a && this.handlers[e] === b && delete this.handlers[e]
        }
    },
    l.prototype.removeEventListener = l.prototype.off,
    l.prototype.receiveEvent = function(a, b) {
        a = a.toString().toLowerCase().replace(/^on/, "");
        var c = m;
        switch (a) {
        case "load":
            if (b && parseFloat(b.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10) {
                this.receiveEvent("onWrongFlash", {
                    flashVersion: b.flashVersion
                });
                return
            }
            this.htmlBridge.setAttribute("data-clipboard-ready", !0);
            break;
        case "mouseover":
            e(c, this.options.hoverClass);
            break;
        case "mouseout":
            f(c, this.options.hoverClass),
            this.resetBridge();
            break;
        case "mousedown":
            e(c, this.options.activeClass);
            break;
        case "mouseup":
            f(c, this.options.activeClass);
            break;
        case "datarequested":
            var d = c.getAttribute("data-clipboard-target"),
            g = d ? document.getElementById(d) : null;
            if (g) {
                var h = g.value || g.textContent || g.innerText;
                h && this.setText(h)
            } else {
                var i = c.getAttribute("data-clipboard-text");
                i && this.setText(i)
            }
            break;
        case "complete":
            this.options.text = null
        }
        if (this.handlers[a]) {
            var j = this.handlers[a];
            typeof j == "function" ? j.call(c, this, b) : typeof j == "string" && window[j].call(c, this, b)
        }
    },
    l.prototype.glue = function(a) {
        a = k(a);
        for (var d = 0; d < a.length; d++) j(a[d], n) == -1 && (n.push(a[d]), c(a[d], "mouseover", b))
    },
    l.prototype.unglue = function(a) {
        a = k(a);
        for (var c = 0; c < a.length; c++) {
            d(a[c], "mouseover", b);
            var e = j(a[c], n);
            e != -1 && n.splice(e, 1)
        }
    },
    typeof module != "undefined" ? module.exports = l: typeof define == "function" && define.amd ? define(function() {
        return l
    }) : window.ZeroClipboard = l
})();
