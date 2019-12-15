import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import SearchBar from "./SearchBar";

import {selectTab} from "../actions";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
}));

export default function HeaderBar() {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="headerBar flexDisplayRowAlign" style={{marginLeft: 20}}>
      <div
        onClick={() => {
          dispatch(selectTab("home"));
          history.push("/");
        }}
        style={{cursor: "pointer"}}
      >
        <div style={{fontSize: 21}}>背中文</div>
        <div>Memorize Chinese creatively</div>
      </div>
      <SearchBar />

      <div style={{marginLeft: "auto", marginRight: 20}}>
        {login === true && (
          <div
            className="flexDisplayRowAlign"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "auto",
              marginRight: 20
            }}
            onClick={() => dispatch(selectTab("profile"))}
          >
            <Avatar className={classes.avatar}>H</Avatar>
            <div style={{marginLeft: 10}}>SCORE</div>
          </div>
        )}
        {login === false && (
          <div className="flexDisplayRowAlign">
            <Link href="/login">Log in</Link>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/signup"
            >
              Try free
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
