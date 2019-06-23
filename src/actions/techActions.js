import {
  SET_LOADING,
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const getTechs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/techs');
    const data = await res.json();
    dispatch({ type: GET_TECHS, payload: data });
  } catch (err) {
    console.error(err.response.statusText);
    dispatch({ type: TECHS_ERROR, payload: err.response.statusText });
  }
};

export const addTech = tech => async dispatch => {};

export const deleteTech = id => async dispatch => {};
