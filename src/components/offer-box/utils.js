import {allOffers} from '../../utils/offers';

// Отбираем только те оферы, спутники которых находятся в sats
export const selectOffers = (sats) => {
  let arr = [];

  sats.forEach((sat) => {
    let resFiltred = allOffers.filter((offer) => offer.sats.find((s) => s === sat));
    if (resFiltred) {
      arr.push(...resFiltred);
    }
  });

  let result = new Set();
  arr.forEach((of) => result.add(of));
  return [...result];
};