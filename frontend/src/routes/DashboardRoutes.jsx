import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/ui/NavBar";
import { AdminUser } from "../pages/adminUser/AdminUser";
import { ApplicationScreen } from "../pages/application/ApplicationScreen";
import { DetailsOffert } from "../pages/deatilsOffert/DetailsOffert";
import HomeScreen from "../pages/HomeScreen";
import NotFound from "../pages/NotFound";
import { Offert } from "../pages/offert/Offert";
import { AdminRoute } from "./AdminRoute";
import { GenericRoute } from "./GenericRotue";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            path="offers"
            element={
              <GenericRoute>
                <Offert />
              </GenericRoute>
            }
          />
          <Route
            path="my-application"
            element={
              <GenericRoute>
                <ApplicationScreen />
              </GenericRoute>
            }
          />
          <Route
            path="details/:id"
            element={
              <GenericRoute>
                <DetailsOffert />
              </GenericRoute>
            }
          />
          <Route path="/" element={  <GenericRoute>
            <HomeScreen />
            </GenericRoute>} />
          <Route
            path="admin-user"
            element={
              <AdminRoute>
                <AdminUser />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
