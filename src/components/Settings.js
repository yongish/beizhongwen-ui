import React from "react";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import {logout} from "../actions";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log out
      </Button>
    </div>
  );
}
