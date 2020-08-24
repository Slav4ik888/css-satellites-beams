import pt, {arrayOf} from 'prop-types';
import {rangeType} from './const';


export const coordsType = {
  lat: pt.number.isRequired,
  lng: pt.number.isRequired,
};
export const satType = {
  id: pt.string.isRequired,
  name: pt.string.isRequired,
  range: pt.oneOf([rangeType.KA, rangeType.KU]).isRequired,
  coordsSat: pt.shape(coordsType).isRequired,
  coordsBeam: pt.shape(coordsType).isRequired,
  beams: pt.object.isRequired,
};


export const offerPropTypes = {
  id: pt.number.isRequired,
  isPremium: pt.bool.isRequired,
  isFavorite: pt.bool.isRequired,
  previewImage: pt.string.isRequired,
  pictures: arrayOf(pt.string),
  amenities: arrayOf(pt.string),
  bedrooms: pt.number.isRequired,
  maxGuestsNumber: pt.number.isRequired,
  description: pt.string.isRequired,
  host: pt.object.isRequired,
  price: pt.number.isRequired,
  rating: pt.number.isRequired,
  cardTitle: pt.string.isRequired,
  offerType: pt.string.isRequired,
  coordinates: pt.array.isRequired,
  city: pt.object.isRequired,
  location: pt.object.isRequired,
};

export const reviewsPropTypes = {
  id: pt.number.isRequired,
  user: pt.shape({
    avatarUrl: pt.string,
    id: pt.number,
    isPro: pt.bool,
    name: pt.string,
  }).isRequired,
  comment: pt.string.isRequired,
  date: pt.number.isRequired,
  rating: pt.number.isRequired,
};
