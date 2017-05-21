import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import qs from 'qs';


function checkStatus(response) {
  if (response.status === 204) {
    return {};
  }


  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  return response.json().then(data => {
    const error = new Error(response.statusText);

    if (response.status === 429) {
      message.error('请求频繁，请稍后再试');
      return {};
    }

    error.response = response;
    error.detail = data;
    return Promise.reject(error);
  });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const params = /:(\w+)[$|/]/g.exec(url);
  let newUrl = url;
  if (params !== null) {
    const newParams = params.splice(1);
    for (const param of newParams) {
      const re = new RegExp(`:${param}`, 'g');
      newUrl = url.replace(re, options[param]);
    }
  }

  if ('query' in options) {
    const keys = Object.keys(options.query);
    if (keys.length > 0) {
      newUrl += '?';
      newUrl += qs.stringify(options.query);
    }
  }
  return fetch(newUrl, options)
    .then(checkStatus)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
