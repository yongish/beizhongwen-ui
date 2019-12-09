import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import {VariableSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Answer from "./Answer";

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
      acc[i] = 50;
      return acc;
    }, {})
  );

  const toggleSize = i => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(i);
    }
    const newRowSizes = rowSizes;
    newRowSizes[i] = rowSizes[i] === 50 ? 75 : 50;
    setRowSizes(newRowSizes);
    return 200;
  };

  const getSize = i => {
    return rowSizes[i];
  };
  // const ref = useRef(null);
  // const Row = ({index, style}) => <Answer index={index} style={style} />;

  // const getItemSize = i => {
  //   if (i in checked) {
  //     if (checked[i]) {
  //       console.log(i);
  //       console.log(checked[i]);
  //       if (ref.current) {
  //         ref.current.resetAfterIndex(i);
  //       }
  //       return 200;
  //     } else {
  //       console.log(i);
  //       console.log(checked[i]);
  //       if (ref.current) {
  //         ref.current.resetAfterIndex(i);
  //       }
  //       return 100;
  //     }
  //   }
  //   console.log(i);
  //   console.log(checked[i]);
  //   if (ref.current) {
  //     ref.current.resetAfterIndex(i);
  //   }
  //   return 100;
  // };
  // const toggleSize = i => {
  // console.log("AAAAAAAAAAAAAAAAAA");
  // if (listRef.current) {
  //   listRef.current.resetAfterIndex(i);
  // }
  // this.setState(prevState => ({
  //   rowSizes: {
  //     ...prevState.rowSizes,
  //     [i]: prevState.rowSizes[i] === 50 ? 75 : 50
  //   }
  // }));
  // return 100;
  // };

  const Row = ({index, style}) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      Row {index}, Size {style.height}{" "}
      <Button
        onClick={() => {
          toggleSize(index);
        }}
      >
        Toggle Size
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
