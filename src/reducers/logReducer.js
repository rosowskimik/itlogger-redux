import { SET_LOADING, GET_LOGS, ADD_LOG, LOGS_ERROR } from '../actions/types';

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
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload]
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
