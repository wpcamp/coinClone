import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AccountDetails from "./components/AccountDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Asset from "./components/Asset/Asset";
import Watchlist from "./components/Watchlist";
import HomeNotLogged from "./components/Home/HomeNotLogged";
import HomeLoggedIn from "./components/Home/HomeLogged";
import Footer from "./components/Footer";
import SignUpPage from "./components/SignupFormPage";
import TopCoins from "./components/AllAssets/TopCoins";
import RouteChangeTracker from "./components/RouteChangeTracker";
import ReactGA from 'react-ga';



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  const TRACKING_ID = "UA-288680528-1"; 
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search); 

  ReactGA.event({
    category: 'User',
    action: 'Created an Account'
  });



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <RouteChangeTracker />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser && <HomeLoggedIn />  }
            {!sessionUser && <HomeNotLogged />}
          </Route>
          <ProtectedRoute exact path='/watchlist'>
            <Watchlist />
          </ProtectedRoute>
          <ProtectedRoute exact path='/assets'>
            <TopCoins/>
          </ProtectedRoute>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <ProtectedRoute exact path='/account'>
            <AccountDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/assets/:cryptoSymbol'>
            <Asset />
          </ProtectedRoute>
          <Route>
            <h1>Page does not exist</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
