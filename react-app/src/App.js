import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AssetMarketDetails from "./components/Asset/AssetMarketDetails";
import AssetSelect from "./components/Asset/AssetSelect"
import AssetChart from "./components/Asset/AssetChart";
import CommentCard from "./components/Comment/CommentCard";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/assets/:cryptoSymbol'>
            <AssetSelect />
            <AssetMarketDetails />
            <AssetChart />
            <CommentCard />
          </Route>
          <Route>
            <h1>Page does not exist</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
