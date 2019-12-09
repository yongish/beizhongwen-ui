import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import {VariableSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Answer from "./Answer";

import {setChecked} from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid yellow"
  }
}));

export default function Content() {
  const checked = useSelector(state => state.checked);
  const classes = useStyles();
  const dispatch = useDispatch();
  const listRef = useRef(null);

  const [rowSizes, setRowSizes] = useState(
    new Array(1000).fill(true).reduce((acc, item, i) => {
      acc[i] = 100;
      return acc;
    }, {})
  );

  const toggleSize = i => {
    dispatch(setChecked(i));
    const newRowSizes = rowSizes;
    newRowSizes[i] = rowSizes[i] === 100 ? 300 : 100;
    setRowSizes(newRowSizes);
    if (listRef.current) {
      listRef.current.resetAfterIndex(i);
    }
  };

  const getSize = i => {
    if (i in checked) {
      if (listRef.current) {
        listRef.current.resetAfterIndex(i);
      }
    }
    return rowSizes[i];
  };

  const Row = ({index, style}) => (
    <div style={{...style, border: "1px solid black"}}>
      <Collapse in={checked[index]} collapsedHeight={"50px"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        pharetra, lorem sit amet feugiat faucibus, ipsum lacus varius velit, nec
        commodo mauris nisl non neque. Sed at neque egestas, interdum leo eget,
        dictum dolor. Nam quis eleifend eros. Nulla id accumsan libero, et
        bibendum arcu. Nunc sed sollicitudin diam, eget euismod felis. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Morbi eget pellentesque lorem, a egestas mi. Nunc
        feugiat rutrum ultrices. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Donec ullamcorper vitae erat dictum pharetra. Morbi
        dictum vehicula tellus id consectetur. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Donec placerat
        euismod mi, vel gravida purus faucibus ac. Ut non volutpat metus, sed
        rhoncus nulla. Pellentesque ullamcorper nibh nisi, eget iaculis massa
        suscipit in. Maecenas quis hendrerit libero.
      </Collapse>
      <Button
        variant="contained"
        style={{marginLeft: 5, marginTop: 5}}
        onClick={() => {
          toggleSize(index);
        }}
      >
        Expand
      </Button>
    </div>
  );

  return (
    <div style={{display: "flex", flexDirection: "column", flex: "1 1 700px"}}>
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
