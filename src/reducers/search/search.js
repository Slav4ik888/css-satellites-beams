import {extend} from '../../utils/utils.js';
import {SATELLITES} from '../../utils/const';


const initialState = {
  activePointerCoords: {lat: 53.59778, lng: 103.29639},
  activeSatellite: SATELLITES[0],
};

const ActionType = {
  SET_ACTIVE_POINTER_COORDS: `SET_ACTIVE_POINTER_COORDS`,
  SET_ACTIVE_SATELLITE: `SET_ACTIVE_SATELLITE`,
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
  }
  return state;
};

export {reducer, ActionCreator, ActionType};
