import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);

export default function Content() {
  return (
    <div className='contentColumn flexGrowOne'>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={1000}
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
