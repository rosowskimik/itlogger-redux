import { SET_LOADING, GET_LOGS, ADD_LOG, LOGS_ERROR } from './types';

export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/logs');
    const data = await res.json();
    dispatch({ type: GET_LOGS, payload: data });
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: LOGS_ERROR, payload: err.response.data });
  }
};

export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch({ type: ADD_LOG, payload: data });
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: LOGS_ERROR, payload: err.response.data });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
