import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagenotfound from "./pages/page-not-found.js";
import HomeTemplate from "./Template/HomeTemplate";
import AdminTemplate from "./Template/AdminTemplate";
import Admin from "./pages/Admin/admin.js";
import { routeHome, routeAdmin } from "./routes";
const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      //Duyệt mảng
      return <HomeTemplate key={index} {...item} Component={item.component} />;
    });
  }
};
const showMenuAdmin = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return <AdminTemplate key={index} {...item} Component={item.component} />;
    });
  }
};
function App() {
  return (
    <BrowserRouter basename="/FinalProjectFE33BT">
      <div>
        <Switch>
          {showMenuHome(routeHome)}
          {showMenuAdmin(routeAdmin)}
          <Route path="/admin" component={Admin} />
          <Route path="" component={Pagenotfound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
