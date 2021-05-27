// import {createSelector} from 'reselect';
import { NameSpace } from '../name-space.js';

const NAME_SPACE = NameSpace.SEARCH;

export const getActivePointerCoords   = (state) => state[NAME_SPACE].activePointerCoords;
export const getActiveSatId           = (state) => state[NAME_SPACE].activeSatId;
export const getCheckedSats           = (state) => state[NAME_SPACE].checkedSats;
export const getCheckedSat            = (state) => state[NAME_SPACE].checkedSat;
export const getIsMap                 = (state) => state[NAME_SPACE].isMap;
export const getGeo                   = (state) => state[NAME_SPACE].geo;
export const getAllResultSats         = (state) => state[NAME_SPACE].allResultSats;
export const getSelectConditionOffers = (state) => state[NAME_SPACE].selectConditionOffers;


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
