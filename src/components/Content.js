import React, {useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
// import PropTypes from 'prop-types';
import {VariableSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {setChecked} from "../actions";

const GUTTER_SIZE = 5;

export default function Content() {
  const checked = useSelector(state => state.checked);
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
        脚踏实地
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{alignSelf: "flex-start", margin: 5}}
      >
        Add a suggestion
      </Button>

      <TextField
        id="outlined-multiline-static"
        label="Suggestion"
        multiline
        rows="4"
        defaultValue="Default Value"
        variant="outlined"
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
        >
          Cancel
        </Button>
      </div>

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
