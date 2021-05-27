import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { AppRoute } from '../../utils/const.js';
import { history } from '../../history.js';
// Components
import Main from '../main/main';




const App = () => {

  return (
    <>
      <Router history={history}>
        <Switch>

          <Route exact path={AppRoute.ROOT} component={Main}/>
          <Route exact path={AppRoute.EDIT}>
            <Main edit />
          </Route>

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


export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);

