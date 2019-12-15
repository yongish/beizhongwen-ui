import React, {useState, useRef} from "react";
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

import {setChecked, toggleSuggestionVisibilty} from "../actions";

const GUTTER_SIZE = 5;

export default function Content(props) {
  const checked = useSelector(state => state.checked);
  const suggestionVisible = useSelector(state => state.suggestionVisible);
  const login = useSelector(state => state.login);
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          pharetra, lorem sit amet feugiat faucibus, ipsum lacus varius velit,
          nec commodo mauris nisl non neque. Sed at neque egestas, interdum leo
          eget, dictum dolor. Nam quis eleifend eros. Nulla id accumsan libero,
          et bibendum arcu. Nunc sed sollicitudin diam, eget euismod felis.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Morbi eget pellentesque lorem, a egestas mi.
          Nunc feugiat rutrum ultrices. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec ullamcorper vitae erat dictum pharetra. Morbi
          dictum vehicula tellus id consectetur. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Donec placerat
          euismod mi, vel gravida purus faucibus ac. Ut non volutpat metus, sed
          rhoncus nulla. Pellentesque ullamcorper nibh nisi, eget iaculis massa
          suscipit in. Maecenas quis hendrerit libero.
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
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button
              variant="contained"
              color="primary"
              style={{alignSelf: "flex-start", margin: 5}}
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

      <div style={{flexGrow: 1}}>
        <AutoSizer>
          {({height, width}) => (
            <List
              ref={listRef}
              className="List"
              height={height}
              itemCount={50}
              itemSize={getSize}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
