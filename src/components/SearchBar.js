import React, {Component} from "react";
import Select, {components} from "react-select";
import SearchIcon from "@material-ui/icons/Search";

const validate = values => {
  const errors = {};
  if (!values.search) {
    errors.search = "Required";
  }
  // todo: Validate that input is only Chinese characters.
  return errors;
};

export default class SearchBar extends Component {
  constructor() {
    super();
    this.handleInfluencerName = this.handleInfluencerName.bind(this);
  }
  handleInfluencerName(event) {
    console.log(event);
  }
  render() {
    const sampleWords = ["一见钟情", "一无所知", "脚踏实地", "奶酪", "踊跃"];
    const influencers = [
      {value: "abc", label: "abc"},
      {value: "def", label: "def"}
    ];

    const ValueContainer = ({children, ...props}) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              <SearchIcon style={{position: "absolute", left: 6}} />
            )}
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

    return (
      <div>
        <div>
          <Select
            options={influencers}
            isMulti={false}
            onChange={this.handleInfluencerName}
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
