import {extend} from '../../utils/utils.js';
import {MAP_MARKER_MAIN_POSITION} from '../../utils/const';


const initialState = {
  activePointerCoords: MAP_MARKER_MAIN_POSITION, // Координаты курсора
  activeSatId: `1`, // Активный спутник, из которого светит луч
  checkedSats: [`1`], // Список id выбранных спутников
  allResultSats: [], // Все спутники подходящие для выбранных координат
  selectConditionOffers: false, // Условия показа offers
  isMap: false, // Факт открытия карт
  geo: ``, // Текст в поле "Место установки"
};

const ActionType = {
  SET_ACTIVE_POINTER_COORDS: `SET_ACTIVE_POINTER_COORDS`,
  SET_ACTIVE_SAT_ID: `SET_ACTIVE_SAT_ID`,
  SET_CHECKED_SAT: `SET_CHECKED_SAT`,
  REMOVE_CHECKED_SAT: `REMOVE_CHECKED_SAT`,
  SET_ALLRESULTSATS: `SET_ALLRESULTSATS`,
  SET_SELECT_CONDITION: `SET_SELECT_CONDITION`,
  SET_IS_MAP: `SET_IS_MAP`,
  SET_GEO: `SET_GEO`,
};

const ActionCreator = {
  setActivePointerCoords: (activeCoords) => ({
    type: ActionType.SET_ACTIVE_POINTER_COORDS,
    payload: activeCoords,
  }),
  setActiveSatId: (numOfSatellite) => ({
    type: ActionType.SET_ACTIVE_SAT_ID,
    payload: numOfSatellite,
  }),
  setCheckedSat: (idSat) => ({
    type: ActionType.SET_CHECKED_SAT,
    payload: idSat,
  }),
  setAllResultSats: (sats) => ({
    type: ActionType.SET_ALLRESULTSATS,
    payload: sats,
  }),
  setSelectConditionOffers: () => ({
    type: ActionType.SET_SELECT_CONDITION,
  }),
  removeCheckedSat: (idSat) => ({
    type: ActionType.REMOVE_CHECKED_SAT,
    payload: idSat,
  }),
  setIsMap: (status) => ({
    type: ActionType.SET_IS_MAP,
    payload: status,
  }),
  setGeo: (text) => ({
    type: ActionType.SET_GEO,
    payload: text,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_POINTER_COORDS:
      return extend(state, {
        activePointerCoords: action.payload,
      });

    case ActionType.SET_ACTIVE_SAT_ID:
      return extend(state, {
        activeSatId: action.payload,
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

    case ActionType.SET_ALLRESULTSATS:
      return extend(state, {
        allResultSats: action.payload,
      });

    case ActionType.SET_SELECT_CONDITION:
      return extend(state, {
        selectConditionOffers: !state.selectConditionOffers,
      });

    case ActionType.REMOVE_CHECKED_SAT:
      let removedCheckedSats = state.checkedSats.concat();
      const delIdx = removedCheckedSats.findIndex((id) => id === action.payload);
      return extend(state, {
        checkedSats: [...removedCheckedSats.slice(0, delIdx), ...removedCheckedSats.slice(delIdx + 1)],
      });

    case ActionType.SET_IS_MAP:
      return extend(state, {
        isMap: action.payload,
      });

    case ActionType.SET_GEO:
      return extend(state, {
        geo: action.payload,
      });

  }
  return state;
};

export {reducer, ActionCreator, ActionType};
