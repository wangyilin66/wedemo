import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import SettingIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/styles';

const styles = {

};

 class MenuContacts extends React.PureComponent {
  render() {
    return (
      <div>
        <a href="javascript:;" onClick={this.props.onNewTopic}><ChatIcon></ChatIcon></a>
        &nbsp;
        <a href="javascript:;" onClick={this.props.onSettings}><SettingIcon></SettingIcon></a>
      </div>
    );
  }
};
export default withStyles(styles)(MenuContacts);