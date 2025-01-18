import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  useAddProductMutation,
  useGetAllCategoriesQuery,
} from "../redux/api/productsApi/productsApi";

const AddProduct = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const [addProduct] = useAddProductMutation();

  // Initial values for Formik
  const initialValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Product Name is required")
      .min(3, "Name must be at least 3 characters"),
    price: Yup.number()
      .required("Product Price is required")
      .min(0, "Price cannot be negative"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    category: Yup.string().required("Product Category is required"),
    stock: Yup.number()
      .required("Stock Quantity is required")
      .min(0, "Stock cannot be negative"),
    imageUrl: Yup.string()
      .required("Image URL is required")
      .url("Must be a valid URL"),
  });

  // Form submission handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await addProduct(values);

      if (res.data) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
        });
        resetForm(); // Reset the form after submission
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add product!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border border-2 rounded p-4 container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <Field
                    id="productName"
                    name="name"
                    placeholder="Product Name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="productPrice">Product Price</Label>
                  <Field
                    id="productPrice"
                    name="price"
                    placeholder="Product Price"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="productDescription">Description</Label>
                  <Field
                    id="productDescription"
                    name="description"
                    placeholder="Description for Product"
                    as="textarea"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="productCategory">Product Category</Label>
                  <Field
                    id="productCategory"
                    name="category"
                    as="select"
                    className="form-control"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="productStock">Stock Quantity</Label>
                  <Field
                    id="productStock"
                    name="stock"
                    placeholder="Stock Quantity"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="productImage">Image URL</Label>
                  <Field
                    id="productImage"
                    name="imageUrl"
                    placeholder="Product Image URL"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="imageUrl"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              className="mt-3"
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
