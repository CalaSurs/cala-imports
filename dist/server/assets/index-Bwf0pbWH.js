import { V as jsxRuntimeExports, r as reactExports } from "./server-CmsbrLPY.js";
import { c as createLucideIcon, u as useStore, m as motion, M as MessageCircle, p as products, f as formatARS, P as Plus, d as Minus, A as AnimatePresence, S as StoreProvider, a as ScrollProgress, e as Cursor, N as Navbar, F as Footer, C as CartDrawer, b as PurchaseToasts } from "./PurchaseToasts-ISioQiuy.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-BCvgNs3a.js";
const __iconNode$7 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$7);
const __iconNode$6 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$6);
const __iconNode$5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
];
const Headphones = createLucideIcon("headphones", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
var version = "1.3.23";
function clamp(min, input, max) {
  return Math.max(min, Math.min(input, max));
}
function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
function damp(x, y, lambda, deltaTime) {
  return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
}
function modulo(n, d) {
  return (n % d + d) % d;
}
var Animate = class {
  isRunning = false;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(deltaTime) {
    if (!this.isRunning) return;
    let completed = false;
    if (this.duration && this.easing) {
      this.currentTime += deltaTime;
      const linearProgress = clamp(0, this.currentTime / this.duration, 1);
      completed = linearProgress >= 1;
      const easedProgress = completed ? 1 : this.easing(linearProgress);
      this.value = this.from + (this.to - this.from) * easedProgress;
    } else if (this.lerp) {
      this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
      if (Math.round(this.value) === Math.round(this.to)) {
        this.value = this.to;
        completed = true;
      }
    } else {
      this.value = this.to;
      completed = true;
    }
    if (completed) this.stop();
    this.onUpdate?.(this.value, completed);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = false;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(from, to, { lerp: lerp2, duration, easing, onStart, onUpdate }) {
    this.from = this.value = from;
    this.to = to;
    this.lerp = lerp2;
    this.duration = duration;
    this.easing = easing;
    this.currentTime = 0;
    this.isRunning = true;
    onStart?.();
    this.onUpdate = onUpdate;
  }
};
function debounce(callback, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = void 0;
      callback.apply(this, args);
    }, delay);
  };
}
var Dimensions = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
    this.wrapper = wrapper;
    this.content = content;
    if (autoResize) {
      this.debouncedResize = debounce(this.resize, debounceValue);
      if (this.wrapper instanceof Window) window.addEventListener("resize", this.debouncedResize);
      else {
        this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
        this.wrapperResizeObserver.observe(this.wrapper);
      }
      this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
      this.contentResizeObserver.observe(this.content);
    }
    this.resize();
  }
  destroy() {
    this.wrapperResizeObserver?.disconnect();
    this.contentResizeObserver?.disconnect();
    if (this.wrapper === window && this.debouncedResize) window.removeEventListener("resize", this.debouncedResize);
  }
  resize = () => {
    this.onWrapperResize();
    this.onContentResize();
  };
  onWrapperResize = () => {
    if (this.wrapper instanceof Window) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    } else {
      this.width = this.wrapper.clientWidth;
      this.height = this.wrapper.clientHeight;
    }
  };
  onContentResize = () => {
    if (this.wrapper instanceof Window) {
      this.scrollHeight = this.content.scrollHeight;
      this.scrollWidth = this.content.scrollWidth;
    } else {
      this.scrollHeight = this.wrapper.scrollHeight;
      this.scrollWidth = this.wrapper.scrollWidth;
    }
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
};
var Emitter = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(event, ...args) {
    const callbacks = this.events[event] || [];
    for (let i = 0, length = callbacks.length; i < length; i++) callbacks[i]?.(...args);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(event, cb) {
    if (this.events[event]) this.events[event].push(cb);
    else this.events[event] = [cb];
    return () => {
      this.events[event] = this.events[event]?.filter((i) => cb !== i);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(event, callback) {
    this.events[event] = this.events[event]?.filter((i) => callback !== i);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const LINE_HEIGHT = 100 / 6;
const listenerOptions = { passive: false };
function getDeltaMultiplier(deltaMode, size) {
  if (deltaMode === 1) return LINE_HEIGHT;
  if (deltaMode === 2) return size;
  return 1;
}
var VirtualScroll = class {
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new Emitter();
  constructor(element, options = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = element;
    this.options = options;
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
    this.element.addEventListener("wheel", this.onWheel, listenerOptions);
    this.element.addEventListener("touchstart", this.onTouchStart, listenerOptions);
    this.element.addEventListener("touchmove", this.onTouchMove, listenerOptions);
    this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(event, callback) {
    return this.emitter.on(event, callback);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy();
    window.removeEventListener("resize", this.onWindowResize);
    this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
    this.element.removeEventListener("touchstart", this.onTouchStart, listenerOptions);
    this.element.removeEventListener("touchmove", this.onTouchMove, listenerOptions);
    this.element.removeEventListener("touchend", this.onTouchEnd, listenerOptions);
  }
  /**
  * Event handler for 'touchstart' event
  *
  * @param event Touch event
  */
  onTouchStart = (event) => {
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
    this.touchStart.x = clientX;
    this.touchStart.y = clientY;
    this.lastDelta = {
      x: 0,
      y: 0
    };
    this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (event) => {
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
    const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
    const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = clientX;
    this.touchStart.y = clientY;
    this.lastDelta = {
      x: deltaX,
      y: deltaY
    };
    this.emitter.emit("scroll", {
      deltaX,
      deltaY,
      event
    });
  };
  onTouchEnd = (event) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (event) => {
    let { deltaX, deltaY, deltaMode } = event;
    const multiplierX = getDeltaMultiplier(deltaMode, this.window.width);
    const multiplierY = getDeltaMultiplier(deltaMode, this.window.height);
    deltaX *= multiplierX;
    deltaY *= multiplierY;
    deltaX *= this.options.wheelMultiplier;
    deltaY *= this.options.wheelMultiplier;
    this.emitter.emit("scroll", {
      deltaX,
      deltaY,
      event
    });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const defaultEasing = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var Lenis = class {
  _isScrolling = false;
  _isStopped = false;
  _isLocked = false;
  _preventNextNativeScrollEvent = false;
  _resetVelocityTimeout = null;
  _rafId = null;
  /**
  * Whether or not the user is touching the screen
  */
  isTouching;
  /**
  * The time in ms since the lenis instance was created
  */
  time = 0;
  /**
  * User data that will be forwarded through the scroll event
  *
  * @example
  * lenis.scrollTo(100, {
  *   userData: {
  *     foo: 'bar'
  *   }
  * })
  */
  userData = {};
  /**
  * The last velocity of the scroll
  */
  lastVelocity = 0;
  /**
  * The current velocity of the scroll
  */
  velocity = 0;
  /**
  * The direction of the scroll
  */
  direction = 0;
  /**
  * The options passed to the lenis instance
  */
  options;
  /**
  * The target scroll value
  */
  targetScroll;
  /**
  * The animated scroll value
  */
  animatedScroll;
  animate = new Animate();
  emitter = new Emitter();
  dimensions;
  virtualScroll;
  constructor({ wrapper = window, content = document.documentElement, eventsTarget = wrapper, smoothWheel = true, syncTouch = false, syncTouchLerp = 0.075, touchInertiaExponent = 1.7, duration, easing, lerp: lerp2 = 0.1, infinite = false, orientation = "vertical", gestureOrientation = orientation === "horizontal" ? "both" : "vertical", touchMultiplier = 1, wheelMultiplier = 1, autoResize = true, prevent, virtualScroll, overscroll = true, autoRaf = false, anchors = false, autoToggle = false, allowNestedScroll = false, __experimental__naiveDimensions = false, naiveDimensions = __experimental__naiveDimensions, stopInertiaOnNavigate = false } = {}) {
    window.lenisVersion = version;
    if (!window.lenis) window.lenis = {};
    window.lenis.version = version;
    if (orientation === "horizontal") window.lenis.horizontal = true;
    if (syncTouch === true) window.lenis.touch = true;
    if (!wrapper || wrapper === document.documentElement) wrapper = window;
    if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
    else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
    this.options = {
      wrapper,
      content,
      eventsTarget,
      smoothWheel,
      syncTouch,
      syncTouchLerp,
      touchInertiaExponent,
      duration,
      easing,
      lerp: lerp2,
      infinite,
      gestureOrientation,
      orientation,
      touchMultiplier,
      wheelMultiplier,
      autoResize,
      prevent,
      virtualScroll,
      overscroll,
      autoRaf,
      anchors,
      autoToggle,
      allowNestedScroll,
      naiveDimensions,
      stopInertiaOnNavigate
    };
    this.dimensions = new Dimensions(wrapper, content, { autoResize });
    this.updateClassName();
    this.targetScroll = this.animatedScroll = this.actualScroll;
    this.options.wrapper.addEventListener("scroll", this.onNativeScroll);
    this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: true });
    if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.addEventListener("click", this.onClick);
    this.options.wrapper.addEventListener("pointerdown", this.onPointerDown);
    this.virtualScroll = new VirtualScroll(eventsTarget, {
      touchMultiplier,
      wheelMultiplier
    });
    this.virtualScroll.on("scroll", this.onVirtualScroll);
    if (this.options.autoToggle) {
      this.checkOverflow();
      this.rootElement.addEventListener("transitionend", this.onTransitionEnd);
    }
    if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy();
    this.options.wrapper.removeEventListener("scroll", this.onNativeScroll);
    this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: true });
    this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown);
    if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.removeEventListener("click", this.onClick);
    this.virtualScroll.destroy();
    this.dimensions.destroy();
    this.cleanUpClassName();
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }
  on(event, callback) {
    return this.emitter.on(event, callback);
  }
  off(event, callback) {
    return this.emitter.off(event, callback);
  }
  onScrollEnd = (e) => {
    if (!(e instanceof CustomEvent)) {
      if (this.isScrolling === "smooth" || this.isScrolling === false) e.stopPropagation();
    }
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: { lenisScrollEnd: true }
    }));
  };
  get overflow() {
    const property = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[property];
  }
  checkOverflow() {
    if (["hidden", "clip"].includes(this.overflow)) this.internalStop();
    else this.internalStart();
  }
  onTransitionEnd = (event) => {
    if (event.propertyName?.includes("overflow") && event.target === this.rootElement) this.checkOverflow();
  };
  setScroll(scroll) {
    if (this.isHorizontal) this.options.wrapper.scrollTo({
      left: scroll,
      behavior: "instant"
    });
    else this.options.wrapper.scrollTo({
      top: scroll,
      behavior: "instant"
    });
  }
  onClick = (event) => {
    const linkElementsUrls = event.composedPath().filter((node) => node instanceof HTMLAnchorElement && node.href).map((element) => new URL(element.href));
    const currentUrl = new URL(window.location.href);
    if (this.options.anchors) {
      const anchorElementUrl = linkElementsUrls.find((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname === targetUrl.pathname && targetUrl.hash);
      if (anchorElementUrl) {
        const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
        const target = `#${anchorElementUrl.hash.split("#")[1]}`;
        this.scrollTo(target, options);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate) {
      if (linkElementsUrls.some((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname !== targetUrl.pathname)) {
        this.reset();
        return;
      }
    }
  };
  onPointerDown = (event) => {
    if (event.button === 1) this.reset();
  };
  onVirtualScroll = (data) => {
    if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false) return;
    const { deltaX, deltaY, event } = data;
    this.emitter.emit("virtual-scroll", {
      deltaX,
      deltaY,
      event
    });
    if (event.ctrlKey) return;
    if (event.lenisStopPropagation) return;
    const isTouch = event.type.includes("touch");
    const isWheel = event.type.includes("wheel");
    this.isTouching = event.type === "touchstart" || event.type === "touchmove";
    const isClickOrTap = deltaX === 0 && deltaY === 0;
    if (this.options.syncTouch && isTouch && event.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
    if (isClickOrTap || isUnknownGesture) return;
    let composedPath = event.composedPath();
    composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
    const prevent = this.options.prevent;
    const gestureOrientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
    if (composedPath.find((node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || gestureOrientation === "vertical" && node.hasAttribute?.("data-lenis-prevent-vertical") || gestureOrientation === "horizontal" && node.hasAttribute?.("data-lenis-prevent-horizontal") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(node, {
      deltaX,
      deltaY
    })))) return;
    if (this.isStopped || this.isLocked) {
      if (event.cancelable) event.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel)) {
      this.isScrolling = "native";
      this.animate.stop();
      event.lenisStopPropagation = true;
      return;
    }
    let delta = deltaY;
    if (this.options.gestureOrientation === "both") delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    else if (this.options.gestureOrientation === "horizontal") delta = deltaX;
    if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) event.lenisStopPropagation = true;
    if (event.cancelable) event.preventDefault();
    const isSyncTouch = isTouch && this.options.syncTouch;
    const hasTouchInertia = isTouch && event.type === "touchend";
    if (hasTouchInertia) delta = Math.sign(delta) * Math.abs(this.velocity) ** this.options.touchInertiaExponent;
    this.scrollTo(this.targetScroll + delta, {
      programmatic: false,
      ...isSyncTouch ? { lerp: hasTouchInertia ? this.options.syncTouchLerp : 1 } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    });
  };
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize();
    this.animatedScroll = this.targetScroll = this.actualScroll;
    this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (this._resetVelocityTimeout !== null) {
      clearTimeout(this._resetVelocityTimeout);
      this._resetVelocityTimeout = null;
    }
    if (this._preventNextNativeScrollEvent) {
      this._preventNextNativeScrollEvent = false;
      return;
    }
    if (this.isScrolling === false || this.isScrolling === "native") {
      const lastScroll = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.lastVelocity = this.velocity;
      this.velocity = this.animatedScroll - lastScroll;
      this.direction = Math.sign(this.animatedScroll - lastScroll);
      if (!this.isStopped) this.isScrolling = "native";
      this.emit();
      if (this.velocity !== 0) this._resetVelocityTimeout = setTimeout(() => {
        this.lastVelocity = this.velocity;
        this.velocity = 0;
        this.isScrolling = false;
        this.emit();
      }, 400);
    }
  };
  reset() {
    this.isLocked = false;
    this.isScrolling = false;
    this.animatedScroll = this.targetScroll = this.actualScroll;
    this.lastVelocity = this.velocity = 0;
    this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (!this.isStopped) return;
    if (this.options.autoToggle) {
      this.rootElement.style.removeProperty("overflow");
      return;
    }
    this.internalStart();
  }
  internalStart() {
    if (!this.isStopped) return;
    this.reset();
    this.isStopped = false;
    this.emit();
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (this.isStopped) return;
    if (this.options.autoToggle) {
      this.rootElement.style.setProperty("overflow", "clip");
      return;
    }
    this.internalStop();
  }
  internalStop() {
    if (this.isStopped) return;
    this.reset();
    this.isStopped = true;
    this.emit();
  }
  /**
  * RequestAnimationFrame for lenis
  *
  * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
  */
  raf = (time) => {
    const deltaTime = time - (this.time || time);
    this.time = time;
    this.animate.advance(deltaTime * 1e-3);
    if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
  };
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(_target, { offset = 0, immediate = false, lock = false, programmatic = true, lerp: lerp2 = programmatic ? this.options.lerp : void 0, duration = programmatic ? this.options.duration : void 0, easing = programmatic ? this.options.easing : void 0, onStart, onComplete, force = false, userData } = {}) {
    if ((this.isStopped || this.isLocked) && !force) return;
    let target = _target;
    let adjustedOffset = offset;
    if (typeof target === "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(target)) target = 0;
    else if (typeof target === "string" && [
      "bottom",
      "right",
      "end"
    ].includes(target)) target = this.limit;
    else {
      let node = null;
      if (typeof target === "string") {
        node = document.querySelector(target);
        if (!node) if (target === "#top") target = 0;
        else console.warn("Lenis: Target not found", target);
      } else if (target instanceof HTMLElement && target?.nodeType) node = target;
      if (node) {
        if (this.options.wrapper !== window) {
          const wrapperRect = this.rootElement.getBoundingClientRect();
          adjustedOffset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
        }
        const rect = node.getBoundingClientRect();
        const targetStyle = getComputedStyle(node);
        const scrollMargin = this.isHorizontal ? Number.parseFloat(targetStyle.scrollMarginLeft) : Number.parseFloat(targetStyle.scrollMarginTop);
        const containerStyle = getComputedStyle(this.rootElement);
        const scrollPadding = this.isHorizontal ? Number.parseFloat(containerStyle.scrollPaddingLeft) : Number.parseFloat(containerStyle.scrollPaddingTop);
        target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll - (Number.isNaN(scrollMargin) ? 0 : scrollMargin) - (Number.isNaN(scrollPadding) ? 0 : scrollPadding);
      }
    }
    if (typeof target !== "number") return;
    target += adjustedOffset;
    if (this.options.infinite) {
      if (programmatic) {
        this.targetScroll = this.animatedScroll = this.scroll;
        const distance = target - this.animatedScroll;
        if (distance > this.limit / 2) target -= this.limit;
        else if (distance < -this.limit / 2) target += this.limit;
      }
    } else target = clamp(0, target, this.limit);
    if (target === this.targetScroll) {
      onStart?.(this);
      onComplete?.(this);
      return;
    }
    this.userData = userData ?? {};
    if (immediate) {
      this.animatedScroll = this.targetScroll = target;
      this.setScroll(this.scroll);
      this.reset();
      this.preventNextNativeScrollEvent();
      this.emit();
      onComplete?.(this);
      this.userData = {};
      requestAnimationFrame(() => {
        this.dispatchScrollendEvent();
      });
      return;
    }
    if (!programmatic) this.targetScroll = target;
    if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
    else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
    this.animate.fromTo(this.animatedScroll, target, {
      duration,
      easing,
      lerp: lerp2,
      onStart: () => {
        if (lock) this.isLocked = true;
        this.isScrolling = "smooth";
        onStart?.(this);
      },
      onUpdate: (value, completed) => {
        this.isScrolling = "smooth";
        this.lastVelocity = this.velocity;
        this.velocity = value - this.animatedScroll;
        this.direction = Math.sign(this.velocity);
        this.animatedScroll = value;
        this.setScroll(this.scroll);
        if (programmatic) this.targetScroll = value;
        if (!completed) this.emit();
        if (completed) {
          this.reset();
          this.emit();
          onComplete?.(this);
          this.userData = {};
          requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          });
          this.preventNextNativeScrollEvent();
        }
      }
    });
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = true;
    requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = false;
    });
  }
  hasNestedScroll(node, { deltaX, deltaY }) {
    const time = Date.now();
    if (!node._lenis) node._lenis = {};
    const cache = node._lenis;
    let hasOverflowX;
    let hasOverflowY;
    let isScrollableX;
    let isScrollableY;
    let hasOverscrollBehaviorX;
    let hasOverscrollBehaviorY;
    let scrollWidth;
    let scrollHeight;
    let clientWidth;
    let clientHeight;
    if (time - (cache.time ?? 0) > 2e3) {
      cache.time = Date.now();
      const computedStyle = window.getComputedStyle(node);
      cache.computedStyle = computedStyle;
      hasOverflowX = [
        "auto",
        "overlay",
        "scroll"
      ].includes(computedStyle.overflowX);
      hasOverflowY = [
        "auto",
        "overlay",
        "scroll"
      ].includes(computedStyle.overflowY);
      hasOverscrollBehaviorX = ["auto"].includes(computedStyle.overscrollBehaviorX);
      hasOverscrollBehaviorY = ["auto"].includes(computedStyle.overscrollBehaviorY);
      cache.hasOverflowX = hasOverflowX;
      cache.hasOverflowY = hasOverflowY;
      if (!(hasOverflowX || hasOverflowY)) return false;
      scrollWidth = node.scrollWidth;
      scrollHeight = node.scrollHeight;
      clientWidth = node.clientWidth;
      clientHeight = node.clientHeight;
      isScrollableX = scrollWidth > clientWidth;
      isScrollableY = scrollHeight > clientHeight;
      cache.isScrollableX = isScrollableX;
      cache.isScrollableY = isScrollableY;
      cache.scrollWidth = scrollWidth;
      cache.scrollHeight = scrollHeight;
      cache.clientWidth = clientWidth;
      cache.clientHeight = clientHeight;
      cache.hasOverscrollBehaviorX = hasOverscrollBehaviorX;
      cache.hasOverscrollBehaviorY = hasOverscrollBehaviorY;
    } else {
      isScrollableX = cache.isScrollableX;
      isScrollableY = cache.isScrollableY;
      hasOverflowX = cache.hasOverflowX;
      hasOverflowY = cache.hasOverflowY;
      scrollWidth = cache.scrollWidth;
      scrollHeight = cache.scrollHeight;
      clientWidth = cache.clientWidth;
      clientHeight = cache.clientHeight;
      hasOverscrollBehaviorX = cache.hasOverscrollBehaviorX;
      hasOverscrollBehaviorY = cache.hasOverscrollBehaviorY;
    }
    if (!(hasOverflowX && isScrollableX || hasOverflowY && isScrollableY)) return false;
    const orientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
    let scroll;
    let maxScroll;
    let delta;
    let hasOverflow;
    let isScrollable;
    let hasOverscrollBehavior;
    if (orientation === "horizontal") {
      scroll = Math.round(node.scrollLeft);
      maxScroll = scrollWidth - clientWidth;
      delta = deltaX;
      hasOverflow = hasOverflowX;
      isScrollable = isScrollableX;
      hasOverscrollBehavior = hasOverscrollBehaviorX;
    } else if (orientation === "vertical") {
      scroll = Math.round(node.scrollTop);
      maxScroll = scrollHeight - clientHeight;
      delta = deltaY;
      hasOverflow = hasOverflowY;
      isScrollable = isScrollableY;
      hasOverscrollBehavior = hasOverscrollBehaviorY;
    } else return false;
    if (!hasOverscrollBehavior && (scroll >= maxScroll || scroll <= 0)) return true;
    return (delta > 0 ? scroll < maxScroll : scroll > 0) && hasOverflow && isScrollable;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    if (this.options.naiveDimensions) {
      if (this.isHorizontal) return this.rootElement.scrollWidth - this.rootElement.clientWidth;
      return this.rootElement.scrollHeight - this.rootElement.clientHeight;
    }
    return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const wrapper = this.options.wrapper;
    return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(value) {
    if (this._isScrolling !== value) {
      this._isScrolling = value;
      this.updateClassName();
    }
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(value) {
    if (this._isStopped !== value) {
      this._isStopped = value;
      this.updateClassName();
    }
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(value) {
    if (this._isLocked !== value) {
      this._isLocked = value;
      this.updateClassName();
    }
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let className = "lenis";
    if (this.options.autoToggle) className += " lenis-autoToggle";
    if (this.isStopped) className += " lenis-stopped";
    if (this.isLocked) className += " lenis-locked";
    if (this.isScrolling) className += " lenis-scrolling";
    if (this.isScrolling === "smooth") className += " lenis-smooth";
    return className;
  }
  updateClassName() {
    this.cleanUpClassName();
    this.className.split(" ").forEach((className) => {
      this.rootElement.classList.add(className);
    });
  }
  cleanUpClassName() {
    for (const className of Array.from(this.rootElement.classList)) if (className === "lenis" || className.startsWith("lenis-")) this.rootElement.classList.remove(className);
  }
};
function Hero() {
  const { t } = useStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[92vh] pt-32 pb-20 overflow-hidden flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: { x: [0, 60, 0], y: [0, -40, 0] },
          transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          className: "absolute top-1/3 -left-32 h-[36rem] w-[36rem] rounded-full bg-electric/30 blur-[140px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: { x: [0, -50, 0], y: [0, 30, 0] },
          transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          className: "absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-electric/20 blur-[120px]"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 text-center relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-electric" }),
            t.hero.eyebrow
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.95] font-semibold tracking-tight", children: [
        t.hero.title1.split(" ").map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { y: 80, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            className: "inline-block mr-3",
            children: w
          },
          i
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5, duration: 1 },
            className: "gradient-text inline-block",
            children: t.hero.title2
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.7, duration: 0.7 },
          className: "mt-8 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed",
          children: t.hero.sub
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.85, duration: 0.7 },
          className: "mt-10 flex flex-wrap items-center justify-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/catalog",
                className: "group relative inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-medium text-sm overflow-hidden transition hover:scale-[1.02]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-electric translate-y-full group-hover:translate-y-0 transition-transform duration-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: t.hero.cta1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/541128520849",
                target: "_blank",
                rel: "noreferrer",
                className: "inline-flex items-center gap-2 h-12 px-6 rounded-full glass text-sm font-medium hover:border-electric transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-electric" }),
                  t.hero.cta2
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 marquee-mask overflow-hidden pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-12 animate-marquee whitespace-nowrap text-muted-foreground/50 font-display text-xl sm:text-2xl", children: Array.from({ length: 2 }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-12 items-center", children: ["Apple", "JBL", "Réplicas Premium", "Argentina", "Ituzaingó", "Castelar", "Cripto", "WhatsApp"].map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-12", children: [
      w,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-electric" })
    ] }, w)) }, k)) }) })
  ] });
}
const features = [
  { icon: MapPin, title: "Puntos de encuentro", desc: "Te entregamos en mano por Ituzaingó y Castelar — coordinamos por WhatsApp." },
  { icon: ShieldCheck, title: "Calidad garantizada", desc: "Réplicas premium probadas una a una. Si no estás conforme, lo solucionamos." },
  { icon: Headphones, title: "Asesoramiento humano", desc: "Hablás con personas reales por WhatsApp, no con bots." },
  { icon: Sparkles, title: "Curaduría premium", desc: "Solo tecnología que recomendaríamos a un amigo." }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "relative py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 grid-bg opacity-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "lg:col-span-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-electric mb-3", children: "— Nosotros" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl sm:text-6xl font-semibold tracking-tight", children: [
              "Réplicas ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "premium" }),
              ", sin vueltas."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: [
              "Somos ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Cala Imports" }),
              ", un proyecto argentino dedicado a traer réplicas de alta gama de los productos de audio y accesorios más buscados.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: " No vendemos productos originales" }),
              " — vendemos calidad real al precio justo, con atención directa y puntos de encuentro por ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Ituzaingó y Castelar" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: [
              "Más de ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "50 clientes satisfechos" }),
              " y una comunidad creciente en redes nos avalan. Cada producto es probado uno por uno."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 grid sm:grid-cols-2 gap-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: i * 0.08 },
          className: "rounded-2xl glass p-6 hover:border-electric transition group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl bg-electric/15 grid place-items-center mb-4 group-hover:bg-electric group-hover:text-background transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-electric group-hover:text-background transition" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.desc })
          ]
        },
        f.title
      )) })
    ] }) })
  ] });
}
function ProductCarousel() {
  const { addToCart } = useStore();
  const ref = reactExports.useRef(null);
  const list = products.filter((p) => p.inStock);
  const scrollBy = (dir) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "text-xs uppercase tracking-[0.3em] text-electric mb-3",
            children: "— En stock ahora"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7 },
            className: "font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl",
            children: [
              "Lo más buscado, ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "listo para enviar" }),
              "."
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollBy(-1), className: "h-10 w-10 grid place-items-center rounded-full glass hover:border-electric transition", "aria-label": "Anterior", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scrollBy(1), className: "h-10 w-10 grid place-items-center rounded-full glass hover:border-electric transition", "aria-label": "Siguiente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: "flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hidden",
        style: { scrollbarWidth: "none" },
        children: list.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.article,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-40px" },
            transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
            className: "snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[32%] xl:w-[28%] rounded-2xl glass overflow-hidden group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-surface-2 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: p.image,
                    alt: p.name,
                    loading: "lazy",
                    className: "absolute inset-0 m-auto max-h-[78%] max-w-[78%] object-contain transition-transform duration-700 group-hover:scale-110"
                  }
                ),
                p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-electric text-background", children: p.badge })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: p.brand }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight line-clamp-1", children: p.name }),
                p.promo && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-electric", children: [
                  "● ",
                  p.promo
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-semibold", children: formatARS(p.price) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => addToCart(p),
                      className: "h-9 px-3 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-electric transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                        " Agregar"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          p.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "/catalog",
        className: "group inline-flex items-center gap-2 h-12 px-6 rounded-full glass hover:border-electric transition text-sm font-medium",
        children: [
          "Ver catálogo completo",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ]
      }
    ) })
  ] }) });
}
const testimonials = [
  { name: "Lucía P.", city: "Córdoba", text: "Llegó perfecto, súper rápido. Los AirPods son una locura, mejor de lo que esperaba." },
  { name: "Mateo R.", city: "Rosario", text: "Atención impecable por WhatsApp. Me ayudaron a elegir y todo bárbaro." },
  { name: "Camila S.", city: "CABA", text: "Compré por mayor para mi local. Excelente precio y calidad muy pareja." },
  { name: "Federico T.", city: "Mendoza", text: "Tercera compra con Cala. Ya son mi referencia para tecnología." },
  { name: "Agustina V.", city: "La Plata", text: "El JBL suena increíble. Llegó en 2 días, cero problemas con el envío." },
  { name: "Joaquín M.", city: "Mar del Plata", text: "Cripto fue facilísimo. Profesionales y serios." }
];
function Testimonials() {
  const { t } = useStore();
  const row = [...testimonials, ...testimonials];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-28 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-electric mb-3", children: "— Reseñas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl",
          children: t.testimonials.title
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 marquee-mask", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5 animate-marquee", style: { animationDuration: "40s" }, children: row.map((tes, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "shrink-0 w-[340px] rounded-2xl glass p-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-electric", children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-current" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed", children: tes.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-electric to-foreground/40 grid place-items-center text-background font-semibold text-xs", children: tes.name[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: tes.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: tes.city })
            ] })
          ] })
        ]
      },
      i
    )) }) })
  ] });
}
const faqs = [
  { q: "¿Hacen envíos a todo el país?", a: "Sí, despachamos a toda Argentina por correo o moto en CABA/GBA. Generalmente en 24 hs hábiles." },
  { q: "¿Los productos son originales?", a: "Sí. Trabajamos solo con productos originales de marcas reconocidas como Apple y JBL, con garantía." },
  { q: "¿Cómo puedo pagar?", a: "Aceptamos transferencia, efectivo y criptomonedas. Coordinamos cada compra por WhatsApp." },
  { q: "¿Tienen promo por cantidad?", a: "Sí. Por ejemplo: 2 AirPods Pro 2 a $20.000 c/u, o 2 cargadores Apple a $10.000 c/u. Aplican automáticamente al carrito." },
  { q: "¿Puedo retirar en persona?", a: "Sí, coordinamos punto de encuentro en CABA sin cargo adicional." },
  { q: "¿Venden por mayor?", a: "Sí, contamos con precios especiales para revendedores. Consultanos por WhatsApp." }
];
function FAQ() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-electric mb-3", children: "— Preguntas frecuentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "Respondemos ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "todo" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((f, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.04 },
          className: "rounded-2xl glass overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpen(isOpen ? null : i),
                className: "w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-secondary/40 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base sm:text-lg", children: f.q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 shrink-0 grid place-items-center rounded-full bg-electric/15 text-electric", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.3 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 sm:px-6 pb-6 text-sm text-muted-foreground leading-relaxed", children: f.a })
              }
            ) })
          ]
        },
        i
      );
    }) })
  ] }) });
}
const KEY = "cala_site_rating";
function SiteRating() {
  const [rating, setRating] = reactExports.useState(0);
  const [hover, setHover] = reactExports.useState(0);
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        setRating(Number(saved));
        setSubmitted(true);
      }
    } catch {
    }
  }, []);
  const submit = (n) => {
    setRating(n);
    setSubmitted(true);
    try {
      localStorage.setItem(KEY, String(n));
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.7 },
      className: "rounded-3xl glass p-8 sm:p-12 text-center relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-electric/20 blur-[100px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-electric mb-3", children: "— Tu opinión cuenta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl sm:text-4xl font-semibold tracking-tight", children: submitted ? "¡Gracias por tu valoración!" : "¿Qué te pareció el sitio?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: submitted ? `Valoraste con ${rating} ${rating === 1 ? "estrella" : "estrellas"}.` : "Es opcional, pero nos ayuda muchísimo." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 flex items-center justify-center gap-1 sm:gap-2", children: [1, 2, 3, 4, 5].map((n) => {
            const active = (hover || rating) >= n;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onMouseEnter: () => !submitted && setHover(n),
                onMouseLeave: () => !submitted && setHover(0),
                onClick: () => !submitted && submit(n),
                "aria-label": `${n} estrellas`,
                disabled: submitted,
                className: "p-1.5 sm:p-2 transition disabled:cursor-default",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `h-7 w-7 sm:h-9 sm:w-9 transition-all ${active ? "fill-electric text-electric scale-110" : "text-muted-foreground/40 hover:text-electric"}`
                  }
                )
              },
              n
            );
          }) })
        ] })
      ]
    }
  ) }) });
}
function Index() {
  reactExports.useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });
    let raf = 0;
    const tick = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StoreProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCarousel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SiteRating, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PurchaseToasts, {})
    ] })
  ] });
}
export {
  Index as component
};
