import React, {Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//import Users from "./user/pages/users";
// import NewPlace from "./places/pages/new-place";
// import UpdatePlace from "./places/pages/update-place";
// import UserPlaces from "./places/pages/user-places";
//import Auth from "./user/pages/auth";
import MainNavigation from "./shared/components/navigation/main-navigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/ui-elements/loading-spinner";

const Users = React.lazy(() => import("./user/pages/users"));
const NewPlace = React.lazy(() => import("./places/pages/new-place"));
const UpdatePlace = React.lazy(() => import("./places/pages/update-place"));
const UserPlaces = React.lazy(() => import("./places/pages/user-places"));
const Auth = React.lazy(() => import("./user/pages/auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
