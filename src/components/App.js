import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import About from './About';
import Content from './Content';
import HeaderBar from './HeaderBar';
import Home from './Home';
import NavigationColumn from './NavigationColumn';
import Related from './Related';

import {
  selectTab
} from '../actions';

import '../styles/App.css';
import '../styles/_home.scss';

const mapStateToProps = state => {
  return {
    tab: state.tab
  }
}

const mapDispatchToProps = dispatch => ({
  selectTab: tab => dispatch(selectTab(tab))
})

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      tab
    } = this.props;
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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
