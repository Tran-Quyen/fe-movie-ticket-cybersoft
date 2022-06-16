import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../Components/NavigationHomeTemplate";
import MobileHeader from "../Components/Home/Mobile/mobile-header";

const HomeLayout = props => {
  return (
    <div>
      <Navbar />
      <MobileHeader />
      {props.children}
    </div>
  );
};
export default function HomeTemplate({ Component, component, ...props }) {
  return (
    <Route
      {...props}
      render={propsComponent => (
        <HomeLayout>
          <Component {...propsComponent} />
        </HomeLayout>
      )}
    />
  );
}
