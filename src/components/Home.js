import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class Home extends PureComponent {
  render() {
    return (
      <div className='homeColumn flexDisplayColumn' style={{ border: '1px solid black' }}>
        <h2 style={{ marginLeft: 20 }}>Top Words</h2>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="full-width contained primary button group"
          style={{ marginLeft: 'auto', marginRight: 20 }}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default Home;
