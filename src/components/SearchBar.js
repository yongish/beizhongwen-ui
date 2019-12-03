import React, {Component} from "react";
import Select, {components} from "react-select";
import SearchIcon from "@material-ui/icons/Search";
import Creatable from "react-select/creatable";

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

const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three")
];
const sampleWords = ["一见钟情", "一无所知", "脚踏实地", "奶酪", "踊跃"];
const influencers = [
  {value: "abc", label: "abc"},
  {value: "def", label: "def"}
];

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

export default class SearchBar extends Component<*, State> {
  constructor() {
    super();
    this.handleInfluencerName = this.handleInfluencerName.bind(this);
  }

  state = {
    isLoading: false,
    options: defaultOptions,
    value: undefined
  };
  select: ElementRef<*>;
  handleChange = (newValue: any, actionMeta: any) => {
    this.setState({value: newValue});
  };
  handleCreate = (inputValue: any) => {
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
  handleMenuClose = () => {
    console.log(this.select);
    this.select.blur();
  };

  handleInfluencerName(event) {
    console.log(event);
  }

  render() {
    const {isLoading, options, value} = this.state;

    return (
      <div>
        <div>
          <Creatable
            ref={ref => {
              this.select = ref;
            }}
            isClearable
            blurInputOnSelect={true}
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            onMenuClose={this.handleMenuClose}
            onFocus={this.handleFocus}
            options={options}
            value={value}
            isMulti={false}
            isSearchable={true}
            components={{DropdownIndicator, ValueContainer}}
            classNamePrefix="search"
            styles={styles}
          />
        </div>
      </div>
    );
  }
}
