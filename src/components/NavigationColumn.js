import React from "react";
import {useDispatch} from "react-redux";
import Link from "@material-ui/core/Link";

import {selectTab} from "../actions";

// todo: Clicking on Home and About should trigger actions.
export default function NavigationColumn() {
  const dispatch = useDispatch();
  return (
    <div
      style={{border: "1px solid black", padding: 20}}
      className="navigationColumn flexDisplayColumn"
    >
      <Link onClick={() => dispatch(selectTab("home"))}>Home</Link>
      <Link
        onClick={() => dispatch(selectTab("about"))}
        style={{marginTop: 10}}
      >
        About
      </Link>
    </div>
  );
}
