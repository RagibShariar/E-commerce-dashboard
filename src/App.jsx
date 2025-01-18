import { Col, Row } from "reactstrap";
import TopProductsChart from "./components/Admin/TopProductsChart";
import SalesTrendChart from "./components/Admin/SalesTrendChart";
import { useSelector } from "react-redux";

function App() {
  const {firstName, lastName} = useSelector(state=> state.auth)
  return (
    <div className="">
      <p className="fs-2 fw-bold">Welcome Back, { firstName + " " + lastName}</p>
      <Row>
        <Col md={6} className="border">
          <TopProductsChart />
        </Col>
        <Col md={6} className="border">
          <SalesTrendChart/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
