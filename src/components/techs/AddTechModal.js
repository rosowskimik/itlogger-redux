import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = e => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter first and last name' });
      setFirstName('');
      setLastName('');
    } else {
      const newTech = {
        firstName,
        lastName
      };
      addTech(newTech);

      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div
      id='add-tech-modal'
      className='modal modal-fixed-footer add-tech-modal'
    >
      <div className='modal-content'>
        <h4 className='center'>Add Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              id='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className='validate'
              required
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
            <span className='helper-text' data-error='This field is required' />
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              id='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className='validate'
              required
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
            <span className='helper-text' data-error='This field is required' />
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        {/*eslint-disable-next-line */}
        <a
          href='#'
          className='btn btn-flat blue white-text waves-effect modal-close'
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTech }
)(AddTechModal);
