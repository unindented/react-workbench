import defaults from 'lodash/object/defaults';
import kebabCase from 'lodash/string/kebabCase';
import map from 'lodash/collection/map';
import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import Tabs from 'Tabs';

let expandContext = function (context, name) {
  return {
    name: name,
    cases: map(context.keys(), context)
  };
};

let generateRoute = function ({Container, data, generator, logo}) {
  let {view: View, name, cases, schema} = data;
  let path = (name ? `${Container.displayName}${kebabCase(name)}/` : '/');

  let Handler = React.createClass({
    displayName: path,

    render() {
      let attrs;

      if (data.cases != null) {
        View = Tabs;
        attrs = {items: cases, path, logo};
      }
      else {
        attrs = generator(schema);
      }

      return (
        <View {...attrs} />
      );
    }
  });

  let $routes = map(cases, function (data) {
    data = defaults(data, {view: View});
    return generateRoute({Container: Handler, data, generator});
  });

  return (
    <Route key={path} name={path} path={path} handler={Container}>
      <DefaultRoute handler={Handler}/>
      {$routes}
    </Route>
  );
};

let generateRoutes = function ({Container, contexts, generator, logo}) {
  let data = {
    cases: map(contexts, expandContext)
  }

  return generateRoute({Container, data, generator, logo});
};

export default {
  generateRoutes: generateRoutes
};
