// import {createSelector} from 'reselect';
import {NameSpace} from '../name-space.js';


const NAME_SPACE = NameSpace.SEARCH;


export const getActivePointerCoords = (state) => {
  return state[NAME_SPACE].activePointerCoords;
};

export const getActiveSatellite = (state) => {
  return state[NAME_SPACE].activeSatellite;
};

export const getCheckedSats = (state) => {
  return state[NAME_SPACE].checkedSats;
};

// export const getIdFromMatch = (_, props) => {
//   if (props.match.params.id) {
//     return +props.match.params.id;
//   }
//   return null;
// };


// export const getOfferFromRouteId = createSelector(
//     getAllOffers,
//     getIdFromMatch,
//     (allOffers, id) => {
//       // console.log('id: ', id);
//       // console.log('allOffers: ', allOffers);
//       let result = -1;
//       if (allOffers) {
//         cities.forEach((city) => {
//           if (allOffers[city]) {
//             let res = allOffers[city].find((offer) => offer.id === id);
//             if (res) {
//               result = res;
//             }
//           }
//         });
//         return result;
//       } else {
//         return result;
//       }
//     }
// );
