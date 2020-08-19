import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import {Provider} from 'react-redux';

import App from './components/App/app.jsx';

// import reducer from './reducers/reducer.js';

// const store = createStore(
//     reducer,
//     compose(
//         // withExtraArgument применяем чтобы можно было передать 3й аргумент api
//         // потому что thunk принимает только 2 аргумента
//         applyMiddleware(thunk.withExtraArgument(api)),
//         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
//     )
// );

// store.dispatch(DataOperation.loadOffers());
// store.dispatch(UserOperation.checkAuth());


ReactDOM.render(
    // <Provider store={store}>
    <App />
    // </Provider>
    , document.getElementById(`root`));
