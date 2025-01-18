import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import MyPagination from "../components/myPagination";
import {
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetProductsQuery,
} from "../redux/api/productsApi/productsApi";

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1); // default
  const skip = (currentPage - 1) * itemsPerPage;
  const { data, isLoading } = useGetProductsQuery({
    searchTerm: searchTerm,
    category: selectedCategory,
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="">
      <div >
        {/* filtering */}
        <Row>
          <Col md={4}>
            <Input
             placeholder="Search Product..."
             onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
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
          <Col md={2} className="d-flex gap-3">
            <FormGroup check>
              <Input id="inStock" type="checkbox" />
              <Label for="inStock" check>
                In Stock
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input id="lowStock" type="checkbox" />
              <Label for="lowStock" check>
                Low Stock
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </div>
      <div className="mb-3 d-flex justify-content-end ">
        <Link
          className="bg-primary text-white px-4 py-2 rounded  link-underline"
          to="/add-product"
        >
          Add New Product
        </Link>
      </div>
      <Table striped className="border">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sales Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
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
