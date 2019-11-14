import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import About from './About';
import Content from './Content';
import HeaderBar from './HeaderBar';
import Home from './Home';
import NavigationColumn from './NavigationColumn';
import Related from './Related';
import '../styles/App.css';
import '../styles/_home.scss';

// const mapStateToProps = state => {
//   return {
//     platform: state.platform
//   };
// };
const mapStateToProps = state => {
  return {
    tab: state.tab
  }
}

const mapDispatchToProps = dispatch => {
  return {

  };
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flexGrowOne flexDisplayColumn' >
        <HeaderBar/>
        <div className='flexGrowOne flexDisplayRow'>
          <NavigationColumn />
          {this.props.tab === 'question' &&
            <div>
              <Content />
              <Related />
            </div>
          }
          {this.props.tab === 'home' && <Home />}
          {this.props.tab === 'about' && <About />}
        </div>
      </div>
    );
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
