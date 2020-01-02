import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import useWindowDimensions from "./UseWindowDimensions";

import {selectTab, setTerm} from "../actions";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  avatar: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    cursor: "pointer"
  }
}));

export default function HeaderBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {width} = useWindowDimensions();

  return (
    <div
      className="headerBar flexDisplayRowAlign"
      style={{
        marginLeft: width <= 640 ? 5 : 20,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div className="titleAndSearch">
        <div
          onClick={() => {
            history.push("/");
            dispatch(selectTab("home"));
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "left"
          }}
        >
          <div style={{fontSize: width < 767 ? 15 : 21}}>背中文</div>
          <div style={{fontSize: width < 767 ? 12 : 16}}>
            Memorize creatively
          </div>
        </div>
        <SearchBar />
      </div>

      <div>
        {user.email && (
          <div
            className="flexDisplayRowAlign"
            style={{
              textDecoration: "none",
              color: "black"
            }}
            onClick={() => {
              history.push("/");
              dispatch(selectTab("profile"));
            }}
          >
            <Avatar className={classes.avatar}>{user.givenName[0]}</Avatar>
            {/*<div style={{marginLeft: 10}}>SCORE</div>*/}
          </div>
        )}
        {!user.email && (
          <div className="flexDisplayRowAlign">
            <Link
              href="/login"
              onClick={() => dispatch(setTerm(""))}
              style={{paddingLeft: 5}}
            >
              Log in
            </Link>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/signup"
              onClick={() => dispatch(setTerm(""))}
            >
              Try free
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
