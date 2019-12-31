import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";
import useWindowDimensions from "./UseWindowDimensions";

import {selectTab} from "../actions";

// todo: Clicking on Home and About should trigger actions.
export default function NavigationColumn() {
  const tab = useSelector(state => state.tab);
  const dispatch = useDispatch();
  const history = useHistory();
  const {width} = useWindowDimensions();
  return (
    <div
      style={{padding: width < 1150 ? 0 : 20}}
      className="navigationColumn flexDisplayColumn"
    >
      <Link
        onClick={() => {
          history.push("/");
          dispatch(selectTab("home"));
        }}
        className={tab === "home" ? "tileSelectedMarker" : ""}
        style={{padding: 10, cursor: "pointer"}}
      >
        Home
      </Link>
      <Link
        onClick={() => {
          history.push("/");
          dispatch(selectTab("about"));
        }}
        className={tab === "about" ? "tileSelectedMarker" : ""}
        style={{padding: 10, cursor: "pointer"}}
      >
        About
      </Link>
    </div>
  );
}
