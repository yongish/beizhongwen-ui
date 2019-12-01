import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  count: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
}));

// todo: Use this component after MVP release.

export default function HomeWord() {
  return (
    <div className={classes.root}>
      <div className={classes.count}>
        <div>1</div>
        <div>vote</div>
      </div>
      <div className={classes.count}>
        <div>2</div>
        <div>entries</div>
      </div>
      <div className={classes.count}>
        <div>29</div>
        <div>views</div>
      </div>
    </div>
  );
}
