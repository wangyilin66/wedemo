// Password with a visiblity toggle.
import React from 'react';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const styles={
  VisibilityIcon:{
    color:'blue',
  },

};

class VisiblePassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      visible: false
    };

    this.handleVisibility = this.handleVisibility.bind(this);
    this.handeTextChange = this.handeTextChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEditingFinished = this.handleEditingFinished.bind(this);
  }

  handeTextChange(e) {
    this.setState({value: e.target.value});
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleVisibility(e) {
    e.preventDefault();
    this.setState({visible: !this.state.visible});
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      // Escape pressed
      this.setState({value: this.props.value, visible: false});
      if (this.props.onFinished) {
        this.props.onFinished();
      }
    } else if (e.keyCode === 13) {
      // Enter pressed
      this.handleEditingFinished();
    }
  }

  handleEditingFinished(e) {
    if (e) {
      let currentTarget = e.currentTarget;
      setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) {
          if (this.props.onFinished) {
            this.props.onFinished(this.state.value);
          }
        }
      }, 0);
    } else if (this.props.onFinished) {
      this.props.onFinished(this.state.value.trim());
    }
  }

  render() {
    const {classes}=this.props;
    return (
      <div tabIndex="-1" className="group-focus"
        onBlur={this.handleEditingFinished}>
        <input className="with-visibility"
          type={this.state.visible ? "text" : "password"}
          value={this.state.value}
          placeholder={this.props.placeholder}
          required={this.props.required ? 'required' : ''}
          autoFocus={this.props.autoFocus ? 'autoFocus' : ''}
          autoComplete={this.props.autoComplete}
          onChange={this.handeTextChange}
          onKeyDown={this.handleKeyDown} />
        <span onClick={this.handleVisibility}>
        {this.state.visible ?<VisibilityIcon className={classes.VisibilityIcon}/>
        :<VisibilityOffIcon className={classes.VisibilityIcon}/>}
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(VisiblePassword);

/*<i className="material-icons clickable light-gray">
            {this.state.visible ? 'visibility' : 'visibility_off'}
          </i>*/
