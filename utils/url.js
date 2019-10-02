import linkifyHtml from 'linkifyjs/html';
import { isEmpty } from 'lodash';


export function makeFullUrl(urlString) {
  if (!urlString) return '';
  const prefixes = ['http://', 'https://'];
  let hasCorrectPrefix = false;
  prefixes.forEach((prefix) => {
    if (urlString.startsWith(prefix)) hasCorrectPrefix = true;
  });
  return hasCorrectPrefix ? urlString : `http://${urlString}`;
}

export function linkify(urlString) {
  return linkifyHtml(urlString, {
    defaultProtocol: 'https',
    target: '_blank',
  });
}

export function parseUrlParams(search) {
  if (!search) return {};

  return search
    .slice(search.indexOf('?') + 1)
    .split('&')
    .reduce((params, query) => {
      const [key, val] = query.split('=');
      return { ...params, [key]: decodeURIComponent(val) };
    }, {});
}

export function buildParamList(name, paramList) {
  if (isEmpty(paramList)) return '';

  return paramList
    .reduce((acc, cur) => `${acc}&${name}=${cur}`, '')
    .substr(1);
}
