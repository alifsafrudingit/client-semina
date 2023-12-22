import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  role: "",
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORGANIZERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.events,
      };

    default:
      return state;
  }
}
