import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';

import App from './components/app/app';

import reducer from './reducers/reducer.js';


// const logger = createLogger({
//   collapsed: true,
// });


const store = createStore(
    reducer, applyMiddleware(thunk) //, logger)
);


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`));


// git add . && git commit -am "fix убрал logger" && git push origin master
