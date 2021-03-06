import React, { useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { addLog } from '../../actions/logActions';

import TechSelectOption from '../techs/TechSelectOption';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  const onSubmit = e => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
      setMessage('');
      setTech('');
      setAttention(false);
    } else {
      const newLog = {
        message,
        tech,
        attention,
        date: new Date()
      };
      addLog(newLog);

      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal modal-fixed-footer add-log-modal'>
      <div className='modal-content'>
        <h4 className='center'>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              id='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='validate'
              required
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
            <span className='helper-text' data-error='This field is required' />
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              value={tech}
              onChange={e => setTech(e.target.value)}
              className='validate browser-default'
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOption />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <label>
              <input
                type='checkbox'
                name='attention'
                checked={attention}
                onChange={e => setAttention(!attention)}
                className='filled-in'
              />
              <span>Needs attention</span>
            </label>
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

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLog }
)(AddLogModal);
