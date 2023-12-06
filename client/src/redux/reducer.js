import { GET_DRIVERS,
  GET_ID,
  GET_TEAMS,
  POST_DRIVER,
  RESET_DETAIL,
  SORT_BY_AGE,
  SORT_BY_SURNAME,
  FILTER_BY_DATA,
  FILTER_BY_TEAM,
  SEARCH_NAME, 
  SET_PAGE,
  RESET_AUX,} from "./actions/actionsTypes";
const initialState = {
  allDrivers: [],
  filteredByData: [],
  copy: [],
  allTeams: [],
  detail: [],
  aux: [],
  page: 1,
  filteredByTeam: [],
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: payload,
      };
    case SET_PAGE:
      return { ...state, page: payload };
    case GET_ID:
      return {
        ...state,
        detail: payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case RESET_AUX:
      return {
        ...state,
        aux: payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: payload,
      };
    case SORT_BY_AGE:{
      const arr = state.aux.length > 0 ? state.aux : state.allDrivers;
      const orderDob = arr.slice().sort((a, b) => {
        const yearA = parseInt(a.birthday.substring(0, 4));
        const yearB = parseInt(b.birthday.substring(0, 4));

        if (payload === "asc") {
          return yearA - yearB;
        } else if (payload === "desc") {
          return yearB - yearA;
        }

        return 0;
      });

      return {
        ...state,
        aux: orderDob,
      }}

    case SORT_BY_SURNAME:{
      const array = state.aux.length > 0 ? state.aux : state.allDrivers;
      const order = array.slice().sort((a, b) => {
        const surnameA = a.name?.surname || a.surname || "";
        const surnameB = b.name?.surname || b.surname || "";

        if (payload === "asc") {
          return surnameA.localeCompare(surnameB);
        } else if (payload === "desc") {
          return surnameB.localeCompare(surnameA);
        }
        return 0;
      });

      console.log(order);
      return {
        ...state,
        aux: order,
      }}

    case FILTER_BY_DATA:
      {let filteredData = [];
      if (payload === "DataBase") {
        if (state.copy.length === 0) {
          filteredData = state.allDrivers.filter(
            (driver) => typeof driver.id !== "number"
        
          );
        } else {
          filteredData = state.copy.filter(
            (driver) => typeof driver.id !== "number"
          );
          if (filteredData.length === 0) {
            return state;
          } else return { ...state, aux: filteredData };
        }
      } else if (payload === "Api") {
        console.log(state.copy);
        if (state.copy.length === 0) {
          filteredData = state.allDrivers.filter(
            (driver) => typeof driver.id === "number"
          );
        } else {
          filteredData = state.copy.filter(
            (driver) => typeof driver.id === "number"
          );
          if (filteredData.length === 0) {
            return state;
          } else return { ...state, aux: filteredData };
        }
      } else if (payload === "All") {
        if (state.copy.length === 0) {
          filteredData = state.allDrivers;
        } else {
          filteredData = state.copy;
          return { ...state, aux: filteredData };
        }
      }
      return { ...state, filteredByData: filteredData };
}


    case FILTER_BY_TEAM:

      if (state.aux.length === 0 && state.filteredByData.length === 0) { 
        const filterTeam = state.allDrivers.filter((driver) => {
          if (driver.teamName) {
            return driver.teamName?.includes(payload);
          } else if (driver.Teams) {
            return driver?.Teams?.map((team) => team.teamName).join(", ").includes(payload);
          }
        });

        state.copy = filterTeam;
        return { ...state, aux: filterTeam };

      } else if (state.filteredByData.length === 0) {
        const filterTeam = state.allDrivers.filter((driver) => { 
          if (driver.teamName) {
            return driver.teamName?.includes(payload);
          } else if (driver.Teams) {
            return driver?.Teams?.map((team) => team.teamName).join(", ").includes(payload);
          }
        });

        if (filterTeam.length === 0) {
          return state;
        }
        state.copy = filterTeam;
        return { ...state, aux: filterTeam };
      }else {

        const filterTeam = state.filteredByData.filter((driver) => {
          if (driver.teamName) {
            return driver.teamName?.includes(payload);
          } else if (driver.Teams) {
            return driver?.Teams?.map((team) => team.teamName).join(", ").includes(payload);
          }
        });
        if (filterTeam.length === 0) {
          return state;
        }
        state.copy = filterTeam;
        return { ...state, aux: filterTeam };
        
      }

    case SEARCH_NAME:
      return {
        ...state,
        aux: payload,
      };
    case POST_DRIVER:{
      const newDriver = payload;
      const updateDrivers = [...state.allDrivers, newDriver]
      return { 
        ...state, 
        updateDrivers };}
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
