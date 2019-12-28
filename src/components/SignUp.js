import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {dontMatch, failPasswordRequirements} from "../common/Utils";
import Copyright from "./Copyright";
import SocialLogin from "./SocialLogin";

import {
  confirm,
  signup,
  setEmail,
  setFirstName,
  setLastName,
  setPassword
} from "../actions";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "lightgray"
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
    background: "white",
    padding: 20,
    borderRadius: 25,
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const password = useSelector(state => state.password);
  const newUser = useSelector(state => state.newUser);
  const term = useSelector(state => state.term);
  const dispatch = useDispatch();
  const history = useHistory();

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  };

  const validateForm = () =>
    firstName.length === 0 ||
    lastName.length === 0 ||
    email.length < 5 ||
    dontMatch(password, confirmPassword) ||
    failPasswordRequirements(password);

  const renderConfirmationForm = () => {
    return (
      <Container component="confirmationCode" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form>
            <h3>Confirmation Code</h3>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmation"
              label=""
              name="confirmation"
              onChange={e => setConfirmationCode(e.target.value)}
            />
            <div>Please check your email for the code.</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validateConfirmationForm()}
              onClick={event => {
                event.preventDefault();
                dispatch(
                  confirm(email, password, confirmationCode, history, term)
                );
              }}
            >
              Verify
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  };
  const renderForm = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <SocialLogin />
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    defaultValue={firstName}
                    onChange={e => dispatch(setFirstName(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    defaultValue={lastName}
                    onChange={e => dispatch(setLastName(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={email}
                    onChange={event => dispatch(setEmail(event.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={event =>
                      dispatch(setPassword(event.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={event => setConfirmPassword(event.target.value)}
                  />
                </Grid>
              </Grid>
              {dontMatch(password, confirmPassword)}
              {failPasswordRequirements(password)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={validateForm()}
                className={classes.submit}
                onClick={event => {
                  event.preventDefault();
                  dispatch(signup(firstName, lastName, email, password));
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Go back to Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  };

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
