import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import PropTypes from 'prop-types';

import {
  getSuggestions,
  postSuggestion,
  deleteSuggestion,
  setOriginalSuggestion,
  setSuggestionContent,
  toggleEdit,
  toggleSuggestionVisibilty
} from "../actions";

const timeConverter = UNIX_timestamp => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  // var hour = a.getHours();
  // var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  // var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
  var time = date + " " + month + " " + year;
  return time;
};

export default function Content(props) {
  const edit = useSelector(state => state.edit);
  const originalSuggestion = useSelector(state => state.originalSuggestion);
  const suggestions = useSelector(state => state.suggestions);
  const suggestionContent = useSelector(state => state.suggestionContent);
  const suggestionVisible = useSelector(state => state.suggestionVisible);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState("");

  // const history = useHistory();
  // history.listen(location => {
  //   const pathname = location.pathname;
  //   if (pathname.includes("term") && suggestions.length === 0) {
  //     dispatch(getSuggestions(pathname.substring(1).split("/")[1]));
  //   }
  // });

  const handleClickOpen = content => {
    setContentToDelete(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delSuggestion = () => {
    dispatch(deleteSuggestion(props.term, contentToDelete));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getSuggestions(props.term));
  }, []);

  const styles = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 0,
    "&:lastChild": {
      paddingBottom: 0
    }
  };

  return (
    <div
      className="contentColumn"
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          paddingLeft: 100,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 30
        }}
      >
        {props.term}
      </div>
      {!suggestionVisible && (
        <Button
          variant="contained"
          color="primary"
          style={{
            alignSelf: "flex-start",
            margin: 5
          }}
          display="none"
          disabled={suggestions
            .map(suggestion => suggestion.email)
            .includes(user.email)}
          onClick={() => {
            toggleEdit(false);
            dispatch(toggleSuggestionVisibilty());
          }}
        >
          Add a suggestion
        </Button>
      )}
      {suggestionVisible && user.email && (
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Add a suggestion"
            multiline
            rows="4"
            defaultValue={suggestionContent}
            placeholder="How will you memorize this term?"
            variant="outlined"
            style={{marginTop: 5, display: "flex"}}
            onChange={event => {
              dispatch(setSuggestionContent(event.target.value));
            }}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex"}}>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  originalSuggestion === suggestionContent ||
                  suggestionContent.length > 10000
                }
                style={{alignSelf: "flex-start", margin: 5}}
                onClick={() => {
                  dispatch(
                    postSuggestion(
                      edit,
                      props.term,
                      suggestionContent,
                      user.email,
                      user.familyName,
                      user.givenName
                    )
                  );
                }}
              >
                Submit
              </Button>
              {suggestionContent.length > 10000 && (
                <p style={{color: "red"}}>Max 10000 characters.</p>
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{alignSelf: "flex-start", margin: 5}}
              onClick={() => {
                dispatch(toggleEdit(false));
                dispatch(setOriginalSuggestion(""));
                dispatch(setSuggestionContent(""));
                dispatch(toggleSuggestionVisibilty());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {suggestionVisible && !user.email && (
        <div>
          <p style={{marginLeft: 10}}>
            To add a suggestion, <Link href="/login">log in</Link> or{" "}
            <Link href="/signup">sign up</Link>.
          </p>
          <Button
            variant="contained"
            color="primary"
            style={{alignSelf: "flex-start", margin: 10}}
            onClick={() => {
              dispatch(toggleSuggestionVisibilty());
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={delSuggestion} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {suggestions.map((suggestion, i) => {
        return (
          <Card style={{margin: 5}} key={i}>
            <CardContent style={styles}>
              <div>{suggestion.content}</div>
              <div style={{display: "flex", alignItems: "center"}}>
                <p>
                  {suggestion.givenName} {suggestion.familyName}
                  {", "}
                  {timeConverter(suggestion.createdAt)}
                </p>
                {suggestion.email === user.email && (
                  <div style={{display: "flex", alignItems: "center"}}>
                    <IconButton
                      variant="contained"
                      onClick={() => {
                        dispatch(toggleEdit(true));
                        dispatch(setOriginalSuggestion(suggestion.content));
                        dispatch(setSuggestionContent(suggestion.content));
                        dispatch(toggleSuggestionVisibilty());
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      onClick={e => handleClickOpen(suggestion.content)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
      {suggestions.length === 0 && !suggestionVisible && (
        <p style={{marginLeft: 5}}>No suggestions yet. Add the first one!</p>
      )}
    </div>
  );
}
