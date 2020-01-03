import React from "react";
import {useSelector} from "react-redux";
import ReactGA from "react-ga";

import About from "./About";
import Content from "./Content";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import BlankLeft from "./BlankLeft";
import BlankRight from "./BlankRight";
import NavigationColumn from "./NavigationColumn";
import Profile from "./Profile";

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

  ReactGA.initialize("UA-000000-01");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="flexGrowOne flexDisplayRow">
      <BlankLeft />
      <div className="flexDisplayColumn" style={{width: "100%"}}>
        <HeaderBar />
        <div className="mainTwo">
          <NavigationColumn />
          {(termExists || tab === "term") && (
            <div className="flexDisplayRow" style={{width: "100%"}}>
              <Content term={props.match.params.term} />
              {/*<Related />*/}
            </div>
          )}
          {!termExists && tab === "about" && <About />}
          {!termExists && tab === "home" && (
            <div className="flexDisplayRow flexGrowOne">
              <Home />
            </div>
          )}
          {!termExists && tab === "profile" && <Profile />}
        </div>
      </div>
      <BlankRight />
    </div>
  );
}
