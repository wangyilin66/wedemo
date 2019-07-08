import React from 'react';

import Chip from './chip.jsx';

import { makeImageUrl } from '../lib/blob-helpers.js';

/* BEGIN ChipInput: group membership widget */
export default class ChipInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = ChipInput.getDerivedStateFromProps(props);

    this.handleTextInput = this.handleTextInput.bind(this);
    this.removeChipAt = this.removeChipAt.bind(this);
    this.handleChipCancel = this.handleChipCancel.bind(this);
    this.handleFocusGained = this.handleFocusGained.bind(this);
    this.handleFocusLost = this.handleFocusLost.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = {
      placeholder: nextProps.chips ? '' : nextProps.prompt,
      sortedChips: ChipInput.sortChips(nextProps.chips, nextProps.required),
      chipIndex: ChipInput.indexChips(nextProps.chips),
      focused: prevState && prevState.focused
    };

    if (!prevState || nextProps.chips.length > prevState.sortedChips.length) {
      // Chip added: clear input.
      state.input ='';
    }

    return state;
  }

  // Map chip index to user name
  static indexChips(chips) {
    const index = {};
    let count = 0;
    chips.map(function(item) {
      index[item.user] = count;
      count ++;
    });
    return index;
  }

  // Have non-removable chips appear before all other chips.
  static sortChips(chips, keep) {
    const required = [];
    const normal = [];
    chips.map(function(item) {
      if (item.user === keep) {
        required.push(item);
      } else {
        normal.push(item);
      }
    });
    return required.concat(normal);
  }

  handleTextInput(e) {
    this.setState({input: e.target.value});
    if (this.props.filterFunc) {
      this.props.filterFunc(e.target.value);
    }
  }

  removeChipAt(idx) {
    const removed = this.state.sortedChips[idx];
    this.props.onChipRemoved(removed.user, this.state.chipIndex[removed.user]);
  }

  handleChipCancel(item, idx) {
    this.removeChipAt(idx);
  }

  handleFocusGained() {
    this.setState({focused: true});
  }

  handleFocusLost() {
    this.setState({focused: false});
    if (this.props.onFocusLost) {
      this.props.onFocusLost(this.state.input);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Backspace') {
      if (this.state.input.length === 0 && this.state.sortedChips.length > 0) {
        var at = this.state.sortedChips.length - 1;
        if (this.state.sortedChips[at].user !== this.props.required) {
          this.removeChipAt(at);
        }
      }
    } else if (e.key === 'Enter') {
      if (this.props.onEnter) {
        this.props.onEnter(this.state.input);
      }
    } else if (e.key === 'Escape') {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }

  render() {
    const chips = [];
    let count = 0;
    this.state.sortedChips.map((item) => {
      chips.push(
        <Chip
          onCancel={this.handleChipCancel}
          avatar={makeImageUrl(item.public ? item.public.photo : null)}
          title={item.public ? item.public.fn : undefined}
          noAvatar={this.props.avatarDisabled}
          topic={item.user}
          required={item.user === this.props.required}
          invalid={item.invalid}
          index={count}
          key={item.user} />
      );
      count++;
    });
    const className = "chip-input" + (this.state.focused ? ' focused' : '');
    return (
      <div className={className}>
        {chips}
        <input type="text"
          placeholder={this.state.placeholder}
          onChange={this.handleTextInput}
          onFocus={this.handleFocusGained}
          onBlur={this.handleFocusLost}
          onKeyDown={this.handleKeyDown}
          value={this.state.input}
          autoFocus />
      </div>
    );
  }
};
