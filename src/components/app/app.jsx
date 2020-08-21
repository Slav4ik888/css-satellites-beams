import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
// import {connect} from 'react-redux';
import {history} from '../../history.js';

import pt from 'prop-types';

import Main from '../main/main';

// import {AppRoute} from '../../utils/const.js';


const App = () => {

  // if (isLoading) {
  //   return null;
  // }

  return (
    <>
      <Router history={history}>
        <Switch>

          <Route exact path="/" component={Main}/>

          {/* <Route exact path={AppRoute.SIGN_IN}
            render={() => {
              return (
                userStatus === AuthStatus.NO_AUTH ?
                  <SignIn
                    onSubmit={login}
                  /> :
                  <Redirect to={AppRoute.MAIN}/>
              );
            }}
          />

          <Route exact path={AppRoute.ROOM_ID} component={OfferDetails} />

          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => {
              if (!isFavoritesEmpty) {
                return <Favorites />;
              }
              return <FavoritesEmpty />;
            }}
          />
 */}
          <Route
            render={() => (
              <>
                <h1>
                  404.
                  <br />
                  <small>Page not found</small>
                </h1>
                <Redirect to="/" />
              </>
            )}
          />

        </Switch>
      </Router>
    </>
  );
};

App.propTypes = {
  title: pt.string,
};

// const mapStateToProps = (state) => ({
//   userStatus: getUserStatus(state),
//   isLoading: getIsLoading(state),
//   isFavoritesEmpty: getIsFavoritesEmpty(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   login(authData) {
//     dispatch(UserOperation.login(authData));
//     dispatch(DataOperation.loadOffers());
//   },
// });

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);

