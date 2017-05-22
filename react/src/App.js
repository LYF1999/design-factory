import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import './index.less';


export const DEV = (process.env.NODE_ENV === 'development');

let MyRouter;

if (DEV) {
  MyRouter = HashRouter;
} else {
  MyRouter = BrowserRouter;
}

export { MyRouter };

let staticUrl = 'https://statics-dev.purewhitelyx.com/static/';
if (!DEV) {
  staticUrl = '/static';
}

export { staticUrl };

export default function () {
  return (
    <MyRouter>
      <Route path={'/'} component={MainLayout} />
    </MyRouter>
  );
}
