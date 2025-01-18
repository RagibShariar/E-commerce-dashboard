import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Button,
  Col,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from "reactstrap";
import Header from "../components/Header";

const AdminDashboardLayout = () => {
  // State to manage Offcanvas visibility
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Toggle function for Offcanvas
  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);

  return (
    <section className="">
      <Row
        className=" min-vh-100 m-0 overflow-hidden admin-dashboard-layout"
        style={{ overflowX: "hidden" }}
      >
        {/* Navbar for small devices */}
        <Col
          xs={12}
          className="d-md-none border-bottom d-flex align-items-center justify-content-between px-3 py-2 bg-light shadow-sm"
        >
          <h5 className="m-0 fw-bold text-primary">Admin Dashboard</h5>
          <Button color="primary" onClick={toggleOffcanvas}>
            <i className="bi bi-list"></i> Menu
          </Button>

          {/* Offcanvas for mobile menu */}
          <Offcanvas isOpen={isOffcanvasOpen} toggle={toggleOffcanvas}>
            <OffcanvasHeader toggle={toggleOffcanvas}>
              <h5 className="text-primary">Menu</h5>
            </OffcanvasHeader>
            <OffcanvasBody>
              {/* Mobile menu items */}
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-house-door"></i> Dashboard
                  </Link>
                </li>
             
                <li>
                  <Link
                    to="/settings"
                    className="text-decoration-none text-dark"
                  >
                    <i className="bi bi-gear"></i> Settings
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="text-decoration-none text-dark">
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </Link>
                </li>
              </ul>
            </OffcanvasBody>
          </Offcanvas>
        </Col>

        {/* Sidebar menu for PC */}
        <Col
          md={2}
          className="d-none d-md-block border-end bg-light vh-100 p-3 shadow-sm"
        >
          <h5 className="text-center py-3 border-bottom text-primary fw-bold">
            <Link to="/" className="text-decoration-none fs-4">
              Admin Dashboard
            </Link>
          </h5>
          <ul className="list-unstyled mt-3">
            <li className="mb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `d-block    p-2 rounded text-decoration-none ${
                    isActive ? "bg-primary text-white " : "text-dark"
                  }`
                }
              >
                <i className="bi bi-house-door me-2"></i> Dashboard
              </NavLink>
            </li>
            <li className="mb-2 ">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `d-block    p-2 rounded text-decoration-none ${
                    isActive ? "bg-primary text-white " : "text-dark"
                  }`
                }
              >
                <i className="bi bi-box-seam me-2"></i> All Products
              </NavLink>
            </li>
            <li className="mb-2 ">
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `d-block    p-2 rounded text-decoration-none ${
                    isActive ? "bg-primary text-white " : "text-dark"
                  }`
                }
              >
                <i className="bi bi-box-seam me-2"></i> Add Product
              </NavLink>
            </li>
            
          </ul>
        </Col>

        {/* Main content area */}
        <Col xs={12} md={10} className="bg-white p-0">
          <Header />
          <div className="p-4">
            <Outlet />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default AdminDashboardLayout;
