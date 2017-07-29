var inited = false;
var _root = '/';
var _useHash = true;
var history = [];

export function start() {
  if (inited) { return; }
  inited = true;

  // fix path if using hashes
  if (_useHash) {
    if (!window.location.hash) { window.location.hash = window.location.path || _root; }
    else if (!window.location.hash.match(/^\/#\//)) {
      window.location.hash = path();
    }
  }
  return this;
}


export function path() {
  var path = _useHash ? window.location.hash.replace(/.*#/, '') : window.location.pathname;
  if (path.charAt(0) !== '/') { path = '/'+path; }
  return path;
}

export function root(value) {
  _root = value;
  return this;
}

export function useHash() {
  _useHash = true;
  return this;
}

export function on() {
  return this;
}

export function notFound() {
  return this;
}


// var _root = '/';
// var last;
// var checkUrlInterval;
// var routes = [];
// var _useHash = false;
// var _hash = '#\!';
// var destroyed = false;
// var canPushState = isPushStateAvailable();
// var inited = false;
// var _lastRouteResolved = null;
// var _notFoundHandler = null;
// var _defaultHandler = null;
//
// const PARAMETER_REGEXP = /([:*])(\w+)/g;
// const WILDCARD_REGEXP = /\*/g;
// const REPLACE_VARIABLE_REGEXP = '([^\/]+)';
// const REPLACE_WILDCARD = '(?:.*)';
// const FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
// const MATCH_REGEXP_FLAGS = '';
//
//
// export function start() {
//   if (inited) { return; }
//   inited = true;
//
//   if (_root) {
//     _root = _useHash ? _root.replace(/\/$/, '/' + _hash) : _root.replace(/\/$/, '');
//   } else if (_useHash) {
//     _root = clean(window.location.href).split(_hash)[0].replace(/\/$/, '/' + _hash);
//   }
//
//   listen();
// }
//
// export function resolve(current) {
//   var url = (current || clean(window.location.href)).replace(_root, '');
//   if (_useHash) {
//     url = url.replace(new RegExp('^\/' + _hash), '/');
//   }
//
//   var GETParameters = extractGETParameters(current || clean(window.location.href));
//   var onlyURL = getOnlyURL(url, _useHash, _hash);
//
//   if (
//     _paused ||
//     (
//       _lastRouteResolved &&
//       onlyURL === _lastRouteResolved.url &&
//       GETParameters === _lastRouteResolved.query
//     )
//   ) { return false; }
//
//   var m = match(onlyURL, _routes);
//
//   if (m) {
//     _lastRouteResolved = { url: onlyURL, query: GETParameters };
//     handler = m.route.handler;
//     manageHooks(() => {
//       m.route.route instanceof RegExp ?
//         handler(...(m.match.slice(1, m.match.length))) :
//         handler(m.params, GETParameters);
//     }, m.route, m.params);
//     return m;
//   } else if (_defaultHandler && (
//       onlyURL === '' ||
//       onlyURL === '/' ||
//       onlyURL === _hash ||
//       isHashedRoot(onlyURL, _useHash, _hash)
//   )) {
//     manageHooks(() => {
//       _lastRouteResolved = { url: onlyURL, query: GETParameters };
//       _defaultHandler.handler(GETParameters);
//     }, _defaultHandler);
//     return true;
//   } else if (_notFoundHandler) {
//     manageHooks(() => {
//       _lastRouteResolved = { url: onlyURL, query: GETParameters };
//       _notFoundHandler.handler(GETParameters);
//     }, _notFoundHandler);
//   }
//   return false;
// }
//
//
// export function root(value) {
//   _root = value;
//   return this;
// }
//
// export function pause() {
//
// }
//
// export function resume() {
//
// }
//
// export function on() {
//   return this;
// }
//
// export function off() {
//
// }
//
// export function notFound() {
//   return this;
// }
//
// export function navigate(path, absolute) {
//   var to;
//   path = path || '';
// }
//
// navigate: function (path, absolute) {
//     var to;
//
//     path = path || '';
//       to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
//       to = to.replace(/([^:])(\/{2,})/g, '$1/');
//       history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
//       this.resolve();
//     return this;
//   }
//
// export function reload() {
//
// }
//
// export function useHash() {
//   _useHash = true;
// }
//
// export function hash(value) {
//   _hash = value;
// }
//
//
// function listen() {
//   if (canPushState && !_useHash) {
//     window.addEventListener('popstate', onLocationChange);
//   } else if (window.onhashchange) {
//     window.addEventListener('hashchange', onLocationChange);
//   } else {
//     checkUrlInterval = setInterval(function () {
//       var current = getCurrent();
//       if (last !== current) {
//         last = current;
//         resolve();
//       }
//     }, 200);
//   }
// }
//
// function destroy() {
//   routes = [];
//   destroyed = true;
//   clearInterval(checkUrlInterval);
//   window.removeEventListener('popstate', onLocationChange);
//   window.removeEventListener('hashchange', onLocationChange);
// }
//
// function getCurrent() {
//
// }
//
// function resolve() {
//
// }
//
//
// function isPushStateAvailable() {
//   return !!(
//     typeof window !== 'undefined' &&
//     window.history &&
//     window.history.pushState
//   );
// }
//
// function onLocationChange(e) {
//   console.log('onLocationChange', e);
//   resolve();
// }
//
// function clean(str) {
//   if (str instanceof RegExp) return s;
//   return str.replace(/\/+$/, '').replace(/^\/+/, '/');
// }
//
// function extractGETParameters(url) {
//   return url.split(/\?(.*)?$/).slice(1).join('');
// }
//
// function getOnlyURL(url, useHash, hash) {
//   var onlyURL = url.split(/\?(.*)?$/)[0];
//   if (hash === undefined) { hash = '#'; }
//   if (isPushStateAvailable() && !useHash) {
//     onlyURL = onlyURL.split(hash)[0];
//   }
//   return onlyURL;
// }
//
// function match(url, routes) {
//   return findMatchedRoutes(url, routes)[0] || false;
// }
//
// function findMatchedRoutes(url, routes = []) {
//   return routes
//     .map(route => {
//       var { regexp, paramNames } = replaceDynamicURLParts(route.route);
//       var match = url.match(regexp);
//       var params = regExpResultToParams(match, paramNames);
//       return match ? { match, route, params } : false;
//     })
//     .filter(m => m);
// }
//
//
// function replaceDynamicURLParts(route) {
//   var paramNames = [], regexp;
//
//   if (route instanceof RegExp) {
//     regexp = route;
//   } else {
//     regexp = new RegExp(
//       clean(route)
//       .replace(PARAMETER_REGEXP, function (full, dots, name) {
//         paramNames.push(name);
//         return REPLACE_VARIABLE_REGEXP;
//       })
//       .replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP
//     , MATCH_REGEXP_FLAGS);
//   }
//   return { regexp, paramNames };
// }
//
// function regExpResultToParams(match, names) {
//   if (names.length === 0) return null;
//   if (!match) return null;
//   return match
//     .slice(1, match.length)
//     .reduce((params, value, index) => {
//       if (params === null) params = {};
//       params[names[index]] = value;
//       return params;
//     }, null);
// }
//
// function manageHooks(handler, route, params) {
//   if (route && route.hooks && typeof route.hooks === 'object') {
//     if (route.hooks.before) {
//       route.hooks.before((shouldRoute = true) => {
//         if (!shouldRoute) return;
//         handler();
//         route.hooks.after && route.hooks.after(params);
//       }, params);
//     } else if (route.hooks.after) {
//       handler();
//       route.hooks.after && route.hooks.after(params);
//     }
//     return;
//   }
//   handler();
// }
