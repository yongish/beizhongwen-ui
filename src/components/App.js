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

import "../styles/App.css";
import "../styles/_home.scss";

export default function App() {
  const tab = useSelector(state => state.tab);
  return (
    <div className="flexGrowOne flexDisplayRow">
      <BlankLeft />
      <div className="flexGrowOne flexDisplayColumn">
        <HeaderBar />
        <div className="flexGrowOne flexDisplayRow">
          <NavigationColumn />
          {tab === "term" && (
            <div className="flexGrowOne flexDisplayRow">
              <Content />
              <Related />
            </div>
          )}
          {tab === "about" && <About />}
          {tab === "home" && (
            <div className="flexGrowOne flexDisplayRow">
              <Home />
              <HomeRight />
            </div>
          )}
          {tab === "profile" && <Profile />}
        </div>
      </div>
      <BlankRight />
    </div>
  );
}
