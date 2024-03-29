import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

import {setChecked, toggleAnswer} from "../actions";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Answer(props) {
  const classes = useStyles();
  const {index, style} = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const checked = useSelector(state => state.checked);

  return (
    <div style={{...style, border: "1px solid black"}} ref={ref}>
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
        style={{marginTop: 5}}
        onClick={e => {
          dispatch(setChecked(index));
        }}
      >
        Toggle
      </Button>
    </div>
  );
}
