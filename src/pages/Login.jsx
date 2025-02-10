import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/api/authApi/authApi";
import { setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const res = await login(values);

      if (res.data) {
        dispatch(setUser(res.data));
        localStorage.setItem("auth", res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={4}>
          <div className="border px-3 mx-auto mb-5">
            <p>
              Sample username: <span className="ms-2 fs-5 fw-bold">emilys</span>
            </p>
            <p>
              Sample password:{" "}
              <span className="ms-2 fs-5 fw-bold">emilyspass</span>
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="border px-3 mx-auto mb-5">
            <p>
              Sample username:{" "}
              <span className="ms-2 fs-5 fw-bold">isabellad</span>
            </p>
            <p>
              Sample password:{" "}
              <span className="ms-2 fs-5 fw-bold">isabelladpass</span>
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="border  px-3 mx-auto mb-5">
            <p>
              Sample username:{" "}
              <span className="ms-2 fs-5 fw-bold">williamg</span>
            </p>
            <p>
              Sample password:{" "}
              <span className="ms-2 fs-5 fw-bold">williamgpass</span>
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* username Field */}
                    <FormGroup>
                      <Label for="username">username</Label>
                      <Field
                        name="username"
                        type="username"
                        className="form-control"
                        placeholder="Enter your username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>

                    {/* Password Field */}
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      color="primary"
                      block
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
