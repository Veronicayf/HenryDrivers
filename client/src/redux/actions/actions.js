import axios from "axios";
import {
  URL_API,
  GET_DRIVERS,
  GET_ID,
  GET_TEAMS,
  // POST_DRIVER,
  RESET_DETAIL,
  SORT_BY_AGE,
  SORT_BY_SURNAME,
  FILTER_BY_DATA,
  FILTER_BY_TEAMS,
  SEARCH_NAME,
  SEARCH_TEAM,
  SET_PAGE,
  RESET_AUX,
} from "./actionsTypes";

export const setPage = (numPage) => {
  return { type: SET_PAGE, payload: numPage };
};

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_API}/drivers`);
      return dispatch({ type: GET_DRIVERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/drivers/${id}`);
      console.log(data);
      return dispatch({ type: GET_ID, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/teams`);
      return dispatch({ type: GET_TEAMS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDriver = async (newDriver) => {
  try {
    await axios.post(`${URL_API}/drivers`, newDriver);
    window.alert("Driver created");
    await getDrivers();
    return true;
  } catch (error) {
    window.alert(error?.response?.data?.error);
  }
};

// export const postDriver = (newDriver) => {
//   return async (dispatch) => {
//     try {
//       await axios.post(`${URL_API}/drivers`, newDriver);
//       window.alert("Driver created");
//       dispatch(getDrivers()); 
//       dispatch({ type: POST_DRIVER, payload: newDriver });
//       return true;
//     } catch (error) {
//       window.alert(error?.response?.data?.error);
//     }
//   };
// };

// export const postDriver = (newDriver) => {
//   return async (dispatch) => {
//     try {
//       await axios.post(`${URL_API}/drivers`, newDriver);
//       window.alert("Driver created");
//       dispatch(getDrivers());
//       dispatch({ type: POST_DRIVER, payload: newDriver });
//       return true;
//     } catch (error) {
//       console.error("Error creating driver:", error);
//       window.alert(error?.response?.data?.error);
//     }
//   };
// };

export const resetDetail = () => {
  return { type: RESET_DETAIL, payload: [] };
};
export const resetAux = () => {
  return { type: RESET_AUX, payload: [] };
};
export const sortByAge = (order) => {
  return { type: SORT_BY_AGE, payload: order };
};

export const sortBySurname = (order) => {
  return { type: SORT_BY_SURNAME, payload: order };
};

export const filterByData = (filter) => {
  return { type: FILTER_BY_DATA, payload: filter };
};

export const filterByTeams = (team) => {
  return { type: FILTER_BY_TEAMS, payload: team };
};
export const searchTeam = (teamName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/teams/?name=${teamName}`);
      return dispatch({ type: SEARCH_TEAM, payload: data });
    } catch (error) {
      alert("Team not found. Try again please");
      console.log(error);
    }
  };
};

export const searchName = (surname) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/drivers/?name=${surname}`);
      return dispatch({ type: SEARCH_NAME, payload: data });
    } catch (error) {
      alert("Driver not found. Try again please");
      console.log(error);
    }
  };
};
