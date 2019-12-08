import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Row = ({index, style}) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Rowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww {index}
  </div>
);

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid yellow'
  }
}));

export default function Content() {
  const classes = useStyles();

  return (
    <div className={[classes.root, "contentColumn"].join(" ")}>
      <AutoSizer>
        {({height, width}) => (
          <List
            className="List"
            height={height}
            itemCount={100}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
