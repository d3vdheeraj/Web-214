jQuery(window).on("elementor/frontend/init", (function() {
	var e = elementorModules.frontend.handlers.Base.extend({
		svgPaths: {
			circle: ["M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"],
			underline_zigzag: ["M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"],
			x: ["M497.4,23.9C301.6,40,155.9,80.6,4,144.4", "M14.1,27.6c204.5,20.3,393.8,74,467.3,111.7"],
			strikethrough: ["M3,75h493.5"],
			curly: ["M3,146.1c17.1-8.8,33.5-17.8,51.4-17.8c15.6,0,17.1,18.1,30.2,18.1c22.9,0,36-18.6,53.9-18.6 c17.1,0,21.3,18.5,37.5,18.5c21.3,0,31.8-18.6,49-18.6c22.1,0,18.8,18.8,36.8,18.8c18.8,0,37.5-18.6,49-18.6c20.4,0,17.1,19,36.8,19 c22.9,0,36.8-20.6,54.7-18.6c17.7,1.4,7.1,19.5,33.5,18.8c17.1,0,47.2-6.5,61.1-15.6"],
			diagonal: ["M13.5,15.5c131,13.7,289.3,55.5,475,125.5"],
			double: ["M8.4,143.1c14.2-8,97.6-8.8,200.6-9.2c122.3-0.4,287.5,7.2,287.5,7.2", "M8,19.4c72.3-5.3,162-7.8,216-7.8c54,0,136.2,0,267,7.8"],
			double_underline: ["M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6", "M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"],
			underline: ["M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"]
		},
		getDefaultSettings: function() {
			var e = {
				animationDelay: 2500,
				lettersDelay: 50,
				typeLettersDelay: 150,
				selectionDuration: 500,
				revealDuration: 600,
				revealAnimationDelay: 1500
			};
			return e.typeAnimationDelay = e.selectionDuration + 800, e.selectors = {
				headline: ".twbb-headline",
				dynamicWrapper: ".twbb-headline-dynamic-wrapper"
			}, e.classes = {
				dynamicText: "twbb-headline-dynamic-text",
				dynamicLetter: "twbb-headline-dynamic-letter",
				textActive: "twbb-headline-text-active",
				textInactive: "twbb-headline-text-inactive",
				letters: "twbb-headline-letters",
				animationIn: "twbb-headline-animation-in",
				typeSelected: "twbb-headline-typing-selected"
			}, e
		},
		getDefaultElements: function() {
			var e = this.getSettings("selectors");
			return {
				$headline: this.$element.find(e.headline),
				$dynamicWrapper: this.$element.find(e.dynamicWrapper)
			}
		},
		getNextWord: function(e) {
			return e.is(":last-child") ? e.parent().children().eq(0) : e.next()
		},
		switchWord: function(e, t) {
			e.removeClass("twbb-headline-text-active").addClass("twbb-headline-text-inactive"), t.removeClass("twbb-headline-text-inactive").addClass("twbb-headline-text-active")
		},
		singleLetters: function() {
			var e = this.getSettings("classes");
			this.elements.$dynamicText.each((function() {
				var t = jQuery(this),
					n = t.text().split(""),
					s = t.hasClass(e.textActive);
				t.empty(), n.forEach((function(n) {
					var i = jQuery("<span>", {
						class: e.dynamicLetter
					}).text(n);
					s && i.addClass(e.animationIn), t.append(i)
				})), t.css("opacity", 1)
			}))
		},
		showLetter: function(e, t, n, s) {
			var i = this,
				o = this.getSettings("classes");
			e.addClass(o.animationIn), e.is(":last-child") ? n || setTimeout((function() {
				i.hideWord(t)
			}), i.getSettings("animationDelay")) : setTimeout((function() {
				i.showLetter(e.next(), t, n, s)
			}), s)
		},
		hideLetter: function(e, t, n, s) {
			var i = this,
				o = this.getSettings();
			e.removeClass(o.classes.animationIn), e.is(":last-child") ? n && setTimeout((function() {
				i.hideWord(i.getNextWord(t))
			}), i.getSettings("animationDelay")) : setTimeout((function() {
				i.hideLetter(e.next(), t, n, s)
			}), s)
		},
		showWord: function(e, t) {
			var n = this,
				s = n.getSettings(),
				i = n.getElementSettings("animation_type");
			"typing" === i ? (n.showLetter(e.find("." + s.classes.dynamicLetter).eq(0), e, !1, t), e.addClass(s.classes.textActive).removeClass(s.classes.textInactive)) : "clip" === i && n.elements.$dynamicWrapper.animate({
				width: e.width() + 10
			}, s.revealDuration, (function() {
				setTimeout((function() {
					n.hideWord(e)
				}), s.revealAnimationDelay)
			}))
		},
		hideWord: function(e) {
			var t = this,
				n = t.getSettings(),
				s = n.classes,
				i = "." + s.dynamicLetter,
				o = t.getElementSettings("animation_type"),
				r = t.getNextWord(e);
			if ("typing" === o) t.elements.$dynamicWrapper.addClass(s.typeSelected), setTimeout((function() {
				t.elements.$dynamicWrapper.removeClass(s.typeSelected), e.addClass(n.classes.textInactive).removeClass(s.textActive).children(i).removeClass(s.animationIn)
			}), n.selectionDuration), setTimeout((function() {
				t.showWord(r, n.typeLettersDelay)
			}), n.typeAnimationDelay);
			else if (t.elements.$headline.hasClass(s.letters)) {
				var a = e.children(i).length >= r.children(i).length;
				t.hideLetter(e.find(i).eq(0), e, a, n.lettersDelay), t.showLetter(r.find(i).eq(0), r, a, n.lettersDelay)
			} else "clip" === o ? t.elements.$dynamicWrapper.animate({
				width: "2px"
			}, n.revealDuration, (function() {
				t.switchWord(e, r), t.showWord(r)
			})) : (t.switchWord(e, r), setTimeout((function() {
				t.hideWord(r)
			}), n.animationDelay))
		},
		animateHeadline: function() {
			var e = this,
				t = e.getElementSettings("animation_type"),
				n = e.elements.$dynamicWrapper;
			if ("clip" === t) n.width(n.width() + 10);
			else if ("typing" !== t) {
				var s = 0;
				e.elements.$dynamicText.each((function() {
					var e = jQuery(this).width();
					e > s && (s = e)
				})), n.css("width", s)
			}
			setTimeout((function() {
				e.hideWord(e.elements.$dynamicText.eq(0))
			}), e.getSettings("animationDelay"))
		},
		getSvgPaths: function(e) {
			var t = this.svgPaths[e],
				n = jQuery();
			return t.forEach((function(e) {
				n = n.add(jQuery("<path>", {
					d: e
				}))
			})), n
		},
		fillWords: function() {
			var e = this.getElementSettings(),
				t = this.getSettings("classes"),
				n = this.elements.$dynamicWrapper;
			if ("rotate" === e.headline_style) {
				(e.rotating_text || "").split("\n").forEach((function(e, s) {
					var i = jQuery("<span>", {
						class: t.dynamicText
					}).html(e.replace(/ /g, "&nbsp;"));
					s || i.addClass(t.textActive), n.append(i)
				}))
			} else {
				var s = jQuery("<span>", {
						class: t.dynamicText + " " + t.textActive
					}).text(e.highlighted_text),
					i = jQuery("<svg>", {
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 500 150",
						preserveAspectRatio: "none"
					}).html(this.getSvgPaths(e.marker));
				n.append(s, i[0].outerHTML)
			}
			this.elements.$dynamicText = n.children("." + t.dynamicText)
		},
		rotateHeadline: function() {
			var e = this.getSettings();
			this.elements.$headline.hasClass(e.classes.letters) && this.singleLetters(), this.animateHeadline()
		},
		initHeadline: function() {
			"rotate" === this.getElementSettings("headline_style") && this.rotateHeadline()
		},
		onInit: function() {
			elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.fillWords(), this.initHeadline()
		}
	});
	elementorFrontend.hooks.addAction("frontend/element_ready/twbbanimated-headline.default", (function(t) {
		new e({
			$element: t
		})
	}))
})), jQuery(window).on("elementor/frontend/init", (function() {
	var e = elementorModules.frontend.handlers.Base.extend({
		onElementChange: function() {
			Prism.highlightAllUnder(this.$element[0], !1)
		},
		onInit: function() {
			elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), Prism.highlightAllUnder(this.$element[0], !1)
		}
	});
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_code-highlight.default", (function(t) {
		new e({
			$element: t
		})
	}))
}));
var tenwebCountdown = function(e, t) {
	var n, s = {
			$monthsSpan: e.find(".tenweb-countdown-months"),
			$daysSpan: e.find(".tenweb-countdown-days"),
			$hoursSpan: e.find(".tenweb-countdown-hours"),
			$minutesSpan: e.find(".tenweb-countdown-minutes"),
			$secondsSpan: e.find(".tenweb-countdown-seconds")
		},
		i = function() {
			var i = tenwebCountdown.getTimeRemaining(t, s.$monthsSpan.length);
			(jQuery.each(i.parts, (function(e) {
				var t = s["$" + e + "Span"],
					n = this.toString();
				1 === n.length && (n = 0 + n), t.length && t.text(n)
			})), i.total <= 0) && ("yes" == e.data("hide-after-expiry") && (e.find(".tenweb-countdown-item").addClass("tenweb-hidden"), e.parent().find(".tenweb-countdown-description").addClass("tenweb-hidden"), e.parent().find(".tenweb-countdown-expired").removeClass("tenweb-hidden")), clearInterval(n))
		};
	i(), n = setInterval(i, 1e3)
};
tenwebCountdown.getTimeRemaining = function(e, t) {
		var n = new Date,
			s = e - n,
			i = Math.floor(s / 864e5),
			o = t && i > 31 ? 12 * (e.getFullYear() - n.getFullYear()) + e.getMonth() - n.getMonth() : 0;
		t && o && (i = e.getDate() - n.getDate());
		var r = Math.floor(s / 36e5 % 24),
			a = Math.floor(s / 1e3 / 60 % 60),
			l = Math.floor(s / 1e3 % 60);
		return (i < 0 || r < 0 || a < 0) && (l = a = r = i = 0), {
			total: s,
			parts: {
				months: o,
				days: i,
				hours: r,
				minutes: a,
				seconds: l
			}
		}
	}, jQuery(window).on("elementor/frontend/init", (function() {
		elementorFrontend.hooks.addAction("frontend/element_ready/twbbcountdown.default", (function(e) {
			var t = e.find(".tenweb-countdown"),
				n = new Date(1e3 * t.data("date"));
			new tenwebCountdown(t, n)
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = TWBBFrontendConfig.facebook_sdk;

		function t(t) {
			loadSDK();
			var n = function() {
				FB.XFBML.parse(t[0])
			};
			e.isLoaded ? n() : jQuery(document).on("fb:sdk:loaded", n)
		}

		function t(t) {
			loadSDK();
			var n = function() {
				FB.XFBML.parse(t[0])
			};
			e.isLoaded ? n() : jQuery(document).on("fb:sdk:loaded", n)
		}
		loadSDK = function() {
			e.isLoading || e.isLoaded || (e.isLoading = !0, jQuery.ajax({
				url: "https://connect.facebook.net/" + e.lang + "/sdk.js",
				dataType: "script",
				cache: !0,
				success: function() {
					FB.init({
						appId: e.app_id,
						version: "v2.10",
						xfbml: !1
					}), e.isLoaded = !0, e.isLoading = !1, jQuery(document).trigger("fb:sdk:loaded")
				}
			}))
		}, elementorFrontend.hooks.addAction("frontend/element_ready/twbb_facebook-page.default", (function(e) {
			t(e)
		})), elementorFrontend.hooks.addAction("frontend/element_ready/twbb_facebook-comments.default", (function(e) {
			t(e)
		})), elementorFrontend.hooks.addAction("frontend/element_ready/twbb_facebook-embed.default", (function(e) {
			t(e)
		})), elementorFrontend.hooks.addAction("frontend/element_ready/twbb_facebook-button.default", (function(e) {
			t(e)
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			getDefaultSettings: function() {
				return {
					selectors: {
						hotspot: ".e-hotspot",
						tooltip: ".e-hotspot__tooltip"
					}
				}
			},
			getDefaultElements: function() {
				const e = this.getSettings("selectors");
				return {
					$hotspot: this.$element.find(e.hotspot),
					$hotspotsExcludesLinks: this.$element.find(e.hotspot).filter(":not(.e-hotspot--no-tooltip)"),
					$tooltip: this.$element.find(e.tooltip)
				}
			},
			bindEvents: function() {
				const e = this.getCurrentDeviceSetting("tooltip_trigger"),
					t = "mouseenter" === e ? "mouseleave mouseenter" : e;
				"none" !== t && this.elements.$hotspotsExcludesLinks.on(t, (e => this.onHotspotTriggerEvent(e)))
			},
			onDeviceModeChange: function() {
				this.elements.$hotspotsExcludesLinks.off(), this.bindEvents()
			},
			onHotspotTriggerEvent: function(e) {
				const t = jQuery(e.target),
					n = t.closest(".e-hotspot__button").length,
					s = "mouseleave" === e.type && (t.is(".e-hotspot--tooltip-position") || t.parents(".e-hotspot--tooltip-position").length),
					i = "mobile" === elementorFrontend.getCurrentDeviceMode();
				if (!(t.closest(".e-hotspot--link").length && i && ("mouseleave" === e.type || "mouseenter" === e.type)) && (n || s)) {
					const t = jQuery(e.currentTarget);
					this.elements.$hotspot.not(t).removeClass("e-hotspot--active"), t.toggleClass("e-hotspot--active")
				}
			},
			editorAddSequencedAnimation: function() {
				this.elements.$hotspot.toggleClass("e-hotspot--sequenced", "yes" === this.getElementSettings("hotspot_sequenced_animation"))
			},
			hotspotSequencedAnimation: function() {
				const e = this.getElementSettings();
				if ("no" === e.hotspot_sequenced_animation) return;
				const t = elementorModules.utils.Scroll.scrollObserver({
					callback: n => {
						n.isInViewport && (t.unobserve(this.$element[0]), this.elements.$hotspot.each(((t, n) => {
							if (0 === t) return;
							const s = e.hotspot_sequenced_animation_duration,
								i = t * ((s ? s.size : 1e3) / this.elements.$hotspot.length);
							n.style.animationDelay = i + "ms"
						})))
					}
				});
				t.observe(this.$element[0])
			},
			setTooltipPositionControl: function() {
				const e = this.getElementSettings();
				void 0 !== e.tooltip_animation && e.tooltip_animation.match(/^e-hotspot--(slide|fade)-direction/) && (this.elements.$tooltip.removeClass("e-hotspot--tooltip-animation-from-left e-hotspot--tooltip-animation-from-top e-hotspot--tooltip-animation-from-right e-hotspot--tooltip-animation-from-bottom"), this.elements.$tooltip.addClass("e-hotspot--tooltip-animation-from-" + e.tooltip_position))
			},
			onInit: function() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.hotspotSequencedAnimation(), this.setTooltipPositionControl(), window.elementor && elementor.listenTo(elementor.channels.deviceMode, "change", (() => this.onDeviceModeChange()))
			},
			onElementChange: function(e) {
				e.startsWith("tooltip_position") && this.setTooltipPositionControl(), e.startsWith("hotspot_sequenced_animation") && this.editorAddSequencedAnimation()
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_hotspot.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})),
	/*!
	 * SmartMenus jQuery Plugin - v1.0.1 - November 1, 2016
	 * http://www.smartmenus.org/
	 *
	 * Copyright Vasil Dinkov, Vadikom Web Ltd.
	 * http://vadikom.com
	 *
	 * Licensed MIT
	 */
	function(e) {
		"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && "object" == typeof module.exports ? module.exports = e(require("jquery")) : e(jQuery)
	}((function($) {
		var menuTrees = [],
			IE = !!window.createPopup,
			mouse = !1,
			touchEvents = "ontouchstart" in window,
			mouseDetectionEnabled = !1,
			requestAnimationFrame = window.requestAnimationFrame || function(e) {
				return setTimeout(e, 1e3 / 60)
			},
			cancelAnimationFrame = window.cancelAnimationFrame || function(e) {
				clearTimeout(e)
			};

		function initMouseDetection(e) {
			var t = ".smartmenus_mouse";
			if (mouseDetectionEnabled || e) mouseDetectionEnabled && e && ($(document).unbind(t), mouseDetectionEnabled = !1);
			else {
				var n = !0,
					s = null;
				$(document).bind(getEventsNS([
					["mousemove", function(e) {
						var t = {
							x: e.pageX,
							y: e.pageY,
							timeStamp: (new Date).getTime()
						};
						if (s) {
							var i = Math.abs(s.x - t.x),
								o = Math.abs(s.y - t.y);
							if ((i > 0 || o > 0) && i <= 2 && o <= 2 && t.timeStamp - s.timeStamp <= 300 && (mouse = !0, n)) {
								var r = $(e.target).closest("a");
								r.is("a") && $.each(menuTrees, (function() {
									if ($.contains(this.$root[0], r[0])) return this.itemEnter({
										currentTarget: r[0]
									}), !1
								})), n = !1
							}
						}
						s = t
					}],
					[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut", function(e) {
						isTouchEvent(e.originalEvent) && (mouse = !1)
					}]
				], t)), mouseDetectionEnabled = !0
			}
		}

		function isTouchEvent(e) {
			return !/^(4|mouse)$/.test(e.pointerType)
		}

		function getEventsNS(e, t) {
			t || (t = "");
			var n = {};
			return $.each(e, (function(e, s) {
				n[s[0].split(" ").join(t + " ") + t] = s[1]
			})), n
		}
		return $.SmartMenus = function(e, t) {
			this.$root = $(e), this.opts = t, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in e.style || "webkitPerspective" in e.style, this.wasCollapsible = !1, this.init()
		}, $.extend($.SmartMenus, {
			hideAll: function() {
				$.each(menuTrees, (function() {
					this.menuHideAll()
				}))
			},
			destroy: function() {
				for (; menuTrees.length;) menuTrees[0].destroy();
				initMouseDetection(!0)
			},
			prototype: {
				init: function(e) {
					var t = this;
					if (!e) {
						menuTrees.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
						var n = ".smartmenus";
						this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).bind(getEventsNS([
							["mouseover focusin", $.proxy(this.rootOver, this)],
							["mouseout focusout", $.proxy(this.rootOut, this)],
							["keydown", $.proxy(this.rootKeyDown, this)]
						], n)).delegate("a", getEventsNS([
							["mouseenter", $.proxy(this.itemEnter, this)],
							["mouseleave", $.proxy(this.itemLeave, this)],
							["mousedown", $.proxy(this.itemDown, this)],
							["focus", $.proxy(this.itemFocus, this)],
							["blur", $.proxy(this.itemBlur, this)],
							["click", $.proxy(this.itemClick, this)]
						], n)), n += this.rootId, this.opts.hideOnClick && $(document).bind(getEventsNS([
							["touchstart", $.proxy(this.docTouchStart, this)],
							["touchmove", $.proxy(this.docTouchMove, this)],
							["touchend", $.proxy(this.docTouchEnd, this)],
							["click", $.proxy(this.docClick, this)]
						], n)), $(window).bind(getEventsNS([
							["resize orientationchange", $.proxy(this.winResize, this)]
						], n)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), initMouseDetection()
					}
					if (this.$firstSub = this.$root.find("ul").each((function() {
							t.menuInit($(this))
						})).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
						var s = /(index|default)\.[^#\?\/]*/i,
							i = window.location.href.replace(s, ""),
							o = i.replace(/#.*/, "");
						this.$root.find("a").each((function() {
							var e = this.href.replace(s, ""),
								n = $(this);
							e != i && e != o || (n.addClass("current"), t.opts.markCurrentTree && n.parentsUntil("[data-smartmenus-id]", "ul").each((function() {
								$(this).dataSM("parent-a").addClass("current")
							})))
						}))
					}
					this.wasCollapsible = this.isCollapsible()
				},
				destroy: function(e) {
					if (!e) {
						var t = ".smartmenus";
						this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").unbind(t).undelegate(t), t += this.rootId, $(document).unbind(t), $(window).unbind(t), this.opts.subIndicators && (this.$subArrow = null)
					}
					this.menuHideAll();
					var n = this;
					this.$root.find("ul").each((function() {
						var e = $(this);
						e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.dataSM("shown-before") && ((n.opts.subMenusMinWidth || n.opts.subMenusMaxWidth) && e.css({
							width: "",
							minWidth: "",
							maxWidth: ""
						}).removeClass("sm-nowrap"), e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.css({
							zIndex: "",
							top: "",
							left: "",
							marginLeft: "",
							marginTop: "",
							display: ""
						})), 0 == (e.attr("id") || "").indexOf(n.accessIdPrefix) && e.removeAttr("id")
					})).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("ie-shim").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each((function() {
						var e = $(this);
						0 == e.attr("id").indexOf(n.accessIdPrefix) && e.removeAttr("id")
					})).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), e || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1))
				},
				disable: function(e) {
					if (!this.disabled) {
						if (this.menuHideAll(), !e && !this.opts.isPopup && this.$root.is(":visible")) {
							var t = this.$root.offset();
							this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
								position: "absolute",
								top: t.top,
								left: t.left,
								width: this.$root.outerWidth(),
								height: this.$root.outerHeight(),
								zIndex: this.getStartZIndex(!0),
								opacity: 0
							}).appendTo(document.body)
						}
						this.disabled = !0
					}
				},
				docClick: function(e) {
					this.$touchScrollingSub ? this.$touchScrollingSub = null : (this.visibleSubMenus.length && !$.contains(this.$root[0], e.target) || $(e.target).is("a")) && this.menuHideAll()
				},
				docTouchEnd: function(e) {
					if (this.lastTouch) {
						if (this.visibleSubMenus.length && (void 0 === this.lastTouch.x2 || this.lastTouch.x1 == this.lastTouch.x2) && (void 0 === this.lastTouch.y2 || this.lastTouch.y1 == this.lastTouch.y2) && (!this.lastTouch.target || !$.contains(this.$root[0], this.lastTouch.target))) {
							this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
							var t = this;
							this.hideTimeout = setTimeout((function() {
								t.menuHideAll()
							}), 350)
						}
						this.lastTouch = null
					}
				},
				docTouchMove: function(e) {
					if (this.lastTouch) {
						var t = e.originalEvent.touches[0];
						this.lastTouch.x2 = t.pageX, this.lastTouch.y2 = t.pageY
					}
				},
				docTouchStart: function(e) {
					var t = e.originalEvent.touches[0];
					this.lastTouch = {
						x1: t.pageX,
						y1: t.pageY,
						target: t.target
					}
				},
				enable: function() {
					this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
				},
				getClosestMenu: function(e) {
					for (var t = $(e).closest("ul"); t.dataSM("in-mega");) t = t.parent().closest("ul");
					return t[0] || null
				},
				getHeight: function(e) {
					return this.getOffset(e, !0)
				},
				getOffset: function(e, t) {
					var n;
					"none" == e.css("display") && (n = {
						position: e[0].style.position,
						visibility: e[0].style.visibility
					}, e.css({
						position: "absolute",
						visibility: "hidden"
					}).show());
					var s = e[0].getBoundingClientRect && e[0].getBoundingClientRect(),
						i = s && (t ? s.height || s.bottom - s.top : s.width || s.right - s.left);
					return i || 0 === i || (i = t ? e[0].offsetHeight : e[0].offsetWidth), n && e.hide().css(n), i
				},
				getStartZIndex: function(e) {
					var t = parseInt(this[e ? "$root" : "$firstSub"].css("z-index"));
					return !e && isNaN(t) && (t = parseInt(this.$root.css("z-index"))), isNaN(t) ? 1 : t
				},
				getTouchPoint: function(e) {
					return e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e
				},
				getViewport: function(e) {
					var t = e ? "Height" : "Width",
						n = document.documentElement["client" + t],
						s = window["inner" + t];
					return s && (n = Math.min(n, s)), n
				},
				getViewportHeight: function() {
					return this.getViewport(!0)
				},
				getViewportWidth: function() {
					return this.getViewport()
				},
				getWidth: function(e) {
					return this.getOffset(e)
				},
				handleEvents: function() {
					return !this.disabled && this.isCSSOn()
				},
				handleItemEvents: function(e) {
					return this.handleEvents() && !this.isLinkInMegaMenu(e)
				},
				isCollapsible: function() {
					return "static" == this.$firstSub.css("position")
				},
				isCSSOn: function() {
					return "block" == this.$firstLink.css("display")
				},
				isFixed: function() {
					var e = "fixed" == this.$root.css("position");
					return e || this.$root.parentsUntil("body").each((function() {
						if ("fixed" == $(this).css("position")) return e = !0, !1
					})), e
				},
				isLinkInMegaMenu: function(e) {
					return $(this.getClosestMenu(e[0])).hasClass("mega-menu")
				},
				isTouchMode: function() {
					return !mouse || this.opts.noMouseOver || this.isCollapsible()
				},
				itemActivate: function(e, t) {
					var n = e.closest("ul"),
						s = n.dataSM("level");
					if (s > 1 && (!this.activatedItems[s - 2] || this.activatedItems[s - 2][0] != n.dataSM("parent-a")[0])) {
						var i = this;
						$(n.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(n).each((function() {
							i.itemActivate($(this).dataSM("parent-a"))
						}))
					}
					if (this.isCollapsible() && !t || this.menuHideSubMenus(this.activatedItems[s - 1] && this.activatedItems[s - 1][0] == e[0] ? s : s - 1), this.activatedItems[s - 1] = e, !1 !== this.$root.triggerHandler("activate.smapi", e[0])) {
						var o = e.dataSM("sub");
						o && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(o)
					}
				},
				itemBlur: function(e) {
					var t = $(e.currentTarget);
					this.handleItemEvents(t) && this.$root.triggerHandler("blur.smapi", t[0])
				},
				itemClick: function(e) {
					var t = $(e.currentTarget);
					if (this.handleItemEvents(t)) {
						if (this.$touchScrollingSub && this.$touchScrollingSub[0] == t.closest("ul")[0]) return this.$touchScrollingSub = null, e.stopPropagation(), !1;
						if (!1 === this.$root.triggerHandler("click.smapi", t[0])) return !1;
						var n = $(e.target).is("span.sub-arrow"),
							s = t.dataSM("sub"),
							i = !!s && 2 == s.dataSM("level");
						if (s && !s.is(":visible")) {
							if (this.opts.showOnClick && i && (this.clickActivated = !0), this.itemActivate(t), s.is(":visible")) return this.focusActivated = !0, !1
						} else if (this.isCollapsible() && n) return this.itemActivate(t), this.menuHide(s), !1;
						return !(this.opts.showOnClick && i || t.hasClass("disabled") || !1 === this.$root.triggerHandler("select.smapi", t[0])) && void 0
					}
				},
				itemDown: function(e) {
					var t = $(e.currentTarget);
					this.handleItemEvents(t) && t.dataSM("mousedown", !0)
				},
				itemEnter: function(e) {
					var t = $(e.currentTarget);
					if (this.handleItemEvents(t)) {
						if (!this.isTouchMode()) {
							this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
							var n = this;
							this.showTimeout = setTimeout((function() {
								n.itemActivate(t)
							}), this.opts.showOnClick && 1 == t.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)
						}
						this.$root.triggerHandler("mouseenter.smapi", t[0])
					}
				},
				itemFocus: function(e) {
					var t = $(e.currentTarget);
					this.handleItemEvents(t) && (!this.focusActivated || this.isTouchMode() && t.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == t[0] || this.itemActivate(t, !0), this.$root.triggerHandler("focus.smapi", t[0]))
				},
				itemLeave: function(e) {
					var t = $(e.currentTarget);
					this.handleItemEvents(t) && (this.isTouchMode() || (t[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), t.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", t[0]))
				},
				menuHide: function(e) {
					if (!1 !== this.$root.triggerHandler("beforehide.smapi", e[0]) && (e.stop(!0, !0), "none" != e.css("display"))) {
						var t = function() {
							e.css("z-index", "")
						};
						this.isCollapsible() ? this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, e, t) : e.hide(this.opts.collapsibleHideDuration, t) : this.opts.hideFunction ? this.opts.hideFunction.call(this, e, t) : e.hide(this.opts.hideDuration, t), e.dataSM("ie-shim") && e.dataSM("ie-shim").remove().css({
							"-webkit-transform": "",
							transform: ""
						}), e.dataSM("scroll") && (this.menuScrollStop(e), e.css({
							"touch-action": "",
							"-ms-touch-action": "",
							"-webkit-transform": "",
							transform: ""
						}).unbind(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), e.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), e.attr({
							"aria-expanded": "false",
							"aria-hidden": "true"
						});
						var n = e.dataSM("level");
						this.activatedItems.splice(n - 1, 1), this.visibleSubMenus.splice($.inArray(e, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", e[0])
					}
				},
				menuHideAll: function() {
					this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
					for (var e = this.opts.isPopup ? 1 : 0, t = this.visibleSubMenus.length - 1; t >= e; t--) this.menuHide(this.visibleSubMenus[t]);
					this.opts.isPopup && (this.$root.stop(!0, !0), this.$root.is(":visible") && (this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").remove())), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi")
				},
				menuHideSubMenus: function(e) {
					for (var t = this.activatedItems.length - 1; t >= e; t--) {
						var n = this.activatedItems[t].dataSM("sub");
						n && this.menuHide(n)
					}
				},
				menuIframeShim: function(e) {
					IE && this.opts.overlapControlsInIE && !e.dataSM("ie-shim") && e.dataSM("ie-shim", $("<iframe/>").attr({
						src: "javascript:0",
						tabindex: -9
					}).css({
						position: "absolute",
						top: "auto",
						left: "0",
						opacity: 0,
						border: "0"
					}))
				},
				menuInit: function(e) {
					if (!e.dataSM("in-mega")) {
						e.hasClass("mega-menu") && e.find("ul").dataSM("in-mega", !0);
						for (var t = 2, n = e[0];
							(n = n.parentNode.parentNode) != this.$root[0];) t++;
						var s = e.prevAll("a").eq(-1);
						s.length || (s = e.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", e), e.dataSM("parent-a", s).dataSM("level", t).parent().dataSM("sub", e);
						var i = s.attr("id") || this.accessIdPrefix + ++this.idInc,
							o = e.attr("id") || this.accessIdPrefix + ++this.idInc;
						s.attr({
							id: i,
							"aria-haspopup": "true",
							"aria-controls": o,
							"aria-expanded": "false"
						}), e.attr({
							id: o,
							role: "group",
							"aria-hidden": "true",
							"aria-labelledby": i,
							"aria-expanded": "false"
						}), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone())
					}
				},
				menuPosition: function(e) {
					var t, n, s = e.dataSM("parent-a"),
						i = s.closest("li"),
						o = i.parent(),
						r = e.dataSM("level"),
						a = this.getWidth(e),
						l = this.getHeight(e),
						c = s.offset(),
						d = c.left,
						h = c.top,
						u = this.getWidth(s),
						m = this.getHeight(s),
						p = $(window),
						g = p.scrollLeft(),
						f = p.scrollTop(),
						b = this.getViewportWidth(),
						w = this.getViewportHeight(),
						v = o.parent().is("[data-sm-horizontal-sub]") || 2 == r && !o.hasClass("sm-vertical"),
						y = this.opts.rightToLeftSubMenus && !i.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && i.is("[data-sm-reverse]"),
						_ = 2 == r ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
						S = 2 == r ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
					if (v ? (t = y ? u - a - _ : _, n = this.opts.bottomToTopSubMenus ? -l - S : m + S) : (t = y ? _ - a : u - _, n = this.opts.bottomToTopSubMenus ? m - S - l : S), this.opts.keepInViewport) {
						var C = d + t,
							k = h + n;
						if (y && C < g ? t = v ? g - C + t : u - _ : !y && C + a > g + b && (t = v ? g + b - a - C + t : _ - a), v || (l < w && k + l > f + w ? n += f + w - l - k : (l >= w || k < f) && (n += f - k)), v && (k + l > f + w + .49 || k < f) || !v && l > w + .49) {
							var I = this;
							e.dataSM("scroll-arrows") || e.dataSM("scroll-arrows", $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).bind({
								mouseenter: function() {
									e.dataSM("scroll").up = $(this).hasClass("scroll-up"), I.menuScroll(e)
								},
								mouseleave: function(t) {
									I.menuScrollStop(e), I.menuScrollOut(e, t)
								},
								"mousewheel DOMMouseScroll": function(e) {
									e.preventDefault()
								}
							}).insertAfter(e));
							var E = ".smartmenus_scroll";
							e.dataSM("scroll", {
								y: this.cssTransforms3d ? 0 : n - m,
								step: 1,
								itemH: m,
								subH: l,
								arrowDownH: this.getHeight(e.dataSM("scroll-arrows").eq(1))
							}).bind(getEventsNS([
								["mouseover", function(t) {
									I.menuScrollOver(e, t)
								}],
								["mouseout", function(t) {
									I.menuScrollOut(e, t)
								}],
								["mousewheel DOMMouseScroll", function(t) {
									I.menuScrollMousewheel(e, t)
								}]
							], E)).dataSM("scroll-arrows").css({
								top: "auto",
								left: "0",
								marginLeft: t + (parseInt(e.css("border-left-width")) || 0),
								width: a - (parseInt(e.css("border-left-width")) || 0) - (parseInt(e.css("border-right-width")) || 0),
								zIndex: e.css("z-index")
							}).eq(v && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed() && e.css({
								"touch-action": "none",
								"-ms-touch-action": "none"
							}).bind(getEventsNS([
								[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp", function(t) {
									I.menuScrollTouch(e, t)
								}]
							], E))
						}
					}
					e.css({
						top: "auto",
						left: "0",
						marginLeft: t,
						marginTop: n - m
					}), this.menuIframeShim(e), e.dataSM("ie-shim") && e.dataSM("ie-shim").css({
						zIndex: e.css("z-index"),
						width: a,
						height: l,
						marginLeft: t,
						marginTop: n - m
					})
				},
				menuScroll: function(e, t, n) {
					var s, i = e.dataSM("scroll"),
						o = e.dataSM("scroll-arrows"),
						r = i.up ? i.upEnd : i.downEnd;
					if (!t && i.momentum) {
						if (i.momentum *= .92, (s = i.momentum) < .5) return void this.menuScrollStop(e)
					} else s = n || (t || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(i.step));
					var a = e.dataSM("level");
					if (this.activatedItems[a - 1] && this.activatedItems[a - 1].dataSM("sub") && this.activatedItems[a - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(a - 1), i.y = i.up && r <= i.y || !i.up && r >= i.y ? i.y : Math.abs(r - i.y) > s ? i.y + (i.up ? s : -s) : r, e.add(e.dataSM("ie-shim")).css(this.cssTransforms3d ? {
							"-webkit-transform": "translate3d(0, " + i.y + "px, 0)",
							transform: "translate3d(0, " + i.y + "px, 0)"
						} : {
							marginTop: i.y
						}), mouse && (i.up && i.y > i.downEnd || !i.up && i.y < i.upEnd) && o.eq(i.up ? 1 : 0).show(), i.y == r) mouse && o.eq(i.up ? 0 : 1).hide(), this.menuScrollStop(e);
					else if (!t) {
						this.opts.scrollAccelerate && i.step < this.opts.scrollStep && (i.step += .2);
						var l = this;
						this.scrollTimeout = requestAnimationFrame((function() {
							l.menuScroll(e)
						}))
					}
				},
				menuScrollMousewheel: function(e, t) {
					if (this.getClosestMenu(t.target) == e[0]) {
						var n = ((t = t.originalEvent).wheelDelta || -t.detail) > 0;
						e.dataSM("scroll-arrows").eq(n ? 0 : 1).is(":visible") && (e.dataSM("scroll").up = n, this.menuScroll(e, !0))
					}
					t.preventDefault()
				},
				menuScrollOut: function(e, t) {
					mouse && (/^scroll-(up|down)/.test((t.relatedTarget || "").className) || (e[0] == t.relatedTarget || $.contains(e[0], t.relatedTarget)) && this.getClosestMenu(t.relatedTarget) == e[0] || e.dataSM("scroll-arrows").css("visibility", "hidden"))
				},
				menuScrollOver: function(e, t) {
					if (mouse && !/^scroll-(up|down)/.test(t.target.className) && this.getClosestMenu(t.target) == e[0]) {
						this.menuScrollRefreshData(e);
						var n = e.dataSM("scroll"),
							s = $(window).scrollTop() - e.dataSM("parent-a").offset().top - n.itemH;
						e.dataSM("scroll-arrows").eq(0).css("margin-top", s).end().eq(1).css("margin-top", s + this.getViewportHeight() - n.arrowDownH).end().css("visibility", "visible")
					}
				},
				menuScrollRefreshData: function(e) {
					var t = e.dataSM("scroll"),
						n = $(window).scrollTop() - e.dataSM("parent-a").offset().top - t.itemH;
					this.cssTransforms3d && (n = -(parseFloat(e.css("margin-top")) - n)), $.extend(t, {
						upEnd: n,
						downEnd: n + this.getViewportHeight() - t.subH
					})
				},
				menuScrollStop: function(e) {
					if (this.scrollTimeout) return cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0, e.dataSM("scroll").step = 1, !0
				},
				menuScrollTouch: function(e, t) {
					if (isTouchEvent(t = t.originalEvent)) {
						var n = this.getTouchPoint(t);
						if (this.getClosestMenu(n.target) == e[0]) {
							var s = e.dataSM("scroll");
							if (/(start|down)$/i.test(t.type)) this.menuScrollStop(e) ? (t.preventDefault(), this.$touchScrollingSub = e) : this.$touchScrollingSub = null, this.menuScrollRefreshData(e), $.extend(s, {
								touchStartY: n.pageY,
								touchStartTime: t.timeStamp
							});
							else if (/move$/i.test(t.type)) {
								var i = void 0 !== s.touchY ? s.touchY : s.touchStartY;
								if (void 0 !== i && i != n.pageY) {
									this.$touchScrollingSub = e;
									var o = i < n.pageY;
									void 0 !== s.up && s.up != o && $.extend(s, {
										touchStartY: n.pageY,
										touchStartTime: t.timeStamp
									}), $.extend(s, {
										up: o,
										touchY: n.pageY
									}), this.menuScroll(e, !0, Math.abs(n.pageY - i))
								}
								t.preventDefault()
							} else void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(n.pageY - s.touchStartY) / (t.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(e), this.menuScroll(e), t.preventDefault()), delete s.touchY)
						}
					}
				},
				menuShow: function(e) {
					if ((e.dataSM("beforefirstshowfired") || (e.dataSM("beforefirstshowfired", !0), !1 !== this.$root.triggerHandler("beforefirstshow.smapi", e[0]))) && !1 !== this.$root.triggerHandler("beforeshow.smapi", e[0]) && (e.dataSM("shown-before", !0).stop(!0, !0), !e.is(":visible"))) {
						var t = e.dataSM("parent-a");
						if ((this.opts.keepHighlighted || this.isCollapsible()) && t.addClass("highlighted"), this.isCollapsible()) e.removeClass("sm-nowrap").css({
							zIndex: "",
							width: "auto",
							minWidth: "",
							maxWidth: "",
							top: "",
							left: "",
							marginLeft: "",
							marginTop: ""
						});
						else {
							if (e.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (e.css({
									width: "auto",
									minWidth: "",
									maxWidth: ""
								}).addClass("sm-nowrap"), this.opts.subMenusMinWidth && e.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
								var n = this.getWidth(e);
								e.css("max-width", this.opts.subMenusMaxWidth), n > this.getWidth(e) && e.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)
							}
							this.menuPosition(e), e.dataSM("ie-shim") && e.dataSM("ie-shim").insertBefore(e)
						}
						var s = function() {
							e.css("overflow", "")
						};
						this.isCollapsible() ? this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, e, s) : e.show(this.opts.collapsibleShowDuration, s) : this.opts.showFunction ? this.opts.showFunction.call(this, e, s) : e.show(this.opts.showDuration, s), t.attr("aria-expanded", "true"), e.attr({
							"aria-expanded": "true",
							"aria-hidden": "false"
						}), this.visibleSubMenus.push(e), this.$root.triggerHandler("show.smapi", e[0])
					}
				},
				popupHide: function(e) {
					this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
					var t = this;
					this.hideTimeout = setTimeout((function() {
						t.menuHideAll()
					}), e ? 1 : this.opts.hideTimeout)
				},
				popupShow: function(e, t) {
					if (this.opts.isPopup) {
						if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0).stop(!0, !0), !this.$root.is(":visible")) {
							this.$root.css({
								left: e,
								top: t
							}), this.menuIframeShim(this.$root), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").css({
								zIndex: this.$root.css("z-index"),
								width: this.getWidth(this.$root),
								height: this.getHeight(this.$root),
								left: e,
								top: t
							}).insertBefore(this.$root);
							var n = this,
								s = function() {
									n.$root.css("overflow", "")
								};
							this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s), this.visibleSubMenus[0] = this.$root
						}
					} else alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.')
				},
				refresh: function() {
					this.destroy(!0), this.init(!0)
				},
				rootKeyDown: function(e) {
					if (this.handleEvents()) switch (e.keyCode) {
						case 27:
							var t = this.activatedItems[0];
							if (t) this.menuHideAll(), t[0].focus(), (n = t.dataSM("sub")) && this.menuHide(n);
							break;
						case 32:
							var n, s = $(e.target);
							if (s.is("a") && this.handleItemEvents(s))(n = s.dataSM("sub")) && !n.is(":visible") && (this.itemClick({
								currentTarget: e.target
							}), e.preventDefault())
					}
				},
				rootOut: function(e) {
					if (this.handleEvents() && !this.isTouchMode() && e.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
						var t = this;
						this.hideTimeout = setTimeout((function() {
							t.menuHideAll()
						}), this.opts.hideTimeout)
					}
				},
				rootOver: function(e) {
					this.handleEvents() && !this.isTouchMode() && e.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
				},
				winResize: function(e) {
					if (this.handleEvents()) {
						if (!("onorientationchange" in window) || "orientationchange" == e.type) {
							var t = this.isCollapsible();
							this.wasCollapsible && t || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = t
						}
					} else if (this.$disableOverlay) {
						var n = this.$root.offset();
						this.$disableOverlay.css({
							top: n.top,
							left: n.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight()
						})
					}
				}
			}
		}), $.fn.dataSM = function(e, t) {
			return t ? this.data(e + "_smartmenus", t) : this.data(e + "_smartmenus")
		}, $.fn.removeDataSM = function(e) {
			return this.removeData(e + "_smartmenus")
		}, $.fn.smartmenus = function(options) {
			if ("string" == typeof options) {
				var args = arguments,
					method = options;
				return Array.prototype.shift.call(args), this.each((function() {
					var e = $(this).data("smartmenus");
					e && e[method] && e[method].apply(e, args)
				}))
			}
			var dataOpts = this.data("sm-options") || null;
			if (dataOpts) try {
				dataOpts = eval("(" + dataOpts + ")")
			} catch (e) {
				dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.')
			}
			return this.each((function() {
				new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts))
			}))
		}, $.fn.smartmenus.defaults = {
			isPopup: !1,
			mainMenuSubOffsetX: 0,
			mainMenuSubOffsetY: 0,
			subMenusSubOffsetX: 0,
			subMenusSubOffsetY: 0,
			subMenusMinWidth: "10em",
			subMenusMaxWidth: "20em",
			subIndicators: !0,
			subIndicatorsPos: "prepend",
			subIndicatorsText: "+",
			scrollStep: 30,
			scrollAccelerate: !0,
			showTimeout: 250,
			hideTimeout: 500,
			showDuration: 0,
			showFunction: null,
			hideDuration: 0,
			hideFunction: function(e, t) {
				e.fadeOut(200, t)
			},
			collapsibleShowDuration: 0,
			collapsibleShowFunction: function(e, t) {
				e.slideDown(200, t)
			},
			collapsibleHideDuration: 0,
			collapsibleHideFunction: function(e, t) {
				e.slideUp(200, t)
			},
			showOnClick: !1,
			hideOnClick: !0,
			noMouseOver: !1,
			keepInViewport: !0,
			keepHighlighted: !0,
			markCurrentItem: !1,
			markCurrentTree: !0,
			rightToLeftSubMenus: !1,
			bottomToTopSubMenus: !1,
			overlapControlsInIE: !0
		}, $
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			stretchElement: null,
			getDefaultSettings: function() {
				return {
					selectors: {
						menu: ".twbb-nav-menu",
						dropdownMenu: ".twbb-nav-menu__container.twbb-nav-menu--dropdown",
						menuToggle: ".twbb-menu-toggle"
					}
				}
			},
			getDefaultElements: function() {
				var e = this.getSettings("selectors"),
					t = {};
				return t.$menu = this.$element.find(e.menu), t.$dropdownMenu = this.$element.find(e.dropdownMenu), t.$dropdownMenuFinalItems = t.$dropdownMenu.find(".menu-item:not(.menu-item-has-children) > a"), t.$menuToggle = this.$element.find(e.menuToggle), t
			},
			bindEvents: function() {
				this.elements.$menu.length && (this.elements.$menuToggle.on("click", this.toggleMenu.bind(this)), this.elements.$dropdownMenuFinalItems.on("click", this.toggleMenu.bind(this, !1)), elementorFrontend.addListenerOnce(this.$element.data("model-cid"), "resize", this.stretchMenu))
			},
			initStretchElement: function() {
				this.stretchElement = new elementorFrontend.modules.StretchElement({
					element: this.elements.$dropdownMenu
				})
			},
			toggleMenu: function(e) {
				var t = this.elements.$dropdownMenu,
					n = this.elements.$menuToggle.hasClass("twbb-active");
				"boolean" != typeof e && (e = !n), this.elements.$menuToggle.toggleClass("twbb-active", e), e ? (t.hide().slideDown(250, (function() {
					t.css("display", "")
				})), this.getElementSettings("full_width") && this.stretchElement.stretch()) : t.show().slideUp(250, (function() {
					t.css("display", "")
				}))
			},
			stretchMenu: function() {
				this.getElementSettings("full_width") ? (this.stretchElement.stretch(), this.elements.$dropdownMenu.css("top", this.elements.$menuToggle.outerHeight())) : this.stretchElement.reset()
			},
			onInit: function() {
				jQuery("body").hasClass("elementor-editor-active") && (jQuery(".ai-recreated-menu-item").parent().css("gap", "3px"), jQuery(".ai-recreated-menu-item").each((function() {
					if (0 == jQuery(this).children("button").length) {
						let e, t;
						jQuery(this).children("a").text("+ Add page"), e = jQuery(this).width(), t = jQuery(this).height(), jQuery(this).prepend('<button class="twbb-add_new_page"style="height:' + t + "px;width:" + e + 'px;"></button>')
					}
				})), jQuery(".twbb-add_new_page").click((function(e) {
					let t, n, s, i, o, r, a, l;
					t = jQuery(this).closest("ul").attr("class"), n = jQuery(this).closest("li").attr("class"), s = new RegExp("twbb-menu_term_id-\\s*(\\d+)"), i = new RegExp("menu-item-\\s*(\\d+)"), o = new RegExp("twbb_menu_order_\\s*(\\d+)"), r = t.match(s), a = n.match(i), l = n.match(o), r && a && l && window.open(twbb.tenweb_dashboard + "/websites/" + twbb.dashboard_website_id + "/ai-builder?add_page=1&menu_term_id=" + r[1] + "&menu_item_id=" + a[1] + "&menu_item_position=" + l[1], "_blank")
				}))), elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.elements.$menu.length && (this.elements.$menu.smartmenus({
					subIndicatorsText: '<i class="fa"></i>',
					subIndicatorsPos: "append",
					subMenusMaxWidth: "1000px"
				}), this.initStretchElement(), this.stretchMenu())
			},
			onElementChange: function(e) {
				"full_width" === e && this.stretchMenu()
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb-nav-menu.default", (function(t) {
			jQuery.fn.smartmenus && (jQuery.SmartMenus.prototype.isCSSOn = function() {
				return !0
			}, elementorFrontend.config.is_rtl && (jQuery.fn.smartmenus.defaults.rightToLeftSubMenus = !0)), new e({
				$element: t
			})
		}))
	}));
var twbb_widgets = [],
	twbb_posts = function(e, t) {
		var n = this,
			s = 1,
			i = "",
			o = null,
			r = null,
			a = null,
			l = null,
			c = "undefined" != typeof elementor;
		this.query_args = e.query_args, this.query_args_hash = e.query_args_hash, this.widget_id = e.widget_id, this.settings = e.settings, this.posts = [], this.pages_count = 1, this.init = function() {
			! function() {
				0 == (o = jQuery('div[data-id="' + n.widget_id + '"]')).length && (o = jQuery(".elementor-global-" + n.widget_id));
				a = o.find(".twbb-posts-widget-container")
			}(),
			function() {
				settings = n.settings, i = "";
				var e = "",
					t = "";
				"yes" === settings.show_image && (e = "<% if(twbb_image != '') { %><div class='twbb-posts-image'><img src='<%= twbb_image %>'/></div><% } %>");
				"yes" === settings.show_title && (t += "<div class='twbb-posts-title'><" + settings.title_tag + " class='twbb-posts-title-tag'><a href='<%= twbb_permalink %>'><%= post_title %></a></" + settings.title_tag + "></div>");
				"above_title" === settings.image_position ? i += e + t : i += t + e;
				if (void 0 !== settings.meta_data && settings.meta_data.length > 0) {
					i += "<div class='twbb-posts-meta-data'>";
					for (var s = 0; s < settings.meta_data.length; s++) {
						switch (settings.meta_data[s]) {
							case "author":
								i += '<span class="twbb-posts-author-meta"><% print(posts_print_author(twbb_author)) %></span>';
								break;
							case "date":
								i += '<span class="twbb-posts-date-meta"><%= twbb_date %></span>';
								break;
							case "time":
								i += '<span class="twbb-posts-time-meta"><%= twbb_time %></span>';
								break;
							case "comments":
								i += '<span class="twbb-posts-comments-meta"><% if(twbb_comments > 0) { %><%=  twbb_comments %> <% }else{ print("No") } print(" comments")%></span>';
								break;
							case "categories":
								i += '<span class="twbb-posts-categories-meta"><% print(posts_print_terms(twbb_categories, "categories")) %></span>';
								break;
							case "tags":
								i += '<span class="twbb-posts-tags-meta"><% print(posts_print_terms(twbb_tags, "tags")) %></span>'
						}
						i += '<span class="twbb-posts-meta-separator">' + settings.meta_separator + "</span>"
					}
					i += "</div>"
				}
				"yes" === settings.show_excerpt && (i += "<div class='twbb-posts-content'><%= twbb_excerpt %></div>");
				"yes" === settings.show_read_more && (i += "<div class='twbb-posts-read-more'><a href='<%= twbb_permalink %>'>" + settings.read_more_text + "</a></div>");
				i = '<div class="twbb-posts-item">' + i + "</div>"
			}(), this.get_posts()
		}, this.render = function() {
			var e, t;
			this.clear_html();
			var n = _.template(i);
			if (0 === this.posts.length) return a.addClass("empty-posts"), void a.append("<p>No posts found.</p>");
			for (t in this.posts) e = n(this.posts[t]), a.append(e);
			this.display_separators(), "yes" === this.settings.masonry && this.masonry(), "yes" === this.settings.pagination && this.pages_count > 1 && this.pagination()
		}, this.get_posts = function() {
			if (this.show_loading(), 1 === s && void 0 !== e.first_page_data) return n.posts = e.first_page_data.posts, n.pages_count = e.first_page_data.pages_count, n.render(), void n.hide_loading();
			jQuery.post(twbb.ajaxurl, {
				action: "twbb_widgets",
				widget_name: "posts",
				query_args: n.query_args,
				query_args_hash: n.query_args_hash,
				page: s,
				nonce: twbb.nonce
			}).done((function(e) {
				n.posts = e.data.posts, n.pages_count = parseInt(e.data.pages_count), n.render(), n.hide_loading()
			})).fail((function(e) {
				n.hide_loading()
			}))
		}, this.display_separators = function() {
			jQuery(".twbb-posts-meta-data").each((function() {
				var e = null;
				jQuery(this).find(".twbb-posts-meta-separator").each((function() {
					"" !== jQuery(this).prev().html() && (jQuery(this).addClass("twbb-posts-active-meta-separator"), e = jQuery(this))
				})), null !== e && e.removeClass("twbb-posts-active-meta-separator")
			}))
		}, this.masonry = function() {
			var e = a.imagesLoaded((function() {
				e.masonry({
					gutter: n.settings.masonry_column_gap.size,
					itemSelector: ".twbb-posts-item"
				}).masonry("reloadItems")
			}))
		}, this.pagination = function() {
			var e = "",
				t = "twbb-posts-page-deactive",
				i = "";
			"yes" === this.settings.pagination_first_last_buttons && (i = "twbb-posts-page twbb-posts-page-first", 1 === s && (i += " " + t), e += get_page_link_html(i, 1, this.settings.pagination_first_label)), "yes" === this.settings.pagination_next_prev_buttons && (i = "twbb-posts-page twbb-posts-page-prev", 1 === s && (i += " " + t), e += get_page_link_html(i, s - 1, this.settings.pagination_prev_label));
			var l = this.pages_count > this.settings.pagination_page_limit ? this.settings.pagination_page_limit : this.pages_count;
			if ("yes" === this.settings.pagination_number_buttons)
				for (var d = 1; d <= l; d++) i = "twbb-posts-page twbb-posts-page-num", d === s && (i += " twbb-posts-current-page " + t), e += get_page_link_html(i, d, d);
			"yes" === this.settings.pagination_next_prev_buttons && (i = "twbb-posts-page twbb-posts-page-next", s === this.pages_count && (i += " " + t), e += get_page_link_html(i, s + 1, this.settings.pagination_next_label)), "yes" === this.settings.pagination_first_last_buttons && (i = "twbb-posts-page twbb-posts-page-last", s === this.pages_count && (i += " " + t), e += get_page_link_html(i, l, this.settings.pagination_last_label)), null === r ? (e = "yes" === this.settings.pagination_scroll_top ? "<div class='twbb-posts-pagination twbb-pagination_scroll_top'>" + e + "</div>" : "<div class='twbb-posts-pagination'>" + e + "</div>", a.parent().append(e), r = o.find(".twbb-posts-pagination")) : r.append(e), r.find(".twbb-posts-page").on("click", (function(e) {
				if (e.preventDefault(), !0 === c) return !1;
				var t = parseInt(jQuery(this).data("page"));
				return t < 1 || t > n.pages_count || (s = t, n.get_posts(), jQuery(this).parent().hasClass("twbb-pagination_scroll_top") && jQuery(window).scrollTop(0)), !1
			}))
		}, this.show_loading = function() {
			null === l ? (o.append('<div class="twbb-posts-loading"><i class="twbb-spinner-solid"></i></div>'), l = jQuery(o.find(".twbb-posts-loading"))) : l.show()
		}, this.hide_loading = function() {
			l.hide()
		}, get_page_link_html = function(e, t, n) {
			return "<a href='#' class='" + e + "' data-page='" + t + "'>" + n + "</a>"
		}, posts_print_author = function(e) {
			return "yes" === n.settings.author_meta_link ? "<a href='" + e.link + "'>" + e.name + "</a>" : e.name
		}, posts_print_terms = function(e, t) {
			var s = "",
				i = "tags" === t ? "#" : "",
				o = "categories" === t && "yes" === n.settings.categories_meta_link || "tags" === t && "yes" === n.settings.tags_meta_link;
			for (var r in e) s += !0 === o ? "<a href='" + e[r].link + "'>" + i + e[r].name + "</a>, " : i + e[r].name + ", ";
			return s.trim().slice(0, s.length - 2)
		}, this.clear_html = function() {
			null !== a && a.html(""), null !== r && (r.html(""), "yes" === n.settings.masonry && a.masonry("destroy"))
		}, this.init(), twbb_add_widget(t, this)
	};

function twbb_add_widget(e, t) {
	void 0 === twbb_widgets[e] && (twbb_widgets[e] = []), twbb_widgets[e].push(t)
}

function twbb_get_widgets(e) {
	return void 0 === twbb_widgets[e] ? [] : twbb_widgets[e]
}

function twbb_is_widget_added(e) {
	return jQuery(".elementor-widget-" + e).length > 0
}
jQuery(window).on("elementor/frontend/init", (function() {
		var e = function(e) {
			var t = e.find(".twbb-posts-widget-container");
			new twbb_posts(JSON.parse(t.attr("data-params")), t.attr("data-widget"))
		};
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb-posts.default", e), elementorFrontend.hooks.addAction("frontend/element_ready/twbb-posts-archive.default", e)
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends elementorModules.frontend.handlers.Base {
			getDefaultSettings() {
				return {
					selectors: {
						postsContainer: ".elementor-posts-container",
						postWrapperTag: "article",
						loadMoreButton: ".elementor-button",
						loadMoreSpinnerWrapper: ".e-load-more-spinner",
						loadMoreSpinner: ".e-load-more-spinner i, .e-load-more-spinner svg",
						loadMoreAnchor: ".e-load-more-anchor"
					},
					classes: {
						loadMoreSpin: "eicon-animation-spin",
						loadMoreIsLoading: "e-load-more-pagination-loading",
						loadMorePaginationEnd: "e-load-more-pagination-end",
						loadMoreNoSpinner: "e-load-more-no-spinner"
					}
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					postsWidgetWrapper: this.$element[0],
					postsContainer: this.$element[0].querySelector(e.postsContainer),
					loadMoreButton: this.$element[0].querySelector(e.loadMoreButton),
					loadMoreSpinnerWrapper: this.$element[0].querySelector(e.loadMoreSpinnerWrapper),
					loadMoreSpinner: this.$element[0].querySelector(e.loadMoreSpinner),
					loadMoreAnchor: this.$element[0].querySelector(e.loadMoreAnchor)
				}
			}
			bindEvents() {
				super.bindEvents(), this.elements.loadMoreButton && this.elements.loadMoreButton.addEventListener("click", (e => {
					this.isLoading || (e.preventDefault(), this.handlePostsQuery())
				}))
			}
			onInit() {
				super.onInit(), this.classes = this.getSettings("classes"), this.isLoading = !1;
				const e = this.getElementSettings("pagination_type");
				"load_more_on_click" !== e && "load_more_infinite_scroll" !== e || (this.isInfinteScroll = "load_more_infinite_scroll" === e, this.isSpinnerAvailable = this.getElementSettings("load_more_spinner").value, this.isSpinnerAvailable || this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreNoSpinner), this.isInfinteScroll ? this.handleInfiniteScroll() : this.elements.loadMoreSpinnerWrapper && this.elements.loadMoreButton && this.elements.loadMoreButton.insertAdjacentElement("beforeEnd", this.elements.loadMoreSpinnerWrapper), this.elementId = this.getID(), this.postId = elementorFrontendConfig.post.id, this.elements.loadMoreAnchor && (this.currentPage = parseInt(this.elements.loadMoreAnchor.getAttribute("data-page")), this.maxPage = parseInt(this.elements.loadMoreAnchor.getAttribute("data-max-page")), this.currentPage !== this.maxPage && this.currentPage || this.handleUiWhenNoPosts()))
			}
			handleInfiniteScroll() {
				this.isEdit || (this.observer = elementorModules.utils.Scroll.scrollObserver({
					callback: e => {
						e.isInViewport && !this.isLoading && (this.observer.unobserve(this.elements.loadMoreAnchor), this.handlePostsQuery().then((() => {
							this.currentPage !== this.maxPage && this.observer.observe(this.elements.loadMoreAnchor)
						})))
					}
				}), this.observer.observe(this.elements.loadMoreAnchor))
			}
			handleUiBeforeLoading() {
				this.isLoading = !0, this.elements.loadMoreSpinner && this.elements.loadMoreSpinner.classList.add(this.classes.loadMoreSpin), this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreIsLoading)
			}
			handleUiAfterLoading() {
				this.isLoading = !1, this.elements.loadMoreSpinner && this.elements.loadMoreSpinner.classList.remove(this.classes.loadMoreSpin), this.isInfinteScroll && this.elements.loadMoreSpinnerWrapper && this.elements.loadMoreAnchor && this.elements.loadMoreAnchor.insertAdjacentElement("afterend", this.elements.loadMoreSpinnerWrapper), this.elements.postsWidgetWrapper.classList.remove(this.classes.loadMoreIsLoading)
			}
			handleUiWhenNoPosts() {
				this.elements.postsWidgetWrapper.classList.add(this.classes.loadMorePaginationEnd)
			}
			afterInsertPosts() {}
			handleSuccessFetch(e) {
				this.handleUiAfterLoading();
				const t = this.getSettings("selectors"),
					n = e.querySelectorAll(`[data-id="${this.elementId}"] ${t.postsContainer} > ${t.postWrapperTag}`),
					s = e.querySelector(`[data-id="${this.elementId}"] .e-load-more-anchor`).getAttribute("data-next-page");
				n.forEach((e => this.elements.postsContainer.append(e))), this.elements.loadMoreAnchor.setAttribute("data-page", this.currentPage), this.elements.loadMoreAnchor.setAttribute("data-next-page", s), this.currentPage === this.maxPage && this.handleUiWhenNoPosts(), this.afterInsertPosts(n, e)
			}
			handlePostsQuery() {
				this.handleUiBeforeLoading(), this.currentPage++;
				const e = this.elements.loadMoreAnchor.getAttribute("data-next-page");
				return fetch(e).then((e => e.text())).then((e => {
					const t = (new DOMParser).parseFromString(e, "text/html");
					this.handleSuccessFetch(t)
				}))
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.cards", (function(t) {
			new e({
				$element: t
			}).bindEvents()
		})), elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.classic", (function(t) {
			new e({
				$element: t
			}).bindEvents()
		})), elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.full_content", (function(t) {
			new e({
				$element: t
			}).bindEvents()
		}));
		var t = elementorModules.frontend.handlers.Base.extend({
			getSkinPrefix() {
				return this.elements.$postsContainer.hasClass("elementor-posts--skin-cards") ? "cards_" : "classic_"
			},
			bindEvents() {
				elementorFrontend.addListenerOnce(this.getModelCID(), "resize", this.onWindowResize)
			},
			unbindEvents() {
				elementorFrontend.removeListeners(this.getModelCID(), "resize", this.onWindowResize)
			},
			getClosureMethodsNames() {
				return elementorModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this, arguments).concat(["fitImages", "onWindowResize", "runMasonry"])
			},
			getDefaultSettings: () => ({
				classes: {
					fitHeight: "elementor-fit-height",
					hasItemRatio: "elementor-has-item-ratio"
				},
				selectors: {
					postsContainer: ".elementor-posts-container",
					post: ".elementor-post",
					postThumbnail: ".elementor-post__thumbnail",
					postThumbnailImage: ".elementor-post__thumbnail img"
				}
			}),
			getDefaultElements() {
				var e = this.getSettings("selectors");
				return {
					$postsContainer: this.$element.find(e.postsContainer),
					$posts: this.$element.find(e.post)
				}
			},
			fitImage(e) {
				var t = this.getSettings(),
					n = e.find(t.selectors.postThumbnail),
					s = n.find("img")[0];
				if (s) {
					var i = n.outerHeight() / n.outerWidth(),
						o = s.naturalHeight / s.naturalWidth;
					n.toggleClass(t.classes.fitHeight, o < i)
				}
			},
			fitImages() {
				var e = jQuery,
					t = this,
					n = getComputedStyle(this.$element[0], ":after").content,
					s = this.getSettings();
				this.elements.$postsContainer.toggleClass(s.classes.hasItemRatio, !!n.match(/\d/)), this.elements.$posts.each((function() {
					var n = e(this),
						i = n.find(s.selectors.postThumbnailImage);
					t.fitImage(n), i.on("load", (function() {
						t.fitImage(n)
					}))
				}))
			},
			setColsCountSettings() {
				const e = this.getElementSettings(),
					t = this.getSkinPrefix(),
					n = elementorFrontend.utils.controls.getResponsiveControlValue(e, `${t}columns`);
				this.setSettings("colsCount", n)
			},
			isMasonryEnabled() {
				return !!this.getElementSettings(this.getSkinPrefix() + "masonry")
			},
			initMasonry() {
				imagesLoaded(this.elements.$posts, this.runMasonry)
			},
			getVerticalSpaceBetween() {
				let e = elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), `${this.getSkinPrefix()}row_gap`, "size");
				return "" === this.getSkinPrefix() && "" === e && (e = this.getElementSettings("item_gap.size")), e
			},
			runMasonry() {
				var e = this.elements;
				e.$posts.css({
					marginTop: "",
					transitionDuration: ""
				}), this.setColsCountSettings();
				var t = this.getSettings("colsCount"),
					n = this.isMasonryEnabled() && t >= 2;
				if (e.$postsContainer.toggleClass("elementor-posts-masonry", n), !n) return void e.$postsContainer.height("");
				const s = this.getVerticalSpaceBetween();
				new elementorModules.utils.Masonry({
					container: e.$postsContainer,
					items: e.$posts.filter(":visible"),
					columnsCount: this.getSettings("colsCount"),
					verticalSpaceBetween: s || 0
				}).run()
			},
			run() {
				setTimeout(this.fitImages, 0), this.initMasonry()
			},
			onInit() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.bindEvents(), this.run()
			},
			onWindowResize() {
				this.fitImages(), this.runMasonry()
			},
			onElementChange() {
				this.fitImages(), setTimeout(this.runMasonry)
			}
		});
		class n {
			onInint() {
				var e = this;
				jQuery(".tenweb-posts-slider").each((async function(t, n) {
					var s = jQuery(n).parents(".elementor-widget-tenweb-posts").attr("data-id");
					jQuery(n).attr("id", "tenweb-posts-slider-swiper-" + s);
					var i = jQuery(n).data("settings");
					if (!jQuery.isEmptyObject(i)) {
						i.slidesPerView = {
							desktop: 3,
							tablet: 2,
							mobile: 1
						};
						var o = {
								grabCursor: !0,
								effect: "slide",
								initialSlide: 0,
								slidesPerView: e.getDeviceSlidesPerView("desktop", i),
								loop: "yes" === i.loop
							},
							r = {},
							a = elementorFrontend.config.breakpoints;
						r[a.lg - 1] = {
							slidesPerView: e.getDeviceSlidesPerView("desktop", i),
							slidesPerGroup: e.getSlidesToScroll(i),
							spaceBetween: e.getSpaceBetween("desktop", i)
						}, r[a.md - 1] = {
							slidesPerView: e.getDeviceSlidesPerView("tablet", i),
							slidesPerGroup: e.getSlidesToScroll(i),
							spaceBetween: e.getSpaceBetween("tablet", i)
						}, r[a.xs] = {
							slidesPerView: e.getDeviceSlidesPerView("mobile", i),
							slidesPerGroup: e.getSlidesToScroll(i),
							spaceBetween: e.getSpaceBetween("mobile", i)
						}, o.breakpoints = r;
						var l = "arrows" === i.slider_navigation || "both" === i.slider_navigation,
							c = "dots" === i.slider_navigation || "both" === i.slider_navigation;
						l && (o.navigation = {
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next"
						}), c && (o.pagination = {
							el: ".swiper-pagination",
							type: "bullets",
							clickable: !0
						}), !0 === o.loop && (o.loopedSlides = i.slides_count), "yes" === i.autoplay && (o.autoplay = {
							delay: i.autoplay_speed,
							disableOnInteraction: "yes" === i.disable_on_interaction,
							pauseOnMouseEnter: "yes" === i.pause_on_mouseover
						});
						const t = elementorFrontend.utils.swiper;
						await new t(jQuery("#tenweb-posts-slider-swiper-" + s), o)
					}
				}))
			}
			getInitialSlide(e) {
				return Math.floor((e.slides_count - 1) / 2)
			}
			getSlidesToScroll(e) {
				return Math.min(e.slides_count, +e.slides_to_scroll || 1)
			}
			getDeviceSlidesPerView(e, t) {
				var n = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
				return Math.min(t.slides_count, +t[n] || t.slidesPerView[e])
			}
			getSpaceBetween(e, t) {
				var n = "space_between";
				return e && "desktop" !== e && (n += "_" + e), t.breakpoints[n].size || 0
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.classic", (function(e) {
			new t({
				$element: e
			}), (new n).onInint()
		})), elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.cards", (function(e) {
			new t({
				$element: e
			}), (new n).onInint()
		})), elementorFrontend.hooks.addAction("frontend/element_ready/tenweb-posts.full_content", (function(e) {
			new t({
				$element: e
			}), (new n).onInint()
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			getDefaultSettings: function() {
				return {
					selectors: {
						wrapper: ".tenweb-search-form",
						container: ".tenweb-search-form__container",
						icon: ".tenweb-search-form__icon",
						input: ".tenweb-search-form__input",
						toggle: ".tenweb-search-form__toggle",
						submit: ".tenweb-search-form__submit",
						closeButton: ".dialog-close-button"
					},
					classes: {
						isFocus: "tenweb-search-form--focus",
						isFullScreen: "tenweb-search-form--full-screen",
						lightbox: "tenweb-lightbox"
					}
				}
			},
			getDefaultElements: function() {
				var e = this.getSettings("selectors"),
					t = {};
				return t.$wrapper = this.$element.find(e.wrapper), t.$container = this.$element.find(e.container), t.$input = this.$element.find(e.input), t.$icon = this.$element.find(e.icon), t.$toggle = this.$element.find(e.toggle), t.$submit = this.$element.find(e.submit), t.$closeButton = this.$element.find(e.closeButton), t
			},
			bindEvents: function() {
				var e = this,
					t = e.elements.$container,
					n = e.elements.$closeButton,
					s = e.elements.$input,
					i = e.elements.$wrapper,
					o = e.elements.$icon,
					r = this.getElementSettings("skin"),
					a = this.getSettings("classes");
				"full_screen" === r ? (e.elements.$toggle.on("click", (function() {
					t.toggleClass(a.isFullScreen).toggleClass(a.lightbox), s.focus()
				})), t.on("click", (function(e) {
					t.hasClass(a.isFullScreen) && t[0] === e.target && t.removeClass(a.isFullScreen).removeClass(a.lightbox)
				})), n.on("click", (function() {
					t.removeClass(a.isFullScreen).removeClass(a.lightbox)
				})), elementorFrontend.getElements("$document").keyup((function(e) {
					27 === e.keyCode && t.hasClass(a.isFullScreen) && t.click()
				}))) : s.on({
					focus: function() {
						i.addClass(a.isFocus)
					},
					blur: function() {
						i.removeClass(a.isFocus)
					}
				}), "minimal" === r && o.on("click", (function() {
					i.addClass(a.isFocus), s.focus()
				}))
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbbsearch-form.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})),
	function(e) {
		var t = function(n, s) {
			var i, o = {},
				r = function(e) {
					var n = "";
					if (o.width && o.height) {
						var s = screen.width / 2 - o.width / 2,
							i = screen.height / 2 - o.height / 2;
						n = "toolbar=0,status=0,width=" + o.width + ",height=" + o.height + ",top=" + i + ",left=" + s
					}
					var r = function(e) {
							var n = t.networkTemplates[e].replace(/{([^}]+)}/g, (function(t, n) {
								if ("twitter" == e && "text" == n) {
									var s = jQuery(jQuery.parseHTML(o[n])).text().replace(/\s\s+/g, " "),
										i = window.location.href;
									o[n] = s.substr(0, 345 - i.length) + " ..."
								}
								return o[n]
							}));
							return encodeURI(n)
						}(e),
						a = /^https?:\/\//.test(r);
					open(r, a ? "" : "_self", n)
				},
				a = function() {
					e.each(n.classList, (function() {
						var e, t = (e = this).substr(0, o.classPrefixLength) === o.classPrefix ? e.substr(o.classPrefixLength) : null;
						if (t) return function(e) {
							i.on("click", (function() {
								r(e)
							}))
						}(t), !1
					}))
				};
			e.extend(o, t.defaultSettings, s), ["title", "text"].forEach((function(e) {
				o[e] = o[e].replace("#", "")
			})), o.classPrefixLength = o.classPrefix.length, i = e(n), a()
		};
		t.networkTemplates = {
			twitter: "https://twitter.com/intent/tweet?url={url}&text={text}",
			pinterest: "https://www.pinterest.com/pin/find/?url={url}",
			facebook: "https://www.facebook.com/sharer.php?u={url}",
			vk: "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",
			linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
			odnoklassniki: "http://odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl={url}",
			tumblr: "https://tumblr.com/share/link?url={url}",
			delicious: "https://del.icio.us/save?url={url}&title={title}",
			digg: "https://digg.com/submit?url={url}",
			reddit: "https://reddit.com/submit?url={url}&title={title}",
			pocket: "https://getpocket.com/edit?url={url}",
			whatsapp: "whatsapp://send?text=*{title}*\n{text}\n{url}",
			xing: "https://www.xing.com/app/user?op=share&url={url}",
			print: "javascript:print()",
			email: "mailto:?subject={title}&body={url}",
			telegram: "https://telegram.me/share/url?url={url}&text={text}",
			skype: "https://web.skype.com/share?url={url}"
		}, t.defaultSettings = {
			title: "",
			text: "",
			image: "",
			url: location.href,
			classPrefix: "s_",
			width: 640,
			height: 480
		}, e.each({
			shareLink: t
		}, (function(t) {
			var n = this;
			e.fn[t] = function(s) {
				return this.each((function() {
					e(this).data(t, new n(this, s))
				}))
			}
		}))
	}(jQuery), jQuery(window).on("elementor/frontend/init", (function() {
		var e, t = elementorModules.frontend.handlers.Base;
		e = t.extend({
			onInit: function() {
				t.prototype.onInit.apply(this, arguments);
				var e = this.getElementSettings(),
					n = this.getSettings("classes"),
					s = e.share_url && e.share_url.url,
					i = {
						classPrefix: n.shareLinkPrefix
					};
				s ? i.url = e.share_url.url : (i.url = location.href, i.title = elementorFrontend.config.post.title, i.text = elementorFrontend.config.post.excerpt), this.elements.$shareButton.shareLink(i)
			},
			getDefaultSettings: function() {
				return {
					selectors: {
						shareButton: ".elementor-share-btn"
					},
					classes: {
						shareLinkPrefix: "elementor-share-btn_"
					}
				}
			},
			getDefaultElements: function() {
				var e = this.getSettings("selectors");
				return {
					$shareButton: this.$element.find(e.shareButton)
				}
			}
		}), elementorFrontend.isEditMode() || elementorFrontend.hooks.addAction("frontend/element_ready/twbbshare-buttons.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			getDefaultSettings: function() {
				return {
					selectors: {
						widgetContainer: ".elementor-widget-container",
						postContentContainer: '.elementor:not([data-elementor-type="header"]):not([data-elementor-type="footer"]):not([data-elementor-type="popup"])',
						expandButton: ".elementor-toc__toggle-button--expand",
						collapseButton: ".elementor-toc__toggle-button--collapse",
						body: ".elementor-toc__body",
						headerTitle: ".elementor-toc__header-title"
					},
					classes: {
						anchor: "elementor-menu-anchor",
						listWrapper: "elementor-toc__list-wrapper",
						listItem: "elementor-toc__list-item",
						listTextWrapper: "elementor-toc__list-item-text-wrapper",
						firstLevelListItem: "elementor-toc__top-level",
						listItemText: "elementor-toc__list-item-text",
						activeItem: "elementor-item-active",
						headingAnchor: "elementor-toc__heading-anchor",
						collapsed: "elementor-toc--collapsed"
					},
					listWrapperTag: "numbers" === this.getElementSettings().marker_view ? "ol" : "ul"
				}
			},
			getDefaultElements: function() {
				var e = this.getSettings();
				return {
					$pageContainer: this.getContainer(),
					$widgetContainer: this.$element.find(e.selectors.widgetContainer),
					$expandButton: this.$element.find(e.selectors.expandButton),
					$collapseButton: this.$element.find(e.selectors.collapseButton),
					$tocBody: this.$element.find(e.selectors.body),
					$listItems: this.$element.find("." + e.classes.listItem)
				}
			},
			getContainer: function() {
				var e = this.getSettings(),
					t = this.getElementSettings();
				if (t.container) return jQuery(t.container);
				var n = this.$element.parents(".elementor");
				return "popup" === n.attr("data-elementor-type") ? n : jQuery(e.selectors.postContentContainer)
			},
			bindEvents: function() {
				var e = this,
					t = this.getElementSettings();
				t.minimize_box && (this.elements.$expandButton.on("click", (function() {
					return e.expandBox()
				})), this.elements.$collapseButton.on("click", (function() {
					return e.collapseBox()
				}))), t.collapse_subitems && this.elements.$listItems.on("hover", (function(e) {
					return jQuery(e.target).slideToggle()
				}))
			},
			getHeadings: function() {
				var e = this.getElementSettings(),
					t = e.headings_by_tags.join(","),
					n = this.getSettings("selectors"),
					s = e.exclude_headings_by_selector;
				return this.elements.$pageContainer.find(t).not(n.headerTitle).filter((function(e, t) {
					return !jQuery(t).closest(s).length
				}))
			},
			addAnchorsBeforeHeadings: function() {
				var e = this,
					t = this.getSettings("classes");
				this.elements.$headings.before((function(n) {
					if (!jQuery(e.elements.$headings[n]).data("hasOwnID")) return '<span id="'.concat(t.headingAnchor, "-").concat(n, '" class="').concat(t.anchor, ' "></span>')
				}))
			},
			activateItem: function(e) {
				var t, n = this.getSettings("classes");
				(this.deactivateActiveItem(e), e.addClass(n.activeItem), this.$activeItem = e, this.getElementSettings("collapse_subitems")) && ((t = e.hasClass(n.firstLevelListItem) ? e.parent().next() : e.parents("." + n.listWrapper).eq(-2)).length ? (this.$activeList = t, this.$activeList.stop().slideDown()) : delete this.$activeList)
			},
			deactivateActiveItem: function(e) {
				if (this.$activeItem && !this.$activeItem.is(e)) {
					var t = this.getSettings().classes;
					this.$activeItem.removeClass(t.activeItem), !this.$activeList || e && this.$activeList[0].contains(e[0]) || this.$activeList.slideUp()
				}
			},
			followAnchor: function(e, t) {
				var n, s = this,
					i = e[0].hash;
				try {
					n = jQuery(decodeURIComponent(i))
				} catch (e) {
					return
				}
				elementorFrontend.waypoint(n, (function(i) {
					if (!s.itemClicked) {
						var o = n.attr("id");
						"down" === i ? (s.viewportItems[o] = !0, s.activateItem(e)) : (delete s.viewportItems[o], s.activateItem(s.$listItemTexts.eq(t - 1)))
					}
				}), {
					offset: "bottom-in-view",
					triggerOnce: !1
				}), elementorFrontend.waypoint(n, (function(i) {
					if (!s.itemClicked) {
						var o = n.attr("id");
						"down" === i ? (delete s.viewportItems[o], s.viewportItems.length && s.activateItem(s.$listItemTexts.eq(t + 1))) : (s.viewportItems[o] = !0, s.activateItem(e))
					}
				}), {
					offset: 0,
					triggerOnce: !1
				})
			},
			followAnchors: function() {
				var e = this;
				this.$listItemTexts.each((function(t, n) {
					return e.followAnchor(jQuery(n), t)
				}))
			},
			populateTOC: function() {
				this.listItemPointer = 0, this.getElementSettings().hierarchical_view ? this.createNestedList() : this.createFlatList(), this.$listItemTexts = this.$element.find(".elementor-toc__list-item-text"), this.$listItemTexts.on("click", this.onListItemClick.bind(this)), elementorFrontend.isEditMode() || this.followAnchors()
			},
			createNestedList: function() {
				var e = this;
				this.headingsData.forEach((function(t, n) {
					t.level = 0;
					for (var s = n - 1; s >= 0; s--) {
						var i = e.headingsData[s];
						if (i.tag <= t.tag) {
							t.level = i.level, i.tag < t.tag && t.level++;
							break
						}
					}
				})), this.elements.$tocBody.html(this.getNestedLevel(0))
			},
			createFlatList: function() {
				this.elements.$tocBody.html(this.getNestedLevel())
			},
			getNestedLevel: function(e) {
				for (var t = this.getSettings(), n = this.getElementSettings(), s = this.getElementSettings("icon"), i = "<".concat(t.listWrapperTag, ' class="').concat(t.classes.listWrapper, '">'); this.listItemPointer < this.headingsData.length;) {
					var o = this.headingsData[this.listItemPointer],
						r = t.classes.listItemText;
					if (0 === o.level && (r += " " + t.classes.firstLevelListItem), e > o.level) break;
					if (e === o.level) {
						i += '<li class="'.concat(t.classes.listItem, '">'), i += '<div class="'.concat(t.classes.listTextWrapper, '">');
						var a = '<a href="#'.concat(o.anchorLink, '" class="').concat(r, '">').concat(o.text, "</a>");
						"bullets" === n.marker_view && s && (a = '<i class="'.concat(s.value, '"></i>').concat(a)), i += a, i += "</div>", this.listItemPointer++;
						var l = this.headingsData[this.listItemPointer];
						l && e < l.level && (i += this.getNestedLevel(l.level)), i += "</li>"
					}
				}
				return i += "</".concat(t.listWrapperTag, ">")
			},
			handleNoHeadingsFound: function() {
				return this.elements.$tocBody.html("No headings were found on this page.")
			},
			collapseOnInit: function() {
				var e = this.getElementSettings("minimized_on"),
					t = elementorFrontend.getCurrentDeviceMode();
				("tablet" === e && "desktop" !== t || "mobile" === e && "mobile" === t) && this.collapseBox()
			},
			getHeadingAnchorLink: function(e, t) {
				var n = this.elements.$headings[e].id,
					s = this.elements.$headings[e].closest(".elementor-widget").id,
					i = "";
				return n ? i = n : s && (i = s), n || s ? jQuery(this.elements.$headings[e]).data("hasOwnID", !0) : i = "".concat(t.headingAnchor, "-").concat(e), i
			},
			setHeadingsData: function() {
				var e = this;
				this.headingsData = [];
				var t = this.getSettings("classes");
				this.elements.$headings.each((function(n, s) {
					var i = e.getHeadingAnchorLink(n, t);
					e.headingsData.push({
						tag: +s.nodeName.slice(1),
						text: s.textContent,
						anchorLink: i
					})
				}))
			},
			run: function() {
				if (this.elements.$headings = this.getHeadings(), !this.elements.$headings.length) return this.handleNoHeadingsFound();
				this.setHeadingsData(), elementorFrontend.isEditMode() || this.addAnchorsBeforeHeadings(), this.populateTOC(), this.getElementSettings("minimize_box") && this.collapseOnInit()
			},
			expandBox: function() {
				var e = this.getCurrentDeviceSetting("min_height");
				this.$element.removeClass(this.getSettings("classes.collapsed")), this.elements.$tocBody.slideDown(), this.elements.$widgetContainer.css("min-height", e.size + e.unit)
			},
			collapseBox: function() {
				this.$element.addClass(this.getSettings("classes.collapsed")), this.elements.$tocBody.slideUp(), this.elements.$widgetContainer.css("min-height", "0px")
			},
			onInit: function() {
				for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
				return elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, [this].concat(t)), this.viewportItems = [], this.run()
			},
			onListItemClick: function(e) {
				var t = this;
				this.itemClicked = !0, setTimeout((function() {
					return t.itemClicked = !1
				}), 2e3);
				var n, s = jQuery(e.target),
					i = s.parent().next(),
					o = this.getElementSettings("collapse_subitems");
				o && s.hasClass(this.getSettings("classes.firstLevelListItem")) && i.is(":visible") && (n = !0), this.activateItem(s), o && n && i.slideUp()
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_table-of-contents.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		jQuery(document).on("click", ".elementor-tab-title", (function(e) {
			let t = jQuery(this);
			t.closest(".elementor-toggle-item").addClass("twbb-tab-active"), setTimeout((function() {
				t.closest(".elementor-toggle-item").removeClass("twbb-tab-active")
			}), 400)
		}))
	}));
class TWBB_WooCommerce_Base extends elementorModules.frontend.handlers.Base {
	getDefaultSettings() {
		return {
			selectors: {
				stickyRightColumn: ".e-sticky-right-column"
			},
			classes: {
				stickyRightColumnActive: "e-sticky-right-column--active"
			}
		}
	}
	getDefaultElements() {
		const e = this.getSettings("selectors");
		return {
			$stickyRightColumn: this.$element.find(e.stickyRightColumn)
		}
	}
	bindEvents() {
		elementorFrontend.elements.$document.on("select2:open", (e => {
			this.addSelect2Wrapper(e)
		}))
	}
	addSelect2Wrapper(e) {
		const t = jQuery(e.target).data("select2");
		t.$dropdown && t.$dropdown.addClass("e-woo-select2-wrapper")
	}
	isStickyRightColumnActive() {
		const e = this.getSettings("classes");
		return this.elements.$stickyRightColumn.hasClass(e.stickyRightColumnActive)
	}
	activateStickyRightColumn() {
		const e = this.getElementSettings(),
			t = elementorFrontend.elements.$wpAdminBar,
			n = this.getSettings("classes");
		let s = e.sticky_right_column_offset || 0;
		t.length && "fixed" === t.css("position") && (s += t.height()), "yes" === this.getElementSettings("sticky_right_column") && (this.elements.$stickyRightColumn.addClass(n.stickyRightColumnActive), this.elements.$stickyRightColumn.css("top", s + "px"))
	}
	deactivateStickyRightColumn() {
		if (!this.isStickyRightColumnActive()) return;
		const e = this.getSettings("classes");
		this.elements.$stickyRightColumn.removeClass(e.stickyRightColumnActive)
	}
	toggleStickyRightColumn() {
		this.getElementSettings("sticky_right_column") ? this.isStickyRightColumnActive() || this.activateStickyRightColumn() : this.deactivateStickyRightColumn()
	}
	equalizeElementHeight(e) {
		if (e.length) {
			e.removeAttr("style");
			let t = 0;
			e.each(((e, n) => {
				t = Math.max(t, n.offsetHeight)
			})), 0 < t && e.css({
				height: t + "px"
			})
		}
	}
	removePaddingBetweenPurchaseNote(e) {
		e && e.each(((e, t) => {
			jQuery(t).prev().children("td").addClass("product-purchase-note-is-below")
		}))
	}
	updateWpReferers() {
		const e = this.getSettings("selectors"),
			t = this.$element.find(e.wpHttpRefererInputs),
			n = new URL(document.location);
		n.searchParams.set("elementorPageId", elementorFrontend.config.post.id), n.searchParams.set("elementorWidgetId", this.getID()), t.attr("value", n)
	}
}
jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
				getDefaultSettings: function() {
					return {
						selectors: {
							mainSwiper: ".tenweb-media-carousel-swiper",
							swiperSlide: ".swiper-slide"
						},
						slidesPerView: {
							desktop: 3,
							tablet: 2,
							mobile: 1
						}
					}
				},
				getDefaultElements: function() {
					var e = this.getSettings("selectors"),
						t = {
							$mainSwiper: this.$element.find(e.mainSwiper)
						};
					return t.$mainSwiperSlides = t.$mainSwiper.find(e.swiperSlide), t
				},
				getSlidesCount: function() {
					return this.elements.$mainSwiperSlides.length
				},
				getInitialSlide: function() {
					var e = this.getEditSettings();
					return e.activeItemIndex ? e.activeItemIndex - 1 : 0
				},
				getEffect: function() {
					return this.getElementSettings("effect")
				},
				getDeviceSlidesPerView: function(e) {
					var t = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
					return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || this.getSettings("slidesPerView")[e])
				},
				getSlidesPerView: function(e) {
					return "slide" === this.getEffect() ? this.getDeviceSlidesPerView(e) : 1
				},
				getDesktopSlidesPerView: function() {
					return this.getSlidesPerView("desktop")
				},
				getTabletSlidesPerView: function() {
					return this.getSlidesPerView("tablet")
				},
				getMobileSlidesPerView: function() {
					return this.getSlidesPerView("mobile")
				},
				getDeviceSlidesToScroll: function(e) {
					var t = "slides_to_scroll" + ("desktop" === e ? "" : "_" + e);
					return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || 1)
				},
				getSlidesToScroll: function(e) {
					return "slide" === this.getEffect() ? this.getDeviceSlidesToScroll(e) : 1
				},
				getDesktopSlidesToScroll: function() {
					return this.getSlidesToScroll("desktop")
				},
				getTabletSlidesToScroll: function() {
					return this.getSlidesToScroll("tablet")
				},
				getMobileSlidesToScroll: function() {
					return this.getSlidesToScroll("mobile")
				},
				getSpaceBetween: function(e) {
					var t = "space_between";
					return e && "desktop" !== e && (t += "_" + e), this.getElementSettings(t).size || 0
				},
				getSwiperOptions: function() {
					var e = this.getElementSettings();
					"progress" === e.pagination && (e.pagination = "progressbar");
					var t = {
						grabCursor: !0,
						initialSlide: this.getInitialSlide(),
						loop: "yes" === e.loop,
						speed: e.speed,
						effect: this.getEffect()
					};
					if (e.show_arrows && (t.navigation = {
							prevEl: ".elementor-swiper-button-prev",
							nextEl: ".elementor-swiper-button-next"
						}), e.pagination && (t.pagination = {
							el: ".swiper-pagination",
							type: e.pagination,
							clickable: !0
						}), "cube" !== this.getEffect()) {
						var n = {},
							s = elementorFrontend.config.breakpoints;
						n[s.lg - 1] = {
							slidesPerView: this.getDesktopSlidesPerView(),
							slidesPerGroup: this.getDesktopSlidesToScroll(),
							spaceBetween: this.getSpaceBetween("desktop")
						}, n[s.md - 1] = {
							slidesPerView: this.getTabletSlidesPerView(),
							slidesPerGroup: this.getTabletSlidesToScroll(),
							spaceBetween: this.getSpaceBetween("tablet")
						}, n[s.xs] = {
							slidesPerView: this.getMobileSlidesPerView(),
							slidesPerGroup: this.getMobileSlidesToScroll(),
							spaceBetween: this.getSpaceBetween("mobile")
						}, t.breakpoints = n
					}
					return !this.isEdit && e.autoplay && (t.autoplay = {
						delay: e.autoplay_speed,
						disableOnInteraction: !!e.pause_on_interaction
					}), t
				},
				updateSpaceBetween: function(e, t) {
					var n = t.match("space_between_(.*)"),
						s = n ? n[1] : "desktop",
						i = this.getSpaceBetween(s),
						o = elementorFrontend.config.breakpoints;
					if ("desktop" !== s) {
						var r = {
							tablet: o.lg - 1,
							mobile: o.md - 1
						};
						e.params.breakpoints[r[s]].spaceBetween = i
					} else e.originalParams.spaceBetween = i;
					e.params.spaceBetween = i, e.update()
				},
				async onInit() {
					if (elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.swipers = {}, 1 >= this.getSlidesCount()) return;
					const e = elementorFrontend.utils.swiper;
					this.swipers.main = await new e(this.elements.$mainSwiper, this.getSwiperOptions())
				},
				onElementChange: function(e) {
					1 >= this.getSlidesCount() || (0 === e.indexOf("width") && this.swipers.main.update(), 0 === e.indexOf("space_between") && this.updateSpaceBetween(this.swipers.main, e))
				},
				onEditSettingsChange: function(e) {
					1 >= this.getSlidesCount() || "activeItemIndex" === e && this.swipers.main.slideToLoop(this.getEditSettings("activeItemIndex") - 1)
				}
			}),
			t = e.extend({
				slideshowSpecialElementSettings: ["slides_per_view", "slides_per_view_tablet", "slides_per_view_mobile"],
				isSlideshow: function() {
					return "slideshow" === this.getElementSettings("skin")
				},
				getDefaultSettings: function() {
					var t = e.prototype.getDefaultSettings.apply(this, arguments);
					return this.isSlideshow() && (t.selectors.thumbsSwiper = ".elementor-thumbnails-swiper", t.slidesPerView = {
						desktop: 5,
						tablet: 4,
						mobile: 3
					}), t
				},
				getElementSettings: function(t) {
					return -1 !== this.slideshowSpecialElementSettings.indexOf(t) && this.isSlideshow() && (t = "slideshow_" + t), e.prototype.getElementSettings.call(this, t)
				},
				getDefaultElements: function() {
					var t = this.getSettings("selectors"),
						n = e.prototype.getDefaultElements.apply(this, arguments);
					return this.isSlideshow() && (n.$thumbsSwiper = this.$element.find(t.thumbsSwiper)), n
				},
				getEffect: function() {
					return "coverflow" === this.getElementSettings("skin") ? "coverflow" : e.prototype.getEffect.apply(this, arguments)
				},
				getSlidesPerView: function(t) {
					return this.isSlideshow() ? 1 : "coverflow" === this.getElementSettings("skin") ? this.getDeviceSlidesPerView(t) : e.prototype.getSlidesPerView.apply(this, arguments)
				},
				getSwiperOptions: function() {
					var t = e.prototype.getSwiperOptions.apply(this, arguments);
					return this.isSlideshow() && (t.loopedSlides = this.getSlidesCount(), delete t.pagination, delete t.breakpoints), t
				},
				async onInit() {
					await e.prototype.onInit.apply(this, arguments);
					var t = this.getSlidesCount();
					if (this.isSlideshow() && !(1 >= t)) {
						var n = this.getElementSettings(),
							s = "yes" === n.loop,
							i = {},
							o = elementorFrontend.config.breakpoints;
						i[o.lg - 1] = {
							slidesPerView: this.getDeviceSlidesPerView("desktop"),
							spaceBetween: this.getSpaceBetween("desktop")
						}, i[o.md - 1] = {
							slidesPerView: this.getDeviceSlidesPerView("tablet"),
							spaceBetween: this.getSpaceBetween("tablet")
						}, i[o.xs] = {
							slidesPerView: this.getDeviceSlidesPerView("mobile"),
							spaceBetween: this.getSpaceBetween("mobile")
						};
						var r = {
							initialSlide: this.getInitialSlide(),
							centeredSlides: n.centered_slides,
							slideToClickedSlide: !0,
							loopedSlides: t,
							loop: s,
							onSlideChangeEnd: function(e) {
								s && e.fixLoop()
							},
							breakpoints: i
						};
						this.swipers.main.controller.control = this.swipers.thumbs = new Swiper(this.elements.$thumbsSwiper, r), this.swipers.thumbs.controller.control = this.swipers.main
					}
				},
				onElementChange: function(t) {
					1 >= this.getSlidesCount() || (this.isSlideshow() ? (0 === t.indexOf("width") && (this.swipers.main.update(), this.swipers.thumbs.update()), 0 === t.indexOf("space_between") && this.updateSpaceBetween(this.swipers.thumbs, t)) : e.prototype.onElementChange.apply(this, arguments))
				}
			});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_media-carousel.default", (function(e) {
			e.find(".elementor-widget-twbb_media-carousel .tenweb-media-carousel-swiper");
			new t({
				$element: e
			})
		}))
	})),
	function(e, t) {
		tenwebParallax = function(n, s) {
			var i = {
				vertical_scroll: {
					active: !1,
					direction: "up",
					speed: 4
				},
				horizontal_scroll: {
					active: !1,
					direction: "right",
					speed: 4
				},
				transparency: {
					active: !1,
					direction: "in",
					speed: 5
				},
				blur: {
					active: !1,
					direction: "in",
					speed: 10
				},
				scale: {
					active: !1,
					direction: "in",
					speed: 10
				}
			};
			this.element = n;
			var o = {};
			! function(e) {
				o = i, "object" != typeof e && (o = i);
				let t = Object.entries(e);
				for (let e = 0; e < t.length; e++) "object" == typeof t[e] && "object" == typeof i[t[e][0]] && "object" == typeof t[e][1] && (void 0 !== t[e][1].active && ["on", "yes", "On", "Yes", !0].includes(t[e][1].active) && (o[t[e][0]].active = !0), void 0 !== t[e][1].speed && 0 <= t[e][1].speed <= 10 && (o[t[e][0]].speed = t[e][1].speed), void 0 !== t[e][1].direction && ["in", "out", "up", "down"].includes(t[e][1].direction) && (o[t[e][0]].direction = t[e][1].direction))
			}(s), this.layerDiv = function() {
				var s = e.createElement("div");
				s.classList.add("tenweb-elementor-scrolling-effects-container");
				var i = e.createElement("div");
				i.classList.add("tenweb-elementor-scrolling-effects-layer");
				var o = n.currentStyle || t.getComputedStyle(n, null);
				return i.style.backgroundImage = o.backgroundImage, i.style.backgroundPosition = o.backgroundPosition, i.style.backgroundRepeat = o.backgroundRepeat, i.style.backgroundSize = o.backgroundSize, s.appendChild(i), n.prepend(s), i
			}(), this.options = o
		}, tenwebParallax.prototype = {
			vertical_transform: function() {
				if (this.options.vertical_scroll.active) {
					if (this.layerDiv.style.height = 100 + 100 * this.options.vertical_scroll.speed / 10 + "%", this.isElementVisible()) {
						var e = this.element.offsetHeight * this.options.vertical_scroll.speed / 2 / 10,
							n = -(t.scrollY + t.innerHeight - this.element.offsetTop) * this.options.vertical_scroll.speed / 4 / 10;
						return "down" == this.options.vertical_scroll.direction && (n = -n), "translateY(calc(-" + e + "px + " + n + "px))"
					}
					return ""
				}
				return ""
			},
			horizontal_transform: function() {
				if (this.options.horizontal_scroll.active) {
					if (this.layerDiv.style.width = 100 + 100 * this.options.horizontal_scroll.speed / 10 + "%", this.isElementVisible()) {
						var e = (t.scrollY + t.innerHeight - this.element.offsetTop) * this.options.horizontal_scroll.speed / 4 / 10,
							n = this.element.offsetWidth * this.options.horizontal_scroll.speed / 2 / 10;
						return "left" == this.options.horizontal_scroll.direction && (e = -e), "translateX(calc(-" + n + "px + " + e + "px))"
					}
					return ""
				}
				return ""
			},
			transparency: function() {
				return this.options.transparency.active && this.isElementVisible() ? (opacity_value = (t.scrollY + t.innerHeight - this.element.offsetTop) / (this.element.offsetHeight + t.innerHeight), opacity_value *= this.options.transparency.speed / 10, "out" == this.options.transparency.direction && (opacity_value = 1 - opacity_value), opacity_value) : ""
			},
			blur: function() {
				return this.options.blur.active && this.isElementVisible() ? (blur_value = (t.scrollY + t.innerHeight - this.element.offsetTop) / (this.element.offsetHeight + t.innerHeight), blur_value *= this.options.blur.speed, "out" == this.options.blur.direction && (blur_value = 10 - blur_value), "blur(" + blur_value + "px)") : ""
			},
			scale: function() {
				return this.options.scale.active && this.isElementVisible() ? (scale_value = (t.scrollY + t.innerHeight - this.element.offsetTop) / (this.element.offsetHeight + t.innerHeight), scale_value = scale_value * this.options.scale.speed / 10, scale_value += 1, "out" == this.options.scale.direction && (scale_value = 2 - scale_value), "scale(" + scale_value + ")") : ""
			},
			onScroll: function() {
				var e = this.vertical_transform();
				e += this.horizontal_transform(), e += this.scale(), this.layerDiv.style.transform = e, this.layerDiv.style.opacity = this.transparency(), this.layerDiv.style.filter = this.blur()
			},
			onResize: function() {
				var e = this.vertical_transform();
				e += this.horizontal_transform(), e += this.scale(), this.layerDiv.style.transform = e, this.layerDiv.style.opacity = this.transparency(), this.layerDiv.style.filter = this.blur()
			},
			changePosition: function() {},
			isElementVisible: function() {
				var n = this.element.getBoundingClientRect();
				return n.top + n.height >= 0 && n.top <= (t.innerHeight || e.documentElement.clientHeight)
			},
			elementTopPosition: function() {},
			elementBottomPosition: function() {},
			addDisableBackgroundClass: function() {
				this.element.classList.add("tenweb-disable-background-image")
			},
			removeDisableBackgroundClass: function() {
				this.element.classList.remove("tenweb-disable-background-image")
			},
			start: function() {
				return this.onScroll = this.onScroll.bind(this), this.onResize = this.onResize.bind(this), this.addDisableBackgroundClass(), t.addEventListener("scroll", this.onScroll), t.addEventListener("resize", this.onResize), this.onResize(), this
			},
			destroy: function() {
				this.layerDiv.parentElement.remove(), this.removeDisableBackgroundClass(), t.removeEventListener("scroll", this.onScroll), t.removeEventListener("resize", this.onResize)
			}
		}
	}(document, window), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			defoult_settings: {
				background_background: "classic",
				tenweb_enable_parallax_efects: "no",
				"tenweb_vertical_scroll_efects-direction": "down",
				"tenweb_vertical_scroll_efects-speed": {
					unit: "px",
					size: 4.5,
					sizes: []
				},
				tenweb_vertical_scroll_efects: "no",
				tenweb_horizontal_scroll_efects: "no",
				tenweb_transparency_efects: "no",
				tenweb_blur_efects: "no",
				tenweb_scale_efects: "no",
				"tenweb_horizontal_scroll_efects-direction": "left",
				"tenweb_horizontal_scroll_efects-speed": {
					unit: "px",
					size: 4,
					sizes: []
				},
				"tenweb_transparency_efects-direction": "in",
				"tenweb_transparency_efects-speed": {
					unit: "px",
					size: 4,
					sizes: []
				},
				"tenweb_blur_efects-direction": "in",
				"tenweb_blur_efects-speed": {
					unit: "px",
					size: 4,
					sizes: []
				},
				"tenweb_scale_efects-direction": "in",
				"tenweb_scale_efects-speed": {
					unit: "px",
					size: 4,
					sizes: []
				},
				tenweb_parallax_on: ["desktop", "tablet", "mobile"]
			},
			current_settings: {},
			curParalax: {},
			elementBgImg: "",
			is_active: !1,
			updateSettings: function(e) {
				var t = this;
				for (const [n, s] of Object.entries(t.defoult_settings)) void 0 !== e[n] ? t.current_settings[n] = e[n] : t.current_settings[n] = t.defoult_settings[n]
			},
			isSectionParallax: function(e) {
				return !!e.hasOwnProperty("tenweb_enable_parallax_efects")
			},
			activate: function() {
				var e = this,
					t = e.$element[0];
				e.is_active && e.deactivate(), e.curParalax = new tenwebParallax(t, {
					vertical_scroll: {
						active: e.current_settings.tenweb_vertical_scroll_efects,
						speed: e.current_settings["tenweb_vertical_scroll_efects-speed"].size,
						direction: e.current_settings["tenweb_vertical_scroll_efects-direction"]
					},
					horizontal_scroll: {
						active: e.current_settings.tenweb_horizontal_scroll_efects,
						speed: e.current_settings["tenweb_horizontal_scroll_efects-speed"].size,
						direction: e.current_settings["tenweb_horizontal_scroll_efects-direction"]
					},
					transparency: {
						active: e.current_settings.tenweb_transparency_efects,
						speed: e.current_settings["tenweb_transparency_efects-speed"].size,
						direction: e.current_settings["tenweb_transparency_efects-direction"]
					},
					blur: {
						active: e.current_settings.tenweb_blur_efects,
						speed: e.current_settings["tenweb_blur_efects-speed"].size,
						direction: e.current_settings["tenweb_blur_efects-direction"]
					},
					scale: {
						active: e.current_settings.tenweb_scale_efects,
						speed: e.current_settings["tenweb_scale_efects-speed"].size,
						direction: e.current_settings["tenweb_scale_efects-direction"]
					}
				}).start(), e.is_active = !0
			},
			deactivate: function() {
				var e = this;
				e.$element[0];
				"function" == typeof e.curParalax.destroy && e.curParalax.destroy(), e.is_active = !1
			},
			run: function(e) {
				var t = this.getElementSettings();
				if (this.isSectionParallax(t))
					if (this.updateSettings(t), "yes" === this.current_settings.tenweb_enable_parallax_efects && "classic" === this.current_settings.background_background) {
						var n = elementorFrontend.getCurrentDeviceMode(); - 1 !== this.getElementSettings("tenweb_parallax_on").indexOf(n) ? this.activate() : this.deactivate()
					} else this.deactivate();
				else this.deactivate()
			},
			reactivate: function() {
				this.deactivate(), this.activate()
			},
			onElementChange: function(e) {
				this.run()
			},
			onInit: function() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.run()
			},
			onDestroy: function() {
				elementorModules.frontend.handlers.Base.prototype.onDestroy.apply(this, arguments), this.deactivate()
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/section", (function(t) {
			new e({
				$element: t
			})
		}))
	}));
var posts_base = elementorModules.frontend.handlers.Base.extend({
		getSkinPrefix: () => "classic_",
		bindEvents() {
			var e = this.getModelCID();
			elementorFrontend.addListenerOnce(e, "resize", this.onWindowResize)
		},
		getClosureMethodsNames() {
			return elementorModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this, arguments).concat(["fitImages", "onWindowResize", "runMasonry"])
		},
		getDefaultSettings: () => ({
			classes: {
				fitHeight: "elementor-fit-height",
				hasItemRatio: "elementor-has-item-ratio"
			},
			selectors: {
				postsContainer: ".elementor-posts-container",
				post: ".elementor-post",
				postThumbnail: ".elementor-post__thumbnail",
				postThumbnailImage: ".elementor-post__thumbnail img"
			}
		}),
		getDefaultElements() {
			var e = this.getSettings("selectors");
			return {
				$postsContainer: this.$element.find(e.postsContainer),
				$posts: this.$element.find(e.post)
			}
		},
		fitImage(e) {
			var t = this.getSettings(),
				n = e.find(t.selectors.postThumbnail),
				s = n.find("img")[0];
			if (s) {
				var i = n.outerHeight() / n.outerWidth(),
					o = s.naturalHeight / s.naturalWidth;
				n.toggleClass(t.classes.fitHeight, o < i)
			}
		},
		fitImages() {
			var e = jQuery,
				t = this,
				n = getComputedStyle(this.$element[0], ":after").content,
				s = this.getSettings();
			this.elements.$postsContainer.toggleClass(s.classes.hasItemRatio, !!n.match(/\d/)), t.isMasonryEnabled() || this.elements.$posts.each((function() {
				var n = e(this),
					i = n.find(s.selectors.postThumbnailImage);
				t.fitImage(n), i.on("load", (function() {
					t.fitImage(n)
				}))
			}))
		},
		setColsCountSettings() {
			var e, t = elementorFrontend.getCurrentDeviceMode(),
				n = this.getElementSettings(),
				s = this.getSkinPrefix();
			switch (t) {
				case "mobile":
					e = n[s + "columns_mobile"];
					break;
				case "tablet":
					e = n[s + "columns_tablet"];
					break;
				default:
					e = n[s + "columns"]
			}
			this.setSettings("colsCount", e)
		},
		isMasonryEnabled() {
			return !!this.getElementSettings(this.getSkinPrefix() + "masonry")
		},
		initMasonry() {
			imagesLoaded(this.elements.$posts, this.runMasonry)
		},
		runMasonry() {
			var e = this.elements;
			e.$posts.css({
				marginTop: "",
				transitionDuration: ""
			}), this.setColsCountSettings();
			var t = this.getSettings("colsCount"),
				n = this.isMasonryEnabled() && t >= 2;
			if (e.$postsContainer.toggleClass("elementor-posts-masonry", n), n) {
				var s = this.getElementSettings(this.getSkinPrefix() + "row_gap.size");
				"" === this.getSkinPrefix() && "" === s && (s = this.getElementSettings(this.getSkinPrefix() + "item_gap.size")), new elementorModules.utils.Masonry({
					container: e.$postsContainer,
					items: e.$posts.filter(":visible"),
					columnsCount: this.getSettings("colsCount"),
					verticalSpaceBetween: s
				}).run()
			} else e.$postsContainer.height("")
		},
		run() {
			setTimeout(this.fitImages, 0), this.initMasonry()
		},
		onInit() {
			elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.bindEvents(), this.run()
		},
		onWindowResize() {
			this.fitImages(), this.runMasonry()
		},
		onElementChange() {
			this.fitImages(), setTimeout(this.runMasonry)
		}
	}),
	portfolio = posts_base.extend({
		isActive: e => e.$element.find(".elementor-portfolio").length,
		getSkinPrefix: () => "",
		getDefaultSettings() {
			var e = posts_base.prototype.getDefaultSettings.apply(this, arguments);
			return e.transitionDuration = 450, jQuery.extend(e.classes, {
				active: "elementor-active",
				item: "elementor-portfolio-item",
				ghostItem: "elementor-portfolio-ghost-item"
			}), e
		},
		getDefaultElements() {
			var e = posts_base.prototype.getDefaultElements.apply(this, arguments);
			return e.$filterButtons = this.$element.find(".elementor-portfolio__filter"), e
		},
		getOffset(e, t, n) {
			var s = this.getSettings(),
				i = this.elements.$postsContainer.width() / s.colsCount - t;
			return {
				start: (t + (i += i / (s.colsCount - 1))) * (e % s.colsCount),
				top: (n + i) * Math.floor(e / s.colsCount)
			}
		},
		getClosureMethodsNames() {
			return posts_base.prototype.getClosureMethodsNames.apply(this, arguments).concat(["onFilterButtonClick"])
		},
		filterItems(e) {
			var t = this.elements.$posts,
				n = this.getSettings("classes.active"),
				s = ".elementor-filter-" + e;
			"__all" !== e ? (t.not(s).removeClass(n), t.filter(s).addClass(n)) : t.addClass(n)
		},
		removeExtraGhostItems() {
			var e = this.getSettings(),
				t = this.elements.$posts.filter(":visible"),
				n = (e.colsCount - t.length % e.colsCount) % e.colsCount;
			this.elements.$postsContainer.find("." + e.classes.ghostItem).slice(n).remove()
		},
		handleEmptyColumns() {
			this.removeExtraGhostItems();
			for (var e = this.getSettings(), t = this.elements.$posts.filter(":visible"), n = this.elements.$postsContainer.find("." + e.classes.ghostItem), s = (e.colsCount - (t.length + n.length) % e.colsCount) % e.colsCount, i = 0; i < s; i++) this.elements.$postsContainer.append(jQuery("<div>", {
				class: e.classes.item + " " + e.classes.ghostItem
			}))
		},
		showItems(e) {
			e.show(), setTimeout((function() {
				e.css({
					opacity: 1
				})
			}))
		},
		hideItems(e) {
			e.hide()
		},
		arrangeGrid() {
			var e = jQuery,
				t = this,
				n = t.getSettings(),
				s = t.elements.$posts.filter("." + n.classes.active),
				i = t.elements.$posts.not("." + n.classes.active),
				o = t.elements.$posts.filter(":visible"),
				r = s.add(o),
				a = s.filter(":visible"),
				l = s.filter(":hidden"),
				c = i.filter(":visible"),
				d = o.outerWidth(),
				h = o.outerHeight();
			if (t.elements.$posts.css("transition-duration", n.transitionDuration + "ms"), t.showItems(l), t.isEdit && t.fitImages(), t.handleEmptyColumns(), t.isMasonryEnabled()) return t.hideItems(c), t.showItems(l), t.handleEmptyColumns(), void t.runMasonry();
			c.css({
				opacity: 0,
				transform: "scale3d(0.2, 0.2, 1)"
			}), a.each((function() {
				var n = e(this),
					s = t.getOffset(r.index(n), d, h),
					i = t.getOffset(o.index(n), d, h);
				s.start === i.start && s.top === i.top || (i.start -= s.start, i.top -= s.top, elementorFrontend.config.is_rtl && (i.start *= -1), n.css({
					transitionDuration: "",
					transform: "translate3d(" + i.start + "px, " + i.top + "px, 0)"
				}))
			})), setTimeout((function() {
				s.each((function() {
					var i = e(this),
						o = t.getOffset(r.index(i), d, h),
						a = t.getOffset(s.index(i), d, h);
					i.css({
						transitionDuration: n.transitionDuration + "ms"
					}), a.start -= o.start, a.top -= o.top, elementorFrontend.config.is_rtl && (a.start *= -1), setTimeout((function() {
						i.css("transform", "translate3d(" + a.start + "px, " + a.top + "px, 0)")
					}))
				}))
			})), setTimeout((function() {
				t.hideItems(c), s.css({
					transitionDuration: "",
					transform: "translate3d(0px, 0px, 0px)"
				}), t.handleEmptyColumns()
			}), n.transitionDuration)
		},
		activeFilterButton(e) {
			var t = this.getSettings("classes.active"),
				n = this.elements.$filterButtons,
				s = n.filter('[data-filter="' + e + '"]');
			n.removeClass(t), s.addClass(t)
		},
		setFilter(e) {
			this.activeFilterButton(e), this.filterItems(e), this.arrangeGrid()
		},
		refreshGrid() {
			this.setColsCountSettings(), this.arrangeGrid()
		},
		bindEvents() {
			posts_base.prototype.bindEvents.apply(this, arguments), this.elements.$filterButtons.on("click", this.onFilterButtonClick)
		},
		isMasonryEnabled() {
			return !!this.getElementSettings("masonry")
		},
		run() {
			posts_base.prototype.run.apply(this, arguments), this.setColsCountSettings(), this.setFilter("__all"), this.handleEmptyColumns()
		},
		onFilterButtonClick(e) {
			this.setFilter(jQuery(e.currentTarget).data("filter"))
		},
		onWindowResize() {
			posts_base.prototype.onWindowResize.apply(this, arguments), this.refreshGrid()
		},
		onElementChange(e) {
			posts_base.prototype.onElementChange.apply(this, arguments), "classic_item_ratio" === e && this.refreshGrid()
		}
	});
jQuery(window).on("elementor/frontend/init", (function() {
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_portfolio.default", (function(e) {
		new portfolio({
			$element: e
		})
	}))
}));
var _circularProgress = class {
		constructor(e, t) {
			this.settings = t, this.lastKnownProgress = null, this.circularProgressTracker = e.find(".elementor-scrolling-tracker-circular")[0], this.circularCurrentProgress = this.circularProgressTracker.getElementsByClassName("current-progress")[0], this.circularCurrentProgressPercentage = this.circularProgressTracker.getElementsByClassName("current-progress-percentage")[0];
			const n = 2 * this.circularCurrentProgress.r.baseVal.value * Math.PI;
			this.circularCurrentProgress.style.strokeDasharray = `${n} ${n}`, this.circularCurrentProgress.style.strokeDashoffset = n, this.elements = this.cacheElements(), this.resizeObserver = new ResizeObserver((() => {
				this.lastKnownProgress && this.updateProgress(this.lastKnownProgress)
			})), this.resizeObserver.observe(this.circularProgressTracker)
		}
		cacheElements() {
			return {
				circularProgressTracker: this.circularProgressTracker,
				circularCurrentProgress: this.circularCurrentProgress,
				circularCurrentProgressPercentage: this.circularCurrentProgressPercentage
			}
		}
		updateProgress(e) {
			if (e <= 0) return this.elements.circularCurrentProgress.style.display = "none", void(this.elements.circularCurrentProgressPercentage.style.display = "none");
			this.elements.circularCurrentProgress.style.display = "block", this.elements.circularCurrentProgressPercentage.style.display = "block";
			const t = 2 * this.elements.circularCurrentProgress.r.baseVal.value * Math.PI,
				n = t - e / 100 * t;
			this.lastKnownProgress = e, this.elements.circularCurrentProgress.style.strokeDasharray = `${t} ${t}`, this.elements.circularCurrentProgress.style.strokeDashoffset = "ltr" === this.settings.direction ? -n : n, "yes" === this.settings.percentage && (this.elements.circularCurrentProgressPercentage.innerHTML = Math.round(e) + "%")
		}
		onDestroy() {
			this.resizeObserver.unobserve(this.circularProgressTracker)
		}
	},
	_linearProgress = class {
		constructor(e, t) {
			this.settings = t, this.linearProgressTracker = e.find(".elementor-scrolling-tracker-horizontal")[0], this.linearCurrentProgress = this.linearProgressTracker.getElementsByClassName("current-progress")[0], this.linearCurrentProgressPercentage = this.linearProgressTracker.getElementsByClassName("current-progress-percentage")[0], this.elements = this.cacheElements()
		}
		cacheElements() {
			return {
				linearProgressTracker: this.linearProgressTracker,
				linearCurrentProgress: this.linearCurrentProgress,
				linearCurrentProgressPercentage: this.linearCurrentProgressPercentage
			}
		}
		updateProgress(e) {
			e < 1 ? this.elements.linearCurrentProgress.style.display = "none" : (this.elements.linearCurrentProgress.style.display = "flex", this.elements.linearCurrentProgress.style.width = e + "%", "yes" === this.settings.percentage && this.elements.linearCurrentProgress.getBoundingClientRect().width > 1.5 * this.elements.linearCurrentProgressPercentage.getBoundingClientRect().width ? (this.elements.linearCurrentProgressPercentage.innerHTML = Math.round(e) + "%", this.elements.linearCurrentProgressPercentage.style.color = getComputedStyle(this.linearCurrentProgress).getPropertyValue("--percentage-color")) : this.elements.linearCurrentProgressPercentage.style.color = "transparent")
		}
	},
	ProgressTracker = class extends elementorModules.frontend.handlers.Base {
		onInit() {
			elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.circular = "circular" === this.getElementSettings().type;
			const e = this.circular ? _circularProgress : _linearProgress;
			this.progressBar = new e(this.$element, this.getElementSettings()), this.progressPercentage = 0, this.scrollHandler(), this.handler = this.scrollHandler.bind(this), this.initListeners()
		}
		getTrackingElementSelector() {
			let e;
			switch (this.getElementSettings().relative_to) {
				case "selector":
					e = jQuery(this.getElementSettings().selector);
					break;
				case "post_content":
					e = jQuery(".elementor-widget-theme-post-content");
					break;
				default:
					e = this.isScrollSnap() ? jQuery("#e-scroll-snap-container") : elementorFrontend.elements.$body
			}
			return e
		}
		isScrollSnap() {
			return "yes" === (this.isEdit ? elementor.settings.page.model.attributes.scroll_snap : elementorFrontend.config.settings.page.scroll_snap)
		}
		addScrollSnapContainer() {
			this.isScrollSnap() && !jQuery("#e-scroll-snap-container").length && jQuery("body").wrapInner('<div id="e-scroll-snap-container" />')
		}
		scrollHandler() {
			this.addScrollSnapContainer();
			const e = this.getTrackingElementSelector(),
				t = e.is(elementorFrontend.elements.$body) || e.is(jQuery("#e-scroll-snap-container")) ? -100 : 0;
			this.progressPercentage = elementorModules.utils.Scroll.getElementViewportPercentage(this.getTrackingElementSelector(), {
				start: t,
				end: -100
			}), this.progressBar.updateProgress(this.progressPercentage)
		}
		initListeners() {
			window.addEventListener("scroll", this.handler), elementorFrontend.elements.$body[0].addEventListener("scroll", this.handler)
		}
		onDestroy() {
			this.progressBar.onDestroy && this.progressBar.onDestroy(), window.removeEventListener("scroll", this.handler), elementorFrontend.elements.$body[0].removeEventListener("scroll", this.handler)
		}
	};
jQuery(window).on("elementor/frontend/init", (function() {
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_progress-tracker.default", (function(e) {
		new ProgressTracker({
			$element: e
		})
	}))
})), _base = class extends elementorModules.frontend.handlers.SwiperBase {
	getDefaultSettings() {
		return {
			selectors: {
				swiperContainer: ".elementor-main-swiper",
				swiperSlide: ".swiper-slide"
			},
			slidesPerView: {
				widescreen: 3,
				desktop: 3,
				laptop: 3,
				tablet_extra: 3,
				tablet: 2,
				mobile_extra: 2,
				mobile: 1
			}
		}
	}
	getDefaultElements() {
		const e = this.getSettings("selectors"),
			t = {
				$swiperContainer: this.$element.find(e.swiperContainer)
			};
		return t.$slides = t.$swiperContainer.find(e.swiperSlide), t
	}
	getEffect() {
		return this.getElementSettings("effect")
	}
	getDeviceSlidesPerView(e) {
		const t = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
		return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || this.getSettings("slidesPerView")[e])
	}
	getSlidesPerView(e) {
		return "slide" === this.getEffect() ? this.getDeviceSlidesPerView(e) : 1
	}
	getDeviceSlidesToScroll(e) {
		const t = "slides_to_scroll" + ("desktop" === e ? "" : "_" + e);
		return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || 1)
	}
	getSlidesToScroll(e) {
		return "slide" === this.getEffect() ? this.getDeviceSlidesToScroll(e) : 1
	}
	getSpaceBetween(e) {
		let t = "space_between";
		return e && "desktop" !== e && (t += "_" + e), this.getElementSettings(t).size || 0
	}
	getSwiperOptions() {
		const e = this.getElementSettings(),
			t = {
				grabCursor: !0,
				initialSlide: this.getInitialSlide(),
				slidesPerView: this.getSlidesPerView("desktop"),
				slidesPerGroup: this.getSlidesToScroll("desktop"),
				spaceBetween: this.getSpaceBetween(),
				loop: "yes" === e.loop,
				speed: e.speed,
				effect: this.getEffect(),
				preventClicksPropagation: !1,
				slideToClickedSlide: !0,
				handleElementorBreakpoints: !0
			};
		if ("yes" === e.lazyload && (t.lazy = {
				loadPrevNext: !0,
				loadPrevNextAmount: 1
			}), e.show_arrows && (t.navigation = {
				prevEl: ".elementor-swiper-button-prev",
				nextEl: ".elementor-swiper-button-next"
			}), e.pagination && (t.pagination = {
				el: ".swiper-pagination",
				type: e.pagination,
				clickable: !0
			}), "cube" !== this.getEffect()) {
			const e = {},
				n = elementorFrontend.config.responsive.activeBreakpoints;
			Object.keys(n).forEach((t => {
				e[n[t].value] = {
					slidesPerView: this.getSlidesPerView(t),
					slidesPerGroup: this.getSlidesToScroll(t),
					spaceBetween: this.getSpaceBetween(t)
				}
			})), t.breakpoints = e
		}
		return !this.isEdit && e.autoplay && (t.autoplay = {
			delay: e.autoplay_speed,
			disableOnInteraction: !!e.pause_on_interaction
		}), t
	}
	getDeviceBreakpointValue(e) {
		if (!this.breakpointsDictionary) {
			const e = elementorFrontend.config.responsive.activeBreakpoints;
			this.breakpointsDictionary = {}, Object.keys(e).forEach((t => {
				this.breakpointsDictionary[t] = e[t].value
			}))
		}
		return this.breakpointsDictionary[e]
	}
	updateSpaceBetween(e) {
		const t = e.match("space_between_(.*)"),
			n = t ? t[1] : "desktop",
			s = this.getSpaceBetween(n);
		"desktop" !== n ? this.swiper.params.breakpoints[this.getDeviceBreakpointValue(n)].spaceBetween = s : this.swiper.params.spaceBetween = s, this.swiper.params.spaceBetween = s, this.swiper.update()
	}
	async onInit() {
		elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
		const e = this.getElementSettings();
		if (1 >= this.getSlidesCount()) return;
		const t = elementorFrontend.utils.swiper;
		this.swiper = await new t(this.elements.$swiperContainer, this.getSwiperOptions()), "yes" === e.pause_on_hover && this.togglePauseOnHover(!0), this.elements.$swiperContainer.data("swiper", this.swiper)
	}
	getChangeableProperties() {
		return {
			autoplay: "autoplay",
			pause_on_hover: "pauseOnHover",
			pause_on_interaction: "disableOnInteraction",
			autoplay_speed: "delay",
			speed: "speed",
			width: "width"
		}
	}
	updateSwiperOption(e) {
		if (0 === e.indexOf("width")) return void this.swiper.update();
		const t = this.getElementSettings(),
			n = t[e];
		let s = this.getChangeableProperties()[e],
			i = n;
		switch (e) {
			case "autoplay":
				i = !!n && {
					delay: t.autoplay_speed,
					disableOnInteraction: "yes" === t.pause_on_interaction
				};
				break;
			case "autoplay_speed":
				s = "autoplay", i = {
					delay: n,
					disableOnInteraction: "yes" === t.pause_on_interaction
				};
				break;
			case "pause_on_hover":
				this.togglePauseOnHover("yes" === n);
				break;
			case "pause_on_interaction":
				i = "yes" === n
		}
		"pause_on_hover" !== e && (this.swiper.params[s] = i), this.swiper.update()
	}
	onElementChange(e) {
		if (1 >= this.getSlidesCount()) return;
		if (0 === e.indexOf("width")) return this.swiper.update(), void(this.thumbsSwiper && this.thumbsSwiper.update());
		if (0 === e.indexOf("space_between")) return void this.updateSpaceBetween(e);
		this.getChangeableProperties().hasOwnProperty(e) && this.updateSwiperOption(e)
	}
	onEditSettingsChange(e) {
		1 >= this.getSlidesCount() || "activeItemIndex" === e && this.swiper.slideToLoop(this.getEditSettings("activeItemIndex") - 1)
	}
};
class TestimonialCarousel extends _base {
	getDefaultSettings() {
		const e = super.getDefaultSettings();
		return e.slidesPerView = {
			desktop: 1
		}, Object.keys(elementorFrontend.config.responsive.activeBreakpoints).forEach((t => {
			e.slidesPerView[t] = 1
		})), e.loop && (e.loopedSlides = this.getSlidesCount()), e
	}
	getEffect() {
		return "slide"
	}
}
jQuery(window).on("elementor/frontend/init", (function() {
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_reviews.default", (function(e) {
			new TestimonialCarousel({
				$element: e
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			getDefaultSettings: function() {
				return {
					selectors: {
						slider: ".twbb_slides-wrapper",
						slideContent: ".swiper-slide",
						slideInnerContents: ".swiper-slide-contents"
					},
					classes: {
						animated: "animated"
					},
					attributes: {
						dataSliderOptions: "slider_options",
						dataAnimation: "animation"
					},
					slidesPerView: {
						desktop: 1,
						tablet: 1,
						mobile: 1
					}
				}
			},
			getDefaultElements: function() {
				var e = this.getSettings("selectors"),
					t = {
						$slider: this.$element.find(e.slider)
					};
				return t.$mainSwiperSlides = t.$slider.find(e.slideContent), t
			},
			getSlidesCount: function() {
				return this.elements.$mainSwiperSlides.length
			},
			getInitialSlide: function() {
				var e = this.getEditSettings();
				return e.activeItemIndex ? e.activeItemIndex - 1 : 0
			},
			getDeviceSlidesPerView: function(e) {
				var t = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
				return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || this.getSettings("slidesPerView")[e])
			},
			getSlidesPerView: function(e) {
				return this.getDeviceSlidesPerView(e)
			},
			getDesktopSlidesPerView: function() {
				return this.getSlidesPerView("desktop")
			},
			getTabletSlidesPerView: function() {
				return this.getSlidesPerView("tablet")
			},
			getMobileSlidesPerView: function() {
				return this.getSlidesPerView("mobile")
			},
			getDeviceSlidesToScroll: function(e) {
				var t = "slides_to_scroll" + ("desktop" === e ? "" : "_" + e);
				return Math.min(this.getSlidesCount(), +this.getElementSettings(t) || 1)
			},
			getSlidesToScroll: function(e) {
				return this.getDeviceSlidesToScroll(e)
			},
			getDesktopSlidesToScroll: function() {
				return this.getSlidesToScroll("desktop")
			},
			getTabletSlidesToScroll: function() {
				return this.getSlidesToScroll("tablet")
			},
			getMobileSlidesToScroll: function() {
				return this.getSlidesToScroll("mobile")
			},
			getSpaceBetween: function(e) {
				var t = "space_between";
				return e && "desktop" !== e && (t += "_" + e), this.getElementSettings(t).size || 0
			},
			updateSpaceBetween: function(e, t) {
				var n = t.match("space_between_(.*)"),
					s = n ? n[1] : "desktop",
					i = this.getSpaceBetween(s),
					o = elementorFrontend.config.breakpoints;
				if ("desktop" !== s) {
					var r = {
						tablet: o.lg - 1,
						mobile: o.md - 1
					};
					e.params.breakpoints[r[s]].spaceBetween = i
				} else e.originalParams.spaceBetween = i;
				e.params.spaceBetween = i, e.update()
			},
			getSwiperOptions: function() {
				var e = this.getElementSettings(),
					t = {
						grabCursor: !0,
						initialSlide: this.getInitialSlide(),
						loop: "yes" === e.infinite,
						speed: e.transition_speed,
						effect: e.transition,
						on: {
							slideChange: function() {
								var e = "elementor-ken-burns--active";
								this.$activeImage && this.$activeImage.removeClass(e), this.$activeImage = jQuery(this.slides[this.activeIndex]).children(), this.$activeImage.addClass(e)
							}
						}
					},
					n = {},
					s = elementorFrontend.config.breakpoints;
				n[s.lg - 1] = {
					slidesPerView: this.getDesktopSlidesPerView(),
					slidesPerGroup: this.getDesktopSlidesToScroll(),
					spaceBetween: this.getSpaceBetween("desktop")
				}, n[s.md - 1] = {
					slidesPerView: this.getTabletSlidesPerView(),
					slidesPerGroup: this.getTabletSlidesToScroll(),
					spaceBetween: this.getSpaceBetween("tablet")
				}, n[s.xs] = {
					slidesPerView: this.getMobileSlidesPerView(),
					slidesPerGroup: this.getMobileSlidesToScroll(),
					spaceBetween: this.getSpaceBetween("mobile")
				}, t.breakpoints = n;
				var i = "arrows" === e.navigation || "both" === e.navigation,
					o = "dots" === e.navigation || "both" === e.navigation;
				return i && (t.navigation = {
					prevEl: ".elementor-swiper-button-prev",
					nextEl: ".elementor-swiper-button-next"
				}), o && (t.pagination = {
					el: ".swiper-pagination",
					type: "bullets",
					clickable: !0
				}), !this.isEdit && e.autoplay && (t.autoplay = {
					delay: e.autoplay_speed,
					disableOnInteraction: !!e.pause_on_hover
				}), !0 === t.loop && (t.loopedSlides = this.getSlidesCount()), "fade" === t.effect && (t.fadeEffect = {
					crossFade: !0
				}), t
			},
			async initSlider() {
				var e = this.elements.$slider,
					t = this.getSettings(),
					n = e.data(t.attributes.dataAnimation);
				if (!e.length) return;
				if (this.swipers = {}, 1 >= this.getSlidesCount()) return;
				const s = elementorFrontend.utils.swiper;
				this.swipers.main = await new s(this.elements.$slider, this.getSwiperOptions()), this.editButtonChange(), n && (this.swipers.main.on("slideChangeTransitionStart", (function() {
					e.find(t.selectors.slideInnerContents).removeClass(t.classes.animated + " " + n).hide()
				})), this.swipers.main.on("slideChangeTransitionEnd", (function() {
					e.find(t.selectors.slideInnerContents).show().addClass(t.classes.animated + " " + n)
				})))
			},
			editButtonChange: function(e) {
				if (jQuery("body").hasClass("elementor-editor-active") && (elementor.getPanelView().getCurrentPageView().$el.find(".elementor-repeater-fields .elementor-edit-template").remove(), this.$element.find(".elementor-widget-container .elementor-swiper .twbb_slides-wrapper .swiper-wrapper .swiper-slide-template.swiper-slide-active").length)) {
					var t = this.$element.find(".elementor-widget-container .elementor-swiper .twbb_slides-wrapper .swiper-wrapper .swiper-slide-template.swiper-slide-active").attr("data-template-id"),
						n = twbb.home_url + "/wp-admin/edit.php?post_type=elementor_library&tabs_group=twbb_templates&elementor_library_type=twbb_slide",
						s = "Add";
					t && (n = twbb.home_url + "/wp-admin/post.php?post=" + t + "&action=elementor", s = "Edit");
					var i = jQuery("<a />", {
						target: "_blank",
						class: "elementor-button elementor-button-default elementor-edit-template",
						href: n,
						html: '<i class="eicon-pencil"></i>' + s
					});
					elementor.getPanelView().getCurrentPageView().$el.find(".elementor-control-template_id").after(i)
				}
			},
			onInit: function() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), jQuery("body").hasClass("elementor-editor-active") && elementor.hooks.addAction("panel/open_editor/widget/twbb_slides", this.editButtonChange), this.initSlider()
			},
			onElementChange: function(e) {
				1 >= this.getSlidesCount() || (0 === e.indexOf("width") && this.swipers.main.update(), 0 === e.indexOf("space_between") && this.updateSpaceBetween(this.swipers.main, e))
			},
			onEditSettingsChange: function(e) {
				1 >= this.getSlidesCount() || ("activeItemIndex" === e && this.swipers.main.slideToLoop(this.getEditSettings("activeItemIndex") - 1), this.editButtonChange())
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_slides.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})),
	function(e) {
		var t = function(t, n) {
			var s, i, o, r, a = !1,
				l = !1,
				c = !1,
				d = {},
				h = {
					to: "top",
					offset: 0,
					effectsOffset: 0,
					parent: !1,
					classes: {
						sticky: "sticky",
						stickyActive: "sticky-active",
						stickyEffects: "sticky-effects",
						spacer: "sticky-spacer"
					},
					isRTL: !1,
					handleScrollbarWidth: !1
				},
				u = function(e, t, n) {
					var s = {},
						i = e[0].style;
					n.forEach((function(e) {
						s[e] = void 0 !== i[e] ? i[e] : ""
					})), e.data("css-backup-" + t, s)
				},
				m = function(e, t) {
					return e.data("css-backup-" + t)
				};
			const p = () => {
				if (r = v(s, "width"), o = s.offset().left, i.isRTL) {
					const e = i.handleScrollbarWidth ? window.innerWidth : document.body.offsetWidth;
					o = Math.max(e - r - o, 0)
				}
			};
			var g = function() {
					d.$spacer = s.clone().addClass(i.classes.spacer).css({
						visibility: "hidden",
						transition: "none",
						animation: "none"
					}), s.after(d.$spacer)
				},
				f = function() {
					d.$spacer.remove()
				},
				b = function() {
					u(s, "unsticky", ["position", "width", "margin-top", "margin-bottom", "top", "bottom", "inset-inline-start"]);
					const e = {
						position: "fixed",
						width: r,
						marginTop: 0,
						marginBottom: 0
					};
					e[i.to] = i.offset, e["top" === i.to ? "bottom" : "top"] = "", o && (e["inset-inline-start"] = o + "px"), s.css(e).addClass(i.classes.stickyActive)
				},
				w = function() {
					s.css(m(s, "unsticky")).removeClass(i.classes.stickyActive)
				},
				v = function(e, t, n) {
					var s = getComputedStyle(e[0]),
						i = parseFloat(s[t]),
						o = "height" === t ? ["top", "bottom"] : ["left", "right"],
						r = [];
					return "border-box" !== s.boxSizing && r.push("border", "padding"), n && r.push("margin"), r.forEach((function(e) {
						o.forEach((function(t) {
							i += parseFloat(s[e + "-" + t])
						}))
					})), i
				},
				y = function(e) {
					var t = d.$window.scrollTop(),
						n = v(e, "height"),
						s = innerHeight,
						i = e.offset().top - t,
						o = i - s;
					return {
						top: {
							fromTop: i,
							fromBottom: o
						},
						bottom: {
							fromTop: i + n,
							fromBottom: o + n
						}
					}
				},
				_ = function() {
					w(), f(), a = !1, s.trigger("sticky:unstick")
				},
				S = function() {
					var e = y(s),
						t = "top" === i.to;
					if (l) {
						(t ? e.top.fromTop > i.offset : e.bottom.fromBottom < -i.offset) && (d.$parent.css(m(d.$parent, "childNotFollowing")), s.css(m(s, "notFollowing")), l = !1)
					} else {
						var n = y(d.$parent),
							a = getComputedStyle(d.$parent[0]),
							c = parseFloat(a[t ? "borderBottomWidth" : "borderTopWidth"]),
							h = t ? n.bottom.fromTop - c : n.top.fromBottom + c;
						(t ? h <= e.bottom.fromTop : h >= e.top.fromBottom) && function() {
							u(d.$parent, "childNotFollowing", ["position"]), d.$parent.css("position", "relative"), u(s, "notFollowing", ["position", "inset-inline-start", "top", "bottom"]);
							const e = {
								position: "absolute"
							};
							if (o = d.$spacer.position().left, i.isRTL) {
								const e = s.parent().outerWidth(),
									t = d.$spacer.position().left;
								r = d.$spacer.outerWidth(), o = Math.max(e - r - t, 0)
							}
							e["inset-inline-start"] = o + "px", e[i.to] = "", e["top" === i.to ? "bottom" : "top"] = 0, s.css(e), l = !0
						}()
					}
				},
				$ = function() {
					var e, t = i.offset;
					if (a) {
						var n = y(d.$spacer);
						e = "top" === i.to ? n.top.fromTop - t : -n.bottom.fromBottom - t, i.parent && S(), e > 0 && _()
					} else {
						var o = y(s);
						(e = "top" === i.to ? o.top.fromTop - t : -o.bottom.fromBottom - t) <= 0 && (p(), g(), b(), a = !0, s.trigger("sticky:stick"), i.parent && S())
					}! function(e) {
						c && -e < i.effectsOffset ? (s.removeClass(i.classes.stickyEffects), c = !1) : !c && -e >= i.effectsOffset && (s.addClass(i.classes.stickyEffects), c = !0)
					}(e)
				},
				C = function() {
					$()
				},
				k = function() {
					a && (w(), f(), p(), g(), b(), i.parent && (l = !1, S()))
				};
			this.destroy = function() {
				a && _(), d.$window.off("scroll", C).off("resize", k), s.removeClass(i.classes.sticky)
			}, i = jQuery.extend(!0, h, n), s = e(t).addClass(i.classes.sticky), d.$window = e(window), i.parent && (d.$parent = s.parent(), "parent" !== i.parent && (d.$parent = d.$parent.closest(i.parent))), d.$window.on({
				scroll: C,
				resize: k
			}), $()
		};
		e.fn.sticky = function(n) {
			var s = "string" == typeof n;
			return this.each((function() {
				var i = e(this);
				if (s) {
					var o = i.data("sticky");
					if (!o) throw Error("Trying to perform the `" + n + "` method prior to initialization");
					if (!o[n]) throw ReferenceError("Method `" + n + "` not found in sticky instance");
					o[n].apply(o, Array.prototype.slice.call(arguments, 1)), "destroy" === n && i.removeData("sticky")
				} else i.data("sticky", new t(this, n))
			})), this
		}, window.Sticky = t
	}(jQuery),
	function(e) {
		var t = function(t, n) {
			var s, i, o, r, a = !1,
				l = !1,
				c = !1,
				d = {},
				h = function(e, t, n) {
					var s = {},
						i = e[0].style;
					n.forEach((function(e) {
						s[e] = void 0 !== i[e] ? i[e] : ""
					})), e.data("css-backup-" + t, s)
				},
				u = function(e, t) {
					return e.data("css-backup-" + t)
				};
			const m = () => {
				if (r = w(s, "width"), o = s.offset().left, i.isRTL) {
					const e = i.handleScrollbarWidth ? window.innerWidth : document.body.offsetWidth;
					o = Math.max(e - r - o, 0)
				}
			};
			var p = function() {
					d.$spacer = s.clone().addClass(i.classes.spacer).css({
						visibility: "hidden",
						transition: "none",
						animation: "none"
					}), s.after(d.$spacer)
				},
				g = function() {
					d.$spacer.remove()
				},
				f = function() {
					h(s, "unsticky", ["position", "width", "margin-top", "margin-bottom", "top", "bottom", "inset-inline-start"]);
					const e = {
						position: "fixed",
						width: r,
						marginTop: 0,
						marginBottom: 0
					};
					e[i.to] = i.offset, e["top" === i.to ? "bottom" : "top"] = "", o && (e["inset-inline-start"] = o + "px"), s.css(e).addClass(i.classes.stickyActive)
				},
				b = function() {
					s.css(u(s, "unsticky")).removeClass(i.classes.stickyActive)
				},
				w = function(e, t, n) {
					var s = getComputedStyle(e[0]),
						i = parseFloat(s[t]),
						o = "height" === t ? ["top", "bottom"] : ["left", "right"],
						r = [];
					return "border-box" !== s.boxSizing && r.push("border", "padding"), n && r.push("margin"), r.forEach((function(e) {
						o.forEach((function(t) {
							i += parseFloat(s[e + "-" + t])
						}))
					})), i
				},
				v = function(e) {
					var t = d.$window.scrollTop(),
						n = w(e, "height"),
						s = innerHeight,
						i = e.offset().top - t,
						o = i - s;
					return {
						top: {
							fromTop: i,
							fromBottom: o
						},
						bottom: {
							fromTop: i + n,
							fromBottom: o + n
						}
					}
				},
				y = function() {
					b(), g(), a = !1, s.trigger("sticky:unstick")
				},
				_ = function() {
					var e = v(s),
						t = "top" === i.to;
					if (l)(t ? e.top.fromTop > i.offset : e.bottom.fromBottom < -i.offset) && (d.$parent.css(u(d.$parent, "childNotFollowing")), s.css(u(s, "notFollowing")), l = !1);
					else {
						var n = v(d.$parent),
							a = getComputedStyle(d.$parent[0]),
							c = parseFloat(a[t ? "borderBottomWidth" : "borderTopWidth"]),
							m = t ? n.bottom.fromTop - c : n.top.fromBottom + c;
						(t ? m <= e.bottom.fromTop : m >= e.top.fromBottom) && function() {
							h(d.$parent, "childNotFollowing", ["position"]), d.$parent.css("position", "relative"), h(s, "notFollowing", ["position", "inset-inline-start", "top", "bottom"]);
							const e = {
								position: "absolute"
							};
							if (o = d.$spacer.position().left, i.isRTL) {
								const e = s.parent().outerWidth(),
									t = d.$spacer.position().left;
								r = d.$spacer.outerWidth(), o = Math.max(e - r - t, 0)
							}
							e["inset-inline-start"] = o + "px", e[i.to] = "", e["top" === i.to ? "bottom" : "top"] = 0, s.css(e), l = !0
						}()
					}
				},
				S = function() {
					var e, t = i.offset;
					if (a) {
						var n = v(d.$spacer);
						e = "top" === i.to ? n.top.fromTop - t : -n.bottom.fromBottom - t, i.parent && _(), e > 0 && y()
					} else {
						var o = v(s);
						(e = "top" === i.to ? o.top.fromTop - t : -o.bottom.fromBottom - t) <= 0 && (m(), p(), f(), a = !0, s.trigger("sticky:stick"), i.parent && _())
					}! function(e) {
						c && -e < i.effectsOffset ? (s.removeClass(i.classes.stickyEffects), c = !1) : !c && -e >= i.effectsOffset && (s.addClass(i.classes.stickyEffects), c = !0)
					}(e)
				},
				$ = function() {
					S()
				},
				C = function() {
					a && (b(), g(), m(), p(), f(), i.parent && (l = !1, _()))
				};
			this.destroy = function() {
				a && y(), d.$window.off("scroll", $).off("resize", C), s.removeClass(i.classes.sticky)
			}, i = jQuery.extend(!0, {
				to: "top",
				offset: 0,
				effectsOffset: 0,
				parent: !1,
				classes: {
					sticky: "sticky",
					stickyActive: "sticky-active",
					stickyEffects: "sticky-effects",
					spacer: "sticky-spacer"
				},
				isRTL: !1,
				handleScrollbarWidth: !1
			}, n), s = e(t).addClass(i.classes.sticky), d.$window = e(window), i.parent && (d.$parent = s.parent(), "parent" !== i.parent && (d.$parent = d.$parent.closest(i.parent))), d.$window.on({
				scroll: $,
				resize: C
			}), S()
		};
		e.fn.sticky = function(n) {
			var s = "string" == typeof n;
			return this.each((function() {
				var i = e(this);
				if (s) {
					var o = i.data("sticky");
					if (!o) throw Error("Trying to perform the `" + n + "` method prior to initialization");
					if (!o[n]) throw ReferenceError("Method `" + n + "` not found in sticky instance");
					o[n].apply(o, Array.prototype.slice.call(arguments, 1)), "destroy" === n && i.removeData("sticky")
				} else i.data("sticky", new t(this, n))
			})), this
		}, window.Sticky = t
	}(jQuery), jQuery(window).on("elementor/frontend/init", (function() {
		var e = elementorModules.frontend.handlers.Base.extend({
			currentConfig: {},
			debouncedReactivate: null,
			bindEvents: function() {
				elementorFrontend.addListenerOnce(this.getUniqueHandlerID() + "sticky", "resize", this.reactivateOnResize)
			},
			unbindEvents: function() {
				elementorFrontend.removeListeners(this.getUniqueHandlerID() + "sticky", "resize", this.reactivateOnResize)
			},
			isStickyInstanceActive: function() {
				return void 0 !== this.$element.data("sticky")
			},
			getResponsiveSetting: function(e) {
				const t = this.getElementSettings();
				return elementorFrontend.getCurrentDeviceSetting(t, e)
			},
			getResponsiveSettingList: function(e) {
				return ["", ...Object.keys(elementorFrontend.config.responsive.activeBreakpoints)].map((t => t ? `${e}_${t}` : e))
			},
			getConfig: function() {
				const e = this.getElementSettings(),
					t = {
						to: e.tenweb_sticky,
						offset: this.getResponsiveSetting("tenweb_sticky_offset"),
						effectsOffset: this.getResponsiveSetting("tenweb_sticky_effects_offset"),
						classes: {
							sticky: "elementor-sticky",
							stickyActive: "elementor-sticky--active elementor-section--handles-inside",
							stickyEffects: "elementor-sticky--effects",
							spacer: "elementor-sticky__spacer"
						},
						isRTL: elementorFrontend.config.is_rtl,
						handleScrollbarWidth: elementorFrontend.isEditMode()
					},
					n = elementorFrontend.elements.$wpAdminBar,
					s = this.isContainerElement(this.$element[0]) && !this.isContainerElement(this.$element[0].parentElement);
				return n.length && "top" === e.tenweb_sticky && "fixed" === n.css("position") && (t.offset += n.height()), e.tenweb_sticky_parent && !s && (t.parent = ".e-container, .e-container__inner, .e-con, .e-con-inner, .elementor-widget-wrap"), t
			},
			activate: function() {
				this.currentConfig = this.getConfig(), this.$element.sticky(this.currentConfig)
			},
			deactivate: function() {
				this.isStickyInstanceActive() && this.$element.sticky("destroy")
			},
			run: function(e) {
				if (this.getElementSettings("tenweb_sticky")) {
					var t = elementorFrontend.getCurrentDeviceMode(); - 1 !== this.getElementSettings("tenweb_sticky_on").indexOf(t) ? !0 === e ? this.reactivate() : this.isStickyInstanceActive() || this.activate() : this.deactivate()
				} else this.deactivate()
			},
			reactivateOnResize: function() {
				clearTimeout(this.debouncedReactivate), this.debouncedReactivate = setTimeout((() => {
					const e = this.getConfig();
					JSON.stringify(e) !== JSON.stringify(this.currentConfig) && this.run(!0)
				}), 300)
			},
			reactivate: function() {
				this.deactivate(), this.activate()
			},
			onElementChange: function(e) {
				-1 !== ["tenweb_sticky", "tenweb_sticky_on"].indexOf(e) && this.run(!0); - 1 !== [...this.getResponsiveSettingList("tenweb_sticky_offset"), ...this.getResponsiveSettingList("tenweb_sticky_effects_offset"), "tenweb_sticky_parent"].indexOf(e) && this.reactivate()
			},
			onDeviceModeChange: function() {
				setTimeout((() => this.run(!0)))
			},
			onInit: function() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), elementorFrontend.isEditMode() && elementor.listenTo(elementor.channels.deviceMode, "change", (() => this.onDeviceModeChange())), this.run()
			},
			onDestroy: function() {
				elementorModules.frontend.handlers.Base.prototype.onDestroy.apply(this, arguments), this.deactivate()
			},
			isContainerElement: e => ["e-container", "e-container__inner", "e-con", "e-con-inner"].some((t => e?.classList.contains(t)))
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/section", (function(t) {
			new e({
				$element: t
			})
		})), elementorFrontend.hooks.addAction("frontend/element_ready/container", (function(t) {
			new e({
				$element: t
			})
		})), elementorFrontend.hooks.addAction("frontend/element_ready/widget", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		function e(e) {
			return Math.min(e.slides_count, +e.slides_to_scroll || 1)
		}

		function t(e, t) {
			var n = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
			return Math.min(t.slides_count, +t[n] || t.slidesPerView[e])
		}

		function n(e, t) {
			var n = "space_between";
			return e && "desktop" !== e && (n += "_" + e), t.breakpoints[n].size || 0
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb-team.default", (function() {
			jQuery(".tenweb-team-swiper").each((async function(s, i) {
				var o = jQuery(i).parents(".elementor-widget-twbb-team").attr("data-id");
				jQuery(i).attr("id", "tenweb-team-swiper-" + o);
				var r = jQuery(i).data("settings");
				const a = elementorFrontend.config.responsive.activeBreakpoints;
				if (!jQuery.isEmptyObject(r)) {
					r.slidesPerView = {
						desktop: 3,
						tablet: 2,
						mobile: 1
					};
					var l = {
						navigation: {
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next"
						},
						pagination: {
							el: ".swiper-pagination",
							type: r.pagination,
							clickable: !0
						},
						grabCursor: !0,
						speed: r.speed,
						effect: "slide",
						initialSlide: 0,
						slidesPerView: t("desktop", r),
						loop: "yes" === r.loop,
						loopedSlides: r.slides_count,
						slidesPerGroup: e(r),
						spaceBetween: n("", r),
						handleElementorBreakpoints: !0,
						breakpoints: {}
					};
					Object.keys(a).reverse().forEach((e => {
						l.breakpoints[a[e].value] = {
							slidesPerView: t(e, r),
							spaceBetween: n(e, r)
						}
					})), "yes" === r.autoplay && (l.autoplay = {
						delay: r.autoplay_speed,
						disableOnInteraction: !!r.pause_on_interaction
					});
					const s = elementorFrontend.utils.swiper;
					await new s(jQuery("#tenweb-team-swiper-" + o), l)
				}
			}))
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		function e(e) {
			return Math.min(e.slides_count, +e.slides_to_scroll || 1)
		}

		function t(e, t) {
			var n = "slides_per_view" + ("desktop" === e ? "" : "_" + e);
			return Math.min(t.slides_count, +t[n] || t.slidesPerView[e])
		}

		function n(e, t) {
			var n = "space_between";
			return e && "desktop" !== e && (n += "_" + e), t.breakpoints[n].size || 0
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb-testimonial-carousel.default", (function() {
			jQuery(".tenweb-testimonial-carousel-swiper").each((async function(s, i) {
				var o = jQuery(i).parents(".elementor-widget-twbb-testimonial-carousel").attr("data-id");
				jQuery(i).attr("id", "tenweb-testimonial-carousel-swiper-" + o);
				var r = jQuery(i).data("settings");
				if (!jQuery.isEmptyObject(r)) {
					r.slidesPerView = {
						desktop: 1,
						tablet: 1,
						mobile: 1
					};
					var a = {
						navigation: {
							prevEl: ".tenweb-swiper-button-prev",
							nextEl: ".tenweb-swiper-button-next"
						},
						pagination: {
							el: ".swiper-pagination",
							type: r.pagination,
							clickable: !0
						},
						grabCursor: !0,
						speed: r.speed,
						effect: "slide",
						initialSlide: 0,
						slidesPerView: t("desktop", r),
						loop: "yes" === r.loop,
						loopedSlides: r.slides_count,
						slidesPerGroup: e(r),
						spaceBetween: n("", r),
						handleElementorBreakpoints: !0,
						breakpoints: {
							1280: {
								slidesPerView: t("desktop", r),
								spaceBetween: n("desktop", r)
							},
							768: {
								slidesPerView: t("tablet", r),
								spaceBetween: n("tablet", r)
							},
							320: {
								slidesPerView: t("mobile", r),
								spaceBetween: n("mobile", r)
							}
						}
					};
					"yes" == r.autoplay && (a.autoplay = {
						delay: r.autoplay_speed,
						disableOnInteraction: !!r.pause_on_interaction
					});
					const s = elementorFrontend.utils.swiper;
					await new s(jQuery("#tenweb-testimonial-carousel-swiper-" + o), a)
				}
			}))
		}));
		var s = elementorModules.frontend.handlers.Base.extend({
			bindEvents() {
				elementorFrontend.addListenerOnce(this.getModelCID(), "resize", this.onWindowResize)
			},
			unbindEvents() {
				elementorFrontend.removeListeners(this.getModelCID(), "resize", this.onWindowResize)
			},
			getClosureMethodsNames() {
				return elementorModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this, arguments).concat(["fitImages", "onWindowResize", "runMasonry"])
			},
			getDefaultSettings: () => ({
				classes: {},
				selectors: {
					testimonialContainer: ".tenweb-masonry",
					item: ".tenweb-item"
				}
			}),
			getDefaultElements() {
				var e = this.getSettings("selectors");
				return {
					$postsContainer: this.$element.find(e.testimonialContainer),
					$posts: this.$element.find(e.item)
				}
			},
			setColsCountSettings() {
				let e = elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), "column_count_masonry") || 0;
				this.setSettings("column_count_masonry", e)
			},
			getVerticalSpaceBetween() {
				const e = elementorFrontend.getCurrentDeviceMode();
				let t = elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), "space_between_masonry", "", e);
				return t = "" === t ? this.getElementSettings("space_between_masonry.size") : t.size, t
			},
			runMasonry() {
				var e = this.elements;
				e.$posts.css({
					marginTop: "",
					transitionDuration: ""
				}), this.setColsCountSettings(), e.$postsContainer.height("");
				const t = this.getVerticalSpaceBetween();
				new elementorModules.utils.Masonry({
					container: e.$postsContainer,
					items: e.$posts.filter(":visible"),
					columnsCount: this.getSettings("column_count_masonry"),
					verticalSpaceBetween: t || 0
				}).run()
			},
			run() {
				this.runMasonry()
			},
			onInit() {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), this.bindEvents(), this.run()
			},
			onWindowResize() {
				this.runMasonry()
			},
			onElementChange() {
				setTimeout(this.runMasonry)
			}
		});
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb-testimonial-carousel.default", (function(e) {
			if (e.find(".tenweb-masonry .tenweb-item").length) {
				e.find(".tenweb-masonry .tenweb-item");
				new s({
					$element: e
				})
			}
		}))
	}));
var _baseTabs = class extends elementorModules.frontend.handlers.Base {
		getDefaultSettings() {
			return {
				selectors: {
					tablist: '[role="tablist"]',
					tabTitle: ".e-tab-title",
					tabContent: ".e-tab-content"
				},
				classes: {
					active: "e-active"
				},
				showTabFn: "show",
				hideTabFn: "hide",
				toggleSelf: !0,
				hidePrevious: !0,
				autoExpand: !0,
				keyDirection: {
					ArrowLeft: elementorFrontendConfig.is_rtl ? 1 : -1,
					ArrowUp: -1,
					ArrowRight: elementorFrontendConfig.is_rtl ? -1 : 1,
					ArrowDown: 1
				}
			}
		}
		getDefaultElements() {
			const e = this.getSettings("selectors");
			return {
				$tabTitles: this.findElement(e.tabTitle),
				$tabContents: this.findElement(e.tabContent)
			}
		}
		activateDefaultTab(e) {
			const t = this.getSettings();
			if (!t.autoExpand || "editor" === t.autoExpand && !this.isEdit) return;
			const n = this.getEditSettings("activeItemIndex") || e || 1,
				s = {
					showTabFn: t.showTabFn,
					hideTabFn: t.hideTabFn
				};
			this.setSettings({
				showTabFn: "show",
				hideTabFn: "hide"
			}), this.changeActiveTab(n), this.setSettings(s)
		}
		handleKeyboardNavigation(e) {
			const t = e.currentTarget,
				n = jQuery(t.closest(this.getSettings("selectors").tablist)),
				s = n.find(this.getSettings("selectors").tabTitle),
				i = "vertical" === n.attr("aria-orientation");
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowRight":
					if (i) return;
					break;
				case "ArrowUp":
				case "ArrowDown":
					if (!i) return;
					e.preventDefault();
					break;
				case "Home":
					return e.preventDefault(), void s.first().trigger("focus");
				case "End":
					return e.preventDefault(), void s.last().trigger("focus");
				default:
					return
			}
			const o = t.getAttribute("data-tab") - 1,
				r = this.getSettings("keyDirection")[e.key],
				a = s[o + r];
			a ? a.focus() : -1 === o + r ? s.last().trigger("focus") : s.first().trigger("focus")
		}
		deactivateActiveTab(e) {
			const t = this.getSettings(),
				n = t.classes.active,
				s = e ? '[data-tab="' + e + '"]' : "." + n,
				i = this.elements.$tabTitles.filter(s),
				o = this.elements.$tabContents.filter(s);
			i.add(o).removeClass(n), i.attr({
				tabindex: "-1",
				"aria-selected": "false"
			}), o[t.hideTabFn](), o.attr("hidden", "hidden")
		}
		activateTab(e) {
			const t = this.getSettings(),
				n = t.classes.active,
				s = this.elements.$tabTitles.filter('[data-tab="' + e + '"]'),
				i = this.elements.$tabContents.filter('[data-tab="' + e + '"]'),
				o = "show" === t.showTabFn ? 0 : 400;
			s.add(i).addClass(n), s.attr({
				tabindex: "0",
				"aria-selected": "true"
			}), i[t.showTabFn](o, (() => elementorFrontend.elements.$window.trigger("resize"))), i.removeAttr("hidden")
		}
		isActiveTab(e) {
			return this.elements.$tabTitles.filter('[data-tab="' + e + '"]').hasClass(this.getSettings("classes.active"))
		}
		bindEvents() {
			this.elements.$tabTitles.on({
				keydown: e => {
					jQuery(e.target).is("a") && "Enter" === e.key && e.preventDefault(), ["End", "Home", "ArrowUp", "ArrowDown"].includes(e.key) && this.handleKeyboardNavigation(e)
				},
				keyup: e => {
					switch (e.key) {
						case "ArrowLeft":
						case "ArrowRight":
							this.handleKeyboardNavigation(e);
							break;
						case "Enter":
						case "Space":
							e.preventDefault(), this.changeActiveTab(e.currentTarget.getAttribute("data-tab"))
					}
				},
				click: e => {
					e.preventDefault(), this.changeActiveTab(e.currentTarget.getAttribute("data-tab"))
				}
			})
		}
		onInit(...e) {
			super.onInit(...e)
		}
		changeActiveTab(e) {
			const t = this.isActiveTab(e),
				n = this.getSettings();
			!n.toggleSelf && t || !n.hidePrevious || this.deactivateActiveTab(), !n.hidePrevious && t && this.deactivateActiveTab(e), t || this.activateTab(e)
		}
	},
	_playerBase = class {
		constructor(e, t) {
			this.playlistItem = e, this.positionInVideoList = t
		}
		formatDuration(e) {
			const t = new Date(1e3 * e),
				n = t.getUTCHours(),
				s = t.getUTCMinutes(),
				i = t.getSeconds();
			return 0 !== n ? `${n.toString()}:${s.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}` : `${s.toString()}:${i.toString().padStart(2,"0")}`
		}
	},
	_playerYoutube = class extends _playerBase {
		constructor(e, t) {
			super(e, t), this.apiProvider = elementorFrontend.utils.youtube, this.playerObject = null, this.watchCount = 0, this.isVideoPlaying = !1, this.isVideoPausedLocal = !1, this.isVideoEnded = !1, this.seekSequenceArray = [], this.pauseCurrentTime = null, this.isReady = !1
		}
		create() {
			this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);
			return new Promise((e => {
				this.apiProvider.onApiReady((t => {
					const n = {
						width: "773",
						videoId: this.currentVideoID,
						playerVars: {
							rel: 0,
							showinfo: 0,
							ecver: 2
						},
						events: {
							onReady: () => {
								this.isReady = !0, e()
							}
						}
					};
					this.playerObject = new t.Player(this.playlistItem.tabContent.querySelector("div"), n), this.playerObject.addEventListener("onStateChange", (e => {
						3 === e.data && (2 === this.seekSequenceArray[this.seekSequenceArray.length - 1] ? this.seekSequenceArray.push(3) : (this.seekSequenceArray = [], clearTimeout(this.seekTimeOut)))
					}))
				}))
			}))
		}
		handleEnded(e) {
			this.playerObject.addEventListener("onStateChange", (t => {
				0 === t.data && (this.watchCount++, this.isVideoEnded = !0, t.target.seekTo(0), t.target.stopVideo(), this.isVideoPlaying = !1, e())
			}))
		}
		handlePaused(e) {
			this.playerObject.addEventListener("onStateChange", (t => {
				2 === t.data && (this.seekSequenceArray = [], this.seekSequenceArray.push(2), this.pauseCurrentTime = this.playerObject.playerInfo.currentTime, this.seekTimeOut = setTimeout((() => {
					2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1] ? (this.seekSequenceArray = [], clearTimeout(this.seekTimeOut)) : (e(this.positionInVideoList), this.isVideoPausedLocal = !0)
				}), 1e3))
			}))
		}
		handlePlayed(e) {
			this.playerObject.addEventListener("onStateChange", (t => {
				1 !== t.data || this.isVideoEnded ? this.isVideoEnded = !1 : 2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1] || e()
			}))
		}
		handleError(e) {
			this.playerObject.addEventListener("onError", (() => {
				e()
			}))
		}
		handleFullScreenChange(e) {
			this.playerObject.addEventListener("fullscreenchange", (() => {
				e(document.fullscreenElement)
			}))
		}
		getCurrentTime() {
			const e = this.pauseCurrentTime ? this.pauseCurrentTime : this.playerObject.playerInfo.currentTime;
			return this.pauseCurrentTime = null, e
		}
		play() {
			this.isReady && (this.isVideoPlaying = !0, this.playerObject.playVideo())
		}
		pause() {
			this.isReady && (this.isVideoPlaying = !1, this.playerObject.pauseVideo())
		}
		mute() {
			this.playerObject.mute()
		}
		async setVideoProviderData() {
			this.isReady && (this.currentVideoID && 11 === this.currentVideoID.length ? (this.playlistItem.thumbnail = {
				url: "http://img.youtube.com/vi/" + this.playerObject.getVideoData().video_id + "/maxresdefault.jpg"
			}, this.playlistItem.video_title = this.playerObject.getVideoData().title, this.playlistItem.duration = this.formatDuration(this.playerObject.getDuration())) : (this.playlistItem.thumbnail = {
				url: ""
			}, this.playlistItem.video_title = "", this.playlistItem.duration = ""))
		}
	},
	_playerVimeo = class extends _playerBase {
		constructor(e, t) {
			super(e, t), this.apiProvider = elementorFrontend.utils.vimeo, this.playerObject = null, this.watchCount = 0, this.isVideoInFullScreenChange = !1, this.isReady = !1
		}
		create() {
			return this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl), new Promise((e => {
				this.apiProvider.onApiReady((t => {
					const n = {
						id: this.currentVideoID,
						autoplay: !1
					};
					this.playerObject = new t.Player(this.playlistItem.tabContent.querySelector("div"), n), this.playerObject.ready().then((() => {
						this.isReady = !0, e()
					}))
				}))
			}))
		}
		handleEnded(e) {
			this.playerObject.on("ended", (() => {
				this.watchCount++, e(this.playlistItem)
			}))
		}
		handlePaused(e) {
			this.playerObject.on("pause", (t => {
				0 === t.percent || t.percent >= 1 || this.isVideoInFullScreenChange || e(this.positionInVideoList)
			}))
		}
		handlePlayed(e) {
			this.playerObject.on("play", (() => {
				this.isVideoInFullScreenChange ? this.isVideoInFullScreenChange = !1 : e(this.playlistItem)
			}))
		}
		handleFullScreenChange(e) {
			this.playerObject.element.addEventListener("fullscreenchange", (() => {
				e(document.fullscreenElement), this.isVideoInFullScreenChange = !0
			}))
		}
		getCurrentTime() {
			return this.playerObject.getCurrentTime().then((e => e))
		}
		play() {
			this.isReady && this.playerObject.play()
		}
		pause() {
			this.isReady && this.playerObject.pause()
		}
		mute() {
			this.playerObject.setMuted(!0)
		}
		async setVideoProviderData() {
			if (!this.currentVideoID && 9 === !this.currentVideoID.length) return;
			const e = await this.playerObject.getVideoId(),
				t = await fetch("https://vimeo.com/api/v2/video/" + e + ".json"),
				n = await t.json();
			return this.playlistItem.duration = this.formatDuration(n[0].duration), this.playlistItem.video_title = n[0].title, this.playlistItem.thumbnail = {
				url: n[0].thumbnail_medium
			}, this.playlistItem
		}
	},
	_playerHosted = class extends _playerBase {
		constructor(e, t) {
			super(e, t), this.playerObject = null, this.watchCount = 0, this.isVideoPlaying = !1, this.isVideoPausedLocal = !1, this.isVideoSeeking = !1, this.isVideoEnded = !1, this.isReady = !1
		}
		create() {
			return new Promise((e => {
				const t = document.createElement("video");
				t.setAttribute("controls", "");
				const n = document.createTextNode("Sorry, your browser doesn't support embedded videos."),
					s = document.createElement("source");
				s.setAttribute("src", this.playlistItem.videoUrl), s.setAttribute("type", "video/" + this.playlistItem.videoUrl.split(".").pop()), t.appendChild(s), t.appendChild(n), this.playerObject = t, this.playlistItem.tabContent.querySelector("div").replaceWith(this.playerObject), this.playerObject.addEventListener("canplay", (() => {
					this.isReady = !0, e()
				})), this.playerObject.addEventListener("seeked", (() => {
					this.isVideoSeeking = !1
				})), this.playerObject.addEventListener("seeking", (() => {
					clearTimeout(this.seekTimeOut), this.isVideoSeeking = !0
				}))
			}))
		}
		handleEnded(e) {
			this.playerObject.addEventListener("ended", (() => {
				this.watchCount++, this.isVideoEnded = !0, this.isVideoPlaying = !1, e(this.playlistItem)
			}))
		}
		handlePaused(e) {
			this.playerObject.addEventListener("pause", (() => {
				this.seekTimeOut = setTimeout((() => {
					this.isVideoSeeking || this.isVideoEnded ? this.isVideoEnded = !1 : (e(this.positionInVideoList), this.isVideoPausedLocal = !0)
				}), 30)
			}))
		}
		handlePlayed(e) {
			this.playerObject.addEventListener("play", (() => {
				this.isVideoSeeking || e(this.playlistItem)
			}))
		}
		handleFullScreenChange(e) {
			jQuery(this.playerObject).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", (() => {
				e(document.fullscreenElement)
			}))
		}
		getCurrentTime() {
			return this.playerObject.currentTime
		}
		play() {
			this.isReady && (this.isVideoPlaying = !0, this.playerObject.play())
		}
		pause() {
			this.isReady && (this.isVideoPlaying = !1, this.playerObject.pause())
		}
		mute() {
			this.playerObject.muted = !0
		}
	},
	_scrollUtils = {
		handleVideosPanelScroll(e, t) {
			t ? (t.target.scrollTop > 0 ? e.$tabsWrapper.addClass("top-shadow") : e.$tabsWrapper.removeClass("top-shadow"), t.target.offsetHeight + t.target.scrollTop >= t.target.scrollHeight ? e.$tabsWrapper.removeClass("bottom-shadow") : e.$tabsWrapper.addClass("bottom-shadow")) : e.$tabsItems[0].offsetHeight < e.$tabsItems[0].scrollHeight && e.$tabsWrapper.addClass("bottom-shadow")
		}
	},
	_playlistEvent = class {
		constructor(e) {
			let {
				event: t,
				tab: n,
				playlist: s,
				video: i
			} = e;
			this.event = {
				type: t.type || "",
				time: t.time || 0,
				element: t.element,
				trigger: t.trigger || "",
				watchCount: t.watchCount || 0
			}, this.tab = {
				name: n.name,
				index: n.index
			}, this.playlist = {
				name: s.name,
				currentItem: s.currentItem,
				amount: s.amount
			}, this.video = {
				provider: i.provider,
				url: i.url,
				title: i.title,
				duration: i.duration
			}
		}
	},
	_eventTrigger = {
		getEventTabsObject(e) {
			const t = e.elements.$innerTabs.filter(".e-active").find(".e-inner-tabs-wrapper .e-inner-tab-title");
			if (t.length) {
				const e = t.filter(".e-inner-tab-active");
				return {
					name: e.text().trim(),
					index: e.index() + 1
				}
			}
			return {
				name: "none",
				index: "none"
			}
		},
		getEventPlaylistObject(e, t) {
			const n = t || e.currentPlaylistItemIndex;
			return {
				name: e.getElementSettings("playlist_title"),
				currentItem: n,
				amount: e.playlistItemsArray.filter((e => "section" !== e.videoType)).length
			}
		},
		getEventVideoObject(e, t) {
			const n = t || e.currentPlaylistItemIndex,
				s = e.playlistItemsArray[n - 1];
			return {
				provider: s.videoType,
				url: s.videoUrl,
				title: s.videoTitle,
				duration: s.videoDuration
			}
		},
		async getEventEventObject(e, t, n, s) {
			const i = s || e.currentPlaylistItemIndex,
				o = e.playlistItemsArray[i - 1];
			return {
				type: t,
				time: await o.playerInstance.getCurrentTime(),
				element: e.$element,
				trigger: n,
				watchCount: o.playerInstance.watchCount
			}
		},
		async triggerEvent(e, t, n, s) {
			const i = new _playlistEvent({
				event: await _eventTrigger.getEventEventObject(e, t, n, s),
				tab: _eventTrigger.getEventTabsObject(e),
				playlist: _eventTrigger.getEventPlaylistObject(e, s),
				video: _eventTrigger.getEventVideoObject(e, s)
			});
			jQuery("body").trigger("elementor-twbb_video-playList", i)
		}
	},
	_innerTabs = {
		toggleInnerTabs(e, t, n) {
			const s = e.currentTarget,
				i = s.querySelectorAll(".e-inner-tab-title");
			if (t.hasClass("e-inner-tab-active") || i.length < 2) return;
			const o = s.querySelectorAll(".e-inner-tab-content");
			i.forEach((e => {
				e.classList.toggle("e-inner-tab-active")
			})), o.forEach((e => {
				e.toggleAttribute("hidden"), e.classList.toggle("e-inner-tab-active")
			})), _innerTabs.handleInnerTabsButtonsDisplay(Array.from(o), n.isCollapsible, n.innerTabsHeightLimit), (0, _eventTrigger.triggerEvent)(n, "tabOpened", "click")
		},
		handleInnerTabs(e, t) {
			const n = e.target,
				s = n.tagName;
			if (n.classList.contains("e-inner-tab-title-text")) {
				e.preventDefault();
				const s = jQuery(n).parent(".e-inner-tab-title");
				_innerTabs.toggleInnerTabs(e, s, t)
			}
			if (n.classList.contains("e-tab-mobile-title")) {
				const s = jQuery(n);
				_innerTabs.toggleInnerTabs(e, s, t)
			}
			"button" === s.toLowerCase() && _innerTabs.onTabContentButtonsClick(e, t)
		},
		handleInnerTabsButtonsDisplay(e, t, n) {
			if (!t) return;
			const s = e.filter((e => e.classList.contains("e-inner-tab-active"))),
				i = s[0].querySelector(".e-inner-tab-text > div").offsetHeight,
				o = parseInt(n.size);
			o && i > o && s[0].classList.add("show-inner-tab-buttons")
		},
		onTabContentButtonsClick(e, t) {
			const n = jQuery(e.currentTarget).find(".e-inner-tab-content").filter(".e-inner-tab-active");
			n.find("button").toggleClass("show-button"), n.toggleClass("show-full-height");
			const s = n.hasClass("show-full-height") ? "tabExpanded" : "tabCollapsed";
			(0, _eventTrigger.triggerEvent)(t, s, "click")
		}
	},
	_urlParams = {
		handleURLParams(e, t) {
			const n = new URLSearchParams(location.search),
				s = n.get("video"),
				i = n.get("playlist");
			if (!i) return !1;
			if (i === e) {
				const n = t.find((e => s === e.dataItemId)),
					i = n ? n.dataTab : 1;
				return i || setVideoParams(e, t, 1), i || !1
			}
		},
		setVideoParams(e, t, n) {
			const s = new URLSearchParams(location.search);
			s.set("playlist", e), s.set("video", t[n - 1].dataItemId), history.replaceState({}, "", location.pathname + "?" + s)
		}
	},
	VideoPlaylistHandler = class extends _baseTabs {
		getDefaultSettings() {
			const e = super.getDefaultSettings();
			return {
				...e,
				selectors: {
					...e.selectors,
					tabsWrapper: ".e-tabs-items-wrapper",
					tabsItems: ".e-tabs-items",
					toggleVideosDisplayButton: ".e-tabs-toggle-videos-display-button",
					videos: ".e-tabs-content-wrapper .e-tab-content",
					innerTabs: ".e-tabs-inner-tabs .e-tab-content",
					imageOverlay: ".elementor-custom-embed-image-overlay"
				}
			}
		}
		getDefaultElements() {
			const e = super.getDefaultElements(),
				t = this.getSettings("selectors");
			return {
				...e,
				$tabsWrapper: this.findElement(t.tabsWrapper),
				$tabsItems: this.findElement(t.tabsItems),
				$toggleVideosDisplayButton: this.findElement(t.toggleVideosDisplayButton),
				$videos: this.findElement(t.videos),
				$innerTabs: this.findElement(t.innerTabs),
				$imageOverlay: this.findElement(t.imageOverlay)
			}
		}
		initEditorListeners() {
			super.initEditorListeners(), this.editorListeners.push({
				event: "elementorPlaylistWidget:fetchVideoData",
				to: elementor.channels.editor,
				callback: e => {
					this.getCurrentPlayerSelected().setVideoProviderData().then((() => {
						e.currentItem = this.getCurrentItemSelected(), elementor.channels.editor.trigger("elementorPlaylistWidget:setVideoData", e)
					}))
				}
			})
		}
		bindEvents() {
			super.bindEvents(), this.elements.$imageOverlay.on({
				click: e => {
					e.currentTarget.remove(), this.getCurrentPlayerSelected().play()
				}
			}), this.elements.$innerTabs.on({
				click: e => {
					(0, _innerTabs.handleInnerTabs)(e, this)
				}
			}), this.elements.$tabsItems.on({
				scroll: e => {
					(0, _scrollUtils.handleVideosPanelScroll)(this.elements, e)
				}
			}), this.elements.$toggleVideosDisplayButton.on({
				click: e => {
					jQuery(e.target).toggleClass("rotate-up"), jQuery(e.target).toggleClass("rotate-down"), this.elements.$tabsWrapper.slideToggle("slow")
				}
			})
		}
		onInit(...e) {
			super.onInit(...e), this.playlistId = this.getID(), this.storageKey = "watched_videos_" + this.getID();
			const t = elementorFrontend.storage.get(this.storageKey);
			this.watchedVideosArray = t ? JSON.parse(t) : [], this.watchedIndication = this.getElementSettings("show_watched_indication"), (0, _scrollUtils.handleVideosPanelScroll)(this.elements), this.isAutoplayOnLoad = "yes" === this.getElementSettings("autoplay_on_load"), this.isAutoplayNextUp = "yes" === this.getElementSettings("autoplay_next"), this.isFirstVideoActivated = !0, this.createPlaylistItems(), this.isCollapsible = this.getElementSettings("inner_tab_is_content_collapsible"), this.innerTabsHeightLimit = this.getElementSettings("inner_tab_collapsible_height"), this.currentPlayingPlaylistItemIndex = 1, this.activateInitialVideo(), this.activateInnerTabInEditMode()
		}
		onEditSettingsChange(e) {
			"panel" === e && (this.preventTabActivation = !0), "activeItemIndex" === e && (this.preventTabActivation ? this.preventTabActivation = !1 : this.activateDefaultTab())
		}
		activateInitialVideo() {
			this.isPageOnLoad = !0;
			const e = !!this.getElementSettings("lazy_load"),
				t = (0, _urlParams.handleURLParams)(this.playlistId, this.playlistItemsArray);
			let n = !1;
			t ? (this.currentPlaylistItemIndex = t, this.currentPlayingPlaylistItemIndex = t, n = !0) : (this.currentPlaylistItemIndex = 1, this.currentPlayingPlaylistItemIndex = 1), this.isAutoplayOnLoad && !n && (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex), this.handleFirstVideoActivation(e)
		}
		handleFirstVideoActivation(e) {
			if (!e) return void this.activateDefaultTab(this.currentPlaylistItemIndex);
			const t = document.querySelector(".elementor-element-" + this.playlistId + " .e-tabs-main-area"),
				n = elementorModules.utils.Scroll.scrollObserver({
					callback: e => {
						e.isInViewport && (this.activateDefaultTab(this.currentPlaylistItemIndex), n.unobserve(t))
					}
				});
			n.observe(t)
		}
		getCurrentItemSelected() {
			return this.playlistItemsArray[this.currentPlaylistItemIndex - 1]
		}
		getCurrentPlayerSelected() {
			return this.getCurrentItemSelected().playerInstance
		}
		getCurrentPlayerPlaying() {
			return this.playlistItemsArray[this.currentPlayingPlaylistItemIndex - 1].playerInstance
		}
		isVideoShouldBePlayed() {
			if (this.currentPlayingPlaylistItemIndex !== this.currentPlaylistItemIndex) this.getCurrentPlayerPlaying() && this.getCurrentPlayerPlaying().pause(), this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex;
			else if (this.getCurrentPlayerPlaying().isVideoPlaying) return this.getCurrentPlayerPlaying().pause(), !1;
			return !0
		}
		activateInnerTabInEditMode() {
			if (this.isEdit && this.getEditSettings("innerActiveIndex")) {
				const e = this.getEditSettings("innerActiveIndex");
				jQuery(this.elements.$innerTabs.eq(this.currentPlaylistItemIndex - 1).find(".e-inner-tab-title a"))[e].click()
			}
		}
		async handleVideo(e) {
			if (e.playerInstance) this.isVideoShouldBePlayed() && (1 === this.currentPlaylistItemIndex && this.elements.$imageOverlay && this.elements.$imageOverlay.remove(), this.playVideoAfterCreation(e));
			else {
				const t = {
					youtube: _playerYoutube,
					vimeo: _playerVimeo,
					hosted: _playerHosted
				};
				e.playerInstance = new t[e.videoType](e, this.currentPlaylistItemIndex), e.playerInstance.create().then((() => {
					this.isVideoShouldBePlayed() && this.playVideoOnCreation(e), e.playerInstance.handleFullScreenChange((e => {
						(0, _eventTrigger.triggerEvent)(this, e ? "videoFullScreen" : "videoExitFullScreen", "click")
					})), e.playerInstance.handlePlayed((() => {
						const t = this.getCurrentItemSelected();
						let n = "click";
						t.isAutoplayOnLoad ? (n = "onLoad", e.isAutoplayOnLoad = !1) : t.isAutoPlayNextUp && (n = "nextVideo"), (0, _eventTrigger.triggerEvent)(this, t.playerInstance.isVideoPausedLocal ? "videoResume" : "videoStart", n)
					})), e.playerInstance.handleEnded((() => {
						(0, _eventTrigger.triggerEvent)(this, "videoEnded", "click"), this.watchedIndication && this.elements.$tabTitles.filter(".e-active").addClass("watched-video");
						const e = this.getCurrentItemSelected().dataItemId;
						if (!this.watchedVideosArray.includes(e) && this.watchedIndication && (this.watchedVideosArray.push(this.getCurrentItemSelected().dataItemId), elementorFrontend.storage.set(this.storageKey, JSON.stringify(this.watchedVideosArray))), this.isAutoplayNextUp && this.playlistItemsArray.length >= ++this.currentPlaylistItemIndex) {
							for (;
								"section" === this.getCurrentItemSelected().videoType;)
								if (this.currentPlaylistItemIndex++, this.playlistItemsArray.length < this.currentPlaylistItemIndex) return void(this.currentPlaylistItemIndex = this.playlistItemsArray.length);
							this.changeActiveTab(this.currentPlaylistItemIndex, !0)
						}
					})), e.playerInstance.handlePaused((e => {
						(0, _eventTrigger.triggerEvent)(this, "videoPaused", "click", e)
					}))
				}))
			}
		}
		playVideoAfterCreation(e) {
			e.playerInstance.play()
		}
		playVideoOnCreation(e) {
			this.isAutoplayOnLoad ? (e.isAutoplayOnLoad = !0, e.playerInstance.mute(), e.playerInstance.play(), this.isAutoplayOnLoad = !1) : this.isFirstVideoActivated || (e.isAutoPlayNextUp = !0, e.playerInstance.play()), this.isFirstVideoActivated = !1
		}
		createPlaylistItems() {
			this.playlistItemsArray = [], this.elements.$videos.each(((e, t) => {
				const n = {},
					s = jQuery(t);
				n.videoUrl = s.attr("data-video-url"), n.videoType = s.attr("data-video-type"), n.videoTitle = s.attr("data-video-title"), n.videoDuration = s.attr("data-video-duration"), n.tabContent = t, n.dataTab = e + 1, n.dataItemId = this.getElementSettings().tabs[e]._id, this.playlistItemsArray.push(n)
			})), this.watchedVideosArray.length > 0 && this.watchedIndication && this.watchedVideosArray.forEach((e => {
				const t = this.playlistItemsArray.find((t => t.dataItemId === e));
				this.elements.$tabTitles.filter('[data-tab="' + t.dataTab + '"]').addClass("watched-video")
			}))
		}
		changeActiveTab(e, t) {
			if (super.changeActiveTab(e), this.playlistItemsArray[e - 1] && "section" !== this.playlistItemsArray[e - 1].videoType && (this.currentPlaylistItemIndex = parseInt(e), t && (this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex), this.handleVideo(this.getCurrentItemSelected(), t), this.isPageOnLoad || (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex), this.isPageOnLoad = !1, jQuery(this.elements.$innerTabs.eq(e - 1)).find(".e-inner-tab-content").length > 0)) {
				const e = this.elements.$innerTabs.filter(".e-active").find(".e-inner-tab-content");
				(0, _innerTabs.handleInnerTabsButtonsDisplay)(e.toArray(), this.isCollapsible, this.innerTabsHeightLimit)
			}
		}
	};
jQuery(window).on("elementor/frontend/init", (function() {
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_video-playlist.default", (function(e) {
			new VideoPlaylistHandler({
				$element: e
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends TWBB_WooCommerce_Base {
			getDefaultSettings() {
				const e = super.getDefaultSettings(...arguments);
				return {
					selectors: {
						...e.selectors,
						shippingForm: ".shipping-calculator-form",
						quantityInput: ".qty",
						updateCartButton: "button[name=update_cart]",
						wpHttpRefererInputs: "[name=_wp_http_referer]",
						hiddenInput: "input[type=hidden]",
						productRemove: ".product-remove a"
					},
					classes: e.classes,
					ajaxUrl: elementorTenwebFrontend.config.ajaxurl
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					...super.getDefaultElements(...arguments),
					$shippingForm: this.$element.find(e.shippingForm),
					$stickyColumn: this.$element.find(e.stickyColumn),
					$hiddenInput: this.$element.find(e.hiddenInput)
				}
			}
			bindEvents() {
				super.bindEvents();
				const e = this.getSettings("selectors");
				elementorFrontend.elements.$body.on("wc_fragments_refreshed", (() => this.applyButtonsHoverAnimation())), "yes" === this.getElementSettings("update_cart_automatically") && this.$element.on("input", e.quantityInput, (() => this.updateCart())), elementorFrontend.elements.$body.on("wc_fragments_loaded wc_fragments_refreshed", (() => {
					this.updateWpReferers(), (elementorFrontend.isEditMode() || elementorFrontend.isWPPreviewMode()) && this.disableActions()
				})), elementorFrontend.elements.$body.on("added_to_cart", (function(e, t) {
					if (t.e_manually_triggered) return !1
				}))
			}
			onInit() {
				super.onInit(...arguments), this.toggleStickyRightColumn(), this.hideHiddenInputsParentElements(), elementorFrontend.isEditMode() && this.elements.$shippingForm.show(), this.applyButtonsHoverAnimation(), this.updateWpReferers(), (elementorFrontend.isEditMode() || elementorFrontend.isWPPreviewMode()) && this.disableActions(), jQuery(document).on("click", ".elementor-widget-twbb_woocommerce-cart .twbb-product-quantity-change", (function() {
					var e = jQuery(this).parent().find("input");
					return jQuery(this).hasClass("twbb-minus-quantity") ? e.val(parseInt(e.val()) - 1) : e.val(parseInt(e.val()) + 1), e.change(), jQuery("button[name=update_cart]").trigger("click"), !1
				}))
			}
			disableActions() {
				const e = this.getSettings("selectors");
				this.$element.find(e.updateCartButton).attr({
					disabled: "disabled",
					"aria-disabled": "true"
				}), elementorFrontend.isEditMode() && (this.$element.find(e.quantityInput).attr("disabled", "disabled"), this.$element.find(e.productRemove).css("pointer-events", "none"))
			}
			onElementChange(e) {
				"sticky_right_column" === e && this.toggleStickyRightColumn(), "additional_template_select" === e && elementorTenweb.modules.woocommerce.onTemplateIdChange("additional_template_select")
			}
			onDestroy() {
				super.onDestroy(...arguments), this.deactivateStickyRightColumn()
			}
			updateCart() {
				const e = this.getSettings("selectors");
				clearTimeout(this._debounce), this._debounce = setTimeout((() => {
					this.$element.find(e.updateCartButton).trigger("click")
				}), 1500)
			}
			applyButtonsHoverAnimation() {
				const e = this.getElementSettings();
				e.checkout_button_hover_animation && jQuery(".checkout-button").addClass("elementor-animation-" + e.checkout_button_hover_animation), e.forms_buttons_hover_animation && jQuery(".shop_table .button").addClass("elementor-animation-" + e.forms_buttons_hover_animation)
			}
			hideHiddenInputsParentElements() {
				this.isEdit && this.elements.$hiddenInput && this.elements.$hiddenInput.parent(".form-row").addClass("elementor-hidden")
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-cart.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends TWBB_WooCommerce_Base {
			getDefaultSettings() {
				const e = super.getDefaultSettings(...arguments);
				return {
					selectors: {
						...e.selectors,
						container: ".elementor-widget-twbb_woocommerce-checkout-page",
						loginForm: ".e-woocommerce-login-anchor",
						loginSubmit: ".e-woocommerce-form-login-submit",
						loginSection: ".e-woocommerce-login-section",
						showCouponForm: ".e-show-coupon-form",
						couponSection: ".e-coupon-anchor",
						showLoginForm: ".e-show-login",
						applyCoupon: ".e-apply-coupon",
						checkoutForm: "form.woocommerce-checkout",
						couponBox: ".e-coupon-box",
						address: "address",
						wpHttpRefererInputs: '[name="_wp_http_referer"]'
					},
					classes: e.classes,
					ajaxUrl: elementorTenwebFrontend.config.ajaxurl
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					...super.getDefaultElements(...arguments),
					$container: this.$element.find(e.container),
					$loginForm: this.$element.find(e.loginForm),
					$showCouponForm: this.$element.find(e.showCouponForm),
					$couponSection: this.$element.find(e.couponSection),
					$showLoginForm: this.$element.find(e.showLoginForm),
					$applyCoupon: this.$element.find(e.applyCoupon),
					$loginSubmit: this.$element.find(e.loginSubmit),
					$couponBox: this.$element.find(e.couponBox),
					$checkoutForm: this.$element.find(e.checkoutForm),
					$loginSection: this.$element.find(e.loginSection),
					$address: this.$element.find(e.address)
				}
			}
			bindEvents() {
				super.bindEvents(...arguments), this.elements.$showCouponForm.on("click", (e => {
					e.preventDefault(), this.elements.$couponSection.slideToggle()
				})), this.elements.$showLoginForm.on("click", (e => {
					e.preventDefault(), this.elements.$loginForm.slideToggle()
				})), this.elements.$applyCoupon.on("click", (e => {
					e.preventDefault(), this.applyCoupon()
				})), this.elements.$loginSubmit.on("click", (e => {
					e.preventDefault(), this.loginUser()
				})), elementorFrontend.elements.$body.on("updated_checkout", (() => {
					this.applyPurchaseButtonHoverAnimation(), this.updateWpReferers()
				}))
			}
			onInit() {
				super.onInit(...arguments), this.toggleStickyRightColumn(), this.updateWpReferers(), this.equalizeElementHeight(this.elements.$address), elementorFrontend.isEditMode() && (this.elements.$loginForm.show(), this.elements.$couponSection.show(), this.applyPurchaseButtonHoverAnimation())
			}
			onElementChange(e) {
				"sticky_right_column" === e && this.toggleStickyRightColumn()
			}
			onDestroy() {
				super.onDestroy(...arguments), this.deactivateStickyRightColumn()
			}
			applyPurchaseButtonHoverAnimation() {
				const e = this.getElementSettings("purchase_button_hover_animation");
				e && jQuery("#place_order").addClass("elementor-animation-" + e)
			}
			applyCoupon() {
				if (!wc_checkout_params) return;
				this.startProcessing(this.elements.$couponBox);
				const e = {
					security: wc_checkout_params.apply_coupon_nonce,
					coupon_code: this.elements.$couponBox.find('input[name="coupon_code"]').val()
				};
				jQuery.ajax({
					type: "POST",
					url: wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%", "apply_coupon"),
					context: this,
					data: e,
					success(t) {
						jQuery(".woocommerce-error, .woocommerce-message").remove(), this.elements.$couponBox.removeClass("processing").unblock(), t && (this.elements.$checkoutForm.before(t), this.elements.$couponSection.slideUp(), elementorFrontend.elements.$body.trigger("applied_coupon_in_checkout", [e.coupon_code]), elementorFrontend.elements.$body.trigger("update_checkout", {
							update_shipping_method: !1
						}))
					},
					dataType: "html"
				})
			}
			loginUser() {
				this.startProcessing(this.elements.$loginSection);
				const e = {
					action: "elementor_woocommerce_checkout_login_user",
					username: this.elements.$loginSection.find('input[name="username"]').val(),
					password: this.elements.$loginSection.find('input[name="password"]').val(),
					nonce: this.elements.$loginSection.find('input[name="woocommerce-login-nonce"]').val(),
					remember: this.elements.$loginSection.find("input#rememberme").prop("checked")
				};
				jQuery.ajax({
					type: "POST",
					url: this.getSettings("ajaxUrl"),
					context: this,
					data: e,
					success(e) {
						e = JSON.parse(e), this.elements.$loginSection.removeClass("processing").unblock();
						jQuery(".woocommerce-error, .woocommerce-message").remove(), e.logged_in ? location.reload() : (this.elements.$checkoutForm.before(e.message), elementorFrontend.elements.$body.trigger("checkout_error", [e.message]))
					}
				})
			}
			startProcessing(e) {
				e.is(".processing") || e.addClass("processing").block({
					message: null,
					overlayCSS: {
						background: "#fff",
						opacity: .6
					}
				})
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-checkout-page.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends elementorModules.frontend.handlers.Base {
			getDefaultSettings() {
				return {
					selectors: {
						container: ".twbb_menu-cart__container",
						main: ".twbb_menu-cart__main",
						toggle: ".twbb_menu-cart__toggle",
						toggleButton: "#twbb_menu-cart__toggle_button",
						toggleWrapper: ".twbb_menu-cart__toggle_wrapper",
						closeButton: ".twbb_menu-cart__close-button, .twbb_menu-cart__close-button-custom",
						productList: ".twbb_menu-cart__products"
					},
					classes: {
						isShown: "twbb_menu-cart--shown"
					}
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					$container: this.$element.find(e.container),
					$main: this.$element.find(e.main),
					$toggleWrapper: this.$element.find(e.toggleWrapper),
					$closeButton: this.$element.find(e.closeButton)
				}
			}
			toggleCart() {
				this.isCartOpen ? this.hideCart() : this.showCart()
			}
			showCart() {
				if (this.isCartOpen) return;
				const e = this.getSettings("classes"),
					t = this.getSettings("selectors");
				this.isCartOpen = !0, this.$element.addClass(e.isShown), this.$element.find(t.toggleButton).attr("aria-expanded", !0), this.elements.$main.attr("aria-hidden", !1), this.elements.$container.attr("aria-hidden", !1)
			}
			hideCart() {
				if (!this.isCartOpen) return;
				const e = this.getSettings("classes"),
					t = this.getSettings("selectors");
				this.isCartOpen = !1, this.$element.removeClass(e.isShown), this.$element.find(t.toggleButton).attr("aria-expanded", !1), this.elements.$main.attr("aria-hidden", !0), this.elements.$container.attr("aria-hidden", !0)
			}
			automaticallyOpenCart() {
				"yes" === this.getElementSettings().automatically_open_cart && this.showCart()
			}
			refreshFragments(e) {
				let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
				if (elementorFrontend.isEditMode() && elementorTenweb.modules.woocommerce.didManuallyTriggerAddToCartEvent(t)) return !1;
				const n = [];
				jQuery.each(elementorFrontend.documentsManager.documents, (e => {
					n.push(e)
				})), jQuery.ajax({
					type: "POST",
					url: elementorTenwebFrontend.config.ajaxurl,
					context: this,
					data: {
						action: "twbb_menu_cart_fragments",
						templates: n,
						_nonce: ElementorTenwebFrontendConfig.woocommerce.menu_cart.fragments_nonce,
						is_editor: elementorFrontend.isEditMode()
					},
					success(e) {
						e?.fragments && jQuery.each(e.fragments, ((e, t) => {
							jQuery(e).replaceWith(t)
						}))
					},
					complete() {
						"added_to_cart" === e && this.automaticallyOpenCart()
					}
				})
			}
			bindEvents() {
				const e = elementorTenwebFrontend.config.woocommerce.menu_cart,
					t = -1 === e.cart_page_url.indexOf("?") ? window.location.origin + window.location.pathname : window.location.href,
					n = e.cart_page_url,
					s = e.cart_page_url === t,
					i = e.checkout_page_url === t,
					o = this.getSettings("selectors");
				if (s && i) return void this.$element.find(o.toggleButton).attr("href", n);
				const r = this.getSettings("classes");
				this.isCartOpen = this.$element.hasClass(r.isShown);
				"mouseover" === this.getElementSettings().open_cart ? (this.elements.$toggleWrapper.on("mouseover click", o.toggleButton, (e => {
					e.preventDefault(), this.showCart()
				})), this.elements.$toggleWrapper.on("mouseleave", (() => this.hideCart()))) : this.elements.$toggleWrapper.on("click", o.toggleButton, (e => {
					e.preventDefault(), this.toggleCart()
				})), elementorFrontend.elements.$document.on("click", (e => {
					if (!this.isCartOpen) return;
					const t = jQuery(e.target);
					t.closest(this.elements.$main).length || t.closest(o.toggle).length || this.hideCart()
				})), this.elements.$closeButton.on("click", (e => {
					e.preventDefault(), this.hideCart()
				})), elementorFrontend.elements.$document.on("keyup", (e => {
					27 === e.keyCode && this.hideCart()
				})), elementorFrontend.elements.$body.on("wc_fragments_refreshed removed_from_cart added_to_cart", ((e, t) => this.refreshFragments(e.type, t))), elementorFrontend.addListenerOnce(this.getUniqueHandlerID() + "_window_resize_dropdown", "resize", (() => this.governDropdownHeight())), elementorFrontend.elements.$body.on("wc_fragments_loaded wc_fragments_refreshed", (() => this.governDropdownHeight()))
			}
			unbindEvents() {
				elementorFrontend.removeListeners(this.getUniqueHandlerID() + "_window_resize_dropdown", "resize")
			}
			onInit() {
				super.onInit(), elementorTenwebFrontend.config.woocommerce.productAddedToCart && this.automaticallyOpenCart(), this.governDropdownHeight()
			}
			governDropdownHeight() {
				const e = this.getElementSettings(),
					t = this.getSettings("selectors");
				if ("mini-cart" !== e.cart_type) return;
				const n = this.$element.find(t.productList),
					s = this.$element.find(t.toggle);
				if (!n.length || !s.length) return;
				this.$element.find(t.productList).css("max-height", "");
				const i = document.documentElement.clientHeight,
					o = s.height() + parseInt(this.elements.$main.css("margin-top")),
					r = s[0].getBoundingClientRect().top,
					a = n.height(),
					l = i - r - o - (this.elements.$main.prop("scrollHeight") - a) - 30,
					c = Math.max(120, l);
				n.css("max-height", c)
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-menu-cart.default", (function(t) {
			new e({
				$element: t
			})
		})), jQuery(document.body).on("wc_fragments_loaded wc_fragments_refreshed", (function() {
			jQuery("div.elementor-widget-twbb_woocommerce-menu-cart").each((function() {
				elementorFrontend.elementsHandler.runReadyTrigger(jQuery(this))
			})), elementorFrontend.isEditMode() && elementorFrontend.on("components:init", (() => {
				elementorFrontend.elements.$body.find(".twbb_widget-woocommerce-cart").length || elementorFrontend.elements.$body.append('<div class="woocommerce-cart-form">')
			}))
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends TWBB_WooCommerce_Base {
			getDefaultSettings() {
				return {
					selectors: {
						address: "address",
						tabLinks: ".woocommerce-MyAccount-navigation-link a",
						viewOrderButtons: ".my_account_orders .woocommerce-button.view",
						viewOrderLinks: ".woocommerce-orders-table__cell-order-number a",
						authForms: "form.login, form.register",
						tabWrapper: ".e-my-account-tab",
						tabItem: ".woocommerce-MyAccount-navigation li",
						allPageElements: "[e-my-account-page]",
						purchasenote: "tr.product-purchase-note",
						contentWrapper: ".woocommerce-MyAccount-content-wrapper"
					}
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					$address: this.$element.find(e.address),
					$tabLinks: this.$element.find(e.tabLinks),
					$viewOrderButtons: this.$element.find(e.viewOrderButtons),
					$viewOrderLinks: this.$element.find(e.viewOrderLinks),
					$authForms: this.$element.find(e.authForms),
					$tabWrapper: this.$element.find(e.tabWrapper),
					$tabItem: this.$element.find(e.tabItem),
					$allPageElements: this.$element.find(e.allPageElements),
					$purchasenote: this.$element.find(e.purchasenote),
					$contentWrapper: this.$element.find(e.contentWrapper)
				}
			}
			editorInitTabs() {
				this.elements.$allPageElements.each(((e, t) => {
					const n = t.getAttribute("e-my-account-page");
					let s;
					if ("view-order" === n) s = this.elements.$viewOrderLinks.add(this.elements.$viewOrderButtons);
					else s = this.$element.find(".woocommerce-MyAccount-navigation-link--" + n);
					s.on("click", (() => {
						this.currentPage = n, this.editorShowTab()
					}))
				}))
			}
			editorShowTab() {
				const e = this.$element.find('[e-my-account-page="' + this.currentPage + '"]');
				this.$element.attr("e-my-account-page", this.currentPage), this.elements.$allPageElements.hide(), e.show(), this.toggleEndpointClasses(), "view-order" !== this.currentPage && (this.elements.$tabItem.removeClass("is-active"), this.$element.find(".woocommerce-MyAccount-navigation-link--" + this.currentPage).addClass("is-active")), "edit-address" !== this.currentPage && "view-order" !== this.currentPage || this.equalizeElementHeights()
			}
			toggleEndpointClasses() {
				const e = ["dashboard", "orders", "view-order", "downloads", "edit-account", "edit-address", "payment-methods"];
				let t = "";
				this.elements.$tabWrapper.removeClass("e-my-account-tab__" + e.join(" e-my-account-tab__") + " e-my-account-tab__dashboard--custom"), "dashboard" === this.currentPage && this.elements.$contentWrapper.find(".elementor").length && (t = " e-my-account-tab__dashboard--custom"), e.includes(this.currentPage) && this.elements.$tabWrapper.addClass("e-my-account-tab__" + this.currentPage + t)
			}
			applyButtonsHoverAnimation() {
				const e = this.getElementSettings();
				e.forms_buttons_hover_animation && this.$element.find(".woocommerce button.button,  #add_payment_method #payment #place_order").addClass("elementor-animation-" + e.forms_buttons_hover_animation), e.tables_button_hover_animation && this.$element.find(".order-again .button, td .button, .woocommerce-pagination .button").addClass("elementor-animation-" + e.tables_button_hover_animation)
			}
			equalizeElementHeights() {
				this.equalizeElementHeight(this.elements.$address), this.isEdit || this.equalizeElementHeight(this.elements.$authForms)
			}
			onElementChange(e) {
				0 !== e.indexOf("general_text_typography") && 0 !== e.indexOf("sections_padding") || this.equalizeElementHeights(), 0 === e.indexOf("forms_rows_gap") && this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote), "customize_dashboard_select" === e && elementorTenweb.modules.woocommerce.onTemplateIdChange("customize_dashboard_select")
			}
			bindEvents() {
				super.bindEvents(), elementorFrontend.elements.$body.on("keyup change", ".register #reg_password", (() => {
					this.equalizeElementHeights()
				}))
			}
			onInit() {
				super.onInit(...arguments), this.isEdit && (this.editorInitTabs(), this.$element.attr("e-my-account-page") ? this.currentPage = this.$element.attr("e-my-account-page") : this.currentPage = "dashboard", this.editorShowTab()), this.applyButtonsHoverAnimation(), this.equalizeElementHeights(), this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote)
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-my-account.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})), jQuery(window).on("elementor/frontend/init", (function() {
		class e extends elementorModules.frontend.handlers.Base {
			getDefaultSettings() {
				return {
					selectors: {
						woocommerceNotices: ".woocommerce-NoticeGroup, :not(.woocommerce-NoticeGroup) .woocommerce-error, :not(.woocommerce-NoticeGroup) .woocommerce-message, :not(.woocommerce-NoticeGroup) .woocommerce-info",
						noticesWrapper: ".e-woocommerce-notices-wrapper"
					}
				}
			}
			getDefaultElements() {
				const e = this.getSettings("selectors");
				return {
					$documentScrollToElements: elementorFrontend.elements.$document.find("html, body"),
					$woocommerceCheckoutForm: elementorFrontend.elements.$body.find(".form.checkout"),
					$noticesWrapper: this.$element.find(e.noticesWrapper)
				}
			}
			moveNotices() {
				let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
				const t = this.getSettings("selectors");
				let n = elementorFrontend.elements.$body.find(t.woocommerceNotices);
				if ((elementorFrontend.isEditMode() || elementorFrontend.isWPPreviewMode()) && (n = n.filter(":not(.e-notices-demo-notice)")), e && this.elements.$documentScrollToElements.stop(), this.elements.$noticesWrapper.prepend(n), this.is_ready || (this.elements.$noticesWrapper.removeClass("e-woocommerce-notices-wrapper-loading"), this.is_ready = !0), e) {
					let e = n;
					e.length || (e = this.elements.$woocommerceCheckoutForm), e.length && this.elements.$documentScrollToElements.animate({
						scrollTop: e.offset().top - document.documentElement.clientHeight / 2
					}, 1e3)
				}
			}
			onInit() {
				super.onInit(), this.is_ready = !1, this.moveNotices(!0)
			}
			bindEvents() {
				elementorFrontend.elements.$body.on("updated_wc_div updated_checkout updated_cart_totals applied_coupon removed_coupon applied_coupon_in_checkout removed_coupon_in_checkout checkout_error", (() => this.moveNotices(!0)))
			}
		}
		elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-notices.default", (function(t) {
			new e({
				$element: t
			})
		}))
	})),
	function() {
		if ("function" == typeof window.CustomEvent) return !1;

		function e(e, t) {
			t = t || {
				bubbles: !1,
				cancelable: !1,
				detail: void 0
			};
			var n = document.createEvent("CustomEvent");
			return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
		}
		e.prototype = window.Event.prototype, window.CustomEvent = e
	}(),
	function() {
		this.MultiRange = function(e, t) {
			t = "object" == typeof t ? t : {}, this.settings = {
					minRange: "number" == typeof t.minRange ? t.minRange : 1,
					tickStep: t.tickStep || 5,
					step: "number" == typeof t.step ? t.step : 1,
					scale: 100,
					min: t.min || 0,
					max: t.max || 100
				}, this.delta = this.settings.max - this.settings.min, t.ticks && (this.settings.tickStep = this.delta / t.ticks), this.ranges = t.ranges || [this.settings.ranges[0], this.settings.ranges[1]], this.id = Math.random().toString(36).substr(2, 9), this.DOM = {},
				function(e, t) {
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
				}(this, new this.EventDispatcher), this.build(e), this.events.binding.call(this)
		}, MultiRange.prototype = {
			build: function(e) {
				var t = -1 == e.className.indexOf("multiRange") ? "multiRange " + e.className : e.className;
				this.DOM.scope = document.createElement("div"), this.DOM.scope.className = t, this.DOM.rangeWrap = document.createElement("div"), this.DOM.rangeWrap.className = "multiRange__rangeWrap", this.DOM.rangeWrap.innerHTML = this.getRangesHTML(), this.DOM.ticks = document.createElement("div"), this.DOM.ticks.className = "multiRange__ticks", this.DOM.ticks.innerHTML = this.generateTicks(), this.DOM.scope.appendChild(this.DOM.rangeWrap), this.DOM.scope.appendChild(this.DOM.ticks), e.parentNode.replaceChild(this.DOM.scope, e)
			},
			generateTicks() {
				var e, t = this.delta / this.settings.tickStep,
					n = "";
				for (e = 0; e <= t; e++) n += '<div data-value="' + (+this.settings.min + this.settings.tickStep * e).toFixed(1).replace(".0", "") + '"></div>';
				return n
			},
			getRangesHTML() {
				var e, t = this,
					n = "";
				return this.ranges.unshift(0), this.ranges[this.ranges.length - 1] <= this.settings.max && this.ranges.push(this.settings.max), (e = this.ranges).forEach((function(s, i) {
					if (i != e.length - 1) {
						var o = (s - t.settings.min) / t.delta * 100;
						o < 0 && (o = 0), n += '<div data-idx="' + i + '" class="multiRange__range" style="left:' + o + '%"><div class="multiRange__handle"></div></div>', 1 == i ? jQuery(".current_min_price").html(s.toFixed(1).replace(".0", "")) : 2 == i && jQuery(".current_max_price").html(s.toFixed(1).replace(".0", ""))
					}
				})), n
			},
			EventDispatcher: function() {
				var e = document.createTextNode("");
				this.off = e.removeEventListener.bind(e), this.on = e.addEventListener.bind(e), this.trigger = function(t, n) {
					if (t) {
						var s = new CustomEvent(t, {
							detail: n
						});
						e.dispatchEvent(s)
					}
				}
			},
			events: {
				binding: function() {
					this.DOM.rangeWrap.addEventListener("mousedown", this.events.callbacks.onMouseDown.bind(this)), this.DOM.rangeWrap.addEventListener("touchstart", this.events.callbacks.onMouseDown.bind(this)), this.DOM.scope.addEventListener("dragstart", (function(e) {
						return !1
					}))
				},
				callbacks: {
					onMouseDown: function(e) {
						var t = e.target;
						if (t) {
							if ("multiRange__handle__value" == t.className) t = t.parentNode;
							else if ("multiRange__handle" != t.className) return;
							var n = this.DOM.scope.getBoundingClientRect();
							this.offsetLeft = n.left, this.scopeWidth = n.width, this.DOM.currentSlice = t.parentNode, this.DOM.currentSlice.classList.add("grabbed"), this.DOM.currentSliceValue = this.DOM.currentSlice.querySelector(".multiRange__handle__value"), document.body.classList.add("multiRange-grabbing"), this.events.onMouseUpFunc = this.events.callbacks.onMouseUp.bind(this), this.events.mousemoveFunc = this.events.callbacks.onMouseMove.bind(this), window.addEventListener("mouseup", this.events.onMouseUpFunc), window.addEventListener("mousemove", this.events.mousemoveFunc), window.addEventListener("touchend", this.events.onMouseUpFunc), window.addEventListener("touchmove", this.events.mousemoveFunc)
						}
					},
					onMouseUp: function(e) {
						this.DOM.currentSlice.classList.remove("grabbed"), window.removeEventListener("mousemove", this.events.mousemoveFunc), window.removeEventListener("mouseup", this.events.onMouseUpFunc), window.removeEventListener("touchmove", this.events.mousemoveFunc), window.removeEventListener("touchend", this.events.onMouseUpFunc), document.body.classList.remove("multiRange-grabbing");
						var t = parseInt(this.DOM.currentSlice.style.left);
						this.trigger("changed", {
							idx: +this.DOM.currentSlice.dataset.idx,
							value: t,
							ranges: this.ranges
						}), this.DOM.currentSlice = null
					},
					onMouseMove: function(e) {
						if (!this.DOM.currentSlice) return window.removeEventListener("mouseup", this.events.onMouseUpFunc), void window.removeEventListener("touchend", this.events.onMouseUpFunc);
						var t, n = this,
							s = (e.touches ? e.touches[0].clientX - this.offsetLeft : e.clientX - this.offsetLeft) / this.scopeWidth * 100,
							i = this.ranges[+this.DOM.currentSlice.dataset.idx - 1],
							o = this.ranges[+this.DOM.currentSlice.dataset.idx + 1];
						t = this.settings.min + this.delta / 100 * s, this.settings.step && (t = Math.round(t / this.settings.step) * this.settings.step), t < i + this.settings.minRange && (t = i + this.settings.minRange), t > o - this.settings.minRange && (t = o - this.settings.minRange), t < this.settings.min + this.settings.minRange && (t = this.settings.min + this.settings.minRange), t > this.settings.max - this.settings.minRange && (t = this.settings.max - this.settings.minRange), s = (t - this.settings.min) / this.delta * 100, window.requestAnimationFrame((function() {
							n.DOM.currentSlice && (n.DOM.currentSlice.style.left = s + "%")
						})), this.ranges[this.DOM.currentSlice.dataset.idx] = +t.toFixed(1), this.currentMinPriceDOM = jQuery(this.DOM.scope).closest(".twbb_woo_price_filter").children(".twbb_woo_price_filter-info").children(".twbb_woo_price_filter-info-price_range").children("span").children(".current_min_price"), this.currentMaxPriceDOM = jQuery(this.DOM.scope).closest(".twbb_woo_price_filter").children(".twbb_woo_price_filter-info").children(".twbb_woo_price_filter-info-price_range").children("span").children(".current_max_price"), jQuery(this.currentMinPriceDOM).html(this.ranges[1]), jQuery(this.currentMaxPriceDOM).html(this.ranges[2]), this.trigger("change", {
							idx: +this.DOM.currentSlice.dataset.idx,
							value: t,
							ranges: this.ranges
						}), jQuery(".price1").attr("value", this.ranges[1]), jQuery(".price2").attr("value", this.ranges[2])
					}
				}
			}
		}
	}();
let priceFilters = document.querySelectorAll(".twbb_woo_price_filter"),
	currentMinPrice = parseInt(jQuery(".price1").attr("value")),
	allMinPrice = parseInt(jQuery(".price1").attr("data-minPrice")),
	currentMaxPrice = parseInt(jQuery(".price2").attr("value")),
	allMaxPrice = parseInt(jQuery(".price2").attr("data-maxPrice"));
for (let e = 0; e < priceFilters.length; e++) new MultiRange(document.querySelectorAll(".multiRange")[e], {
	ranges: [currentMinPrice, currentMaxPrice],
	min: allMinPrice,
	max: allMaxPrice,
	step: 1,
	minRange: 0,
	ticks: 4
});
jQuery(".twbb_woo_price_filter").submit((function(e) {
	e.preventDefault();
	var t = new URL(location.href);
	t.searchParams.delete("product-page"), window.history.pushState(null, null, t.href), this.submit()
})), jQuery(window).on("elementor/frontend/init", (function() {
	class e extends TWBB_WooCommerce_Base {
		getDefaultSettings() {
			return {
				selectors: {
					quantityInput: ".e-loop-add-to-cart-form input.qty",
					addToCartButton: ".e-loop-add-to-cart-form .ajax_add_to_cart",
					addedToCartButton: ".added_to_cart",
					loopFormContainer: ".e-loop-add-to-cart-form-container"
				}
			}
		}
		getDefaultElements() {
			const e = this.getSettings("selectors");
			return {
				$quantityInput: this.$element.find(e.quantityInput),
				$addToCartButton: this.$element.find(e.addToCartButton)
			}
		}
		updateAddToCartButtonQuantity() {
			this.elements.$addToCartButton.attr("data-quantity", this.elements.$quantityInput.val())
		}
		handleAddedToCart(e) {
			const t = this.getSettings("selectors"),
				n = e.siblings(t.addedToCartButton),
				s = n.parents(t.loopFormContainer);
			s.children(t.addedToCartButton).remove(), s.append(n)
		}
		bindEvents() {
			super.bindEvents(...arguments), this.elements.$quantityInput.on("change", (() => {
				this.updateAddToCartButtonQuantity()
			})), elementorFrontend.elements.$body.off("added_to_cart.twbb_woocommerce-product-add-to-cart"), elementorFrontend.elements.$body.on("added_to_cart.twbb_woocommerce-product-add-to-cart", ((e, t, n, s) => {
				this.handleAddedToCart(s)
			}))
		}
	}
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-product-add-to-cart.default", (function(t) {
		new e({
			$element: t
		})
	}))
}));
var data_tabs_count = 0;

function add_params_to_product_link(e, t) {
	let n, s, i;
	return n = new URL(e).searchParams, Object.keys(t).forEach((function(e) {
		n.set(e, t[e])
	})), s = n.toString(), i = e.split("?")[0] + "?" + s, i
}

function productsAjaxPagination(e) {
	const t = e.find("a").attr("href"),
		n = e.closest(".elementor-widget-twbb_woocommerce-products"),
		s = e.closest(".elementor-widget-twbb_woocommerce-products").data("id");
	jQuery.ajax({
		url: t,
		type: "GET",
		dataType: "html",
		success: function(e) {
			const t = (new DOMParser).parseFromString(e, "text/html"),
				i = jQuery(t).find('.elementor-widget-twbb_woocommerce-products[data-id="' + s + '"]').html();
			n.html(i), jQuery(".twbb_woocommerce-products-ajax-paginate .page-numbers li").on("click", (function(e) {
				e.preventDefault(), productsAjaxPagination(jQuery(this))
			}))
		}
	})
}

function changeProductQuantity(e) {
	let t = jQuery(e).closest("li.product").find("input.twbb-product-quantity-input").val();
	jQuery(e).attr("data-quantity", t)
}
jQuery(window).on("elementor/frontend/init", (function() {
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-product-data-tabs.default", (function(e) {
		jQuery("body .elementor-widget-twbb_woocommerce-product-data-tabs").length > 1 && (alert("The page already includes a Product Data Tabs widget."), elementor.getPanelView().getCurrentPageView().getOption("editedElementView").removeElement())
	}))
})), jQuery(window).on("elementor/frontend/init", (function() {
	var e = async function(e) {
		var t = e.find(".woocommerce-product-gallery--with-images"),
			n = t.find("ol.flex-control-thumbs"),
			s = t.find("ol.flex-control-thumbs li");
		if (4 < t.find("ol.flex-control-thumbs li").length) {
			n.addClass("swiper-wrapper"), s.addClass("swiper-slide"), void 0 !== twbb.swiper_latest && "inactive" == twbb.swiper_latest ? t.append(jQuery('<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>')) : t.append(jQuery('<div class="swiper-button-prev twbb-swiper-last"></div><div class="swiper-button-next twbb-swiper-last"></div>'));
			var i = function() {
				t.find(".swiper-button-prev, .swiper-button-next").css("top", "calc(100% - " + t.find(".swiper-slide").height() / 2 + "px)")
			};
			const e = elementorFrontend.utils.swiper;
			await new e(t, {
				slidesPerView: 4,
				spaceBetween: 0,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				on: {
					imagesReady: i,
					resize: i
				}
			})
		}
	};
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-product-images.default", e), elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-page.default", e)
})), jQuery(window).on("elementor/frontend/init", (function() {
	jQuery(document).on("click", ".elementor-widget-twbb_woocommerce-page .twbb-product-quantity-change", (function() {
		var e = jQuery(this).parent().find("input");
		return jQuery(this).hasClass("twbb-minus-quantity") ? e.val(parseInt(e.val()) - 1) : e.val(parseInt(e.val()) + 1), e.change(), jQuery("button[name=update_cart]").trigger("click"), !1
	})), elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-page.default", (function(e) {
		jQuery("body .elementor-widget-twbb_woocommerce-page").length > 1 && (alert("The page already includes a WooCommerce Pages Widget element."), elementor.getPanelView().getCurrentPageView().getOption("editedElementView").removeElement())
	})), jQuery("body").hasClass("single-product") && jQuery("div[data-elementor-type=twbb_single]").addClass("product")
})), jQuery(window).on("elementor/frontend/init", (function() {
	jQuery(document).on("mouseenter", '.elementor-widget-twbb_woocommerce-products[data-widget_type="twbb_woocommerce-products.modern"].product_buttons_visibility__show_on_hover .product', (function() {
		jQuery(this).find(".twbb-add_to_cart_container_open").css({
			display: "flex"
		});
		let e = parseInt(jQuery(this).find(".twbb-add_to_cart_container_open").outerHeight());
		jQuery(this).find(".product_info_div").css("bottom", e + "px")
	})), jQuery(document).on("mouseleave ", '.elementor-widget-twbb_woocommerce-products[data-widget_type="twbb_woocommerce-products.modern"].product_buttons_visibility__show_on_hover .product', (function() {
		jQuery(this).find(".twbb-add_to_cart_container_open").css({
			display: "none"
		}), jQuery(this).find(".product_info_div").css("bottom", 0)
	})), jQuery(".twbb_woocommerce-products-ajax-paginate .page-numbers li").on("click", (function(e) {
		e.preventDefault(), productsAjaxPagination(jQuery(this))
	})), jQuery(".elementor-widget-twbb_woocommerce-products .add_to_cart_button").on("click", (function() {
		changeProductQuantity(this)
	})), jQuery(document).on("click", ".elementor-widget-twbb_woocommerce-products .twbb-product-quantity-change", (function() {
		var e = jQuery(this).parent().find("input");
		return jQuery(this).hasClass("twbb-minus-quantity") ? e.val(parseInt(e.val()) - 1) : e.val(parseInt(e.val()) + 1), e.change(), jQuery("button[name=update_cart]").trigger("click"), !1
	})), jQuery(".twbb-woocommerce-products-variations img").on("mouseenter", (function() {
		var e = jQuery(this).attr("src"),
			t = jQuery(this).closest(".twbb-woocommerce-products-variations").parent(),
			n = t.attr("href"),
			s = {};
		jQuery.each(jQuery(this).attr("data-attrs_as_params").split("&"), (function(e, t) {
			if (t) {
				let e, n;
				e = t.split("=")[0], n = t.split("=")[1], s[e] = n
			}
		}));
		var i = add_params_to_product_link(n, s);
		t.attr("href", i), jQuery(this).closest(".twbb-woocommerce-products-variations").parent().find(">img").removeAttr("srcset").attr("src", e)
	})), jQuery(document).on("click", ".add_to_cart_button", (function() {
		jQuery(this).addClass("twbb-change-button-text").text("Added"), setTimeout((function() {
			jQuery(".add_to_cart_button.twbb-change-button-text").text("Add to cart")
		}), 1e3)
	}))
})), jQuery(window).on("elementor/frontend/init", (function() {
	class e extends TWBB_WooCommerce_Base {
		getDefaultSettings() {
			return {
				selectors: {
					container: ".elementor-widget-twbb_woocommerce-purchase-summary",
					address: "address",
					purchasenote: ".product-purchase-note"
				}
			}
		}
		getDefaultElements() {
			const e = this.getSettings("selectors");
			return {
				$container: this.$element.find(e.container),
				$address: this.$element.find(e.address),
				$purchasenote: this.$element.find(e.purchasenote)
			}
		}
		onElementChange(e) {
			const t = ["general_text_typography", "sections_padding", "sections_border_width"];
			for (const n of t) e.startsWith(n) && this.equalizeElementHeight(this.elements.$address);
			e.startsWith("order_details_rows_gap") && this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote)
		}
		applyButtonsHoverAnimation() {
			const e = this.getElementSettings();
			e.order_details_button_hover_animation && this.$element.find(".order-again .button, td .button").addClass("elementor-animation-" + e.order_details_button_hover_animation)
		}
		onInit() {
			super.onInit(...arguments), this.equalizeElementHeight(this.elements.$address), this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote), this.applyButtonsHoverAnimation()
		}
	}
	elementorFrontend.hooks.addAction("frontend/element_ready/twbb_woocommerce-purchase-summary.default", (function(t) {
		new e({
			$element: t
		})
	}))
}));