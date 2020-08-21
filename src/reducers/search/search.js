import {extend} from '../../utils/utils.js';
import {SATELLITES} from '../../utils/const';


const initialState = {
  activePointerCoords: {lat: 53.59778, lng: 103.29639}, // Координаты курсора
  activeSatellite: SATELLITES[0], // Активный спутник, из которого светит луч
  checkedSats: [`1`, `3`], // Список id выбранных спутников
};

const ActionType = {
  SET_ACTIVE_POINTER_COORDS: `SET_ACTIVE_POINTER_COORDS`,
  SET_ACTIVE_SATELLITE: `SET_ACTIVE_SATELLITE`,
  SET_CHECKED_SAT: `SET_CHECKED_SAT`,
  REMOVE_CHECKED_SAT: `REMOVE_CHECKED_SAT`,
};

const ActionCreator = {
  setActivePointerCoords: (activeCoords) => ({
    type: ActionType.SET_ACTIVE_POINTER_COORDS,
    payload: activeCoords,
  }),
  setActiveSatellite: (numOfSatellite) => ({
    type: ActionType.SET_ACTIVE_SATELLITE,
    payload: numOfSatellite,
  }),
  setCheckedSats: (idSat) => ({
    type: ActionType.SET_CHECKED_SAT,
    payload: idSat,
  }),
  removeCheckedSats: (idSat) => ({
    type: ActionType.REMOVE_CHECKED_SAT,
    payload: idSat,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_POINTER_COORDS:
      return extend(state, {
        activePointerCoords: action.payload,
      });

    case ActionType.SET_ACTIVE_SATELLITE:
      return extend(state, {
        activeSatellite: action.payload,
      });

    case ActionType.SET_CHECKED_SAT:
      let settedCheckedSats = state.checkedSats.concat();
      const isDouble = settedCheckedSats.findIndex((id) => id === action.payload);
      if (isDouble === -1) { // Если уже есть такой, то не дублируем (это может быть если в initialState указан какой-нибудь спутник)
        settedCheckedSats.push(action.payload);
        return extend(state, {
          checkedSats: settedCheckedSats,
        });
      } else {
        return state;
      }

    case ActionType.REMOVE_CHECKED_SAT:
      let removedCheckedSats = state.checkedSats.concat();
      const delIdx = removedCheckedSats.findIndex((id) => id === action.payload);
      return extend(state, {
        checkedSats: [...removedCheckedSats.slice(0, delIdx), ...removedCheckedSats.slice(delIdx + 1)],
      });

  }
  return state;
};

export {reducer, ActionCreator, ActionType};
