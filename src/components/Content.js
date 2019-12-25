import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import PropTypes from 'prop-types';
import {VariableSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  getSuggestions,
  postSuggestion,
  setChecked,
  setOriginalSuggestion,
  setSuggestionContent,
  toggleEdit,
  toggleSuggestionVisibilty
} from "../actions";

const GUTTER_SIZE = 5;

const timeConverter = UNIX_timestamp => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

export default function Content(props) {
  const checked = useSelector(state => state.checked);
  const edit = useSelector(state => state.edit);
  const originalSuggestion = useSelector(state => state.originalSuggestion);
  const suggestions = useSelector(state => state.suggestions);
  const suggestionContent = useSelector(state => state.suggestionContent);
  const suggestionVisible = useSelector(state => state.suggestionVisible);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [suggestionHeights, setSuggestionHeights] = useState({});
  const listRef = useRef(null);
  const suggestionsRef = useRef([]);

  useEffect(() => {
    dispatch(getSuggestions(props.term));
  }, []);
  useEffect(() => {
    setSuggestionHeights(suggestionsRef.current);
  });
  // useEffect(() => {
  //   setSuggestionHeights(suggestionsRef.current.clientHeight);
  // }, []);

  const [rowSizes, setRowSizes] = useState(
    new Array(50).fill(true).reduce((acc, item, i) => {
      acc[i] = 120;
      return acc;
    }, {})
  );

  const toggleSize = i => {
    dispatch(setChecked(i));
    rowSizes[i] =
      rowSizes[i] === 120 ? suggestionsRef.current[i].clientHeight + 88 : 120;
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
          <div ref={e => (suggestionsRef.current[index] = e)}>
            {suggestions[index].content}
          </div>
        </Collapse>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{display: "flex", alignItems: "center"}}>
            <p>
              {suggestions[index].givenName} {suggestions[index].familyName}
              {", "}
              {timeConverter(suggestions[index].createdAt)}
            </p>
            {suggestions[index].userId === user.userId && (
              <IconButton
                variant="contained"
                onClick={() => {
                  dispatch(toggleEdit(true));
                  dispatch(setOriginalSuggestion(suggestions[index].content));
                  dispatch(setSuggestionContent(suggestions[index].content));
                  dispatch(toggleSuggestionVisibilty());
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
          {suggestionsRef.current[index] &&
            suggestionsRef.current[index].clientHeight > 42 && (
              <IconButton
                variant="contained"
                onClick={() => {
                  toggleSize(index);
                }}
              >
                {(!checked[index] || checked[index] === false) && (
                  <ExpandMoreIcon fontSize="large" />
                )}
                {checked[index] && checked[index] === true && (
                  <ExpandLessIcon fontSize="large" />
                )}
              </IconButton>
            )}
        </div>
      </CardContent>
    </Card>
  );

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
      {suggestionVisible && user.userId && (
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Add a suggestion"
            multiline
            rows="4"
            defaultValue={suggestionContent}
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
              disabled={originalSuggestion === suggestionContent}
              style={{alignSelf: "flex-start", margin: 5}}
              onClick={() => {
                dispatch(
                  postSuggestion(
                    edit,
                    props.term,
                    suggestionContent,
                    user.userId,
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
                dispatch(toggleEdit(false));
                dispatch(setOriginalSuggestion(""));
                dispatch(setSuggestionContent(""));
                dispatch(toggleSuggestionVisibilty());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {suggestionVisible && !user.userId && (
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
