import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Link from "@material-ui/core/Link";

import {selectTab} from "../actions";

// todo: Clicking on Home and About should trigger actions.
export default function NavigationColumn() {
  const tab = useSelector(state => state.tab);
  const dispatch = useDispatch();
  return (
    <div style={{padding: 20}} className="navigationColumn flexDisplayColumn">
      <Link
        onClick={() => dispatch(selectTab("home"))}
        className={tab === "home" ? "tileSelectedMarker" : ""}
        style={{padding: 10, cursor: "pointer"}}
      >
        Home
      </Link>
      <Link
        onClick={() => dispatch(selectTab("about"))}
        className={tab === "about" ? "tileSelectedMarker" : ""}
        style={{padding: 10, cursor: "pointer"}}
      >
        About
      </Link>
    </div>
  );
}
