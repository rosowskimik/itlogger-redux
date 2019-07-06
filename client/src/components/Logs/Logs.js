import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const Logs = ({ loading, logs, search, getLogs }) => {
  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (loading || logs === null) return <Preloader />;

  if (search.length > 0) {
    return (
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {search.map(log => (
          <LogItem key={log._id} log={log} />
        ))}
      </ul>
    );
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map(log => <LogItem key={log._id} log={log} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  logs: PropTypes.array,
  search: PropTypes.array,
  loading: PropTypes.bool,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = ({ log: { logs, loading, search } }) => ({
  logs,
  loading,
  search
});

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
