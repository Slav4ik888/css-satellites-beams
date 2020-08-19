import {extend} from '../../utils/utils.js';
import {cities} from '../../utils/const.js';
import {adapterCitiesData, adapterCommentsData, adapterNearbyData} from '../../utils/adapters.js';


const initialState = {
  allOffers: {}, // Полученные данные по hotels
  favorites: {}, // Загруженные с сервера фаворитные оферы выбранные пользователем
  comments: [], // Полученные комментарии по отелю
  nearbyOffers: [], // Полученные 3 предложения неподалёку
  review: { // Отзыв на отправку
    comment: ``,
    rating: null,
  },
  isError: false, // Если не удалось отправить отзыв
  isLoading: false,
};


const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_NEARBY: `LOAD_NEARBY`,

  LOAD_FAVORITES: `LOAD_FAVORITES`,
  TOGGLE_FAV: `TOGGLE_FAV`,

  SET_IS_LOADING: `SET_IS_LOADING`,
  SET_REVIEW: `SET_REVIEW`,
  IS_ERROR: `IS_ERROR`,
};

const ActionCreator = {
  loadOffers: (allOffers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: allOffers,
    };
  },
  loadComments: (reviews) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: reviews,
    };
  },
  loadNearbyOffers: (nearbyOffers) => {
    return {
      type: ActionType.LOAD_NEARBY,
      payload: nearbyOffers,
    };
  },
  setReview: (review) => {
    return {
      type: ActionType.SET_REVIEW,
      payload: review,
    };
  },
  setIsError: (status) => {
    return {
      type: ActionType.IS_ERROR,
      payload: status,
    };
  },
  toggleFavorite: (offer) => {
    return {
      type: ActionType.TOGGLE_FAV,
      payload: offer,
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
  },
  setIsLoading: (status) => {
    return {
      type: ActionType.SET_IS_LOADING,
      payload: status,
    };
  },
};

// Operation это асинхронный ActionCreator
const Operation = {

  loadOffers: () => (dispatch, getState, api) => {
    // console.log('loadOffers: ');

    dispatch(ActionCreator.setIsLoading(true));

    return api.get(`/hotels`)
      .then((res) => {
        dispatch(ActionCreator.loadOffers(adapterCitiesData(res.data)));
        // Сразу загрузим favorites
        dispatch(Operation.loadFavorites());
        dispatch(ActionCreator.setIsLoading(false));
      })
      .catch(() => {
        dispatch(ActionCreator.setIsLoading(false));
        // console.log(`/hotels NON`);
      });
  },

  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((res) => {
        // console.log(`COMMENTS res.data: `, res.data);
        // console.log('adapterComments: ', adapterCommentsData(res.data));
        dispatch(ActionCreator.loadComments(adapterCommentsData(res.data)));
      });
  },

  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((res) => {
        // console.log(`NEARBY res.data: `, res.data);
        // console.log('adapterNearby: ', adapterNearbyData(res.data));
        dispatch(ActionCreator.loadNearbyOffers(adapterNearbyData(res.data)));
      });
  },

  saveReview: (id, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoading(true));
    return api.post(`/comments/${id}`, {
      comment: review.comment,
      rating: review.rating,
    })
      .then(() => {
        // console.log('SAVE: ', res);
        dispatch(ActionCreator.setIsLoading(false));
        dispatch(ActionCreator.setReview({
          comment: ``,
          rating: null,
        }));
      })
      .catch(() => {
        dispatch(ActionCreator.setReview(review));
        dispatch(ActionCreator.setIsLoading(false));
        dispatch(ActionCreator.setIsError(true));
        // console.log(`Не удалось отправить отзыв, попытайтесь повторить через некоторое время`, err);
        setTimeout(() => dispatch(ActionCreator.setIsError(false)), 5000);
      });
  },

  toggleFavorite: (offer) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offer.id}/${+!offer.isFavorite}`)
      .then(() => {
        // console.log('TOGGLE OPER: ');
        // dispatch(Operation.loadFavorites());
        dispatch(ActionCreator.toggleFavorite(offer));
        // return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((res) => {
        dispatch(ActionCreator.loadFavorites(adapterCitiesData(res.data)));
        // console.log('GET favorites: ', adapterCitiesData(res.data));
      })
      .catch((err) => {
        throw err;
      });
  },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.LOAD_NEARBY:
      return extend(state, {
        nearbyOffers: action.payload,
      });

    case ActionType.IS_ERROR:
      return extend(state, {
        isError: action.payload,
      });

    case ActionType.SET_REVIEW:
      return extend(state, {
        review: action.payload,
      });

    case ActionType.TOGGLE_FAV:
      const city = action.payload.city.name;
      const id = action.payload.id;
      // Находим индекс оффера по id в массиве данного города
      let index = state.allOffers[city].findIndex((item) => item.id === id);
      let newAllOffers = state.allOffers;
      newAllOffers[city][index].isFavorite = !newAllOffers[city][index].isFavorite;

      // Проверяем есть ли такой фаворит, если да то удаляем его
      let favorites = state.favorites;

      if (favorites[city]) {
        let result = favorites[city].findIndex((offer) => (
          offer.id === id
        ));
        // console.log('result: ', result);
        if (result !== -1) {
          // console.log(`Есть такой, удаляем`, favorites[city][result]);
          favorites[city].splice(result, 1);
        } else {
          // console.log(`Нет такого, добавляем`, newAllOffers[city][index]);
          favorites[city].push(newAllOffers[city][index]);
        }
      } else {
        // console.log(`Нет такого, добавляем (создаём город)`, newAllOffers[city][index]);
        favorites[city] = [];
        favorites[city].push(newAllOffers[city][index]);
      }

      return extend(state, {
        allOffers: newAllOffers,
        favorites,
      });


    case ActionType.LOAD_FAVORITES:
      // allOffers наполним данными о favorites
      const allOffersWithFavorites = state.allOffers;
      const favs = action.payload;
      // eslint-disable-next-line no-shadow
      cities.forEach((city) => {
        if (allOffersWithFavorites[city]) {
          allOffersWithFavorites[city].forEach((offer) => {
            if (favs[city]) {
              favs[city].forEach((fav) => {
                if (fav.id === offer.id) {
                  offer.isFavorite = true;
                }
              });
            }
          });
        }
      });
      // console.log(`Загрузили FAVORIT`);
      return Object.assign({}, state, {
        allOffers: allOffersWithFavorites,
        favorites: action.payload,
      });


    case ActionType.SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionCreator, ActionType};
