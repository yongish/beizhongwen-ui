import React, { PureComponent } from 'react';

class Content extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{border: '1px solid black'}} className='contentColumn flexDisplayColumn'>
      </div>
    );
  }
}

export default Content;
