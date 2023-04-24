import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Help from "../screens/help/help";
import Booking from "../screens/boking/booking";
import Tracking from "../screens/tracking/tracking";
import Nav from "../screens/nav/nav";

const Router = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/booking" element={<Booking />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
      <Help />
    </div>
  );
};

export default Router;
