import { createBrowserRouter } from "react-router";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";
import EditProduct from "../pages/EditProduct";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <AdminDashboardLayout />
      </ProtectedRoutes>
    ),

    children: [
      {
        path: "/",
        element: <AdminDashboard />,
      },

      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
]);
