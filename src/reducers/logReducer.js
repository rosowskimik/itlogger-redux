import { SET_LOADING, GET_LOGS, LOGS_ERROR } from '../actions/types';

const initalState = {
  logs: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
