import React, { PureComponent } from 'react';

class NavigationColumn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{border: '1px solid black'}} className='navigationColumn flexDisplayColumn'>
        <ul>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default NavigationColumn;
