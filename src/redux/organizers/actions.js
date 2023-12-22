import {
  ERROR_FETCHING_ORGANIZERS,
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchOrganizers = debounce(getData, 1000);

export const startFetchingOrganizers = () => {
  return {
    type: START_FETCHING_ORGANIZERS,
  };
};

export const successFetchingOrganizers = ({ organizers }) => {
  return {
    type: SUCCESS_FETCHING_ORGANIZERS,
    organizers,
  };
};

export const errorFetchingOrganizers = () => {
  return {
    type: ERROR_FETCHING_ORGANIZERS,
  };
};

export const fetchOrganizers = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingOrganizers());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchOrganizers("/cms/users");
      console.log("res");
      console.log(res);
      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? "";
        res.talentName = res?.talent?.name ?? "-";
      });

      dispatch(
        successFetchingOrganizers({
          events: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrganizers());
    }
  };
};
