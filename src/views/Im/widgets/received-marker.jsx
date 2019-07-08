// Received/read indicator.
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import Tinode from '../tinodesdk/tinode';

import { shortDateFormat } from '../lib/strformat.js';
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import WaringIcon from '@material-ui/icons/Warning'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'

const messages = defineMessages({
  'sending': {
    'id': 'message_sending',
    'defaultMessage': 'sending...',
    'description': 'Message being sent, in place of time stamp'
  },
  'failed': {
    'id': 'message_sending_failed',
    'defaultMessage': 'failed',
    'description': 'Failed to send message, in place of time stamp'
  }
});

class ReceivedMarker extends React.PureComponent {
  render() {
    const {formatMessage} = this.props.intl;
    let timestamp;
    if (this.props.received <= Tinode.MESSAGE_STATUS_SENDING) {
      timestamp = formatMessage(messages.sending);
    } else if (this.props.received === Tinode.MESSAGE_STATUS_FAILED) {
      timestamp = formatMessage(messages.failed);
    } else {
      timestamp = shortDateFormat(this.props.timestamp, this.props.intl.locale);
    }

    let marker = null;
    if (this.props.received <= Tinode.MESSAGE_STATUS_SENDING) {
      marker = (<AccessTimeIcon></AccessTimeIcon>); // watch face
    } else if (this.props.received === Tinode.MESSAGE_STATUS_FAILED) {
      marker = (<WaringIcon></WaringIcon>); // yellow icon /!\
    } else if (this.props.received === Tinode.MESSAGE_STATUS_SENT) {
      marker = (<DoneIcon></DoneIcon>); // checkmark
    } else if (this.props.received === Tinode.MESSAGE_STATUS_RECEIVED) {
      marker = (<DoneAllIcon></DoneAllIcon>); // double checkmark
    } else if (this.props.received === Tinode.MESSAGE_STATUS_READ) {
      marker = (<DoneAllIcon></DoneAllIcon>); // blue double checkmark
    }

    return (
      <span className="timestamp">
        {timestamp}{'\u00a0'}{marker}
      </span>
    );
  }
};

export default injectIntl(ReceivedMarker);
