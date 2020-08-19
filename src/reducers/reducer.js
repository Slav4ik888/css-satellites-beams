import {combineReducers} from 'redux';
import {reducer as search} from './search/search.js';

import {NameSpace} from './name-space.js';


export default combineReducers({
  [NameSpace.SEARCH]: search,
});
