import React, { Component } from "react";

class Input extends Component {
  state = {
    // CONTROLLED INPUT VALUE
    inputValue: "",
    // SHOWING DROPDOWN MENU
    showSuggestionDropDown: false,
    filteredSuggestions: [],
    // TO MANUPULATE WITH SUGGGESTIONS BY KEY
    hoveredSuggestionPosition: 0
  };

  // SORT FILTERED SUGGESTIONS
  sortSuggestions = filteredSuggestions => {
    let sortedArray;
    const typeOfSort = this.props.sortSuggestions;

    if (typeOfSort === "alphabetically") {
      sortedArray = filteredSuggestions.sort((currentItem, nextItem) => {
        const textA = currentItem.toLowerCase();
        const textB = nextItem.toLowerCase();
        if (textA < textB) return -1;
        if (textA > textB) return 1;
        return 0;
      });
    } else {
      sortedArray = filteredSuggestions;
    }

    return sortedArray;
  };

  // CATCH INPUT CHANGE EVENT AND FILTER SUGGESTION DATA
  changeHandler = (e, blur = true) => {
    const data = this.props.autocompleteData;
    const inputValue = e.target.value;

    let filteredSuggestions = data.filter(
      item => item.toLowerCase().indexOf(inputValue.toLowerCase()) === 0
    );

    filteredSuggestions = this.sortSuggestions(filteredSuggestions);

    this.setState({
      inputValue,
      showSuggestionDropDown: blur,
      filteredSuggestions,
      hoveredSuggestionPosition: 0
    });
  };

  // CATCH CHOICE OF USER AND WRITE IT TO STATE
  catchChoice = e => {
    const inputValue = e.target.innerText;

    this.setState({
      inputValue,
      showSuggestionDropDown: false,
      filteredSuggestions: [],
      hoveredSuggestionPosition: 0
    });
  };

  // LISTEN FOR THE KEYS PRESSED BY USER
  keyDownHandler = e => {
    const { filteredSuggestions, hoveredSuggestionPosition } = this.state;
    //USER PRESS ENTER
    if (e.keyCode === 13) {
      this.setState({
        showSuggestionDropDown: false,
        inputValue: filteredSuggestions[hoveredSuggestionPosition]
      });
      //USER PRESS ARROW UP
    } else if (e.keyCode === 38) {
      if (hoveredSuggestionPosition === 0) {
        return;
      }
      this.setState({
        hoveredSuggestionPosition: hoveredSuggestionPosition - 1
      });
      // USER PRESS ARROW DOWN
    } else if (e.keyCode === 40) {
      if (hoveredSuggestionPosition + 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({
        hoveredSuggestionPosition: hoveredSuggestionPosition + 1
      });
      // USER PRESS ESC
    } else if (e.keyCode === 27) {
      e.target.blur();
      this.setState({
        inputValue: "",
        showSuggestionDropDown: false,
        filteredSuggestions: [],
        hoveredSuggestionPosition: 0
      });
    }
  };

  // RENDER TEMPLATE FROM FILTEREDSUGGESTIONS
  renderSuggestions = () => {
    const {
      filteredSuggestions,
      showSuggestionDropDown,
      hoveredSuggestionPosition,
      inputValue
    } = this.state;
    let template;
    if (inputValue && showSuggestionDropDown)
      if (filteredSuggestions.length) {
        template = filteredSuggestions.map((item, i) => {
          return (
            <li
              key={item}
              onMouseDown={this.catchChoice}
              className={i === hoveredSuggestionPosition ? "hovered" : ""}
            >
              {item}
            </li>
          );
        });
      } else {
        template = <li>there is no suggestions</li>;
      }

    return template;
  };

  render() {
    const { inputValue } = this.state;
    const { changeHandler, keyDownHandler } = this;

    return (
      <div className="input">
        <div className="input__field">
          <input
            type="text"
            onChange={changeHandler}
            value={inputValue ? inputValue : ""}
            onKeyDown={keyDownHandler}
            onBlur={event => changeHandler(event, false)}
          />
          {this.renderSuggestions()}
        </div>
      </div>
    );
  }
}

export default Input;
