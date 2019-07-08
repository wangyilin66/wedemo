import React, {Component,} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {message, Button,} from 'antd';

import CallTo from './CallTo';
import CallFrom from './CallFrom';
import CallAccepted from './CallAccepted';

class VideoChat extends Component {
  static defaultProps = {
  };

  static propTypes = {
  };

  constructor () {
      super ();
      window.a = this;

      this.state = {};
  }

  componentDidMount() {
      this.props.login('456456');
  }

  componentWillUnmount() {
      this.props.logout();
  }

  handleCallFrom = operate => {
      console.log (operate);
      if (operate === 'accept') {
          const targetId = this.props.loginData.fromId;
          console.log(targetId);
          this.props.voipAccept(targetId);
      }
      if (operate === 'refuse') {
          const targetId = this.props.loginData.fromId;
          console.log (targetId);
          this.props.voipRefuse(targetId);
      }
  };

  handleCallAccepted = operate => {
      console.log (operate);
      if (operate === 'hangup') {
      // const targetId = this.props.loginData.fromId;
      // console.log(targetId);
      // this.props.voipRefuse(targetId);
          this.props.voipHangup();
      }
  };

    handleCallTo = operate => {
        console.log (operate);
        if (operate === 'hangup') {
            // const targetId = this.props.loginData.fromId;
            // console.log(targetId);
            // this.props.voipRefuse(targetId);
            this.props.voipHangup();
        }
    };

    render () {
        const {
            status,
            action,
            voipStatus,
            voipData,
        } = this.props;
        return (
      <>
        {(status === 'voipAccepted') &&
        <CallAccepted action={action} status={voipStatus} data={voipData} onOperate={this.handleCallAccepted}/>}
        {status === 'voipCallFrom' && <CallFrom onOperate={this.handleCallFrom} />}
      </>
        );
    }
}

export default VideoChat;
