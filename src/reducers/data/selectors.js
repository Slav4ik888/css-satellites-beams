import {createSelector} from 'reselect';

import {NameSpace} from '../name-space.js';
import {cities} from '../../utils/const.js';


const NAME_SPACE = NameSpace.DATA;


export const getAllOffers = (state) => {
  return state[NAME_SPACE].allOffers;
};


export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};


export const getNearbyOffers = (state) => {
  return state[NAME_SPACE].nearbyOffers;
};


export const getIsLoading = (state) => {
  return state[NAME_SPACE].isLoading;
};


export const getReview = (state) => {
  return state[NAME_SPACE].review;
};


export const getIsError = (state) => {
  return state[NAME_SPACE].isError;
};


export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};


export const getIsFavoritesEmpty = (state) => {
  const fav = state[NAME_SPACE].favorites;
  let result = true;

  cities.forEach((city) => {
    if (fav[city]) {
      if (fav[city].length) {
        result = false;
        return true;
      }
    }
    return false;
  });

  return result;
};


export const getIdFromMatch = (_, props) => {
  if (props.match.params.id) {
    return +props.match.params.id;
  }
  return null;
};


export const getOfferFromRouteId = createSelector(
    getAllOffers,
    getIdFromMatch,
    (allOffers, id) => {
      // console.log('id: ', id);
      // console.log('allOffers: ', allOffers);
      let result = -1;
      if (allOffers) {
        cities.forEach((city) => {
          if (allOffers[city]) {
            let res = allOffers[city].find((offer) => offer.id === id);
            if (res) {
              result = res;
            }
          }
        });
        return result;
      } else {
        return result;
      }
    }
);
