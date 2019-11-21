import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Field} from "react-final-form";
import {Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

import {selectTab} from "../actions";

import "../styles/HeaderBar.css";

// const onSubmit = async values => {
//   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//   await sleep(300);
//   window.alert(JSON.stringify(values, 0, 2));
// };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.search) {
    errors.search = "Required";
  }
  // todo: Validate that input is only Chinese characters.
  return errors;
};

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
  const classes = useStyles();

  return (
    <div
      className="flexDisplayRowAlign"
      style={{marginLeft: 20, border: "1px solid black"}}
    >
      <div>
        <div>背中文</div>
        <div>Memorize Chinese creatively</div>
      </div>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={validate}
        render={({handleSubmit, form, values}) => (
          <form onSubmit={handleSubmit}>
            <div className="search">
              <span className="fa fa-search"></span>
              <Field
                name="search"
                component="input"
                type="text"
                placeholder="Search for words"
              />
            </div>
          </form>
        )}
      />

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
