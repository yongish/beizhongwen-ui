import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Answer from "./Answer";

const Row = ({index, style}) => <Answer index={index} style={style} />;

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid yellow"
  }
}));

export default function Content() {
  const classes = useStyles();

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
              className="List"
              height={height}
              itemCount={50}
              itemSize={100}
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
