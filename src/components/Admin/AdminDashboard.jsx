import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import SalesTrendChart from "./SalesTrendChart";
import TopProductsChart from "./TopProductsChart";

const AdminDashboard = () => {
  const { firstName, lastName } = useSelector((state) => state.auth);
  return (
    <>
      <div className="">
        <p className="fs-2 fw-bold">
          Welcome Back, {firstName + " " + lastName}
        </p>
        <Row>
          <Col md={6} className="border">
            <TopProductsChart />
          </Col>
          <Col md={6} className="border">
            <SalesTrendChart />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminDashboard;
