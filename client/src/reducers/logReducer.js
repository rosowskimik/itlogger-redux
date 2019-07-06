import {
  SET_LOADING,
  GET_LOGS,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  LOGS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_SEARCH
} from '../actions/types';

const initalState = {
  logs: null,
  search: [],
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
          action.payload._id === log._id ? action.payload : log
        ),
        loading: false
      };
    case SEARCH_LOGS:
      return {
        ...state,
        search: state.logs.filter(
          log =>
            log.message.match(action.payload) || log.tech.match(action.payload)
        )
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: []
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => action.payload !== log._id),
        loading: false
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
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
