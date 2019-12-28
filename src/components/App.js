import React from "react";
import {useSelector} from "react-redux";

import About from "./About";
import Content from "./Content";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import HomeRight from "./HomeRight";
import BlankLeft from "./BlankLeft";
import BlankRight from "./BlankRight";
import NavigationColumn from "./NavigationColumn";
import Profile from "./Profile";
import Related from "./Related";

import {selectTab, setTerm} from "../actions";

import "../styles/App.css";
import "../styles/_home.scss";

export default function App(props) {
  const term = props.match.params.term;
  if (term && term.length > 0) {
    setTerm(term);
    selectTab("term");
  }
  const termExists = term && term.length > 0;
  const tab = useSelector(state => state.tab);
  // const tab = term && term.length > 0 ? "term" : selectorTab;
  // console.log(term);
  return (
    <div className="flexGrowOne flexDisplayRow">
      <BlankLeft />
      <div className="flexGrowOne flexDisplayColumn">
        <HeaderBar />
        <div className="flexGrowOne flexDisplayRow">
          <NavigationColumn />
          {(termExists || tab === "term") && (
            <div className="flexGrowOne flexDisplayRow">
              <Content term={props.match.params.term} />
              <Related />
            </div>
          )}
<<<<<<< Updated upstream
          {!termExists && tab === "about" && <About />}
          {!termExists && tab === "home" && (
=======
          {tab === "about" && <About />}
          {(!term || term.length === 0) && (
>>>>>>> Stashed changes
            <div className="flexGrowOne flexDisplayRow">
              <Home />
              <HomeRight />
            </div>
          )}
<<<<<<< Updated upstream
          {!termExists && tab === "profile" && <Profile />}
=======
          {(!term || term.length === 0) && <Profile />}
>>>>>>> Stashed changes
        </div>
      </div>
      <BlankRight />
    </div>
  );
}
