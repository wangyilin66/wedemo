import React from 'react';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const styles={
  panelFormRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    lineHeight: 1.5,
    flexGrow: 0,
    flexShrink: 0,
  },
  checkBoxIcon:{
    color:'blue',
  },

};

/* BEGIN CheckBox: styled checkbox */
class CheckBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange(this.props.name, !this.props.checked);
    console.log("handle change!");
  }

  render() {
    const {classes}=this.props;
    return (
      this.props.onChange ? (
        this.props.checked ?
          <CheckBoxIcon className={classes.checkBoxIcon} onClick={this.handleChange}/> :
          <CheckBoxOutlineBlankIcon className={classes.checkBoxIcon} onClick={this.handleChange}/>
        ) : (
          this.props.checked ?
          <CheckBoxIcon className={classes.checkBoxIcon} onClick={this.handleChange}/> :
          <CheckBoxOutlineBlankIcon className={classes.checkBoxIcon} onClick={this.handleChange}/>
        )
    );
  }
}

export default withStyles(styles)(CheckBox);
/* END CheckBox */
/*<i className="material-icons blue clickable" onClick={this.handleChange}>check_box</i> :
          <i className="material-icons blue clickable" onClick={this.handleChange}>check_box_outline_blank</i>
          
          <i className="material-icons">check_box</i> :
            <i className="material-icons">check_box_outline_blank</i>
            */
