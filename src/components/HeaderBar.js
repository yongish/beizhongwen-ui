import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import setFieldData from 'final-form-set-field-data';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import '../styles/HeaderBar.css';

// const onSubmit = async values => {
//   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//   await sleep(300);
//   window.alert(JSON.stringify(values, 0, 2));
// };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
};

const validate = values => {
  const errors = {};
  if (!values.search) {
    errors.search = 'Required';
  }
  // todo: Validate that input is only Chinese characters.
  return errors;
};

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});
const classes = useStyles;

class HeaderBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flexDisplayRow' style={{marginTop: 20, marginLeft: 20, border: '1px solid black'}}>
        <div>
          <div>背中文</div>
          <div>Memorize Chinese creatively</div>
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{ }}
          validate={validate}
          render={({ handleSubmit, form, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="search">
                <span className="fa fa-search"></span>
                <Field name="search" component="input" type="text" placeholder="Search for words" />
              </div>
            </form>
          )}
        />

        <Link to="/profile" className='flexDisplayRowAlign' style={{ textDecoration: "none", color: "black", marginLeft: 'auto', marginRight: 20 }}>
          <Avatar className={classes.avatar}>H</Avatar>
          <div style={{ marginLeft: 10 }}>SCORE</div>
        </Link>
        
      </div>
    );
  }
}

export default HeaderBar;
