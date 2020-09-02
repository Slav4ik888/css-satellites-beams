import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';

import App from './components/app/app';

import reducer from './reducers/reducer.js';

// import {calcAngleGuidance, calcAzimut} from './utils/calculation';
// console.log('Солнечногорск: ', calcAngleGuidance(36, 37, 56.1851));
// console.log('calcAngleGuidance: ', calcAngleGuidance(140, 104.3071, 52.2736));
// console.log(`calcAzimut`, calcAzimut(140, 104.3071, 52.2736));


const logger = createLogger({
  collapsed: true,
});


const store = createStore(
    reducer, applyMiddleware(thunk, logger)
);


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`));
