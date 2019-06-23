import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateLog, clearCurrent } from '../../actions/logActions';

import TechSelectOption from '../techs/TechSelectOption';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setTech(current.tech);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = e => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message' });
      setMessage('');
      setTech('');
      setAttention(false);
    } else {
      const updLog = {
        message,
        tech,
        attention,
        date: new Date(),
        id: current.id
      };
      updateLog(updLog);
      M.toast({ html: 'Log Updated' });

      setMessage('');
      setTech('');
      setAttention(false);
    }
    clearCurrent();
  };

  return (
    <div id='edit-log-modal' className='modal modal-fixed-footer add-log-modal'>
      <div className='modal-content'>
        <h4 className='center'>Update System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              id='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='validate'
              placeholder='Log Message'
              required
            />
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

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateToProps,
  { updateLog, clearCurrent }
)(EditLogModal);
