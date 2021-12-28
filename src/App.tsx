import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/Common/NotFound";
import PrivateRoute from "./components/Common/PrivateRoute";
import AdminLayout from "./components/Layout/AdminLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
