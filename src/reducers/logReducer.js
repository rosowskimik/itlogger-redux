import {
  SET_LOADING,
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  LOGS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

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
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          action.payload.id === log.id ? action.payload : log
        ),
        loading: false
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => action.payload !== log.id),
        loading: false
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
