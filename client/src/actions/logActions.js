import {
  SET_LOADING,
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  LOGS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_SEARCH
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/api/logs');
    const data = await res.json();
    dispatch({ type: GET_LOGS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch({ type: ADD_LOG, payload: data });
  } catch (err) {
    console.error(err);
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

export const updateLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/api/logs/${log._id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch({ type: UPDATE_LOG, payload: data });
  } catch (err) {
    console.error(err);
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

export const searchLogs = text => dispatch => {
  console.log(text);
  if (text === '') {
    dispatch({ type: CLEAR_SEARCH });
  } else {
    const regexp = new RegExp(text, 'gi');
    dispatch({ type: SEARCH_LOGS, payload: regexp });
  }
};

export const deleteLog = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/api/logs/${id}`, {
      method: 'DELETE'
    });
    dispatch({ type: DELETE_LOG, payload: id });
  } catch (err) {
    console.error(err);
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};
