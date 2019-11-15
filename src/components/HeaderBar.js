import React, { PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import setFieldData from 'final-form-set-field-data';

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

class HeaderBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flexDisplayRow' style={{border: '1px solid black'}}>
        <div style={{padding: 10}}>
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
        <div>
        </div>
      </div>
    );
  }
}

export default HeaderBar;
