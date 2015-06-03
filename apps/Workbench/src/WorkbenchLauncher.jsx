import React from 'react';
import Router from 'react-router';
import ContextHelper from 'ContextHelper';
import Workbench from './Workbench';

export default class WorkbenchLauncher {
  constructor(options) {
    this._routes = ContextHelper.generateRoutes({Container: Workbench, ...options});
  }

  renderTo(target) {
    Router.run(this._routes, Router.HashLocation, function (Root) {
      React.render(<Root />, target);
    });
  }
}
