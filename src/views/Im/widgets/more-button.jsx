// Toggle [Title text >] -> [Title text v]

import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/styles';
import ChevRight from '@material-ui/icons/ChevronRight';
const styles = {

};
class MoreButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const open = !this.state.open;
    this.setState({open: open});
    if (this.props.onToggle) {
      this.props.onToggle(open);
    }
  }

  render() {
    return (<label className="small clean-clickable" onClick={this.handleToggle}>{this.props.title}...
      {this.state.open ?  <ExpandMoreIcon></ExpandMoreIcon> :
        <ChevRight></ChevRight>}
      </label>);
  }
}


export default withStyles(styles)(MoreButton);