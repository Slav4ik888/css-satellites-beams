import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {createAPI} from '../../api.js';
import {offers} from '../../mocks/offers.js';
import {testOffer} from '../../mocks/test-offer.js';
// import {cities} from '../utils/const.js';

const api = createAPI(() => {});

const mockReview = {
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4
};

const mockComments = [
  {
    id: 1,
    author: {
      photo: `img/avatar-angelina.jpg`,
      name: `Strange jober`
    },
    description: `small dining area and two bedrooms – couples and groups of friends will find this accommodation`,
    date: 1593095836000,
    rating: 3
  },
  {
    id: 2,
    author: {
      photo: ``,
      name: `Slava`
    },
    description: `dining area and five bedrooms – couples and groups of friends will find this accommodation`,
    date: 1593095936000,
    rating: 4.7
  },
];

const mockWithOutFavorite = {
  Paris: [
    {
      id: 1,
      isPremium: true,
      isFavorite: false,
      previewImage: `img/apartment-03.jpg`,
      pictures: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/room.jpg`,
        `img/studio-01.jpg`,
        `img/studio-photos.jpg`,
      ],
      amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
      bedrooms: 4,
      maxGuestsNumber: 5,
      description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
      Please note that this apartment is on the sixth floor and there is no lift (elevator).
      The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
      host: {
        photo: `img/avatar-angelina.jpg`,
        name: `Angelina Jonson`,
        super: true
      },
      price: 180,
      rating: 5,
      cardTitle: `Beautiful & luxurious apartment at great location`,
      offerType: `House`,
      coordinates: [48.856663, 2.351556],
      city: {
        zoom: 8,
        coordinates: [48.856663, 2.351556],
      },
      location: {
        zoom: 8,
      },
    },
    {
      id: 2,
      isPremium: true,
      isFavorite: false,
      previewImage: `img/apartment-03.jpg`,
      pictures: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/room.jpg`,
        `img/studio-01.jpg`,
        `img/studio-photos.jpg`,
      ],
      amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
      bedrooms: 4,
      maxGuestsNumber: 5,
      description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
      Please note that this apartment is on the sixth floor and there is no lift (elevator).
      The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
      host: {
        photo: `img/avatar-angelina.jpg`,
        name: `Angelina Jonson`,
        super: true
      },
      price: 180,
      rating: 5,
      cardTitle: `Beautiful & luxurious apartment at great location`,
      offerType: `House`,
      coordinates: [48.856663, 2.351556],
      city: {
        zoom: 8,
        coordinates: [48.856663, 2.351556],
      },
      location: {
        zoom: 8,
      },
    },
  ]
};

const mockFavorite = {
  Paris: [
    {
      id: 1,
      isPremium: true,
      isFavorite: true,
      previewImage: `img/apartment-03.jpg`,
      pictures: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/room.jpg`,
        `img/studio-01.jpg`,
        `img/studio-photos.jpg`,
      ],
      amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
      bedrooms: 4,
      maxGuestsNumber: 5,
      description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
      Please note that this apartment is on the sixth floor and there is no lift (elevator).
      The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
      host: {
        photo: `img/avatar-angelina.jpg`,
        name: `Angelina Jonson`,
        super: true
      },
      price: 180,
      rating: 5,
      cardTitle: `Beautiful & luxurious apartment at great location`,
      offerType: `House`,
      coordinates: [48.856663, 2.351556],
      city: {
        zoom: 8,
        coordinates: [48.856663, 2.351556],
      },
      location: {
        zoom: 8,
      },
    },
  ]
};

const mockWithFavorite = {
  Paris: [
    {
      id: 1,
      isPremium: true,
      isFavorite: true,
      previewImage: `img/apartment-03.jpg`,
      pictures: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/room.jpg`,
        `img/studio-01.jpg`,
        `img/studio-photos.jpg`,
      ],
      amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
      bedrooms: 4,
      maxGuestsNumber: 5,
      description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
      Please note that this apartment is on the sixth floor and there is no lift (elevator).
      The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
      host: {
        photo: `img/avatar-angelina.jpg`,
        name: `Angelina Jonson`,
        super: true
      },
      price: 180,
      rating: 5,
      cardTitle: `Beautiful & luxurious apartment at great location`,
      offerType: `House`,
      coordinates: [48.856663, 2.351556],
      city: {
        zoom: 8,
        coordinates: [48.856663, 2.351556],
      },
      location: {
        zoom: 8,
      },
    },
    {
      id: 2,
      isPremium: true,
      isFavorite: false,
      previewImage: `img/apartment-03.jpg`,
      pictures: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/room.jpg`,
        `img/studio-01.jpg`,
        `img/studio-photos.jpg`,
      ],
      amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
      bedrooms: 4,
      maxGuestsNumber: 5,
      description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
      Please note that this apartment is on the sixth floor and there is no lift (elevator).
      The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
      host: {
        photo: `img/avatar-angelina.jpg`,
        name: `Angelina Jonson`,
        super: true
      },
      price: 180,
      rating: 5,
      cardTitle: `Beautiful & luxurious apartment at great location`,
      offerType: `House`,
      coordinates: [48.856663, 2.351556],
      city: {
        zoom: 8,
        coordinates: [48.856663, 2.351556],
      },
      location: {
        zoom: 8,
      },
    },
  ]
};


describe(`DATA Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      allOffers: {},
      favorites: {},
      comments: [],
      nearbyOffers: [],
      review: {
        comment: ``,
        rating: null,
      },
      isError: false,
      isLoading: false,
    });
  });

  it(`Reducer LOAD_OFFERS by get from DB`, () => {
    expect(reducer({
      allOffers: {},
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      allOffers: offers,
    });
  });

  it(`Reducer LOAD_COMMENTS by get from DB`, () => {
    expect(reducer({
      comments: [],
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: mockComments,
    })).toEqual({
      comments: mockComments,
    });
  });

  it(`Reducer LOAD_NEARBY by get from DB`, () => {
    expect(reducer({
      nearbyOffers: [],
    }, {
      type: ActionType.LOAD_NEARBY,
      payload: offers.Paris,
    })).toEqual({
      nearbyOffers: offers.Paris,
    });
  });

  it(`Reducer LOAD_FAVORITES by get from DB`, () => {
    expect(reducer({
      allOffers: mockWithOutFavorite,
      favorites: {},
    }, {
      type: ActionType.LOAD_FAVORITES,
      payload: mockFavorite,
    })).toEqual({
      allOffers: mockWithFavorite,
      favorites: mockFavorite,
    });
  });

  it(`Reducer SET_IS_LOADING`, () => {
    expect(reducer({
      isLoading: false,
    }, {
      type: ActionType.SET_IS_LOADING,
      payload: true,
    })).toEqual({
      isLoading: true,
    });
  });

  it(`Reducer IS_ERROR`, () => {
    expect(reducer({
      isError: false,
    }, {
      type: ActionType.IS_ERROR,
      payload: true,
    })).toEqual({
      isError: true,
    });
  });
});


describe(`Action creators work correctly`, () => {
  it(`loadOffers`, () => {
    expect(ActionCreator.loadOffers(mockWithFavorite)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: mockWithFavorite,
    });
  });

  it(`loadComments`, () => {
    expect(ActionCreator.loadComments(mockComments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: mockComments,
    });
  });

  it(`loadNearbyOffers`, () => {
    expect(ActionCreator.loadNearbyOffers(mockWithFavorite)).toEqual({
      type: ActionType.LOAD_NEARBY,
      payload: mockWithFavorite,
    });
  });

  it(`setReview`, () => {
    expect(ActionCreator.setReview(mockReview)).toEqual({
      type: ActionType.SET_REVIEW,
      payload: mockReview,
    });
  });

  it(`setIsError`, () => {
    expect(ActionCreator.setIsError(true)).toEqual({
      type: ActionType.IS_ERROR,
      payload: true,
    });
  });

  it(`toggleFavorite`, () => {
    expect(ActionCreator.toggleFavorite(testOffer)).toEqual({
      type: ActionType.TOGGLE_FAV,
      payload: testOffer,
    });
  });

  it(`loadFavorites`, () => {
    expect(ActionCreator.loadFavorites(mockFavorite)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: mockFavorite,
    });
  });

  it(`setIsLoading`, () => {
    expect(ActionCreator.setIsLoading(true)).toEqual({
      type: ActionType.SET_IS_LOADING,
      payload: true,
    });
  });
});


describe(`DATA Operation work correctly`, () => {

  it(`loadOffers work correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`) // Чтобы мок на запрос `/hotels`
      .reply(200, [{fake: true}]); // вернул ответ 200 и массив таких данных [{fake: true}]

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2); // Проверяем, что dispatch был вызван
        expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
          type: ActionType.SET_IS_LOADING,
          payload: true,
        });
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_IS_LOADING,
          payload: true,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_IS_LOADING,
          payload: false,
        });

        // expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
        //   type: ActionType.LOAD_OFFERS,
        //   payload: [{fake: true}],
        // });
      });
  });
});

// npm test data.test.js
