import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";

import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Destination from "./Components/Destination/Destination";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const userContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <userContext.Provider value={[logInUser, setLogInUser]}>
      <div className="App">
        <Router>
          <Nav></Nav>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/destination/:typeId">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
