import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import MyPagination from "../components/MyPagination";
import {
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetProductsQuery,
} from "../redux/api/productsApi/productsApi";

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortConfig, setSortConfig] = useState({ column: null, order: "asc" });
  const [inStock, setInStock] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1); // default
  const skip = (currentPage - 1) * itemsPerPage;
  const { data, isLoading } = useGetProductsQuery({
    searchTerm: searchTerm,
    category: selectedCategory,
    sortBy: sortConfig.column,
    sortOrder: sortConfig.order,
    limit: itemsPerPage,
    skip: skip,
  });
  const products = data?.products || [];

  console.log(searchTerm);
  // Pagination
  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  const handleCurrentPage = (index) => {
    if (index >= 1 && index <= totalPages) {
      setCurrentPage(index);
    }
  };

  // console.log("currentPage: " + currentPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: `Delete this product with id:  ${id} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProduct(id);

        if (res.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // sorting
  const handleSort = (column) => {
    const newOrder =
      sortConfig.column === column && sortConfig.order === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ column, order: newOrder });

    // console.log(`Column: ${column}, Order: ${newOrder}`);
  };
  const renderSortIcon = (column) => {
    if (sortConfig.column === column) {
      return sortConfig.order === "asc" ? "▲" : "▼";
    }
    return "⬍"; // Default icon for unsorted
  };

  if (isLoading) {
    return <Loading />;
  }

  // Filter products based on the checkboxes
  const filteredProducts = products.filter((product) => {
    if (!inStock && !lowStock) {
      return true; // If neither checkbox is selected, show all products
    }

    if (inStock && lowStock) {
      return true; // Show all products when both checkboxes are selected
    }
    if (inStock && product.availabilityStatus === "In Stock") {
      return true; // Show products with "In Stock"
    }
    if (lowStock && product.availabilityStatus === "Low Stock") {
      return true; // Show products with "Low Stock"
    }
    return false; // Show no products if no filter is applied
  });

  return (
    <section className="">
      <div>
        {/* searching */}
        <Row>
          <Col md={4}>
            <Input
              placeholder="Search Product..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          {/* Category filter */}
          <Col md={2}>
            <FormGroup>
              <Input
                id="productCategory"
                name="category"
                type="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.name.replace(/\s+/g, "-").toLowerCase()}
                  >
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          {/* In Stock and Low Stock */}
          <Col md={2} className="d-flex gap-3">
            <FormGroup check>
              <Input
                id="inStock"
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
              />
              <Label for="inStock" check>
                In Stock
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                id="lowStock"
                type="checkbox"
                checked={lowStock}
                onChange={() => setLowStock(!lowStock)}
              />
              <Label for="lowStock" check>
                Low Stock
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </div>

      <Table striped className="border">
        <thead>
          <tr>
            <th
              scope="col"
              style={{ width: "10%" }}
              onClick={() => handleSort("id")}
            >
              #<span style={{ marginLeft: "5px" }}>{renderSortIcon("id")}</span>
            </th>
            <th
              scope="col"
              style={{ width: "30%" }}
              onClick={() => handleSort("title")}
            >
              Product Name
              <span style={{ marginLeft: "5px" }}>
                {renderSortIcon("name")}
              </span>
            </th>
            <th
              scope="col"
              style={{ width: "10%" }}
              onClick={() => handleSort("price")}
            >
              Price{" "}
              <span style={{ marginLeft: "5px" }}>
                {renderSortIcon("price")}
              </span>
            </th>
            <th scope="col" onClick={() => handleSort("stock")}>
              Stock
              <span style={{ marginLeft: "5px" }}>
                {renderSortIcon("stock")}
              </span>
            </th>
            <th scope="col" onClick={() => handleSort("minimumOrderQuantity")}>
              Sales Count
              <span style={{ marginLeft: "5px" }}>
                {renderSortIcon("minimumOrderQuantity")}
              </span>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.minimumOrderQuantity}</td>
              <td>
                <Button
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  color="success"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  className="ms-2"
                  onClick={() => handleDelete(product.id)}
                  color="danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MyPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
      />
    </section>
  );
};

export default AllProducts;
