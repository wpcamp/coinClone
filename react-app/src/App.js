import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AssetMarketDetails from "./components/Asset/AssetMarketDetails";
import AssetSelect from "./components/Asset/AssetSelect"
import AssetChart from "./components/Asset/AssetChart";
import CommentCard from "./components/Comment/CommentCard";
import AccountDetails from "./components/AccountDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AssetHeader from "./components/Asset/AssetHeader";
import Asset from "./components/Asset/Asset";
import HomeNotLogged from "./components/Home/HomeNotLogged";
import Sidebar from "./components/Sidebar";
import WatchlistCard from "./components/Watchlist/Watchlist";
import Watchlist from "./components/Watchlist";
import HomeLoggedIn from "./components/Home/HomeLogged";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/home">
            {sessionUser && <HomeLoggedIn />}
            {!sessionUser && <HomeNotLogged />}
          </Route>
          <ProtectedRoute exact path='/watchlist'>
            <Watchlist />
          </ProtectedRoute>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
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
    </>
  );
}

export default App;
