import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {components} from "react-select";
import SearchIcon from "@material-ui/icons/Search";
import Creatable from "react-select/creatable";

import {getLatestTerms, setTerm} from "../actions";

const validate = values => {
  const errors = {};
  if (!values.search) {
    errors.search = "Required";
  }
  // todo: Validate that input is only Chinese characters.
  return errors;
};

type State = {
  options: [{[string]: string}],
  value: string | void
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});

const defaultOptions = ["一见钟情", "一无所知", "脚踏实地", "奶酪", "踊跃"].map(
  createOption
);

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

const styles = {
  container: base => ({
    ...base,
    paddingLeft: 22,
    width: 420,
    zIndex: 2147483647
  }),
  valueContainer: base => ({
    ...base,
    paddingLeft: 30
  })
};

const mapStateToProps = state => {
  return {
    term: state.term
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestTerms: () => dispatch(getLatestTerms()),
    setTerm: term => dispatch(setTerm(term))
  };
};

class SearchBar extends Component<*, State> {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      options: defaultOptions,
      // openMenu: false, todo: Don't show all options by default.
      value: undefined
    };
  }

  componentDidMount() {
    const {getLatestTerms} = this.props;
    getLatestTerms();
  }

  select: ElementRef<*>;
  handleChange = (newValue: any, actionMeta: any) => {
    if (newValue !== null) {
      this.props.setTerm(newValue.label);
      this.props.history.push("/term/" + newValue.label);
    }
    this.setState({value: newValue});
  };
  handleCreate = (inputValue: string) => {
    this.setState({isLoading: true});
    console.log("Option created");
    console.log("Wait a moment...");
    setTimeout(() => {
      const {options} = this.state;
      const newOption = createOption(inputValue);
      console.log(newOption);
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption
      });
    }, 1000);
  };
  handleFocus = element => {
    if (this.state.value) {
      console.log(this.state.value.label);
      this.select.state.inputValue = this.state.value.label;
    }
  };
  handleInputChange = (query, {action}) => {
    if (action === "input-change") {
      this.setState({openMenu: true});
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
    }
  };

  render() {
    const {
      isLoading,
      // openMenu,
      options,
      value
    } = this.state;

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
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            onMenuClose={this.handleMenuClose}
            onFocus={this.handleFocus}
            onInputChange={this.handleInputChange}
            onInputKeyDown={this.onInputKeyDown}
            options={options}
            styles={styles}
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
