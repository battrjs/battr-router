import { events } from '@battr/battr-core';

const PARAMETER_REGEXP = /([:*])(\w+)/g;
const WILDCARD_REGEXP = /\*/g;
const REPLACE_VARIABLE_REGEXP = '([^\/]+)';
const REPLACE_WILDCARD = '(?:.*)';
const FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
const MATCH_REGEXP_FLAGS = '';

var inited = false;
var destroyed = false;
var _routes = [];
var _notFoundHandler;

export function start() {
  if (inited) { return; }
  inited = true;
  listen();
  return this;
}

export function path() {
  var path = window.location.hash.replace(/.*#/, '');
  if (path.includes('?')) path = path.split('?')[0];
  if (path.charAt(0) !== '/') { path = '/'+path; }
  return path;
}

export function add(route, handler) {
  if (typeof route === 'string') route = encodeURI(route);
  if (typeof handler === 'object') {
    _routes.push({
      route,
      template: handler.template,
      controller: handler.controller,
      locals: handler.locals
    });
  } else {
    _routes.push({ route, handler });
  }
  return this;
}

export function notFound(handler) {
  _notFoundHandler = handler;
  return this;
}

export function resolve() {
  if (!inited) start();
  let _path = path();
  let _match = match(_path, _routes);

  if (_match === false && _notFoundHandler) {
    return _notFoundHandler();
  }

  let url = _path;
  let GETParameters = extractGETParameters(getCurrent());
  if (GETParameters) url += `?${GETParameters}`;
  window.location.hash = url;
  let handler = _match.route.handler;
  let routeInfo = _match.route;
  if (handler) {
    routeInfo = _match.route.route instanceof RegExp ?
      handler(...(_match.match.slice(1, _match.match.length))) :
      handler(_match.params, GETParameters);
  }
  
  events.emit('$routeChangeHandler', routeInfo);
  events.emit('routeChangeEnd', { route: _match.route.route, path: _path });
}

export function navigate(path, absolute) {
  var to;
  path = path || '';
  path = path.replace(new RegExp('^#'), '');
  window.location.href =
    window.location.href
      .replace(/#$/, '')
      .replace(new RegExp('#.*$'), '') + '#' + path;
  return this;
}


function listen() {
  window.addEventListener('hashchange', onLocationChange);
}

function destroy() {
  _routes = [];
  destroyed = true;
  window.removeEventListener('hashchange', onLocationChange);
}

function onLocationChange() {
  resolve();
}

function getCurrent() {
  return clean(window.location.href);
}

function clean(str) {
  if (str instanceof RegExp) return s;
  return str.replace(/\/+$/, '').replace(/^\/+/, '/');
}

function extractGETParameters(url) {
  return url.split(/\?(.*)?$/).slice(1).join('');
}


function match(url, routes) {
  let matched = findMatchedRoutes(url, routes);
  if (!matched.length) return false;
  else if(matched.length === 1) return matched[0];
  else {
    return matched.sort((a, b) => {
      if (b.params) return 1;
      return -1;
    })[0];
  }
}

function findMatchedRoutes(url, routes = []) {
  return routes
    .map(route => {
      var { regexp, paramNames } = replaceDynamicURLParts(clean(route.route));
      var match = url.replace(/^\/+/, '/').match(regexp);
      var params = regExpResultToParams(match, paramNames);
      return match ? { match, route, params } : false;
    })
    .filter(m => m && m.match[0] !== '');
}


function replaceDynamicURLParts(route) {
  var paramNames = [], regexp;

  if (route instanceof RegExp) {
    regexp = route;
  } else {
    regexp = new RegExp(
      clean(route)
        .replace(PARAMETER_REGEXP, function (full, dots, name) {
          paramNames.push(name);
          return REPLACE_VARIABLE_REGEXP;
        })
        .replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP, MATCH_REGEXP_FLAGS);
  }
  return { regexp, paramNames };
}

function regExpResultToParams(match, names) {
  if (names.length === 0) return null;
  if (!match) return null;
  return match
    .slice(1, match.length)
    .reduce((params, value, index) => {
      if (params === null) params = {};
      params[names[index]] = decodeURIComponent(value);
      return params;
    }, null);
}
