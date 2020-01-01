import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {GoogleLogout} from "react-google-login";

import {logout} from "../actions";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Settings() {
  const provider = useSelector(state => state.user.provider);
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      {provider === "google" && (
        <GoogleLogout
          clientId="962985476906-csuu6ls66lbh7s4n8pce07sid6m1obh3.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => dispatch(logout())}
        />
      )}
      {provider !== "google" && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            dispatch(logout());
            if (window.FB) {
              window.FB.logout();
            }
          }}
        >
          Log out
        </Button>
      )}
    </div>
  );
}
