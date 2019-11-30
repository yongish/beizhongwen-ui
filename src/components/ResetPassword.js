import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";

import Copyright from "./Copyright";

import {dontMatch, failPasswordRequirements} from "../common/Utils";
import {confirmReset, sendCode} from "../actions";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const codeSent = useSelector(state => state.codeSent);
  const resetConfirmed = useSelector(state => state.resetConfirmed);
  const dispatch = useDispatch();

  const validateForm = () =>
    confirmationCode.length === 0 ||
    dontMatch(password, confirmPassword) ||
    failPasswordRequirements(password);

  const renderRequestCodeForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              dispatch(sendCode(email));
            }}
          >
            Send confirmation
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  const renderConfirmationForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Check your email {email} for the confirmation code.
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmationCode"
            label="Confirmation Code"
            name="confirmationCode"
            autoFocus
            onChange={e => setConfirmationCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {dontMatch(password, confirmPassword)}
          {failPasswordRequirements(password)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={validateForm()}
            onClick={e => {
              e.preventDefault();
              dispatch(confirmReset(email, confirmationCode, password));
            }}
          >
            Send confirmation
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  const renderSuccessMessage = () => (
    <Container component="success" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        Your password has been reset.
        <Link href="/login">
          Click here to login with your new credentials.
        </Link>
      </div>
    </Container>
  );

  return (
    <div>
      {!codeSent
        ? renderRequestCodeForm()
        : !resetConfirmed
        ? renderConfirmationForm()
        : renderSuccessMessage()}
    </div>
  );
}
