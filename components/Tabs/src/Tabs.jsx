import kebabCase from 'lodash/string/kebabCase';
import map from 'lodash/collection/map';
import React, {PropTypes} from 'react';
import {Link, RouteHandler} from 'react-router';
import styles from './Tabs.less';

export default React.createClass({
  propTypes: {
    items: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    logo: PropTypes.string
  },

  render() {
    let $items = this._getItems();
    let $panels = this._getPanels();

    return (
      <div className={styles.root}>
        <div className={styles.pusher} />
        {$items}
        {$panels}
      </div>
    );
  },

  _getItems() {
    let $header = this._getHeader();

    let $items = map(this.props.items, ({name}) => {
      return (
        <li className={styles.item} key={name}>
          <Link to={`${this.props.path}${kebabCase(name)}/`}
            className={styles.target}
            activeClassName={styles.isActive}>
            {name}
          </Link>
        </li>
      );
    });

    return (
      <nav className={styles.navigation}>
        {$header}
        <ul className={styles.items}>
          {$items}
        </ul>
      </nav>
    );
  },

  _getHeader() {
    let {logo} = this.props;

    let headerClassName = `${styles.header} ${logo ? styles.hasLogo : ''}`;
    let headerBackground = {
      'backgroundImage': logo ? `url(${logo})` : null
    };

    return (
      <header className={headerClassName} style={headerBackground} />
    );
  },

  _getPanels() {
    let cases = this.props.items.filter(({cases}) => cases != null);
    let isLeaf = (cases.length === 0);

    let panelsClassName = styles.panels;
    let panelClassName = `${styles.panel} ${isLeaf ? styles.isLeaf : ''}`;

    return (
      <div className={panelsClassName}>
        <div className={panelClassName}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});
