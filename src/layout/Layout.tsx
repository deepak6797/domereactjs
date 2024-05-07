import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../constant/path";
import Main from "./Main";
import SideBar from "../components/sidebar/SideBar";
import Header from "../components/header/Header";
import Package from "../pages/packages/package";
import AddPackage from "../pages/packages/addPackage";
import Continent from "../pages/location/Continent";
import Country from "../pages/location/Country";
import TourTypes from "../pages/attributes/TourTypes";
import Accommodations from "../pages/attributes/Accommodations";
import AgeRange from "../pages/attributes/AgeRange";
import Activities from "../pages/attributes/Activities";
import Transports from "../pages/attributes/Transports";
import Booking from "../pages/booking/booking";
import Enquiry from "../pages/enquiry/enquiry";
import Meals from "../pages/attributes/Meals";
import UpdatePackage from "../pages/packages/UpdatePackage";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Main>
            <Routes>
              <Route path={PATH.package} element={<Package />} />
              <Route path={PATH.addPackage} element={<AddPackage />} />
              <Route path={`${PATH.updatePackage}/:id`} element={<UpdatePackage />} />
              <Route path={PATH.continent} element={<Continent />} />
              <Route path={PATH.country} element={<Country />} />
              <Route path={PATH.tourType} element={<TourTypes />} />
              <Route path={PATH.accommodations} element={<Accommodations />} />
              <Route path={PATH.ageRange} element={<AgeRange />} />
              <Route path={PATH.activities} element={<Activities />} />
              <Route path={PATH.transport} element={<Transports />} />
              <Route path={PATH.booking} element={<Booking />} />
              <Route path={PATH.enquiry} element={<Enquiry />} />
              <Route path={PATH.meals} element={<Meals />} />
            </Routes>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
