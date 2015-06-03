import React from 'react';
import {RouteHandler} from 'react-router';
import styles from './Workbench.less';

export default React.createClass({
  render() {
    return (
      <article className={styles.root}>
        <RouteHandler />
      </article>
    );
  }
});
