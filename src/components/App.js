import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import About from './About';
import Content from './Content';
import HeaderBar from './HeaderBar';
import Home from './Home';
import NavigationColumn from './NavigationColumn';
import Profile from './Profile';
import Related from './Related';

import '../styles/App.css';
import '../styles/_home.scss';

const mapStateToProps = state => {
  return {
    tab: state.tab
  }
}

export default function App() {
  const tab = useSelector(state => state.tab);
  return (
    <div className='flexGrowOne flexDisplayColumn' >
      <HeaderBar/>
      <div className='flexGrowOne flexDisplayRow'>
        <NavigationColumn />
        {tab === 'term' &&
          <div className='flexGrowOne flexDisplayRow'>
            <Content />
            <Related />
          </div>
        }
        {tab === 'about' && <About />}
        {tab === 'home' && <Home />}
        {tab === 'profile' && <Profile />}
      </div>
    </div>
  );
}
