import React, { PureComponent } from 'react';
import About from './About';
import Content from './Content';
import HeaderBar from './HeaderBar';
import Home from './Home';
import NavigationColumn from './NavigationColumn';
import Related from './Related';
import '../styles/App.css';
import '../styles/_home.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // state


      <div className='flexGrowOne flexDisplayColumn' >
        <HeaderBar/>
        <div className='flexGrowOne flexDisplayRow'>
          <NavigationColumn />
          {this.props.isQuestion &&
            <div>
              <Content />
              <Related />
            </div>
          }
          {this.props.isHome && <Home />}
          {this.props.isAbout && <About />}
        </div>
      </div>
    );
  }
}

export default App;
