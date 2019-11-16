import React, { PureComponent } from 'react';

class NavigationColumn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{border: '1px solid black', padding: 20}} className='navigationColumn flexDisplayColumn'>
        <div>Home</div>
        <div style={{marginTop: 10}}>About</div>
      </div>
    );
  }
}

export default NavigationColumn;
