'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var core = require('@material-ui/core');
var CookieConsent = require('react-cookie-consent');
var ai = require('react-icons/ai');
var reactRouterDom = require('react-router-dom');
var reactHelmet = require('react-helmet');
var sdkXyoJs = require('@xyo-network/sdk-xyo-js');
var React = require('react');
var randomBytes = require('randombytes');
var lodash = require('lodash');
var queryString = require('query-string');
var numeral = require('numeral');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CookieConsent__default = /*#__PURE__*/_interopDefaultLegacy(CookieConsent);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var randomBytes__default = /*#__PURE__*/_interopDefaultLegacy(randomBytes);
var numeral__default = /*#__PURE__*/_interopDefaultLegacy(numeral);

const BusyBox = (props) => {
    const theme = core.useTheme();
    const { children, busySize, busyOpacity = 0.85, busy, ...boxProps } = props;
    return (jsxRuntime.jsxs(core.Box, Object.assign({ position: "relative" }, boxProps, { children: [children, busy ? (jsxRuntime.jsx(core.Box, Object.assign({ display: "flex", bgcolor: props.bgcolor ?? theme.palette.background.default, flexGrow: 1, position: "absolute", left: 0, right: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center", style: { opacity: busyOpacity }, zIndex: 1000 }, { children: jsxRuntime.jsx(core.CircularProgress, { size: busySize }, void 0) }), void 0)) : null] }), void 0));
};

const FlexCol = (props) => {
    return jsxRuntime.jsx(BusyBox, Object.assign({ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" }, props), void 0);
};
const FlexGrowCol = (props) => {
    return jsxRuntime.jsx(FlexCol, Object.assign({ flexGrow: 1 }, props), void 0);
};

const calcSpacing = (theme, values) => {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value !== undefined) {
            if (typeof value === 'string') {
                return value;
            }
            else if (typeof value === 'number') {
                return theme.spacing(value);
            }
        }
    }
};

const mergeBoxlikeStyles = (theme, props, defaultProps) => {
    const { alignContent, alignItems, alignSelf, bgcolor, border, borderColor, display, flexGrow, flexShrink, flexDirection, flexWrap, justifyContent, justifyItems, justifySelf, height, minHeight, minWidth, margin, marginX, marginY, marginTop, marginLeft, marginRight, marginBottom, padding, paddingX, paddingY, paddingTop, paddingLeft, paddingRight, paddingBottom, position, style, width, ...rootProps } = { ...defaultProps, ...props };
    const mergedStyle = {
        alignContent,
        alignItems,
        alignSelf,
        backgroundColor: bgcolor,
        border,
        borderColor,
        display,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        height,
        justifyContent,
        justifyItems,
        justifySelf,
        marginBottom: calcSpacing(theme, [marginBottom, marginY, margin]),
        marginLeft: calcSpacing(theme, [marginLeft, marginX, margin]),
        marginRight: calcSpacing(theme, [marginRight, marginX, margin]),
        marginTop: calcSpacing(theme, [marginTop, marginY, margin]),
        minHeight,
        minWidth,
        paddingBottom: calcSpacing(theme, [paddingBottom, paddingY, padding]),
        paddingLeft: calcSpacing(theme, [paddingLeft, paddingX, padding]),
        paddingRight: calcSpacing(theme, [paddingRight, paddingX, padding]),
        paddingTop: calcSpacing(theme, [paddingTop, paddingY, padding]),
        position,
        width,
        ...style,
    };
    return {
        ...rootProps,
        style: mergedStyle,
    };
};

const PaperBox = (props) => {
    const theme = core.useTheme();
    const { children, busySize, busyOpacity = 0.85, busy, ...rootProps } = mergeBoxlikeStyles(theme, props, { position: 'relative' });
    return (jsxRuntime.jsxs(core.Paper, Object.assign({}, rootProps, { children: [children, busy ? (jsxRuntime.jsx(core.Box, Object.assign({ display: "flex", bgcolor: props.bgcolor ?? theme.palette.background.paper, flexGrow: 1, position: "absolute", left: 0, right: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center", style: { opacity: busyOpacity }, zIndex: 1000 }, { children: jsxRuntime.jsx(core.CircularProgress, { size: busySize }, void 0) }), void 0)) : null] }), void 0));
};

const FlexPaper = (props) => {
    return jsxRuntime.jsx(PaperBox, Object.assign({ display: "flex" }, props), void 0);
};
const FlexPaperCol = (props) => {
    return jsxRuntime.jsx(PaperBox, Object.assign({ display: "flex", flexDirection: "column" }, props), void 0);
};
const FlexGrowPaper = (props) => {
    return jsxRuntime.jsx(FlexPaper, Object.assign({ flexGrow: 1 }, props), void 0);
};
const FlexGrowPaperCol = (props) => {
    return jsxRuntime.jsx(FlexPaperCol, Object.assign({ flexGrow: 1 }, props), void 0);
};

const FlexRow = (props) => {
    return jsxRuntime.jsx(BusyBox, Object.assign({ alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "center" }, props), void 0);
};
const FlexGrowRow = (props) => {
    return jsxRuntime.jsx(FlexRow, Object.assign({ flexGrow: 1 }, props), void 0);
};

const CustomCookieConsent = () => {
    const theme = core.useTheme();
    return (jsxRuntime.jsx(CookieConsent__default['default'], Object.assign({ buttonStyle: {
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
        }, buttonText: "Accept", cookieName: "CookiesAccepted", expires: 150, location: "bottom", style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'none',
            zoom: 0.75,
        } }, { children: jsxRuntime.jsx(FlexGrowRow, { children: jsxRuntime.jsxs(core.Typography, Object.assign({ variant: "body2" }, { children: ["This site uses", ' ', jsxRuntime.jsx(core.Link, Object.assign({ href: "https://cookiesandyou.com/", rel: "noopener noreferrer", target: "_blank" }, { children: "cookies" }), void 0), ' ', "and", ' ', jsxRuntime.jsx(core.Link, Object.assign({ href: "https://policies.google.com/technologies/partner-sites", rel: "noopener noreferrer", target: "_blank" }, { children: "Google\u00A0tools" }), void 0), ' ', "to analyze traffic and for ads measurement purposes."] }), void 0) }, void 0) }), void 0));
};

const ErrorViewer = (props) => {
    const { error, ...boxProps } = props;
    const theme = core.useTheme();
    return (jsxRuntime.jsxs(FlexCol, Object.assign({ color: theme.palette.error.main }, boxProps, { children: [jsxRuntime.jsx(core.Typography, Object.assign({ align: "center", variant: "subtitle1" }, { children: error?.name }), void 0),
            jsxRuntime.jsx(core.Typography, Object.assign({ align: "center", variant: "body2" }, { children: error?.message }), void 0)] }), void 0));
};

const ErrorsViewer = (props) => {
    const { onRetry, errors, ...boxProps } = props;
    return (jsxRuntime.jsxs(FlexGrowCol, Object.assign({ padding: 1 }, boxProps, { children: [errors?.map((error, index) => {
                return jsxRuntime.jsx(ErrorViewer, { error: error }, index);
            }),
            onRetry ? (jsxRuntime.jsx(core.IconButton, Object.assign({ onClick: onRetry }, { children: jsxRuntime.jsx(ai.AiOutlineReload, {}, void 0) }), void 0)) : null] }), void 0));
};

const CoverProgress = (props) => {
    const { paper = true, open, opacity = 0.25, errors, onRetry } = props;
    const theme = core.useTheme();
    if (open) {
        return (jsxRuntime.jsx(FlexGrowRow, Object.assign({ position: "absolute", margin: -1, top: 0, bottom: 0, right: 0, left: 0, bgcolor: paper ? theme.palette.background.paper : theme.palette.background.default }, { children: (errors?.length ?? 0) === 0 ? (jsxRuntime.jsx(core.CircularProgress, { style: { opacity } }, void 0)) : (jsxRuntime.jsx(ErrorsViewer, { margin: 1, errors: errors, onRetry: onRetry }, void 0)) }), void 0));
    }
    return null;
};

const HoverScale = (props) => {
    const { children, scale = 1.1 } = props;
    const useStyles = core.makeStyles(() => core.createStyles({
        zoomdiv: {
            '&:hover': {
                transform: `scale(${scale})`,
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease',
            },
        },
    }));
    const classes = useStyles();
    return (jsxRuntime.jsx(FlexRow, { children: jsxRuntime.jsx(core.Box, Object.assign({ className: classes.zoomdiv }, { children: children }), void 0) }, void 0));
};

const RedirectWithQuery = (props) => {
    const to = `${props.to}${document.location.search}`;
    return jsxRuntime.jsx(reactRouterDom.Redirect, Object.assign({}, props, { to: to }), void 0);
};

const AppBarEx = (props) => {
    const { contextToolbar, systemToolbar, container, style, ...appbarProps } = props;
    const theme = core.useTheme();
    const AppBarExInner = () => {
        return (jsxRuntime.jsxs(FlexGrowRow, Object.assign({ justifyContent: "space-between" }, { children: [contextToolbar ?? jsxRuntime.jsx(core.Toolbar, {}, void 0),
                systemToolbar ?? jsxRuntime.jsx(core.Toolbar, {}, void 0)] }), void 0));
    };
    return (jsxRuntime.jsx(core.AppBar, Object.assign({ position: "static", style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            display: 'flex',
            ...style,
        } }, appbarProps, { children: container ? (jsxRuntime.jsx(core.Container, Object.assign({ maxWidth: container }, { children: jsxRuntime.jsx(AppBarExInner, {}, void 0) }), void 0)) : (jsxRuntime.jsx(AppBarExInner, {}, void 0)) }), void 0));
};

const BasePage = (props) => {
    const { children, beta, container, hideFooter, appFooter, appBar, noindex = false, title, ...baseProps } = props;
    const theme = core.useTheme();
    return (jsxRuntime.jsxs(FlexCol, Object.assign({ justifyContent: "flex-start", color: theme.palette.text.primary, alignItems: "stretch", width: "100vw", minHeight: "100vh" }, baseProps, { children: [jsxRuntime.jsx(reactHelmet.Helmet, Object.assign({ title: title }, { children: noindex ? jsxRuntime.jsx("meta", { content: "noindex", name: "robots" }, void 0) : null }), void 0), appBar, beta ? (jsxRuntime.jsx(FlexRow, Object.assign({ margin: 1 }, { children: jsxRuntime.jsx(core.Typography, Object.assign({ variant: "body1" }, { children: "Important: This page is a Beta page. It is possible that some information may not be correct." }), void 0) }), void 0)) : null,
            container ? (jsxRuntime.jsx(core.Container, Object.assign({ component: FlexGrowCol, maxWidth: container, alignItems: "stretch" }, { children: children }), void 0)) : (children),
            hideFooter ? null : jsxRuntime.jsx("footer", { children: appFooter }, void 0)] }), void 0));
};

const getPartialPath = (pathParts, index) => {
    const result = [];
    for (let i = 0; i <= index; i++) {
        result.push(`${pathParts[i]}/`);
    }
    return result.join('');
};
const BreadcrumbToolbar = (props) => {
    const { titles, logo, ...boxProps } = props;
    const pathParts = document.location.pathname.split('/');
    //if the url has a trailing '/', remove the last part
    if (pathParts[pathParts.length - 1].length === 0) {
        pathParts.pop();
    }
    sdkXyoJs.assertEx(pathParts.length - 1 === titles.length, 'Path/Title length mismatch');
    return (jsxRuntime.jsx(FlexRow, Object.assign({ marginY: 1, justifyContent: "flex-start" }, boxProps, { children: jsxRuntime.jsx(core.Breadcrumbs, Object.assign({ "aria-label": "breadcrumb", separator: "|" }, { children: pathParts.map((_pathPart, index) => {
                const path = getPartialPath(pathParts, index);
                return (jsxRuntime.jsx(core.Link, Object.assign({ title: index > 0 ? titles[index - 1] : 'COIN', color: index === pathParts.length - 1 ? 'textPrimary' : 'inherit', component: reactRouterDom.Link, to: path }, { children: index > 0 ? (titles[index - 1]) : (jsxRuntime.jsx(FlexRow, { children: typeof logo === 'string' ? jsxRuntime.jsx("img", { src: logo }, void 0) : logo }, void 0)) }), path));
            }) }), void 0) }), void 0));
};

const ButtonEx = (props) => {
    const theme = core.useTheme();
    const { to, onClick, ...rootProps } = mergeBoxlikeStyles(theme, props);
    const history = reactRouterDom.useHistory();
    const localOnClick = (event) => {
        onClick?.(event);
        if (to) {
            history.push(to);
        }
    };
    return jsxRuntime.jsx(core.Button, Object.assign({ onClick: localOnClick }, rootProps), void 0);
};

const Experiment = (props) => {
    return jsxRuntime.jsx(core.Box, Object.assign({}, props), void 0);
};

const get = () => {
    return sdkXyoJs.getApiStage(document.location.hostname);
};

const isLocalhost = !!(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function useAsyncEffect(effect, inputs) {
    React.useEffect(function () {
        let mounted = true;
        const promise = effect(() => {
            return mounted;
        });
        Promise.resolve(promise).then((callback) => {
            if (callback) {
                callback?.();
            }
        });
        return function () {
            mounted = false;
        };
    }, inputs);
}

let logProfiling = false;
const enableProfileLogging = (enabled) => {
    logProfiling = enabled;
};
const profileResults = [];
const profileBlock = async (name, closure) => {
    const startTime = Date.now();
    await closure();
    const endTime = Date.now();
    profileResults.push({ endTime, name, startTime });
    if (logProfiling) {
        console.log(`Timed ${name} [${endTime - startTime}ms]`);
    }
};

const getLocalStorageObject = (key, log) => {
    let result = {};
    try {
        result = JSON.parse(localStorage.getItem(key) ?? '{}');
    }
    catch (e) {
        log?.error('getLocalStorageObject', e);
    }
    return result;
};
const setLocalStorageObject = (key, value, log) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (e) {
        log?.error('setLocalStorageObject', e);
    }
};

class UniqueUserId {
    constructor() {
        this.id = localStorage.getItem(UniqueUserId.localStorageId) ?? this.generateId();
        localStorage.setItem(UniqueUserId.localStorageId, this.id);
    }
    generateId() {
        return randomBytes__default['default'](16).toString('base64');
    }
    toString() {
        return this.id;
    }
}
UniqueUserId.localStorageId = '_coin_cid';

class UtmFields {
    constructor() {
        this.fields = [];
        this.getUtmRecord = () => {
            const record = {};
            const parsedQueryString = document.location.search.split('?')[1]?.split('&') ?? [];
            parsedQueryString.map((item) => {
                const [fullKey, value] = item?.split('=');
                const [keyCategory, keyName] = fullKey.split('_');
                if (keyCategory === 'utm') {
                    record[keyName] = value;
                }
            });
            return Object.keys(record).length > 0 ? record : null;
        };
        const storedString = localStorage.getItem(UtmFields.localStorageId) ?? '[]';
        try {
            this.fields = JSON.parse(storedString);
        }
        catch {
            this.fields = [];
        }
        //this clears the old object version if needed
        if (!Array.isArray(this.fields)) {
            this.fields = [];
        }
        this.update();
        localStorage.setItem(UtmFields.localStorageId, JSON.stringify(this.fields));
    }
    //check the query string and if there an new/updated utm values, add them to the fields
    update() {
        const record = this.getUtmRecord();
        if (record) {
            if (!lodash.isEqual(this.fields[this.fields.length - 1], record)) {
                this.fields.push(record);
            }
        }
        return this.fields ?? undefined;
    }
    toString() {
        return JSON.stringify(this.fields);
    }
}
UtmFields.localStorageId = '_coin_utm';

class BaseEvent$4 {
    constructor(name, param) {
        this.name = name;
        this.param = param;
        this.dcq = this.getDcq();
        this.dcs = this.getDcs();
    }
    async send(data) {
        const payload = [this.name];
        if (this.param) {
            payload.push(this.param);
        }
        payload.push(data);
        this.dcq.push(payload);
        await sdkXyoJs.delay(0);
    }
    getDcq() {
        const global = window;
        if (!global._dcq) {
            throw Error('DCQ not found');
        }
        return global._dcq;
    }
    getDcs() {
        const global = window;
        if (!global._dcs) {
            throw Error('DCS not found');
        }
        return global._dcs;
    }
}

class CustomEvent$3 extends BaseEvent$4 {
}

class StandardEvents {
    identify() {
        return new BaseEvent$4('identify');
    }
}

class Fbq {
    constructor(pixelId) {
        this.pixelId = pixelId;
        this.fbq = function () {
            // eslint-disable-next-line prefer-rest-params,prefer-spread
            this.fbq.callMethod ? this.fbq.callMethod.apply(this.fbq, arguments) : this.fbq.queue.push(arguments);
        };
        this.fbq.push = this.fbq;
        this.fbq.loaded = true;
        this.fbq.version = '2.0';
        this.fbq.queue = [];
        //we have to set these to globals because that is where the facebook script looks for them
        const global = window;
        global.fbq = this.fbq;
        global._fbq = this.fbq;
        this.fbq('init', pixelId);
        this.fbq('track', 'PageView');
    }
    static init(pixelId) {
        if (!this.instance) {
            this.instance = new Fbq(pixelId);
        }
        return this.instance;
    }
    async track(event, data) {
        this.fbq('track', event, {
            ...data,
        });
        await sdkXyoJs.delay(0);
    }
    async trackCustom(event, data) {
        this.fbq('trackCustom', event, {
            ...data,
        });
        await sdkXyoJs.delay(0);
    }
}

class BaseEvent$3 {
    constructor(name) {
        this.name = name;
        this.fbq = sdkXyoJs.assertEx(Fbq.instance, 'Missing Fbq');
    }
    async send(_data) {
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class CustomEvent$2 extends BaseEvent$3 {
    async send(data) {
        this.fbq.trackCustom(this.name, data);
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class StandardEvent$2 extends BaseEvent$3 {
    async send(data) {
        this.fbq.track(this.name, data);
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class FacebookStandardEvents {
    addPaymentInfo() {
        return new StandardEvent$2('AddPaymentInfo');
    }
    addToCart() {
        return new StandardEvent$2('AddToCart');
    }
    addToWishList() {
        return new StandardEvent$2('AddToWishList');
    }
    completedRegistration() {
        return new StandardEvent$2('CompleteRegistration');
    }
    contact() {
        return new StandardEvent$2('Contact');
    }
    customizeProduct() {
        return new StandardEvent$2('CustomizeProduct');
    }
    donate() {
        return new StandardEvent$2('Donate');
    }
    findLocation() {
        return new StandardEvent$2('FindLocation');
    }
    initiateCheckout() {
        return new StandardEvent$2('InitiateCheckout');
    }
    lead() {
        return new StandardEvent$2('Lead');
    }
    pageView() {
        return new StandardEvent$2('PageView');
    }
    purchase() {
        return new StandardEvent$2('Purchase');
    }
    schedule() {
        return new StandardEvent$2('Schedule');
    }
    search() {
        return new StandardEvent$2('Search');
    }
    startTrial() {
        return new StandardEvent$2('StartTrial');
    }
    submitApplication() {
        return new StandardEvent$2('SubmitApplication');
    }
    subscribe() {
        return new StandardEvent$2('Subscribe');
    }
    viewContent() {
        return new StandardEvent$2('ViewContent');
    }
}

/*class CustomArray extends Array {
  private oldProto: any
  private preventEvents: string[]
  constructor(preventEvents: string[]) {
    super()
    this.preventEvents = preventEvents
    this.oldProto = Object.getPrototypeOf(this)
    Object.setPrototypeOf(this, CustomArray.prototype)
  }
  push(item: any): number {
    let allowed = true
    console.log(`Checking Event: ${JSON.stringify(item)}`)
    if (item['0'] === undefined) {
      console.log(`Disallowing Event: ${JSON.stringify(item)}`)
      allowed = false
    }
    if (allowed) {
      this.oldProto.push.apply(this, [item])
    }
    return this.length
  }
}*/
class Gtag {
    constructor(ga4id, awid, domains) {
        this.ga4id = ga4id;
        this.awid = awid;
        this.domains = domains;
        const global = window;
        global.dataLayer = global.dataLayer || [];
        this.gtag = function () {
            const global = window;
            // eslint-disable-next-line prefer-rest-params
            global.dataLayer.push(arguments);
        };
        global.gtag = this.gtag;
        this.gtag('js', new Date());
        this.gtag('config', ga4id);
        //this.gtag('config', awid) - this is configured in the Data Stream in Google Analytics
        const parsedQueryString = queryString.parse(document.location.search);
        //we handle the utm_referrer here incase a referrer was forwarded (special.coinapp.co does this)
        sessionStorage.setItem('initialReferrer', decodeURIComponent(parsedQueryString['utm_referrer']?.toString() ?? document.referrer));
        delete parsedQueryString['utm_referrer'];
        const remainingSearch = parsedQueryString ? queryString.stringify(parsedQueryString) : '';
        sessionStorage.setItem('initialQuery', remainingSearch);
        sessionStorage.setItem('initialPage', document.location.href);
    }
    updatePagePath(page_path) {
        const ga4id = sdkXyoJs.assertEx(this.ga4id, 'Missing GA4ID');
        const pathOnly = page_path.split('?')[0];
        const search = Gtag.getInitialQuery();
        this.gtag('config', ga4id, { page_path: `${pathOnly}${search}` });
    }
    //
    static getInitialQuery() {
        return sessionStorage.getItem('initialQuery') || '';
    }
    static getInitialPage() {
        return sessionStorage.getItem('initialPage') || '';
    }
    static getInitialReferrer() {
        return sessionStorage.getItem('initialReferrer') || '';
    }
    static clearDataLayer() {
        const global = window;
        const dataLayer = global.dataLayer;
        dataLayer.length = 0;
    }
    static init(ga4id, awid, domains) {
        if (!this.instance) {
            return this.reinit(ga4id, awid, domains);
        }
        return this.instance;
    }
    static reinit(ga4id, awid, domains) {
        this.instance = new Gtag(ga4id, awid, domains);
        return this.instance;
    }
    static updatePagePath(page_path) {
        const instance = sdkXyoJs.assertEx(this.instance, 'Not initialized');
        return instance.updatePagePath(page_path);
    }
    sendAnalytics(event, data) {
        return new Promise((resolve) => {
            this.gtag('event', event, {
                ...data,
                event_callback: () => {
                    resolve();
                },
                event_timeout: 2000,
                page_location: Gtag.getInitialPage(),
                page_referrer: Gtag.getInitialReferrer(),
                send_to: this.ga4id,
            });
        });
    }
    sendAdwords(event, data) {
        return new Promise((resolve) => {
            this.gtag('event', 'conversion', {
                ...data,
                event_callback: () => {
                    resolve();
                },
                event_timeout: 2000,
                send_to: `${this.awid}/${event}`,
            });
        });
    }
}

class Gtm {
    constructor(containerId) {
        this.containerId = containerId;
        const global = window;
        global.dataLayer = global.dataLayer || [];
        global.dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime() });
    }
    static getInitialQuery() {
        return sessionStorage.getItem('initialQuery') || '';
    }
    static clearDataLayer() {
        const global = window;
        const dataLayer = global.dataLayer;
        dataLayer.length = 0;
    }
    static init(containerId) {
        if (!this.instance) {
            this.instance = new Gtm(containerId);
        }
        return this.instance;
    }
    send(event, data, eventTimeout = 500) {
        return new Promise((resolve) => {
            const global = window;
            global.dataLayer.push({
                event,
                ...data,
                eventCallback: () => {
                    resolve();
                },
                eventTimeout,
            });
        });
    }
}

class BaseEvent$2 {
    constructor(name, adwordConversionId) {
        this.name = name;
        this.adwordConversionId = adwordConversionId;
    }
    async send(data) {
        return await this.sendGtag(data);
    }
    async sendGtag(data) {
        await this.gtag().sendAnalytics(this.name, data);
        if (this.adwordConversionId) {
            await this.gtag().sendAdwords(this.adwordConversionId, data);
        }
    }
    async sendGtm(data) {
        await this.gtm().send(this.name, data);
    }
    gtag() {
        return sdkXyoJs.assertEx(Gtag.instance, 'Missing/uninitialized gtag');
    }
    gtm() {
        return sdkXyoJs.assertEx(Gtm.instance, 'Missing/uninitialized gtm');
    }
}

class CustomEvent$1 extends BaseEvent$2 {
}

class StandardEvent$1 extends BaseEvent$2 {
}

class GoogleStandardEvents {
    addPaymentInfo() {
        return new StandardEvent$1('add_paymennt_info');
    }
    addShippingInfo() {
        return new StandardEvent$1('add_shipping_info');
    }
    addToCart() {
        return new StandardEvent$1('add_to_cart');
    }
    addToWishList() {
        return new StandardEvent$1('add_to_wishlist');
    }
    beginCheckout() {
        return new StandardEvent$1('begin_checkout');
    }
    earnVirtualCurrency() {
        return new StandardEvent$1('earn_virtual_currency');
    }
    generateLead() {
        return new StandardEvent$1('generate_lead');
    }
    joinGroup() {
        return new StandardEvent$1('join_group');
    }
    levelEnd() {
        return new StandardEvent$1('level_end');
    }
    levelStart() {
        return new StandardEvent$1('level_start');
    }
    levelUp() {
        return new StandardEvent$1('level_up');
    }
    login() {
        return new StandardEvent$1('login');
    }
    postScore() {
        return new StandardEvent$1('post_score');
    }
    purchase() {
        return new StandardEvent$1('purchase');
    }
    refund() {
        return new StandardEvent$1('refund');
    }
    removeFromCart() {
        return new StandardEvent$1('remove_from_cart');
    }
    search() {
        return new StandardEvent$1('search');
    }
    selectContent() {
        return new StandardEvent$1('select_content');
    }
    selectItem() {
        return new StandardEvent$1('select_item');
    }
    selectPromotion() {
        return new StandardEvent$1('select_promotion');
    }
    share() {
        return new StandardEvent$1('share');
    }
    signUp() {
        return new StandardEvent$1('sign_up');
    }
    spendVirtualCurrency() {
        return new StandardEvent$1('spend_virtual_currency');
    }
    tutorialBegin() {
        return new StandardEvent$1('tutorial_begin');
    }
    tutorialComplete() {
        return new StandardEvent$1('tutorial_complete');
    }
    unlockAchievement() {
        return new StandardEvent$1('unlock_achievement');
    }
    viewCart() {
        return new StandardEvent$1('view_cart');
    }
    viewItem() {
        return new StandardEvent$1('view_item');
    }
    viewItemList() {
        return new StandardEvent$1('view_item_list');
    }
    viewPromotion() {
        return new StandardEvent$1('view_promotion');
    }
}

class SnapTr {
    constructor(pixelId, userEmail) {
        this.pixelId = pixelId;
        this.userEmail = userEmail;
        this.snaptr = function () {
            // eslint-disable-next-line prefer-rest-params,prefer-spread
            this.snaptr.callMethod ? this.snaptr.callMethod.apply(this.snaptr, arguments) : this.snaptr.queue.push(arguments);
        };
        this.snaptr.queue = [];
        const global = window;
        global.snaptr = this.snaptr;
        this.snaptr('init', pixelId, { user_email: userEmail });
        this.track('PAGE_VIEW');
    }
    static init(pixelId) {
        if (!this.instance) {
            this.instance = new SnapTr(pixelId);
        }
        return this.instance;
    }
    async track(event, data) {
        this.snaptr('track', event, {
            ...data,
        });
        await sdkXyoJs.delay(0);
    }
}

class BaseEvent$1 {
    constructor(name) {
        this.name = name;
        this.snaptr = sdkXyoJs.assertEx(SnapTr.instance, 'Missing SnapTr');
    }
    async send(_data) {
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class StandardEvent extends BaseEvent$1 {
    async send(data) {
        this.snaptr.track(this.name, data);
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class SnapchatStandardEvents {
    pageView() {
        return new StandardEvent('PAGE_VIEW');
    }
    signUp() {
        return new StandardEvent('SIGN_UP');
    }
    purchase() {
        return new StandardEvent('PURCHASE');
    }
    save() {
        return new StandardEvent('SAVE');
    }
    startCheckout() {
        return new StandardEvent('START_CHECKOUT');
    }
    addCart() {
        return new StandardEvent('ADD_CART');
    }
    openApp() {
        return new StandardEvent('OPEN_APP');
    }
    viewContent() {
        return new StandardEvent('VIEW_CONTENT');
    }
    addBilling() {
        return new StandardEvent('ADD_BILLING');
    }
    search() {
        return new StandardEvent('SEARCH');
    }
    subscribe() {
        return new StandardEvent('SUBSCRIBE');
    }
    adClick() {
        return new StandardEvent('AD_CLICK');
    }
    adView() {
        return new StandardEvent('AD_VIEW');
    }
    completeTutorial() {
        return new StandardEvent('COMPLETE_TUTORIAL');
    }
    invite() {
        return new StandardEvent('INVITE');
    }
    login() {
        return new StandardEvent('LOGIN');
    }
    share() {
        return new StandardEvent('SHARE');
    }
    reserve() {
        return new StandardEvent('RESERVE');
    }
    achievementUnlocked() {
        return new StandardEvent('ACHIEVEMENT_UNLOCKED');
    }
    addToWishlist() {
        return new StandardEvent('ADD_TO_WISHLIST');
    }
    spentCredits() {
        return new StandardEvent('SPENT_CREDITS');
    }
    rate() {
        return new StandardEvent('RATE');
    }
    startTrial() {
        return new StandardEvent('START_TRIAL');
    }
    listView() {
        return new StandardEvent('LIST_VIEW');
    }
    custom1() {
        return new StandardEvent('CUSTOM_EVENT_1');
    }
    custom2() {
        return new StandardEvent('CUSTOM_EVENT_2');
    }
    custom3() {
        return new StandardEvent('CUSTOM_EVENT_3');
    }
    custom4() {
        return new StandardEvent('CUSTOM_EVENT_4');
    }
    custom5() {
        return new StandardEvent('CUSTOM_EVENT_5');
    }
}

class Ttq {
    constructor(pixelId, userEmail) {
        this.libName = 'ttq';
        this.pixelId = pixelId;
        this.userEmail = userEmail;
        this.ttq = function () {
            // eslint-disable-next-line prefer-rest-params,prefer-spread
            this.ttq.callMethod ? this.ttq.callMethod.apply(this.ttq, arguments) : this.ttq.queue.push(arguments);
        };
        this.ttq = [];
        this.ttq.methods = [
            'page',
            'track',
            'identify',
            'instances',
            'debug',
            'on',
            'off',
            'once',
            'ready',
            'alias',
            'group',
            'enableCookie',
            'disableCookie',
        ];
        this.ttq.setAndDefer = function (t, e) {
            t[e] = function () {
                // eslint-disable-next-line prefer-rest-params,prefer-spread
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
        };
        for (let i = 0; i < this.ttq.methods.length; i++) {
            this.ttq.setAndDefer(this.ttq, this.ttq.methods[i]);
        }
        this.ttq.instance = (t) => {
            let e;
            let n = 0;
            for (e = this.ttq._i[t] || []; n < this.ttq.methods.length; n++) {
                this.ttq.setAndDefer(e, this.ttq.methods[n]);
            }
            return e;
        };
        const ttq = this.ttq;
        this.ttq.load = function (e, n) {
            const i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
            ttq._i = ttq._i || {};
            ttq._i[e] = [];
            ttq._i[e]._u = i;
            ttq._t = ttq._t || {};
            ttq._t[e] = +new Date();
            ttq._o = ttq._o || {};
            ttq._o[e] = n || {};
            const o = document.createElement('script');
            o.type = 'text/javascript';
            o.async = !0;
            o.src = i + '?sdkid=' + e + '&lib=' + this.libName;
            const a = document.getElementsByTagName('script')[0];
            a?.parentNode?.insertBefore(o, a);
        };
        this.ttq.load(this.pixelId);
        this.page();
        const global = window;
        global.TiktokAnalyticsObject = this.libName;
        global.ttq = this.ttq;
    }
    static init(pixelId) {
        if (!this.instance) {
            this.instance = new Ttq(pixelId);
        }
        return this.instance;
    }
    async page() {
        this.ttq.page();
        await sdkXyoJs.delay(0);
    }
    async track(event, data) {
        this.ttq.track(event, {
            ...data,
        });
        await sdkXyoJs.delay(0);
    }
}

class BaseEvent {
    constructor(name) {
        this.name = name;
        this.ttq = sdkXyoJs.assertEx(Ttq.instance, 'Missing Ttq');
    }
    async send(_data) {
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

class CustomEvent extends BaseEvent {
    async send(data) {
        this.ttq.track(this.name, data);
        await sdkXyoJs.delay(0); //force async to increase reporting odds
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TiktokStandardEvents {
    pageView() {
        return Ttq.instance.page();
    }
}

const defaultLocalStorageKey = 'testData';
const experimentsTestData = {};
let outcomes = {}; //prevent multi-outcome
const saveOutcomes = () => {
    setLocalStorageObject('outcomes', outcomes);
};
const loadOutcomes = () => {
    outcomes = getLocalStorageObject('outcomes');
};
const mergeData = (data, log) => {
    const dataArray = [];
    for (const key in data) {
        dataArray.push(`${key}-${data[key]}`);
    }
    log?.info('MergeData', dataArray.join('|'));
    return dataArray.join('|');
};
const missingKeyError = new Error('Experiment Elements must have Keys');
const makeChildrenArray = (children) => {
    if (Array.isArray(children)) {
        return children;
    }
    else {
        return [children];
    }
};
const Experiments = (props) => {
    const { name, children, testStarted, localStorageProp = true } = props;
    loadOutcomes();
    const localStorageKey = localStorageProp === true
        ? defaultLocalStorageKey
        : typeof localStorageProp === 'string'
            ? localStorageProp ?? defaultLocalStorageKey
            : '';
    const childList = makeChildrenArray(children);
    let totalWeight = 0;
    for (const child of childList) {
        totalWeight += child.props.weight;
    }
    const firstTime = outcomes[name] === undefined;
    let targetWeight = outcomes[name] ?? Math.random() * totalWeight;
    outcomes[name] = targetWeight;
    saveOutcomes();
    for (const child of childList) {
        targetWeight -= child.props.weight;
        if (targetWeight <= 0) {
            if (child.key) {
                experimentsTestData[name] = child.key?.toString();
            }
            else {
                throw missingKeyError;
            }
            if (child.key && firstTime) {
                if (localStorageProp !== false) {
                    localStorage.setItem(localStorageKey, mergeData(experimentsTestData));
                }
                if (!isLocalhost) {
                    testStarted();
                }
            }
            return child;
        }
    }
    throw new Error('Experiment Choice Failed');
};

const InvertableThemeContext = React__default['default'].createContext({
    options: {},
});
function clone(a) {
    return JSON.parse(JSON.stringify(a));
}
const InvertableThemeProvider = (props) => {
    const contextInvertableTheme = React.useContext(InvertableThemeContext);
    const { children, dark, invert = false, noResponsiveFonts } = props;
    const { options = clone(contextInvertableTheme.options) } = props;
    options.palette = options.palette ?? {};
    if (invert) {
        options.palette = options.palette ?? {};
        options.palette.mode = options.palette.mode === 'dark' ? 'light' : 'dark';
    }
    if (dark !== undefined) {
        options.palette = options.palette ?? {};
        options.palette.mode = dark ? 'dark' : 'light';
    }
    let theme = core.createMuiTheme(options);
    if (!noResponsiveFonts) {
        theme = core.responsiveFontSizes(theme);
    }
    return (jsxRuntime.jsx(InvertableThemeContext.Provider, Object.assign({ value: { options } }, { children: jsxRuntime.jsx(core.ThemeProvider, Object.assign({ theme: theme }, { children: children }), void 0) }), void 0));
};

const LinkToEx = (props) => {
    const { to, ...rootProps } = props;
    return jsxRuntime.jsx(core.Link, Object.assign({ component: reactRouterDom.Link, to: to }, rootProps), void 0);
};

const NumberStatus = (props) => {
    const theme = core.useTheme();
    const { error, width = 1, shorten = false, color = 'primary', title, value, size, fontSize, autoWidth = false, ...buttonProps } = props;
    const bgColorTop = color === 'primary'
        ? theme.palette.primary.dark
        : color === 'secondary'
            ? theme.palette.secondary.dark
            : theme.palette.background.paper;
    const bgColorBottom = color === 'primary'
        ? theme.palette.primary.main
        : color === 'secondary'
            ? theme.palette.secondary.main
            : theme.palette.background.default;
    const sizePixels = size === 'large' ? 96 : size === 'medium' ? 80 : 64;
    const numeralFormat = typeof shorten === 'string' ? shorten : '0[.]0a';
    let calcFontSize = fontSize ?? sizePixels * width * 0.5;
    if (!fontSize) {
        if (!shorten) {
            if (value !== undefined) {
                if (parseInt(value.toString()) >= 100) {
                    calcFontSize = calcFontSize * 0.7;
                }
                if (parseInt(value.toString()) >= 1000) {
                    calcFontSize = calcFontSize * 0.7;
                }
                if (parseInt(value.toString()) >= 10000) {
                    calcFontSize = calcFontSize * 0.7;
                }
            }
        }
        else {
            calcFontSize = calcFontSize * 0.45;
        }
    }
    return (jsxRuntime.jsx(ButtonEx, Object.assign({ size: size }, buttonProps, { padding: 0 }, { children: jsxRuntime.jsxs(FlexCol, Object.assign({ height: autoWidth ? 'auto' : sizePixels, width: autoWidth ? '100%' : sizePixels * width, overflow: "hidden", busy: value === undefined && !error }, { children: [jsxRuntime.jsx(FlexGrowRow, Object.assign({ bgcolor: bgColorTop, color: theme.palette.getContrastText(bgColorTop), fontSize: calcFontSize, fontFamily: "Source Code Pro,monospace", alignItems: "center", height: sizePixels * 0.75 }, { children: shorten ? numeral__default['default'](value).format(numeralFormat) : value }), void 0),
                jsxRuntime.jsx(FlexGrowRow, Object.assign({ bgcolor: bgColorBottom, borderTop: "1px", color: theme.palette.getContrastText(bgColorBottom), fontSize: sizePixels * 0.12, fontFamily: theme.typography.fontFamily, height: sizePixels * 0.25 }, { children: title }), void 0)] }), void 0) }), void 0));
};

const RichResult = (props) => {
    const { thing } = props;
    const thingWithContext = thing;
    thingWithContext['@context'] = 'https://schema.org';
    return jsxRuntime.jsx("script", Object.assign({ type: "application/ld+json" }, { children: JSON.stringify(thingWithContext) }), void 0);
};

var ActionStatusType;
(function (ActionStatusType) {
    ActionStatusType["ActiveActionStatus"] = "ActiveActionStatus";
    ActionStatusType["CompletedActionStatus"] = "CompletedActionStatus";
    ActionStatusType["FailedActionStatus"] = "FailedActionStatus";
    ActionStatusType["PotentialActionStatus"] = "PotentialActionStatus";
})(ActionStatusType || (ActionStatusType = {}));
var ActionStatusType$1 = ActionStatusType;

var ContactPointOption;
(function (ContactPointOption) {
    ContactPointOption["HearingImpairedSupported"] = "HearingImpairedSupported";
    ContactPointOption["TollFree"] = "TollFree";
})(ContactPointOption || (ContactPointOption = {}));
var ContactPointOption$1 = ContactPointOption;

var ItemAvailability;
(function (ItemAvailability) {
    /** Indicates that the item has been discontinued. */
    ItemAvailability["Discontinued"] = "https://schema.org/Discontinued";
    /** Indicates that the item is in stock. */
    ItemAvailability["InStock"] = "https://schema.org/InStock";
    /** Indicates that the item is available only at physical locations. */
    ItemAvailability["InStoreOnly"] = "https://schema.org/InStoreOnly";
    /** Indicates that the item has limited availability. */
    ItemAvailability["LimitedAvailability"] = "https://schema.org/LimitedAvailability";
    /** Indicates that the item is available only online. */
    ItemAvailability["OnlineOnly"] = "https://schema.org/OnlineOnly";
    /** Indicates that the item is out of stock. */
    ItemAvailability["OutOfStock"] = "https://schema.org/OutOfStock";
    /** Indicates that the item is available for pre-order. */
    ItemAvailability["PreOrder"] = "https://schema.org/PreOrder";
    /** Indicates that the item is available for ordering and delivery before general availability. */
    ItemAvailability["PreSale"] = "https://schema.org/PreSale";
    /** Indicates that the item has sold out. */
    ItemAvailability["SoldOut"] = "https://schema.org/SoldOut";
})(ItemAvailability || (ItemAvailability = {}));
var ItemAvailability$1 = ItemAvailability;

var MapCategoryType;
(function (MapCategoryType) {
    MapCategoryType["ParkingMap"] = "ParkingMap";
    MapCategoryType["SeatingMap"] = "SeatingMap";
    MapCategoryType["TransitMap"] = "TransitMap";
    MapCategoryType["VenueMap"] = "VenueMap";
})(MapCategoryType || (MapCategoryType = {}));
var MapCategoryType$1 = MapCategoryType;

const toAxiosError = (error) => {
    return error.isAxiosError ? error : undefined;
};
const ErrorDialogOpen = (props) => {
    const { onClose, title = 'Oops. Something went wrong.', error = Error('Unknown Error') } = props;
    const onCloseClicked = () => {
        onClose?.(false);
    };
    const onRetryClicked = () => {
        onClose?.(true);
    };
    const axiosError = toAxiosError(error);
    const message = error.message ?? error.toString();
    return (jsxRuntime.jsxs(core.Dialog, Object.assign({ onClose: onClose, open: !!error }, { children: [jsxRuntime.jsx(core.DialogTitle, { children: title }, void 0),
            jsxRuntime.jsx(core.DialogContent, { children: jsxRuntime.jsx(FlexRow, { children: jsxRuntime.jsx(core.Typography, Object.assign({ color: "error" }, { children: axiosError ? `${message} [${axiosError?.code ?? 'Connection Failure'}]` : `${message}` }), void 0) }, void 0) }, void 0),
            jsxRuntime.jsx(core.DialogActions, { children: jsxRuntime.jsxs(FlexRow, Object.assign({ justifyContent: "space-between", width: "100%", minWidth: "300px" }, { children: [jsxRuntime.jsx(ButtonEx, Object.assign({ onClick: onCloseClicked, variant: "text" }, { children: "Close" }), void 0),
                        jsxRuntime.jsx(ButtonEx, Object.assign({ onClick: onRetryClicked, variant: "text" }, { children: "Retry" }), void 0)] }), void 0) }, void 0)] }), void 0));
};
const ErrorDialog = (props) => {
    const { error } = props;
    if (error) {
        return jsxRuntime.jsx(ErrorDialogOpen, Object.assign({}, props), void 0);
    }
    else {
        return null;
    }
};

const MessageDialogOpen = (props) => {
    const { onClose, children, title, open = false } = props;
    const onCloseClicked = (event) => {
        event.stopPropagation();
        onClose?.();
    };
    return (jsxRuntime.jsxs(core.Dialog, Object.assign({ onClose: onClose, open: open }, { children: [jsxRuntime.jsx(core.DialogTitle, { children: title }, void 0),
            jsxRuntime.jsx(core.DialogContent, { children: jsxRuntime.jsx(core.Box, Object.assign({ display: "flex", flexDirection: "column" }, { children: jsxRuntime.jsx(core.Box, Object.assign({ display: "flex", width: "100%" }, { children: children }), void 0) }), void 0) }, void 0),
            jsxRuntime.jsx(core.DialogActions, { children: jsxRuntime.jsxs(core.Box, Object.assign({ display: "flex", width: "100%" }, { children: [jsxRuntime.jsx(core.Box, { children: jsxRuntime.jsx(core.Button, Object.assign({ onClick: onCloseClicked, variant: "text" }, { children: "Close" }), void 0) }, void 0),
                        jsxRuntime.jsx(core.Box, { flexGrow: 1 }, void 0),
                        jsxRuntime.jsx(core.Box, { children: jsxRuntime.jsx(core.Button, Object.assign({ onClick: onCloseClicked, variant: "text" }, { children: "Ok" }), void 0) }, void 0)] }), void 0) }, void 0)] }), void 0));
};
const MessageDialog = (props) => {
    const { open } = props;
    if (open) {
        return jsxRuntime.jsx(MessageDialogOpen, Object.assign({}, props), void 0);
    }
    else {
        return null;
    }
};

const QuickTipButton = (props) => {
    const { title, children } = props;
    const [messageOpen, setMessageOpen] = React.useState(false);
    return (jsxRuntime.jsxs(core.IconButton, Object.assign({ onClick: () => setMessageOpen(true), size: "small" }, { children: [jsxRuntime.jsx(ai.AiOutlineQuestionCircle, { size: 16 }, void 0),
            jsxRuntime.jsx(MessageDialog, Object.assign({ onClose: () => setMessageOpen(false), open: messageOpen, title: title }, { children: jsxRuntime.jsx(core.Typography, Object.assign({ variant: "body1" }, { children: children }), void 0) }), void 0)] }), void 0));
};

exports.ActionStatusType = ActionStatusType$1;
exports.AppBarEx = AppBarEx;
exports.BasePage = BasePage;
exports.BreadcrumbToolbar = BreadcrumbToolbar;
exports.BusyBox = BusyBox;
exports.ButtonEx = ButtonEx;
exports.ContactPointOption = ContactPointOption$1;
exports.CookieConsent = CustomCookieConsent;
exports.CoverProgress = CoverProgress;
exports.DripCustomEvent = CustomEvent$3;
exports.DripStandardEvents = StandardEvents;
exports.ErrorDialog = ErrorDialog;
exports.Experiment = Experiment;
exports.Experiments = Experiments;
exports.FacebookCustomEvent = CustomEvent$2;
exports.FacebookStandardEvents = FacebookStandardEvents;
exports.Fbq = Fbq;
exports.FlexCol = FlexCol;
exports.FlexGrowCol = FlexGrowCol;
exports.FlexGrowPaper = FlexGrowPaper;
exports.FlexGrowPaperCol = FlexGrowPaperCol;
exports.FlexGrowRow = FlexGrowRow;
exports.FlexPaper = FlexPaper;
exports.FlexPaperCol = FlexPaperCol;
exports.FlexRow = FlexRow;
exports.GoogleBaseEvent = BaseEvent$2;
exports.GoogleCustomEvent = CustomEvent$1;
exports.GoogleStandardEvents = GoogleStandardEvents;
exports.Gtag = Gtag;
exports.Gtm = Gtm;
exports.HoverScale = HoverScale;
exports.InvertableThemeProvider = InvertableThemeProvider;
exports.ItemAvailability = ItemAvailability$1;
exports.LinkToEx = LinkToEx;
exports.MapCategoryType = MapCategoryType$1;
exports.MessageDialog = MessageDialog;
exports.NumberStatus = NumberStatus;
exports.PaperBox = PaperBox;
exports.QuickTipButton = QuickTipButton;
exports.RedirectWithQuery = RedirectWithQuery;
exports.RichResult = RichResult;
exports.SnapTr = SnapTr;
exports.SnapchatStandardEvents = SnapchatStandardEvents;
exports.TiktokCustomEvent = CustomEvent;
exports.TiktokStandardEvents = TiktokStandardEvents;
exports.Ttq = Ttq;
exports.UniqueUserId = UniqueUserId;
exports.UtmFields = UtmFields;
exports.enableProfileLogging = enableProfileLogging;
exports.getApiStage = get;
exports.getLocalStorageObject = getLocalStorageObject;
exports.isLocalhost = isLocalhost;
exports.profileBlock = profileBlock;
exports.profileResults = profileResults;
exports.setLocalStorageObject = setLocalStorageObject;
exports.useAsyncEffect = useAsyncEffect;
//# sourceMappingURL=index.cjs.js.map
