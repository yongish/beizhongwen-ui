import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
// import PropTypes from 'prop-types';
import {VariableSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  getSuggestions,
  setChecked,
  postSuggestion,
  setSuggestionContent,
  toggleSuggestionVisibilty
} from "../actions";

const GUTTER_SIZE = 5;

export default function Content(props) {
  const checked = useSelector(state => state.checked);
  const suggestions = useSelector(state => state.suggestions);
  const suggestionContent = useSelector(state => state.suggestionContent);
  const suggestionVisible = useSelector(state => state.suggestionVisible);
  const login = useSelector(state => state.login);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const listRef = useRef(null);

  const [rowSizes, setRowSizes] = useState(
    new Array(50).fill(true).reduce((acc, item, i) => {
      acc[i] = 120;
      return acc;
    }, {})
  );

  const toggleSize = i => {
    dispatch(setChecked(i));
    rowSizes[i] = rowSizes[i] === 120 ? 300 : 120;
    setRowSizes(rowSizes);
    if (listRef.current) {
      listRef.current.resetAfterIndex(i);
    }
  };

  const getSize = i => {
    return rowSizes[i];
  };

  const Row = ({index, style}) => (
    <Card
      style={{
        ...style,
        top: style.top + GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}
    >
      <CardContent>
        <Collapse in={checked[index]} collapsedHeight={"50px"} timeout={0}>
          <div>{suggestions[index].content}</div>
        </Collapse>
        <Button
          variant="contained"
          style={{marginTop: 5}}
          onClick={() => {
            toggleSize(index);
          }}
        >
          Toggle
        </Button>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    dispatch(getSuggestions(props.term));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 700px"
      }}
    >
      <div
        style={{
          paddingLeft: 100,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 30
        }}
      >
        {props.term}
      </div>
      {!suggestionVisible && (
        <Button
          variant="contained"
          color="primary"
          style={{
            alignSelf: "flex-start",
            margin: 5
          }}
          display="none"
          onClick={() => {
            dispatch(toggleSuggestionVisibilty());
          }}
        >
          Add a suggestion
        </Button>
      )}
      {suggestionVisible && login && (
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Add a suggestion"
            multiline
            rows="4"
            placeholder="How will you memorize this term?"
            variant="outlined"
            style={{marginTop: 5, display: "flex"}}
            onChange={event => {
              dispatch(setSuggestionContent(event.target.value));
            }}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button
              variant="contained"
              color="primary"
              style={{alignSelf: "flex-start", margin: 5}}
              onClick={() => {
                console.log(user);
                dispatch(
                  postSuggestion(
                    props.term,
                    suggestionContent,
                    user.familyName,
                    user.givenName
                  )
                );
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{alignSelf: "flex-start", margin: 5}}
              onClick={() => {
                dispatch(toggleSuggestionVisibilty());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {suggestionVisible && !login && (
        <div>
          <p style={{marginLeft: 10}}>
            To add a suggestion, <Link href="/login">log in</Link> or{" "}
            <Link href="/signup">sign up</Link>.
          </p>
          <Button
            variant="contained"
            color="primary"
            style={{alignSelf: "flex-start", margin: 10}}
            onClick={() => {
              dispatch(toggleSuggestionVisibilty());
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {suggestions.length > 0 && !suggestionVisible && (
        <div style={{flexGrow: 1}}>
          <AutoSizer>
            {({height, width}) => (
              <List
                ref={listRef}
                className="List"
                height={height}
                itemCount={suggestions.length}
                itemSize={getSize}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
      {suggestions.length === 0 && !suggestionVisible && (
        <p style={{marginLeft: 5}}>No suggestions yet. Add the first one!</p>
      )}
    </div>
  );
}
