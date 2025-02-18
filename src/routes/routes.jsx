import { createBrowserRouter } from "react-router";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Test from "../pages/Test";
import { lazy, Suspense } from "react";

const AllProducts = lazy(() => import("../pages/AllProducts"));
const EditProduct = lazy(() => import("../pages/EditProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/test",
    element: <Test />,
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
        element: (
          <Suspense fallback={<p>Loading all products ...</p>}>
            <AllProducts />
          </Suspense>
        ),
      },
      {
        path: "/add-product",
        element: (
          <Suspense fallback={<p>Add Product Component loading ...</p>}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: "/edit-product/:id",
        element: (
          <Suspense fallback={<p>Edit Product Component loading ...</p>}>
            <EditProduct />
          </Suspense>
        ),
      },
    ],
  },
]);
