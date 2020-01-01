import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {components} from "react-select";
import SearchIcon from "@material-ui/icons/Search";
import Creatable from "react-select/creatable";

import {findTerms, postTerm, setTerm} from "../actions";

type State = {
  options: [{[string]: string}],
  value: string | void
};

const ValueContainer = ({children, ...props}) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && <SearchIcon style={{position: "absolute", left: 6}} />}
        {children}
      </components.ValueContainer>
    )
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    )
  );
};

// https://stackoverflow.com/questions/1366068/whats-the-complete-range-for-chinese-characters-in-unicode
// const matchCJK = text => text.match(/[\u3400-\u9FFF]/);
const matchCJK = text =>
  text.match(/[\u4E00-\u9FFF]/) !== null ||
  text.match(/[\u3400-\u4DBF]/) !== null ||
  // text.match(/[\u20000-\u2A6DF]/) !== null;
  text.match(/[\u2A700–\u2B73F]/) !== null ||
  text.match(/[\u2B740–\u2B81F]/) !== null ||
  text.match(/[\u3400-\u9FFF]/) !== null ||
  text.match(/[\u2B820–\u2CEAF]/) !== null ||
  text.match(/[\uF900-\uFAFF]/) !== null;
// text.match(/[\u2F800-\u2FA1F]/) !== null;

const mapStateToProps = state => {
  return {
    searchOptions: state.searchOptions,
    term: state.term,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findTerms: term => dispatch(findTerms(term)),
    postTerm: (term, email, familyName, givenName) =>
      dispatch(postTerm(term, email, familyName, givenName)),
    setTerm: term => dispatch(setTerm(term))
  };
};

class SearchBar extends Component<*, State> {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      value: undefined,
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  styles = {
    container: base => ({
      ...base,
      paddingLeft: 22,
      width: this.state.width < 768 ? 300 : 420,
      zIndex: 2147483647
    }),
    valueContainer: base => ({
      ...base,
      paddingLeft: 30
    })
  };

  select: ElementRef<*>;
  handleChange = (newValue: any, actionMeta: any) => {
    if (newValue !== null) {
      this.props.setTerm(newValue.label);
      this.props.history.push("/term/" + newValue.label);
    }
    this.setState({value: newValue});
  };
  handleCreate = (inputValue: string) => {
    if (inputValue.length > 255 || !matchCJK(inputValue)) {
      return;
    }
    this.setState({isLoading: true});
    console.log("Option created");
    console.log("Wait a moment...");
    setTimeout(() => {
      const {user, history, postTerm} = this.props;
      postTerm(inputValue, user.email, user.familyName, user.givenName);
      history.push("/term/" + inputValue);
      this.setState({isLoading: false});
    }, 1000);
  };
  handleFocus = element => {
    if (this.state.value) {
      this.select.state.inputValue = this.state.value.label;
    }
  };
  handleInputChange = (query, {action}) => {
    if (query.length > 0) {
      this.props.findTerms(query);
    }
    // Without this, when query is empty,
    // all queries will appear and be highlighted.
    this.setState({value: query});
  };
  handleMenuClose = () => {
    console.log(this.select);
    this.select.blur();
  };
  // https://github.com/JedWatson/react-select/issues/2217
  onInputKeyDown = event => {
    switch (event.keyCode) {
      case 13: // ENTER
        event.preventDefault();
        break;
      default:
        return;
    }
  };
  validateCreate = text => {
    if (text.length > 255) {
      return "CANNOT EXCEED 255 CHARACTERS!!!";
    }
    if (matchCJK(text)) {
      return "Add " + text;
    }
    return "Error: No Chinese characters detected.";
  };

  render() {
    const {searchOptions} = this.props;
    const {isLoading, value} = this.state;

    return (
      <div>
        <div>
          <Creatable
            ref={ref => {
              this.select = ref;
            }}
            classNamePrefix="search"
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            isMulti={false}
            isSearchable={true}
            blurInputOnSelect={true}
            components={{DropdownIndicator, ValueContainer}}
            formatCreateLabel={this.validateCreate}
            noOptionsMessage={() => "Type to find or create..."}
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            onMenuClose={this.handleMenuClose}
            onFocus={this.handleFocus}
            onInputChange={this.handleInputChange}
            onInputKeyDown={this.onInputKeyDown}
            options={searchOptions}
            placeholder={"Find or create..."}
            styles={this.styles}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
