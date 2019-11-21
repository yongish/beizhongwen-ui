import React from 'react';

// todo: Clicking on Home and About should trigger actions.
export default function NavigationColumn() {
  return (
    <div style={{border: '1px solid black', padding: 20}} className='navigationColumn flexDisplayColumn'>
      <div>Home</div>
      <div style={{marginTop: 10}}>About</div>
    </div>
  );
}
