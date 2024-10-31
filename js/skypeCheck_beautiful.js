/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject = function () {
		var D = "undefined",
			r = "object",
			S = "Shockwave Flash",
			W = "ShockwaveFlash.ShockwaveFlash",
			q = "application/x-shockwave-flash",
			R = "SWFObjectExprInst",
			x = "onreadystatechange",
			O = window,
			j = document,
			t = navigator,
			T = false,
			U = [h],
			o = [],
			N = [],
			I = [],
			l, Q, E, B, J = false,
			a = false,
			n, G, m = true,
			M = function () {
				var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
					ah = t.userAgent.toLowerCase(),
					Y = t.platform.toLowerCase(),
					ae = Y ? /win/.test(Y) : /win/.test(ah),
					ac = Y ? /mac/.test(Y) : /mac/.test(ah),
					af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
					X = !+"\v1",
					ag = [0, 0, 0],
					ab = null;
				if (typeof t.plugins != D && typeof t.plugins[S] == r) {
					ab = t.plugins[S].description;
					if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
						T = true;
						X = false;
						ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
						ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
						ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
						ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
					}
				} else {
					if (typeof O.ActiveXObject != D) {
						try {
							var ad = new ActiveXObject(W);
							if (ad) {
								ab = ad.GetVariable("$version");
								if (ab) {
									X = true;
									ab = ab.split(" ")[1].split(",");
									ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
								}
							}
						} catch (Z) {}
					}
				}
				return {
					w3: aa,
					pv: ag,
					wk: af,
					ie: X,
					win: ae,
					mac: ac
				}
			}(),
			k = function () {
				if (!M.w3) {
					return
				}
				if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
					f()
				}
				if (!J) {
					if (typeof j.addEventListener != D) {
						j.addEventListener("DOMContentLoaded", f, false)
					}
					if (M.ie && M.win) {
						j.attachEvent(x, function () {
							if (j.readyState == "complete") {
								j.detachEvent(x, arguments.callee);
								f()
							}
						});
						if (O == top) {
							(function () {
								if (J) {
									return
								}
								try {
									j.documentElement.doScroll("left")
								} catch (X) {
									setTimeout(arguments.callee, 0);
									return
								}
								f()
							})()
						}
					}
					if (M.wk) {
						(function () {
							if (J) {
								return
							}
							if (!/loaded|complete/.test(j.readyState)) {
								setTimeout(arguments.callee, 0);
								return
							}
							f()
						})()
					}
					s(f)
				}
			}();

		function f() {
			if (J) {
				return
			}
			try {
				var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
				Z.parentNode.removeChild(Z)
			} catch (aa) {
				return
			}
			J = true;
			var X = U.length;
			for (var Y = 0; Y < X; Y++) {
				U[Y]()
			}
		}

		function K(X) {
			if (J) {
				X()
			} else {
				U[U.length] = X
			}
		}

		function s(Y) {
			if (typeof O.addEventListener != D) {
				O.addEventListener("load", Y, false)
			} else {
				if (typeof j.addEventListener != D) {
					j.addEventListener("load", Y, false)
				} else {
					if (typeof O.attachEvent != D) {
						i(O, "onload", Y)
					} else {
						if (typeof O.onload == "function") {
							var X = O.onload;
							O.onload = function () {
								X();
								Y()
							}
						} else {
							O.onload = Y
						}
					}
				}
			}
		}

		function h() {
			if (T) {
				V()
			} else {
				H()
			}
		}

		function V() {
			var X = j.getElementsByTagName("body")[0];
			var aa = C(r);
			aa.setAttribute("type", q);
			var Z = X.appendChild(aa);
			if (Z) {
				var Y = 0;
				(function () {
					if (typeof Z.GetVariable != D) {
						var ab = Z.GetVariable("$version");
						if (ab) {
							ab = ab.split(" ")[1].split(",");
							M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
						}
					} else {
						if (Y < 10) {
							Y++;
							setTimeout(arguments.callee, 10);
							return
						}
					}
					X.removeChild(aa);
					Z = null;
					H()
				})()
			} else {
				H()
			}
		}

		function H() {
			var ag = o.length;
			if (ag > 0) {
				for (var af = 0; af < ag; af++) {
					var Y = o[af].id;
					var ab = o[af].callbackFn;
					var aa = {
						success: false,
						id: Y
					};
					if (M.pv[0] > 0) {
						var ae = c(Y);
						if (ae) {
							if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
								w(Y, true);
								if (ab) {
									aa.success = true;
									aa.ref = z(Y);
									ab(aa)
								}
							} else {
								if (o[af].expressInstall && A()) {
									var ai = {};
									ai.data = o[af].expressInstall;
									ai.width = ae.getAttribute("width") || "0";
									ai.height = ae.getAttribute("height") || "0";
									if (ae.getAttribute("class")) {
										ai.styleclass = ae.getAttribute("class")
									}
									if (ae.getAttribute("align")) {
										ai.align = ae.getAttribute("align")
									}
									var ah = {};
									var X = ae.getElementsByTagName("param");
									var ac = X.length;
									for (var ad = 0; ad < ac; ad++) {
										if (X[ad].getAttribute("name").toLowerCase() != "movie") {
											ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
										}
									}
									P(ai, ah, Y, ab)
								} else {
									p(ae);
									if (ab) {
										ab(aa)
									}
								}
							}
						}
					} else {
						w(Y, true);
						if (ab) {
							var Z = z(Y);
							if (Z && typeof Z.SetVariable != D) {
								aa.success = true;
								aa.ref = Z
							}
							ab(aa)
						}
					}
				}
			}
		}

		function z(aa) {
			var X = null;
			var Y = c(aa);
			if (Y && Y.nodeName == "OBJECT") {
				if (typeof Y.SetVariable != D) {
					X = Y
				} else {
					var Z = Y.getElementsByTagName(r)[0];
					if (Z) {
						X = Z
					}
				}
			}
			return X
		}

		function A() {
			return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
		}

		function P(aa, ab, X, Z) {
			a = true;
			E = Z || null;
			B = {
				success: false,
				id: X
			};
			var ae = c(X);
			if (ae) {
				if (ae.nodeName == "OBJECT") {
					l = g(ae);
					Q = null
				} else {
					l = ae;
					Q = X
				}
				aa.id = R;
				if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
					aa.width = "310"
				}
				if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
					aa.height = "137"
				}
				j.title = j.title.slice(0, 47) + " - Flash Player Installation";
				var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
					ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
				if (typeof ab.flashvars != D) {
					ab.flashvars += "&" + ac
				} else {
					ab.flashvars = ac
				}
				if (M.ie && M.win && ae.readyState != 4) {
					var Y = C("div");
					X += "SWFObjectNew";
					Y.setAttribute("id", X);
					ae.parentNode.insertBefore(Y, ae);
					ae.style.display = "none";
					(function () {
						if (ae.readyState == 4) {
							ae.parentNode.removeChild(ae)
						} else {
							setTimeout(arguments.callee, 10)
						}
					})()
				}
				u(aa, ab, X)
			}
		}

		function p(Y) {
			if (M.ie && M.win && Y.readyState != 4) {
				var X = C("div");
				Y.parentNode.insertBefore(X, Y);
				X.parentNode.replaceChild(g(Y), X);
				Y.style.display = "none";
				(function () {
					if (Y.readyState == 4) {
						Y.parentNode.removeChild(Y)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			} else {
				Y.parentNode.replaceChild(g(Y), Y)
			}
		}

		function g(ab) {
			var aa = C("div");
			if (M.win && M.ie) {
				aa.innerHTML = ab.innerHTML
			} else {
				var Y = ab.getElementsByTagName(r)[0];
				if (Y) {
					var ad = Y.childNodes;
					if (ad) {
						var X = ad.length;
						for (var Z = 0; Z < X; Z++) {
							if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
								aa.appendChild(ad[Z].cloneNode(true))
							}
						}
					}
				}
			}
			return aa
		}

		function u(ai, ag, Y) {
			var X, aa = c(Y);
			if (M.wk && M.wk < 312) {
				return X
			}
			if (aa) {
				if (typeof ai.id == D) {
					ai.id = Y
				}
				if (M.ie && M.win) {
					var ah = "";
					for (var ae in ai) {
						if (ai[ae] != Object.prototype[ae]) {
							if (ae.toLowerCase() == "data") {
								ag.movie = ai[ae]
							} else {
								if (ae.toLowerCase() == "styleclass") {
									ah += ' class="' + ai[ae] + '"'
								} else {
									if (ae.toLowerCase() != "classid") {
										ah += " " + ae + '="' + ai[ae] + '"'
									}
								}
							}
						}
					}
					var af = "";
					for (var ad in ag) {
						if (ag[ad] != Object.prototype[ad]) {
							af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
						}
					}
					aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
					N[N.length] = ai.id;
					X = c(ai.id)
				} else {
					var Z = C(r);
					Z.setAttribute("type", q);
					for (var ac in ai) {
						if (ai[ac] != Object.prototype[ac]) {
							if (ac.toLowerCase() == "styleclass") {
								Z.setAttribute("class", ai[ac])
							} else {
								if (ac.toLowerCase() != "classid") {
									Z.setAttribute(ac, ai[ac])
								}
							}
						}
					}
					for (var ab in ag) {
						if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
							e(Z, ab, ag[ab])
						}
					}
					aa.parentNode.replaceChild(Z, aa);
					X = Z
				}
			}
			return X
		}

		function e(Z, X, Y) {
			var aa = C("param");
			aa.setAttribute("name", X);
			aa.setAttribute("value", Y);
			Z.appendChild(aa)
		}

		function y(Y) {
			var X = c(Y);
			if (X && X.nodeName == "OBJECT") {
				if (M.ie && M.win) {
					X.style.display = "none";
					(function () {
						if (X.readyState == 4) {
							b(Y)
						} else {
							setTimeout(arguments.callee, 10)
						}
					})()
				} else {
					X.parentNode.removeChild(X)
				}
			}
		}

		function b(Z) {
			var Y = c(Z);
			if (Y) {
				for (var X in Y) {
					if (typeof Y[X] == "function") {
						Y[X] = null
					}
				}
				Y.parentNode.removeChild(Y)
			}
		}

		function c(Z) {
			var X = null;
			try {
				X = j.getElementById(Z)
			} catch (Y) {}
			return X
		}

		function C(X) {
			return j.createElement(X)
		}

		function i(Z, X, Y) {
			Z.attachEvent(X, Y);
			I[I.length] = [Z, X, Y]
		}

		function F(Z) {
			var Y = M.pv,
				X = Z.split(".");
			X[0] = parseInt(X[0], 10);
			X[1] = parseInt(X[1], 10) || 0;
			X[2] = parseInt(X[2], 10) || 0;
			return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
		}

		function v(ac, Y, ad, ab) {
			if (M.ie && M.mac) {
				return
			}
			var aa = j.getElementsByTagName("head")[0];
			if (!aa) {
				return
			}
			var X = (ad && typeof ad == "string") ? ad : "screen";
			if (ab) {
				n = null;
				G = null
			}
			if (!n || G != X) {
				var Z = C("style");
				Z.setAttribute("type", "text/css");
				Z.setAttribute("media", X);
				n = aa.appendChild(Z);
				if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
					n = j.styleSheets[j.styleSheets.length - 1]
				}
				G = X
			}
			if (M.ie && M.win) {
				if (n && typeof n.addRule == r) {
					n.addRule(ac, Y)
				}
			} else {
				if (n && typeof j.createTextNode != D) {
					n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
				}
			}
		}

		function w(Z, X) {
			if (!m) {
				return
			}
			var Y = X ? "visible" : "hidden";
			if (J && c(Z)) {
				c(Z).style.visibility = Y
			} else {
				v("#" + Z, "visibility:" + Y)
			}
		}

		function L(Y) {
			var Z = /[\\\"<>\.;]/;
			var X = Z.exec(Y) != null;
			return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
		}
		var d = function () {
				if (M.ie && M.win) {
					window.attachEvent("onunload", function () {
						var ac = I.length;
						for (var ab = 0; ab < ac; ab++) {
							I[ab][0].detachEvent(I[ab][1], I[ab][2])
						}
						var Z = N.length;
						for (var aa = 0; aa < Z; aa++) {
							y(N[aa])
						}
						for (var Y in M) {
							M[Y] = null
						}
						M = null;
						for (var X in swfobject) {
							swfobject[X] = null
						}
						swfobject = null
					})
				}
			}();
		return {
			registerObject: function (ab, X, aa, Z) {
				if (M.w3 && ab && X) {
					var Y = {};
					Y.id = ab;
					Y.swfVersion = X;
					Y.expressInstall = aa;
					Y.callbackFn = Z;
					o[o.length] = Y;
					w(ab, false)
				} else {
					if (Z) {
						Z({
							success: false,
							id: ab
						})
					}
				}
			},
			getObjectById: function (X) {
				if (M.w3) {
					return z(X)
				}
			},
			embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
				var X = {
					success: false,
					id: ah
				};
				if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
					w(ah, false);
					K(function () {
						ae += "";
						ag += "";
						var aj = {};
						if (af && typeof af === r) {
							for (var al in af) {
								aj[al] = af[al]
							}
						}
						aj.data = ab;
						aj.width = ae;
						aj.height = ag;
						var am = {};
						if (ad && typeof ad === r) {
							for (var ak in ad) {
								am[ak] = ad[ak]
							}
						}
						if (Z && typeof Z === r) {
							for (var ai in Z) {
								if (typeof am.flashvars != D) {
									am.flashvars += "&" + ai + "=" + Z[ai]
								} else {
									am.flashvars = ai + "=" + Z[ai]
								}
							}
						}
						if (F(Y)) {
							var an = u(aj, am, ah);
							if (aj.id == ah) {
								w(ah, true)
							}
							X.success = true;
							X.ref = an
						} else {
							if (aa && A()) {
								aj.data = aa;
								P(aj, am, ah, ac);
								return
							} else {
								w(ah, true)
							}
						}
						if (ac) {
							ac(X)
						}
					})
				} else {
					if (ac) {
						ac(X)
					}
				}
			},
			switchOffAutoHideShow: function () {
				m = false
			},
			ua: M,
			getFlashPlayerVersion: function () {
				return {
					major: M.pv[0],
					minor: M.pv[1],
					release: M.pv[2]
				}
			},
			hasFlashPlayerVersion: F,
			createSWF: function (Z, Y, X) {
				if (M.w3) {
					return u(Z, Y, X)
				} else {
					return undefined
				}
			},
			showExpressInstall: function (Z, aa, X, Y) {
				if (M.w3 && A()) {
					P(Z, aa, X, Y)
				}
			},
			removeSWF: function (X) {
				if (M.w3) {
					y(X)
				}
			},
			createCSS: function (aa, Z, Y, X) {
				if (M.w3) {
					v(aa, Z, Y, X)
				}
			},
			addDomLoadEvent: K,
			addLoadEvent: s,
			getQueryParamValue: function (aa) {
				var Z = j.location.search || j.location.hash;
				if (Z) {
					if (/\?/.test(Z)) {
						Z = Z.split("?")[1]
					}
					if (aa == null) {
						return L(Z)
					}
					var Y = Z.split("&");
					for (var X = 0; X < Y.length; X++) {
						if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
							return L(Y[X].substring((Y[X].indexOf("=") + 1)))
						}
					}
				}
				return ""
			},
			expressInstallCallback: function () {
				if (a) {
					var X = c(R);
					if (X && l) {
						X.parentNode.replaceChild(l, X);
						if (Q) {
							w(Q, true);
							if (M.ie && M.win) {
								l.style.display = "block"
							}
						}
						if (E) {
							E(B)
						}
					}
					a = false
				}
			}
		}
	}();
if (typeof SkypeDetection == "undefined") {
	SkypeDetection = function () {
		var _detectionSwfUrl = "http://api.skype.com/detection/detection_as3.swf";
		var _detectionSwfID = "skypedetectionswf";
		var _containerID = "skypedetectioncontainer";
		var _verbose = false;
		var _flashCreated = false;
		var _initalizing = false;
		var _successCallbacks = [];
		var _failureCallbacks = [];
		var _failureTimeout = 5000;
		var createContainer = function () {
				var container = document.createElement("div");
				container.id = _containerID;
				container.style.position = "absolute";
				container.style.width = "5px";
				container.style.height = "5px";
				container.style.top = "0px";
				container.style.left = "-10px";
				var div = document.body && document.body.appendChild(container);
				if (!div) {
					log("Seems like container creating failed.");
					return;
				}
				window.setTimeout(createFlash, 10);
			};
		var createFlash = function () {
				if (typeof YAHOO != "undefined" && YAHOO.widget && YAHOO.widget.SWF) {
					log("Using YUI SWF module to embed Flash content");
					var yuiswf = new YAHOO.widget.SWF(_containerID, _detectionSwfUrl, {
						version: 9,
						fixedAttributes: {
							allowScriptAccess: "always",
							width: 5,
							height: 5
						}
					});
					_flashCreated = true;
					_detectionSwfID = yuiswf._id;
				} else {
					if (window.jQuery && $ && $.flash && typeof $.flash.create == "function") {
						log("Using jquery-swfobject to embed Flash content");
						$("#" + _containerID).flash({
							swf: _detectionSwfUrl,
							id: _detectionSwfID,
							width: 5,
							height: 5,
							hasVersion: 9,
							params: {
								allowscriptaccess: "always"
							}
						});
						_flashCreated = true;
					} else {
						if (window.jQuery && $ && $.fn.flash) {
							log("Using jquery-flash to embed Flash content");
							$("#" + _containerID).flash({
								id: _detectionSwfID,
								src: _detectionSwfUrl,
								width: 5,
								height: 5,
								allowscriptaccess: "always",
								version: "9.0"
							});
							_flashCreated = true;
						} else {
							if (typeof swfobject != "undefined" && swfobject.embedSWF) {
								log("Using SWFObject 2.x to embed Flash content");
								swfobject.embedSWF(_detectionSwfUrl, _containerID, 5, 5, "9.0", null, null, {
									allowScriptAccess: "always"
								}, {
									id: _detectionSwfID
								}, flashStatusCallback);
							} else {
								if (typeof deconcept != "undefined" && deconcept.SWFObject) {
									log("Using SWFObject 1.5 to embed Flash content");
									var so = new SWFObject(_detectionSwfUrl, _detectionSwfID, 5, 5, "9.0");
									so.addParam("allowScriptAccess", "always");
									so.write(_containerID);
									_flashCreated = true;
								} else {
									log("No supported way of embedding Flash was found");
									detectionFail();
									return;
								}
							}
						}
					}
				}
				window.setTimeout(detectionFail, _failureTimeout);
			};
		var flashStatusCallback = function (e) {
				if (e.success == false) {
					log("Flash embedding via SWFObject embedding failed");
					detectionFail();
				} else {
					if (e.success == true) {
						log("SWFObject callback indicated success");
						_flashCreated = true;
					}
				}
			};
		var detectionFail = function () {
				if (!SkypeDetection.ready) {
					log("Detection seems to have failed, calling failure callbacks");
					for (var i = 0; i < _failureCallbacks.length; i++) {
						_failureCallbacks[i]();
					}
				}
			};
		var detectionSuccess = function () {
				log("Detection succeeded, calling success callbacks");
				for (var i = 0; i < _successCallbacks.length; i++) {
					_successCallbacks[i]();
				}
			};
		var log = function (msg) {
				if (_verbose && typeof console != "undefined" && console.log) {
					console.log("[SkypeDetection] " + msg);
				}
			};
		var registerCallback = function (stack, fn) {
				for (var i = 0; i < stack.length; i++) {
					if (stack[i] === fn) {
						return;
					}
				}
				stack.push(fn);
			};
		var readDetectionData = function () {
				var swf = document.getElementById(_detectionSwfID);
				try {
					var data = swf.getData();
				} catch (e) {
					log("Getting data with swf.getData() failed, likely reason is browser issue with ExternalInterface setup");
					detectionFail();
					return;
				}
				SkypeDetection.installed = swf.isInstalled();
				log("Reading detection data, Skype is " + (SkypeDetection.installed ? "installed" : "not installed"));
				if (SkypeDetection.installed) {
					SkypeDetection.version = data.version;
					SkypeDetection.platform = data.platform;
					SkypeDetection.language = data.language;
					log("Using Skype version '" + data.version + "' on '" + data.platform + "' platform in language '" + data.language + "'");
					if (swf.getSharedObjectData) {
						try {
							data = swf.getSharedObjectData();
						} catch (e) {
							log("Could not read swf.getSharedObjectData()");
						}
						if (data.ui_timezone) {
							SkypeDetection.internal.profileTimezone = data.ui_timezone;
						}
						if (data.os_timezone) {
							SkypeDetection.internal.osTimezone = data.os_timezone;
						} else {
							SkypeDetection.internal.osTimezone = parseInt(new Date().getTimezoneOffset() / 60);
						}
						if (data.ui_installdate) {
							if (typeof data.ui_installdate == "string") {
								data.ui_installdate = parseInt(data.ui_installdate);
							}
							if (isNaN(data.ui_installdate) || data.ui_installdate == 0) {
								SkypeDetection.internal.profileAge = -1;
							} else {
								SkypeDetection.internal.profileAge = Math.floor(((new Date()).getTime() / 1000 - data.ui_installdate) / 60 / 60 / 24);
							}
						}
					}
					if (swf.getSessionData) {
						try {
							data = swf.getSessionData();
						} catch (e) {
							log("Could not read swf.getSessionData()");
						}
						if (data.username) {
							SkypeDetection.internal.username = data.username;
							var timeNow = (new Date()).getTime() / 1000;
							if (typeof data.expires != "undefined" && data.expires < timeNow) {
								SkypeDetection.internal.username = "";
								try {
									swf.clearSessionData();
								} catch (e) {}
							}
						}
					}
				}
				detectionSuccess();
			};
		return {
			setVerbose: function (verbose) {
				_verbose = verbose;
				log("Enabled verbose mode");
			},
			setReady: function () {
				log("Flash detection code indicated to JS that it is ready");
				SkypeDetection.ready = true;
				window.setTimeout(readDetectionData, 10);
			},
			detect: function (successFn, failureFn) {
				successFn && registerCallback(_successCallbacks, successFn);
				failureFn && registerCallback(_failureCallbacks, failureFn);
				if (SkypeDetection.ready) {
					log("Detection has already been run before");
					window.setTimeout(SkypeDetection.installed ? detectionSuccess : detectionFail, 10);
				} else {
					if (!_flashCreated && !_initalizing) {
						_initalizing = true;
						log("Creating detection Flash helper");
						window.setTimeout(createContainer, 10);
					} else {
						log("Unhandled case, marked not ready and flash somehow created?");
					}
				}
			},
			isQualifiedVersion: function (reqver) {
				if (!SkypeDetection.ready || !SkypeDetection.installed) {
					return false;
				}
				var ver = SkypeDetection.version;
				log("Comparing detected version " + ver + " to required version " + reqver);
				ver = ver.split(".");
				reqver = reqver.split(".");
				try {
					if (parseInt(ver[0]) > parseInt(reqver[0]) || (parseInt(ver[0]) == parseInt(reqver[0]) && parseInt(ver[1]) > parseInt(reqver[1])) || (parseInt(ver[0]) == parseInt(reqver[0]) && parseInt(ver[1]) == parseInt(reqver[1]) && parseInt(ver[3]) >= parseInt(reqver[3]))) {
						return true;
					}
				} catch (e) {}
				return false;
			},
			ready: false,
			version: null,
			platform: null,
			language: null,
			installed: null,
			internal: {
				username: null,
				profileTimezone: null,
				osTimezone: null,
				profileAge: null
			}
		};
	}();
}
/*
 * This is the legacy public Skype detection file converted to use new Flash
 * based detection library. It is mainly used for old Skype web buttons, though
 * some 3rd party sites have made use of it as well. This file tries to expose
 * the same API as previous implementation to not break 3rd party sites.
 *
 * Please use detection.js (SkypeDetection object) based library instead of
 * this in all new site developments.
 */ (function () {
	var _verbose = false;
	var _hasSkype = false;
	var _currentURI;
	var _notice;
	var _template = '<div style="width: 540px; height: 305px; background: white url(http://download.skype.com/share/skypebuttons/oops/bg.png) top left no-repeat; position: relative; font: 14px Verdana, sans-serif;"><span style="position: absolute; left: 40px; top: 44px; font: 24px/24px Verdana, sans-serif; color: white; font-weight: 500;">Hello!</span><span style="position: absolute; left: 40px; top: 90px; width: 230px; font: 14px/18px Verdana, sans-serif; color: white;">Skype buttons require that you have the latest version of Skype installed. Don&rsquo;t worry, you only need to do this once.</span><span style="position: absolute; left: 290px; top: 90px; width: 220px; font: 14px/18px Verdana, sans-serif; color: white;">Skype is a little piece of software that lets you make free calls over the internet.<br /><a href="http://www.skype.com/go/features" style="color: white">Learn more about Skype</a></span><span style="position: absolute; left: 40px; top: 200px; font: 14px/18px Verdana, sans-serif; color: black; width: 460px;">Skype is free, easy and quick to download and install.<br /> It works with Windows, Mac OS X, Linux and your mobile device.</span><form action="http://www.skype.com/go/download" method="get" target="_blank" style="position: absolute; margin: 0; padding: 0; left: 40px; top: 255px; width: 460px;"><input type="submit" value="Download Skype" style="float: left;" /><input type="button" name="haveskype" value="Already have Skype" style="float: right;" /></form></div></div>';
	var log = function (msg) {
			if (_verbose && console && console.log) {
				console.log("[skypeCheck.js] " + msg);
			}
		};
	if (typeof SkypeDetection != "object" || typeof swfobject != "object" || !swfobject.addDomLoadEvent) {
		log("Needed dependencies (SkypeDetection, SWFObject 2.x) were not found! Not checking for Skype");
		return;
	}
	var addListener = function (obj, ev, fn) {
			if (obj && typeof obj.addEventListener != "undefined") {
				obj.addEventListener(ev, fn, false);
			} else {
				if (obj && typeof obj.attachEvent != "undefined") {
					obj.attachEvent("on" + ev, fn);
				} else {
					log("No supported way to add event listener was found");
				}
			}
		};
	var addLinkChecks = function () {
			var links = document.getElementsByTagName("A");
			var l;
			for (var i = 0; i < links.length; i++) {
				l = links[i];
				if (l.href && l.href.indexOf("skype:") == 0) {
					addListener(l, "click", linkClickCheck);
					continue;
				}
			}
		};
	var linkClickCheck = function (e) {
			if (!e) {
				var e = window.event;
			}
			var target = e.target || e.srcElement || null;
			if (target) {
				while (target.tagName != "A" && target.parentElement) {
					target = target.parentElement;
				}
			}
			if (SkypeDetection.installed || _hasSkype) {
				log("Skype was detected, passing link through to Skype");
				return;
			} else {
				log("Skype seems not to be installed");
				target && target.href && (_currentURI = target.href);
				showNotice();
				e.preventDefault && e.preventDefault();
				e.stopPropagation && e.stopPropagation();
				e.returnValue && (e.returnValue = false);
				return false;
			}
		};
	var showNotice = function () {
			var clientWidth = 0,
				clientHeight = 0;
			if (!_notice) {
				if (document && document.documentElement && document.documentElement.clientWidth) {
					clientWidth = document.documentElement.clientWidth;
					clientHeight = document.documentElement.clientHeight;
				} else {
					if (document && document.body && document.body.clientWidth) {
						clientWidth = document.body.clientWidth;
						clientHeight = document.body.clientHeight;
					}
				}
				log("Creating notice element");
				_notice = document.createElement("DIV");
				_notice.id = "skypeCheckNotice";
				_notice.style.position = "absolute";
				_notice.style.zIndex = "10000";
				/*@cc_on
            @if (@_jscript_version == 5.6)
            _notice.style.position = "absolute";
            @end
            @*/
				_notice.style.top = Math.max(0, Math.floor(clientHeight / 2 - 152)) + "px";
				_notice.style.left = Math.max(0, Math.floor(clientWidth / 2 - 270)) + "px";
				_notice.innerHTML = _template;
				document.body.appendChild(_notice);
				var f = _notice.getElementsByTagName("input");
				(f.length == 2) && addListener(f[1], "click", hasSkype);
				f.length && addListener(f[0].parentElement, "submit", onDownloading) && f[0].focus();
			}
			log("Showing notice element");
			_notice.style.visibility = "visible";
		};
	var hasSkype = function () {
			log("User indicated having Skype, hiding notice, opening Skype URI " + _currentURI);
			_hasSkype = true;
			_notice.style.visibility = "hidden";
			_currentURI && location.replace(_currentURI);
			_currentURI = null;
		};
	var onDownloading = function () {
			var i = _notice.getElementsByTagName("input");
			if (i.length > 1) {
				i[1].style["float"] = "";
				i[1].value = "I have Skype installed now";
				i[0].style.display = "none";
			}
		};
	var skypeCheck = function () {
			return SkypeDetection.ready && SkypeDetection.installed;
		};
	swfobject.addDomLoadEvent(addLinkChecks);
	swfobject.addDomLoadEvent(SkypeDetection.detect);
	window.skypeCheck = skypeCheck;
})();