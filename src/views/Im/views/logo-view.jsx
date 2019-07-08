/* This is just a static page to display when no conversation is selected. */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Tinode from '../tinodesdk/tinode';

import { APP_NAME } from '../config.js';

export default class LogoView extends React.PureComponent {
  render() {
    var version = APP_NAME + ' (' + Tinode.getLibrary() + ')';
    return (
      <div id="dummy-view" className={this.props.hideSelf ? 'nodisplay' : null}>
        <div>
          <a href="https://github.com/tinode/chat/">
            {/* <img id="logo" alt="logo" src="img/logo.svg" /> */}
            <h2>请选择分组</h2>
          </a>
          {/* <p><FormattedMessage id="label_client" defaultMessage="Client:" /> {version}</p>
          <p><FormattedMessage id="label_server" defaultMessage="Server:" /> {this.props.serverVersion} ({this.props.serverAddress})</p> */}
        </div>
      </div>
    );
  }
};
